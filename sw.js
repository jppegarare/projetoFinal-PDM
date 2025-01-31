import {warmStrategyCache, offlineFallback} from 'workbox-recipes';
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies'
import {registerRoute, Route} from 'workbox-routing'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import {ExpirationPlugin} from 'workbox-expiration'

//cache
const pageCache = new CacheFirst({
  cacheName : "pwa-final",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds : 30 * 24 * 60 * 60,
    }),
  ],
})

//indica cache
warmStrategyCache({
  urls: ["/", "/index", "/css/style.css", "/js/main.js"],
  strategy: pageCache
})

//registro rota
registerRoute(
  ({request}) => ['style', 'script', 'worker']
    .includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

offlineFallback({
  pageFallback: '/offline',
})

const imageRoute = new Route(({request}) => {
  return request.destination === 'image';
}, new CacheFirst({
  cacheName: 'images',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 30, 
    })
  ]
}))
registerRoute(imageRoute)

let cacheName = "pwa_final";
let filesToCache = ["/", "/index", 
                "/css/style.css", "/js/main.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

