// Media cache: once an image, font or built asset has been fetched it is kept and served instantly on later pages and visits.
// GitHub Pages only lets the browser cache files for 10 minutes, this keeps them until the version below changes. Pages (HTML) are never cached here, so a deploy shows up at once.
const CACHE = "media-v1";
const KEEP = /^\/(images|fonts|_next\/static)\//;
const MEDIA = /\.(webp|png|jpe?g|svg|avif|otf|woff2?|css|js)$/i;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return; // videos stream by range, the browser handles those
  const url = new URL(req.url);
  if (url.origin !== location.origin || !KEEP.test(url.pathname) || !MEDIA.test(url.pathname)) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok && res.status === 200) cache.put(req, res.clone());
      return res;
    }),
  );
});
