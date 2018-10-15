const cacheName = "opks-v1";

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/about/',
        '/education/',
        '/auditions/',
        '/donations/',
        '/css/design.css',
        '/js/site.js',
        '/js/analytics.js'
      ]);
    })
  );
});

// RETURN CACHE AND STORE NEW VERSION
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(e.request).then(response => {
        let fresh = fetch(e.request).then(response => {
          cache.put(e.request, response.clone());
          return response;
        });

        return response || fresh;
      });
    })
  );
});
