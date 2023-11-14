self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          // Cachear la respuesta dinámicamente solo para solicitudes de tipo 'GET'
          return caches.open('my-cache').then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  } else {
    // Para solicitudes de tipo 'POST' y otros métodos, simplemente envía la solicitud sin almacenarla en caché.
    event.respondWith(fetch(event.request));
  }
});
