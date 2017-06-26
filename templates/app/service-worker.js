importScripts('workbox-sw.prod.js');

// Create Workbox service worker instance
const workboxSW = new self.WorkboxSW();

// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([]);

// Receive message
self.addEventListener('message', function(event) {
  console.log(event.data);
});

// Send message
self.clients.matchAll().then(function(clients) {
  clients.forEach(function(client) {
    client.postMessage('Service worker attached.');
  })
});
