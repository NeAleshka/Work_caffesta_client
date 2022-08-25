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
workbox.precaching.precacheAndRoute([{"revision":"99dbb1ac10f49b8b1fcc4879f60b7313","url":"favicon.ico"},{"revision":"14bd8309cbdff92e1977a7e7c3a1a6c0","url":"index.html"},{"revision":"6fd885036a48c65dc1c9476777ddfc83","url":"static/css/main.accd9ff3.css"},{"revision":"1733a4fea52cd44a2880c2d0c50dcf27","url":"static/js/main.0be60f32.js"},{"revision":"f537418407238315d85cd43eae6af400","url":"manifest.json"},{"revision":"b578821088f639079d5dd8764b0ca38e","url":"static/media/Calendar.10a98c21b62903a00d416f25939ddeae.svg"},{"revision":"f8fe944931626bc821b23085075f0cc9","url":"static/media/email.cfd7fc9e9b6a564041920dd6a8418ed8.svg"},{"revision":"fb91e587caa3bd4206dbce278d766110","url":"static/media/gift.6524bbfefbfc6ecc77b94cf52dd23d7d.svg"},{"revision":"9d895d740e1ca4000cb70b3d657752e5","url":"static/media/logo.80e3b7f2aa8f0e234e644ab3f5e86b66.svg"},{"revision":"65f28d384b705542ed8d0179b9fc40b7","url":"static/media/Phone.7f57311fdf0e51e1c3a76d81166f79c4.svg"},{"revision":"dc62ffcc81ee5c0cea710c09027204fd","url":"static/media/profile.d8beab90a1c3af72e650dfbb71a80de6.svg"},{"revision":"6d33824ebe9a9b702096ff730f0cbd6f","url":"static/media/qr.d90ce238c55f0df5833d9ed78d541502.svg"},{"revision":"cf2ff7c1a111bf12ea0e0565bc450c5f","url":"static/media/user.6056b4037e72f4521dc8e1fefa10472d.svg"},{"revision":"fdd15f825a6db43442a758e2db168314","url":"static/media/Geometria-Bold.3a9ed34be5c5b3d8fc3c.woff"},{"revision":"45656b73e1a07f979bfb56559b359b07","url":"static/media/Geometria-Medium.ce81051a1ed94e89b4e1.woff"},{"revision":"3c6a7d3ae76a5aec78aac69db1af15cf","url":"static/media/Geometria.b7f74b260291c82461d1.woff"}])
