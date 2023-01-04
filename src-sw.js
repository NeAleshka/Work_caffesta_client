const precacheAndRoute=require('workbox-precaching')
const routing=require('workbox-routing')
const strategist=require('workbox-strategies')


precacheAndRoute.precacheAndRoute(self.__WB_MANIFEST);

