importScripts('workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({
  prefix: 'balm',
  suffix: 'v1',
  precache: 'app-cache',
  runtime: 'app-runtime'
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  new workbox.strategies.CacheFirst({
    cacheName: 'my-image-cache'
  })
);

self.addEventListener('message', function (event) {
  console.log(event.data);
});
