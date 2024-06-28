var cacheName = 'afterschoolclasses-v1';
var cacheFiles = [
    './index.html',
    './favicon.ico',
    './products.json',
    './styles.css',
    './manifest.webmanifest',
    './images/basketball.png',
    './images/football.png',
    './images/golf.png',
    './images/hockey.png',
    './images/piano.png',
    './images/squash.png',
    './images/tennis.png',
    './images/swimming.png',
    './images/volleyball.png',
    './images/tabletennis.png',
];

self.addEventListener('install', (e) => {
    console.log('service-worker')
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles)
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            // Download the file if it is not in the cache
            return r || fetch(e.request).then(function(response) {
                // Add the new file to cache
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
