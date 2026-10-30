// Keeps the invoice maker working offline. Bump VERSION when any file below changes.
const VERSION = 'invoice-v1'
const FILES = [
  '/invoice/',
  '/invoice/invoice.css',
  '/invoice/app.js',
  '/invoice/vendor/html2canvas.min.js',
  '/invoice/vendor/jspdf.umd.min.js',
  '/invoice/fonts/bricolage-grotesque-latin-wght-normal.woff2',
  '/invoice/fonts/fraunces-latin-wght-normal.woff2',
  '/invoice/fonts/jetbrains-mono-latin-wght-normal.woff2',
  '/invoice/icon-192.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key)))).then(() => self.clients.claim()),
  )
})

// Network first, so updates show up; the cache is the fallback when offline.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone()
        caches.open(VERSION).then((cache) => cache.put(event.request, copy))
        return response
      })
      .catch(() => caches.match(event.request)),
  )
})
