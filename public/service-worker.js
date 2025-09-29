// public/service-worker.js

const CACHE_NAME = 'site-cache-v2';

// List the routes (HTML pages) you want to pre-cache:
const PRECACHE_URLS = [
  '/',
  '/home',
  '/products',
  '/profile',
  '/test',
  '/item',
  '/cart',
  '/admin',
  // Add any other pages here…
];

// List any additional static assets (images, CSS, JS) you’d like to pre-cache:
const ASSET_URLS = [
  '/logo.png',
  '/styles/main.css',
  '/scripts/app.js',
  '/images/banner.jpg',
  // etc.
];

self.addEventListener('install', (event) => {
  console.log('🛠️  SW installing – pre-caching routes & assets.');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([...PRECACHE_URLS, ...ASSET_URLS])
    ).then(() => self.skipWaiting())
  );
});


self.addEventListener('activate', (event) => {
  console.log('⚡ SW activated – cleaning up old caches.');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('🗑️  Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});


self.addEventListener('fetch', (event) => {
  const { request } = event;

  // --- 1) Navigation requests (HTML pages) ---
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkRes) => {
          // update the cache for next time
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, networkRes.clone()));
          return networkRes;
        })
        .catch(() =>
          // network failed, try cache
          caches.match(request).then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  // --- 2) Other requests (assets: JS/CSS/images, etc) ---
  event.respondWith(
    fetch(request)
      .then((networkRes) => {
        // optionally update cache
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, networkRes.clone()));
        return networkRes;
      })
      .catch(() =>
        // if offline or fetch fails, serve from cache if available
        caches.match(request)
      )
  );
});
