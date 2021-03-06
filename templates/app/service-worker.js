/* eslint-disable no-console */
/* eslint-disable no-undef */
importScripts('workbox-sw.js');

var PROJECT_NAME = ''; // Your project name
var PROJECT_VERSION = '{{ version }}'; // Version placeholder
var CACHE_NAMES = [
  PROJECT_NAME + '-' + 'precache' + '-' + PROJECT_VERSION,
  PROJECT_NAME + '-' + 'runtime' + '-' + PROJECT_VERSION,
  PROJECT_NAME + '-' + 'ga' + '-' + PROJECT_VERSION,
  'google-fonts',
  'images'
];

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  initPWA(workbox);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

function initPWA(workbox) {
  workbox.core.setCacheNameDetails({
    prefix: PROJECT_NAME,
    suffix: PROJECT_VERSION,
    precache: 'precache',
    runtime: 'runtime',
    googleAnalytics: 'ga'
  });

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // Cache Google Fonts
  workbox.routing.registerRoute(
    function (context) {
      return (
        context.url.origin === 'https://fonts.googleapis.com' ||
        context.url.origin === 'https://fonts.gstatic.com'
      );
    },
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 20 })]
    })
  );

  // Cache JavaScript and CSS
  workbox.routing.registerRoute(function (context) {
    return (
      context.request.destination === 'script' ||
      context.request.destination === 'style'
    );
  }, new workbox.strategies.StaleWhileRevalidate());

  // Cache Images
  workbox.routing.registerRoute(
    function (context) {
      return context.request.destination === 'image';
    },
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  // Offline Google Analytics
  // workbox.googleAnalytics.initialize();

  // Cleanup Outdated Caches
  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches
        .keys()
        .then(function (cacheList) {
          return Promise.all(
            cacheList.map(function (cacheName) {
              if (CACHE_NAMES.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
        .then(function () {
          self.clients.claim();
        })
    );
  });

  // NOTE: Send message test
  self.addEventListener('message', function (event) {
    console.log(event.data);
  });
}
