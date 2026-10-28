// Checks for the contact form function (api/contact.ts). Run with: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildEmail, isRateLimited, isSameOrigin, portfolioLabel } from '../api/contact.ts'

const post = (headers: Record<string, string>) => new Request('https://example.com/api/contact', { method: 'POST', headers })

test('only accepts posts from a page on the same site', () => {
  assert.equal(isSameOrigin(post({ origin: 'https://kenromerogoestdigital.space', host: 'kenromerogoestdigital.space' })), true)
  assert.equal(isSameOrigin(post({ origin: 'https://evil.example', host: 'kenromerogoestdigital.space' })), false)
  assert.equal(isSameOrigin(post({ host: 'kenromerogoestdigital.space' })), false)
  assert.equal(isSameOrigin(post({ origin: 'not a url', host: 'kenromerogoestdigital.space' })), false)
  // Vercel passes the real domain in x-forwarded-host.
  assert.equal(
    isSameOrigin(post({ origin: 'https://creative.kenromerogoestdigital.space', host: 'internal', 'x-forwarded-host': 'creative.kenromerogoestdigital.space' })),
    true,
  )
})

test('allows 5 messages per visitor in 10 minutes', () => {
  const start = 1_000_000
  for (let i = 0; i < 5; i++) assert.equal(isRateLimited('203.0.113.1', start + i), false)
  assert.equal(isRateLimited('203.0.113.1', start + 5), true)
  assert.equal(isRateLimited('203.0.113.2', start + 5), false, 'other visitors are not affected')
  assert.equal(isRateLimited('203.0.113.1', start + 10 * 60_000 + 5), false, 'the limit resets after 10 minutes')
})

test('labels the portfolio a message came from', () => {
  assert.equal(portfolioLabel('https://creative.kenromerogoestdigital.space/'), 'Creative')
  assert.equal(portfolioLabel('https://kenromerogoestdigital.space/va/podcast-editing'), 'Creative')
  assert.equal(portfolioLabel('https://kenromero-creative-portfolio.vercel.app/podcast-editing'), 'Creative')
  assert.equal(portfolioLabel('https://kenromerogoestdigital.space/qa/projects/api-testing'), 'Tech')
})

test('escapes visitor input in the email', () => {
  const { subject, html, text } = buildEmail({
    name: '<script>alert(1)</script>\r\nBcc: x@y.z',
    email: 'a"b@example.com',
    message: '<img src=x onerror=alert(1)>',
    page: 'https://kenromerogoestdigital.space/',
  })
  assert.ok(!html.includes('<script>') && !html.includes('<img src=x'))
  assert.ok(html.includes('&#60;script&#62;'))
  assert.ok(!html.includes('a"b@'))
  assert.ok(!/[\r\n]/.test(subject), 'no line breaks in the subject')
  assert.ok(text.includes('<img src=x onerror=alert(1)>'), 'plain text keeps the message as written')
})
