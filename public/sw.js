/*
 * SERVICE WORKER
 * Strategy: Cache First, Fallback to Network (Runtime Caching)
 * 
 * This service worker caches every request the app makes (including external CDNs
 * like tailwind, esm.sh, and fonts). This ensures the app works offline after
 * the first successful load.
 */

const CACHE_NAME = 'interlinear-reader-v1';

// 1. INSTALL: Force the service worker to become active immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. ACTIVATE: Clean up old caches if necessary and take control of the page
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH: Intercept network requests
self.addEventListener('fetch', (event) => {
  // We only cache GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // A. Cache Hit: Return the cached file
      if (cachedResponse) {
        return cachedResponse;
      }

      // B. Cache Miss: Fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Check if we received a valid response
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic' && networkResponse.type !== 'cors' && networkResponse.type !== 'opaque'
        ) {
          return networkResponse;
        }

        // Clone the response (streams can only be consumed once)
        const responseToCache = networkResponse.clone();

        // Save to cache
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // C. Network Failure (Offline and not in cache)
        // You could return a custom offline page here if desired
        console.log('Offline: Resource not in cache', event.request.url);
      });
    })
  );
});