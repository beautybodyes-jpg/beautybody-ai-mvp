const CACHE_NAME = 'beautybody-v1';
const STATIC_ASSETS = [
  '/',
  '/consent',
  '/scan',
  '/processing',
  '/results',
  '/report',
  '/book',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => {
        if (typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.error('SW install error:', err);
        }
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
      .catch((err) => {
        if (typeof console !== 'undefined') {
          // eslint-disable-next-line no-console
          console.error('SW activate error:', err);
        }
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;
  if (url.protocol === 'blob:' || url.protocol === 'data:') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clone))
              .catch(() => {});
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        fetch(request)
          .then((response) => {
            if (response && response.ok && response.type !== 'opaque') {
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, response.clone()))
                .catch(() => {});
            }
          })
          .catch(() => {});
        return cached;
      }
      return fetch(request)
        .then((response) => {
          if (response && response.ok && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clone))
              .catch(() => {});
          }
          return response;
        })
        .catch(() => new Response('', { status: 408, statusText: 'Request Timeout' }));
    })
  );
});
