// Vercel serverless function: keeps the invoice maker (/invoice) in sync with the
// Invoices database in Notion. Every request needs the passcode only Ken knows.
// Env: NOTION_TOKEN and INVOICE_PASSCODE (required), NOTION_INVOICES_DB and
// NOTION_CLIENTS_DB (optional overrides of the database ids below).

import { createHash, timingSafeEqual } from 'node:crypto'

const NOTION = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'
const INVOICES_DB = process.env.NOTION_INVOICES_DB ?? 'eb1342a2a598491dbf1235bbe13c1a51'
const CLIENTS_DB = process.env.NOTION_CLIENTS_DB ?? '20a94d7160c14f779afe45f2c83fddba'
// Vercel refuses request bodies over 4.5 MB; a one-page invoice PDF is about 250 KB.
const MAX_BODY_BYTES = 4_000_000
const TEXT_CHUNK = 2_000

// Best-effort lockout per IP: 10 wrong passcodes per 15 minutes. It lives in the
// function's memory, so it resets when Vercel starts a fresh instance.
const FAIL_LIMIT = 10
const FAIL_WINDOW_MS = 15 * 60_000
const failuresByIp = new Map<string, number[]>()

export function isLockedOut(ip: string, now = Date.now()) {
  return (failuresByIp.get(ip) ?? []).filter((time) => now - time < FAIL_WINDOW_MS).length >= FAIL_LIMIT
}

export function recordFailure(ip: string, now = Date.now()) {
  const recent = (failuresByIp.get(ip) ?? []).filter((time) => now - time < FAIL_WINDOW_MS)
  recent.push(now)
  failuresByIp.set(ip, recent)
  if (failuresByIp.size > 5_000) failuresByIp.clear()
}

/** Compares passcodes in constant time so the answer can't be guessed letter by letter. */
export function passcodeMatches(given: string | null, expected: string) {
  if (!given) return false
  const digest = (value: string) => createHash('sha256').update(value).digest()
  return timingSafeEqual(digest(given), digest(expected))
}

/** Only accept changes sent by a page on this same site. */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

const clean = (value: unknown, max: number) => String(value ?? '').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '').slice(0, max)
const isDate = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)

type Item = { desc: string; note: string; qty: number; rate: number }
export type Invoice = {
  cur: 'USD' | 'PHP'
  issued: string
  due: string
  client: string
  contact: string
  cemail: string
  caddr: string
  items: Item[]
  part: 'deposit' | 'final' | 'full'
  paid: boolean
  paidon: string
}

/** Keeps only the fields the invoice maker uses, trimmed to sane sizes. */
export function sanitizeInvoice(raw: unknown): Invoice | null {
  if (!raw || typeof raw !== 'object') return null
  const data = raw as Record<string, unknown>
  if (!Array.isArray(data.items)) return null
  const number = (value: unknown) => (Number.isFinite(Number(value)) ? Math.max(0, Math.min(1e9, Number(value))) : 0)
  return {
    cur: data.cur === 'PHP' ? 'PHP' : 'USD',
    issued: isDate(data.issued) ? data.issued : '',
    due: isDate(data.due) ? data.due : '',
    client: clean(data.client, 200),
    contact: clean(data.contact, 200),
    cemail: clean(data.cemail, 200),
    caddr: clean(data.caddr, 500),
    items: data.items.slice(0, 50).map((item) => {
      const it = (item ?? {}) as Record<string, unknown>
      return { desc: clean(it.desc, 300), note: clean(it.note, 300), qty: number(it.qty), rate: number(it.rate) }
    }),
    part: data.part === 'final' || data.part === 'full' ? data.part : 'deposit',
    paid: data.paid === true,
    paidon: isDate(data.paidon) ? data.paidon : '',
  }
}

export const packageTotal = (invoice: Invoice) =>
  Math.round(invoice.items.reduce((sum, it) => sum + it.qty * it.rate, 0) * 100) / 100

const TYPE_NAMES = { deposit: 'Deposit 50%', final: 'Final 50%', full: 'Full' } as const

/** Notion stores at most 2,000 characters per text run, so long text is split. */
export const richText = (value: string) =>
  (value.match(new RegExp(`[\\s\\S]{1,${TEXT_CHUNK}}`, 'g')) ?? []).slice(0, 100).map((content) => ({ type: 'text', text: { content } }))

