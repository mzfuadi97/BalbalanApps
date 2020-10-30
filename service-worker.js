const CACHE_NAME = "football-apps-v4";

const urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/api.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/standing.html",
    "/pages/home.html",
    "/pages/match.html",
    "/profile-img.jpg",
    "/manifest.json",
    "/js/sw-register.js",
    "/icon/logo.png",
    "/icon/logo-48x48.png",
    "/icon/logo-96x96.png",
    "/icon/logo-192x192.png",
    "/js/db-controller.js",
    "/pages/fav.html",
    "/js/push.js",
    "/js/show.js",
    "/pages/team.html",
    "/js/route.js",
    "/js/jquery.min.js",
    "/js/notifikasi.js",
    "/js/idb.js"
];

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'icon/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
	[
		{ url: '/index.html', revision: '2' },
		{ url: '/nav.html', revision: '2' },
        { url: '/pages/standing.html', revision: '2' },
        { url: '/pages/home.html', revision: '2' },
        { url: '/pages/match.html', revision: '2' },
        { url: '/pages/fav.html', revision: '2' },
        { url: '/js/jquery.min.js', revision: '2' },
        { url: '/js/materialize.min.js', revision: '2' },
        { url: '/js/nav.js', revision: '2' },
        { url: '/js/api.js', revision: '2' },
        { url: '/js/route.js', revision: '2' },
        { url: '/js/notifikasi.js', revision: '2' },
        { url: '/js/db-controller.js', revision: '2' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/sw-register.js', revision: '2' },
        { url: '/css/materialize.min.css', revision: '2' },
        { url: '/css/style.css', revision: '2' },
        { url: '/icon/logo.png', revision: '2' },
        { url: '/icon/logo-48x48.png', revision: '2' },
        { url: '/icon/logo-96x96.png', revision: '2' },
        { url: '/icon/logo-192x192.png', revision: '2' },
        { url: '/manifest.json', revision: '2' },
        { url: '/profile-img.jpg', revision: '2' },
	],
	{
		ignoreUrlParametersMatching: [/.*/],
	}
);
workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2/'),
	workbox.strategies.networkFirst({
		cacheName: 'fetch',
	})
);