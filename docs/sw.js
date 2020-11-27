contentToCache = ['index.html', 'style.css', 'sw.js'];
contentToCache.push(...(['bat', 'bowl', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6',
    'r1', 'r2', 'r3', 'r4', 'r5', 'r6',
    'message_small', 'toss_head', 'toss_tail', 'whatsapp'].map((e, i) => 'res/' + e + '.png')));

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    console.log(contentToCache);
    e.waitUntil(
        caches.open("gameCache-v1").then((cache) => {
            console.log('[Service Worker] Caching all');
            return cache.addAll(contentToCache);
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return response;
            });
        })
    );
});