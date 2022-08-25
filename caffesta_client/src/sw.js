importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')
// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
    debug: true,
})


const cacheName = workbox.core.cacheNames.precache
const setCacheName = workbox.core.setCacheNameDetails




setCacheName({
    prefix: 'guest',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'run-time',
    googleAnalytics: 'ga',
});
workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
