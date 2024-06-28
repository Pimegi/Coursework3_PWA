var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'favicon.ico',
    'products.json',
    'styles.css',
    'manifest.webmanifest',
    'images/basketball.png',
    'images/football.png',
    'images/golf.png',
    'images/hockey.png',
    'images/piano.png',
    'images/squash.png',
    'images/tennis.png',
    'images/swimming.png',
    'images/volleyball.png',
    'images/tabletennis.png',
];

self.addEventListener('install', (e) => {
    console.log('Service Worker: Installing...');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).then((fetchResponse) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(e.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});