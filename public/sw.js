self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    if (event.request.url.startsWith('http')) { // Verificar el esquema de la solicitud
      event.respondWith(
        caches.open('my-cache').then(cache => {
          return cache.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
      );
    } else {
      event.respondWith(fetch(event.request));
    }
  } else {
    event.respondWith(fetch(event.request));
  }
});
