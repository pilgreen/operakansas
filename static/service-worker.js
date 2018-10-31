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
        '/js/analytics.js',
        '/img/opera_logo.png'
      ]);
    })
  );
});

/**
 * Hit the network but if it takes too long serve the cached backup
 */

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return timeout(2000, fetch(e.request)).then(response => {
        cache.put(e.request, response.clone());
        return response;
      }).catch(() => {
        return caches.match(e.request)
      })
    })
  )
});

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}
