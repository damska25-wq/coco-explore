// Coco Explore — mise en cache légère des pages déjà consultées, pour
// pouvoir les relire même sans réseau (utile sur les sentiers ou plages
// avec peu de couverture). Réseau d'abord (toujours la version la plus
// à jour quand elle est disponible), secours par le cache sinon.
var CACHE_NAME = "coco-explore-v1";

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names
          .filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      })
      .catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || Promise.reject("offline-and-not-cached");
        });
      })
  );
});
