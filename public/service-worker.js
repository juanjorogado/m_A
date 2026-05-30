/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'marcus-meditations-v4';

// Recursos estáticos básicos que queremos pre-cachear durante la instalación
const STATIC_ASSETS = [
  '/',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// Instalación: Pre-cacheamos los recursos estáticos iniciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Abriendo caché y pre-cacheando recursos estáticos');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Algunos recursos estáticos fallaron al pre-cachear (común en desarrollo local):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Petición (fetch): Estrategia Cache-First con caída en Red (Network Fallback)
// y caché dinámica para recursos de runtime (como fuentes y bundles compilados)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // No interceptar llamadas a esquemas especiales (chrome-extension, etc.)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Only cache same-origin requests
        const url = new URL(event.request.url);
        if (url.origin === self.location.origin) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(() => {
        // Fallback offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('/');
        }
        // Return a basic offline response for other failed requests
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});