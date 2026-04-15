/* 
  Service Worker for LIUTEX2026
  - Handles caching and offline functionality (placeholder for now)
*/

const CACHE_NAME = 'liutex-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/_next/static/css/styles.css', // Next.js will handle its own caching but this is a placeholder
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...', event);
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     console.log('[Service Worker] Caching all: app shell and content');
  //     return cache.addAll(ASSETS_TO_CACHE);
  //   })
  // );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // console.log('[Service Worker] Fetching something...', event.request.url);
  // Default behavior: network first
});