/** The Notion properties for one invoice. Status and PDF are set by the caller. */
export function invoiceProperties(invoice: Invoice) {
  const date = (value: string) => ({ date: value ? { start: value } : null })
  return {
    Invoice: { title: richText(`${invoice.client || 'No client'} · ${TYPE_NAMES[invoice.part]}`) },
    'Client name': { rich_text: richText(invoice.client) },
    Type: { select: { name: TYPE_NAMES[invoice.part] } },
    'Package total': { number: packageTotal(invoice) },
    Currency: { select: { name: invoice.cur } },
    Issued: date(invoice.issued),
    Due: date(invoice.due),
    'Paid on': date(invoice.paid ? invoice.paidon : ''),
    'Period or milestone': { rich_text: richText(invoice.items.find((it) => it.note)?.note ?? '') },
    'App data': { rich_text: richText(JSON.stringify(invoice)) },
  }
}

type NotionPage = { id: string; url: string; archived?: boolean; in_trash?: boolean; parent?: { database_id?: string }; properties: Record<string, any> }

const plain = (prop: any) => (prop?.rich_text ?? prop?.title ?? []).map((run: any) => run.plain_text ?? run.text?.content ?? '').join('')

/** Turns a Notion row into what the invoice maker lists. Rows made by hand have no app data. */
export function toRecord(page: NotionPage) {
  const p = page.properties
  const id = p['No.']?.unique_id
  let data: Invoice | null = null
  try {
    data = sanitizeInvoice(JSON.parse(plain(p['App data']) || 'null'))
  } catch {
    data = null
  }
  return {
    id: page.id,
    url: page.url,
    no: id?.number ? `${id.prefix ? `${id.prefix}-` : ''}${id.number}` : '',
    number: id?.number ?? 0,
    title: plain(p.Invoice),
    client: plain(p['Client name']) || data?.client || '',
    status: p.Status?.status?.name ?? '',
    amount: p['Amount due']?.formula?.number ?? null,
    currency: p.Currency?.select?.name ?? '',
    issued: p.Issued?.date?.start ?? '',
    hasPdf: (p.PDF?.files ?? []).length > 0,
    data,
  }
}

const sameId = (a = '', b = '') => a.replace(/-/g, '') === b.replace(/-/g, '')

