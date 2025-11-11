/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'nestelia-v1';
const RUNTIME_CACHE = 'nestelia-runtime-v1';
const WIKI_CACHE = 'nestelia-wiki-v1';
const IMAGE_CACHE = 'nestelia-images-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching app shell');
      return cache.addAll(PRECACHE_URLS);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, WIKI_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const networkFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
};

const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    console.log('[Service Worker] Fetch failed for:', request.url);
  });
  
  return cached || fetchPromise;
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  if (request.method !== 'GET') {
    return;
  }
  
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  if (request.destination === 'image' || /\.(png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }
  
  if (request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'font' ||
      /\.(js|css|woff|woff2|ttf|otf)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }
  
  if (url.pathname.includes('/api/wiki') || 
      url.pathname.includes('/api/entries') ||
      url.pathname.includes('/api/categories')) {
    event.respondWith(networkFirst(request, WIKI_CACHE));
    return;
  }
  
  if (url.pathname.includes('/api/')) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }
  
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }
  
  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const { urls } = event.data;
    caches.open(WIKI_CACHE).then((cache) => {
      cache.addAll(urls);
    });
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-wiki') {
  }
});

