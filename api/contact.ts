// Vercel serverless function: delivers contact form messages by email through Resend.
// Env: RESEND_API_KEY (required), CONTACT_FROM and CONTACT_TO (optional overrides).

const FROM = process.env.CONTACT_FROM ?? 'Ken Romero Portfolio <contact@kenromerogoestdigital.space>'
const TO = process.env.CONTACT_TO ?? 'kenromero.digital@gmail.com'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BODY_BYTES = 20_000
// Bots submit instantly; people take at least a few seconds to fill the form.
const MIN_FILL_MS = 3_000

// Best-effort rate limit per visitor IP: 5 messages per 10 minutes. It lives in
// the function's memory, so it resets when Vercel starts a fresh instance; the
// honeypot and fill-time check catch most bots on their own.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60_000
const recentByIp = new Map<string, number[]>()

export function isRateLimited(ip: string, now = Date.now()) {
  const recent = (recentByIp.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS)
  const limited = recent.length >= RATE_LIMIT
  if (!limited) recent.push(now)
  recentByIp.set(ip, recent)
  if (recentByIp.size > 5_000) recentByIp.clear()
  return limited
}

/** Only accept posts sent by a page on this same site. */
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

// Drops control characters (keeping line breaks in the message) from visitor input.
const clean = (value: unknown, max: number, keepNewlines = false) =>
  String(value ?? '')
    .replace(keepNewlines ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max)

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status })

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

type Submission = { name: string; email: string; message: string; page: string }

/** Which portfolio the message came from, based on the page URL. */
export function portfolioLabel(page: string) {
  return /creative\.|\/va(\/|$|\?|#)/.test(page) ? 'Creative' : 'Tech'
}

export function buildEmail({ name, email, message, page }: Submission, sentAt = new Date()) {
  const portfolio = portfolioLabel(page)
  const accent = portfolio === 'Creative' ? '#f2b124' : '#2563eb'
  const firstName = name.split(/\s+/)[0]
  const when = sentAt.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const replyHref = `mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Re: your message to Ken Romero')}`
  const safe = { name: escapeHtml(name), email: escapeHtml(email), page: escapeHtml(page) }
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

  const subject = `New message from ${name.replace(/[\r\n]+/g, ' ')} · ${portfolio} portfolio`

  const text = [
    `New message from your ${portfolio} portfolio`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent: ${when}`,
    ...(page ? [`Page: ${page}`] : []),
    '',
    message,
    '',
    `Reply to this email to answer ${firstName} directly.`,
  ].join('\n')

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f1f5f9;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;font-family:${font};">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <tr><td style="background:#0f172a;padding:22px 28px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="color:#ffffff;font-size:15px;font-weight:800;letter-spacing:.06em;">KEN ROMERO</td>
      <td align="right"><span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${accent};color:${portfolio === 'Creative' ? '#0f172a' : '#ffffff'};font-size:12px;font-weight:700;">${portfolio} portfolio</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:30px 28px 8px;">
    <p style="margin:0 0 6px;color:#64748b;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">New contact message</p>
    <h1 style="margin:0;color:#0f172a;font-size:24px;line-height:1.3;">${safe.name} sent you a message</h1>
  </td></tr>
  <tr><td style="padding:18px 28px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#0f172a;">
      <tr><td style="padding:8px 0;color:#64748b;width:72px;">Name</td><td style="padding:8px 0;font-weight:600;">${safe.name}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;border-top:1px solid #f1f5f9;">Email</td><td style="padding:8px 0;border-top:1px solid #f1f5f9;"><a href="mailto:${safe.email}" style="color:${portfolio === 'Creative' ? '#b45309' : '#2563eb'};font-weight:600;text-decoration:none;">${safe.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#64748b;border-top:1px solid #f1f5f9;">Sent</td><td style="padding:8px 0;border-top:1px solid #f1f5f9;">${escapeHtml(when)}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:18px 28px 0;">
    <div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:8px;padding:18px 20px;color:#1e293b;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</div>
  </td></tr>
  <tr><td style="padding:24px 28px 30px;">
    <a href="${replyHref}" style="display:inline-block;background:#0f172a;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 22px;border-radius:10px;">Reply to ${escapeHtml(firstName)}</a>
    <p style="margin:12px 0 0;color:#64748b;font-size:13px;">Or just hit reply in your inbox. It goes straight to ${safe.email}.</p>
  </td></tr>
  <tr><td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;line-height:1.5;">
    Sent from the contact form${page ? ` on <a href="${safe.page}" style="color:#64748b;">${safe.page}</a>` : ''}.
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`

  return { subject, text, html }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return json({ success: false, message: 'Email is not configured.' }, 500)

  if (!isSameOrigin(request)) return json({ success: false, message: 'Invalid request.' }, 403)
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ success: false, message: 'Invalid request.' }, 415)
  }

  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return json({ success: false, message: 'Too many messages. Please try again in a few minutes.' }, 429)
  }

  let data: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return json({ success: false, message: 'Message is too long.' }, 413)
    data = JSON.parse(raw) as Record<string, unknown>
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('not an object')
  } catch {
    return json({ success: false, message: 'Invalid request.' }, 400)
  }

  // Honeypot and fill-time checks: pretend success so bots don't retry.
  if (data.botcheck) return json({ success: true })
  if (!(Number(data.elapsed) >= MIN_FILL_MS)) return json({ success: true })

  const name = clean(data.name, 200)
  const email = clean(data.email, 200)
  const message = clean(data.message, 5000, true)
  const rawPage = clean(data.page, 500)
  // The page link goes into the email as a link, so only accept web addresses.
  const page = /^https?:\/\//i.test(rawPage) ? rawPage : ''

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return json({ success: false, message: 'Please fill in your name, a valid email and a message.' }, 400)
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      ...buildEmail({ name, email, message, page }),
    }),
  })

  if (!response.ok) {
    // The reason (e.g. an unverified domain) stays in the Vercel function logs, not the browser.
    console.error('Resend error', response.status, await response.text())
    return json({ success: false, message: 'The message could not be sent.' }, 502)
  }

  return json({ success: true })
}
