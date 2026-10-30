// Checks for the invoice sync function (api/invoices.ts). Run with: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isLockedOut, passcodeMatches, recordFailure, richText, sanitizeInvoice, toRecord, invoiceProperties, POST, GET } from '../api/invoices.ts'

const invoice = {
  cur: 'USD', issued: '2026-10-30', due: '2026-11-06', client: 'Bloom Cafe', contact: 'Ana', cemail: 'ana@example.com', caddr: '',
  items: [{ desc: 'Social media package', note: 'November 2026', qty: 1, rate: 450 }], part: 'deposit', paid: false, paidon: '',
}

test('checks the passcode exactly', () => {
  assert.equal(passcodeMatches('open sesame', 'open sesame'), true)
  assert.equal(passcodeMatches('open sesam', 'open sesame'), false)
  assert.equal(passcodeMatches(null, 'open sesame'), false)
})

test('locks an IP out after 10 wrong passcodes in 15 minutes', () => {
  const start = 5_000_000
  for (let i = 0; i < 9; i++) recordFailure('198.51.100.7', start + i)
  assert.equal(isLockedOut('198.51.100.7', start + 10), false)
  recordFailure('198.51.100.7', start + 10)
  assert.equal(isLockedOut('198.51.100.7', start + 11), true)
  assert.equal(isLockedOut('198.51.100.8', start + 11), false, 'other visitors are not affected')
  assert.equal(isLockedOut('198.51.100.7', start + 15 * 60_000 + 11), false, 'the lockout ends after 15 minutes')
})

test('keeps only known invoice fields', () => {
  const clean = sanitizeInvoice({ ...invoice, cur: 'EUR', part: 'weird', extra: 'x', items: [{ desc: 'A', qty: '2', rate: -5, evil: 1 }] })!
  assert.equal(clean.cur, 'USD')
  assert.equal(clean.part, 'deposit')
  assert.deepEqual(clean.items, [{ desc: 'A', note: '', qty: 2, rate: 0 }])
  assert.equal('extra' in clean, false)
  assert.equal(sanitizeInvoice({ items: 'nope' }), null)
})

test('splits long text into 2,000 character runs for Notion', () => {
  const runs = richText('x'.repeat(4_500))
  assert.deepEqual(runs.map((run) => run.text.content.length), [2000, 2000, 500])
  assert.deepEqual(richText(''), [])
})

test('reads a Notion row back into the invoice it came from', () => {
  const props = invoiceProperties(sanitizeInvoice(invoice)!)
  assert.equal(props['Package total'].number, 450)
  assert.equal(props.Type.select.name, 'Deposit 50%')
  const record = toRecord({
    id: 'page-1', url: 'https://notion.so/page-1',
    properties: { ...props, 'No.': { unique_id: { prefix: 'KR', number: 7 } }, Status: { status: { name: 'Sent' } }, 'Amount due': { formula: { number: 225 } }, PDF: { files: [{}] } },
  })
  assert.equal(record.no, 'KR-7')
  assert.equal(record.amount, 225)
  assert.equal(record.hasPdf, true)
  assert.deepEqual(record.data, sanitizeInvoice(invoice))
})

test('needs Notion settings, the same site and the passcode', async () => {
  delete process.env.NOTION_TOKEN
  assert.equal((await GET(new Request('https://site.test/api/invoices'))).status, 503)
  process.env.NOTION_TOKEN = 'secret_test'
  process.env.INVOICE_PASSCODE = 'right'
  const wrong = await GET(new Request('https://site.test/api/invoices', { headers: { 'x-invoice-passcode': 'wrong', 'x-real-ip': '192.0.2.50' } }))
  assert.equal(wrong.status, 401)
  const crossSite = await POST(new Request('https://site.test/api/invoices', { method: 'POST', headers: { origin: 'https://evil.test', host: 'site.test', 'x-invoice-passcode': 'right' }, body: '{}' }))
  assert.equal(crossSite.status, 403)
})

test('creates a Notion row and attaches the PDF', async () => {
  process.env.NOTION_TOKEN = 'secret_test'
  process.env.INVOICE_PASSCODE = 'right'
  const calls: { url: string; method: string; body: unknown }[] = []
  const realFetch = globalThis.fetch
  const page = (extra = {}) => ({ id: 'new-page', url: 'https://notion.so/new-page', properties: { ...invoiceProperties(sanitizeInvoice(invoice)!), 'No.': { unique_id: { prefix: 'KR', number: 3 } }, Status: { status: { name: 'Sent' } }, ...extra } })
  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    calls.push({ url, method: init.method ?? 'GET', body: init.body instanceof FormData ? 'form' : init.body ? JSON.parse(String(init.body)) : null })
    if (url.endsWith('/query')) return Response.json({ results: [{ id: 'client-1' }] })
    if (url.endsWith('/file_uploads')) return Response.json({ id: 'upload-1' })
    if (url.endsWith('/send')) return Response.json({ status: 'uploaded' })
    if (url.endsWith('/pages')) return Response.json(page())
    return Response.json(page({ PDF: { files: [{ name: 'x.pdf' }] } }))
  }) as typeof fetch
  try {
    const pdf = Buffer.from('%PDF-1.3 test').toString('base64')
    const response = await POST(new Request('https://site.test/api/invoices', {
      method: 'POST',
      headers: { origin: 'https://site.test', host: 'site.test', 'x-invoice-passcode': 'right', 'content-type': 'application/json' },
      body: JSON.stringify({ invoice, pdf }),
    }))
    assert.equal(response.status, 200)
    const { invoice: record } = await response.json()
    assert.equal(record.no, 'KR-3')
    assert.equal(record.hasPdf, true)
    const create = calls.find((call) => call.url.endsWith('/pages'))!.body as any
    assert.deepEqual(create.properties.Client, { relation: [{ id: 'client-1' }] })
    assert.equal(create.properties.Status.status.name, 'Sent')
    const attach = calls.at(-1)!.body as any
    assert.equal(attach.properties.PDF.files[0].file_upload.id, 'upload-1')
    assert.equal(attach.properties.PDF.files[0].name, 'Invoice KR-3 Bloom Cafe.pdf')
  } finally {
    globalThis.fetch = realFetch
  }
})
