const CACHE_NAME = "secplus-console-v3";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./game.html",
  "./manifest.json",
  "./keywords.js",
  "./dion-history.js",
  "./dion-parser.js",
  "./plan.js",
  "./bank/d1.js",
  "./bank/d2a.js",
  "./bank/d2b.js",
  "./bank/d3.js",
  "./bank/d4a.js",
  "./bank/d4b.js",
  "./bank/d5.js",
  "./bank/hard_d1.js",
  "./bank/hard_d2a.js",
  "./bank/hard_d2b.js",
  "./bank/hard_d3.js",
  "./bank/hard_d4a.js",
  "./bank/hard_d4b.js",
  "./bank/hard_d5.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
