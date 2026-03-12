const CACHE = "vr-pwa-v1"
const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "script.js",
    "manifest.json",
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS))
    )
})

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url)
})