async function notion(path: string, init: RequestInit = {}): Promise<any> {
  const response = await fetch(`${NOTION}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...init.headers,
    },
  })
  if (!response.ok) {
    const detail = await response.text()
    // The reason stays in the Vercel function logs, not the browser.
    console.error('Notion error', response.status, path, detail.slice(0, 500))
    throw new NotionError(response.status)
  }
  return response.json()
}

class NotionError extends Error {
  status: number
  constructor(status: number) {
    super(`Notion answered ${status}`)
    this.status = status
  }
}

async function listInvoices() {
  const pages: NotionPage[] = []
  let cursor: string | undefined
  do {
    const result = await notion(`/databases/${INVOICES_DB}/query`, {
      method: 'POST',
      body: JSON.stringify({ page_size: 100, start_cursor: cursor, sorts: [{ timestamp: 'created_time', direction: 'descending' }] }),
    })
    pages.push(...result.results)
    cursor = result.has_more ? result.next_cursor : undefined
  } while (cursor && pages.length < 2_000)
  return pages.map(toRecord)
}

/** Links the invoice to the client with the same name in the Clients database, if there is one. */
async function findClient(name: string) {
  if (!name) return null
  const result = await notion(`/databases/${CLIENTS_DB}/query`, {
    method: 'POST',
    body: JSON.stringify({ page_size: 1, filter: { property: 'Client', title: { equals: name } } }),
  })
  return (result.results[0]?.id as string | undefined) ?? null
}

/** Loads a page and makes sure it is a live row of the Invoices database. */
async function invoicePage(id: string) {
  if (!/^[0-9a-f-]{32,36}$/i.test(id)) return null
  const page = (await notion(`/pages/${id}`)) as NotionPage
  if (!sameId(page.parent?.database_id, INVOICES_DB) || page.archived || page.in_trash) return null
  return page
}

async function uploadPdf(base64: string, filename: string) {
  const bytes = Buffer.from(base64, 'base64')
  if (bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error('not a pdf')
  const upload = await notion('/file_uploads', {
    method: 'POST',
    body: JSON.stringify({ filename, content_type: 'application/pdf' }),
  })
  const form = new FormData()
  form.append('file', new Blob([bytes], { type: 'application/pdf' }), filename)
  await notion(`/file_uploads/${upload.id}/send`, { method: 'POST', body: form })
  return upload.id as string
}

function guard(request: Request, changes: boolean) {
  if (!process.env.NOTION_TOKEN || !process.env.INVOICE_PASSCODE) {
    return json({ configured: false, message: 'Notion is not connected yet.' }, 503)
  }
  if (changes && !isSameOrigin(request)) return json({ message: 'Invalid request.' }, 403)
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isLockedOut(ip)) return json({ message: 'Too many wrong passcodes. Try again in 15 minutes.' }, 429)
  if (!passcodeMatches(request.headers.get('x-invoice-passcode'), process.env.INVOICE_PASSCODE)) {
    recordFailure(ip)
    return json({ message: 'Wrong passcode.' }, 401)
  }
  return null
}

const failure = (error: unknown) =>
  error instanceof NotionError && (error.status === 401 || error.status === 404)
    ? json({ message: 'Notion refused the request. Check that the Client Onboarding Hub is shared with the connection.' }, 502)
    : json({ message: 'Could not reach Notion. Please try again.' }, 502)

export async function GET(request: Request) {
  const blocked = guard(request, false)
  if (blocked) return blocked
  try {
    const invoices = await listInvoices()
    const last = invoices.reduce((max, inv) => Math.max(max, inv.number), 0)
    return json({ configured: true, invoices, next: `KR-${last + 1}` })
  } catch (error) {
    return failure(error)
  }
}

export async function POST(request: Request) {
  const blocked = guard(request, true)
  if (blocked) return blocked

  let body: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return json({ message: 'The PDF is too large to store.' }, 413)
    body = JSON.parse(raw)
  } catch {
    return json({ message: 'Invalid request.' }, 400)
  }
  const invoice = sanitizeInvoice(body.invoice)
  if (!invoice) return json({ message: 'Invalid invoice.' }, 400)

  try {
    const existing = typeof body.id === 'string' && body.id ? await invoicePage(body.id) : null
    if (body.id && !existing) return json({ message: 'That invoice is no longer in Notion.' }, 404)

    const properties: Record<string, unknown> = invoiceProperties(invoice)
    const clientId = await findClient(invoice.client)
    properties.Client = { relation: clientId ? [{ id: clientId }] : [] }
    const hasPdf = typeof body.pdf === 'string' && body.pdf.length > 0
    if (invoice.paid) properties.Status = { status: { name: 'Paid' } }
    else if (hasPdf) properties.Status = { status: { name: 'Sent' } }
    else if (!existing) properties.Status = { status: { name: 'Draft' } }
    else if (existing.properties.Status?.status?.name === 'Paid') properties.Status = { status: { name: 'Sent' } }
    if (!existing) properties['Payment method'] = { select: { name: 'Wise' } }

    let page = (existing
      ? await notion(`/pages/${existing.id}`, { method: 'PATCH', body: JSON.stringify({ properties }) })
      : await notion('/pages', { method: 'POST', body: JSON.stringify({ parent: { database_id: INVOICES_DB }, properties }) })) as NotionPage

    if (hasPdf) {
      const record = toRecord(page)
      const filename = `${invoice.paid ? 'Receipt' : 'Invoice'} ${record.no} ${invoice.client}`.replace(/[\\/:*?"<>|]+/g, '').replace(/[.\s]+$/, '').slice(0, 150) + '.pdf'
      const fileId = await uploadPdf(body.pdf as string, filename)
      page = await notion(`/pages/${page.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties: { PDF: { files: [{ type: 'file_upload', file_upload: { id: fileId }, name: filename }] } } }),
      })
    }
    return json({ invoice: toRecord(page) })
  } catch (error) {
    if (error instanceof Error && error.message === 'not a pdf') return json({ message: 'Invalid PDF.' }, 400)
    return failure(error)
  }
}

export async function DELETE(request: Request) {
  const blocked = guard(request, true)
  if (blocked) return blocked
  const id = new URL(request.url).searchParams.get('id') ?? ''
  try {
    const page = await invoicePage(id)
    if (!page) return json({ message: 'That invoice is no longer in Notion.' }, 404)
    // Moves the row to Notion's trash, where it can still be restored for 30 days.
    await notion(`/pages/${page.id}`, { method: 'PATCH', body: JSON.stringify({ archived: true }) })
    return json({ deleted: true })
  } catch (error) {
    return failure(error)
  }
}
