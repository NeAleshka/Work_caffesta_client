if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let d={};const n=e=>a(e,t),l={module:{uri:t},exports:d,require:n};i[t]=Promise.all(c.map((e=>l[e]||n(e)))).then((e=>(s(...e),d)))}}define(["./workbox-0f1a0519"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/bundles/appclient/static/css/main.css",revision:"6ec01d63d78c8b4fd273e078fcb1ce57"},{url:"/bundles/appclient/static/js/main.js",revision:"8e1120e6c3ee34c8eaad8017ecc6360c"},{url:"/bundles/appclient/static/js/main.js.LICENSE.txt",revision:"dc75fe6088b0871bbc71dd0dd4d7d343"},{url:"/bundles/appclient/static/media/Calendar.svg",revision:"ce7cbd85595066e1908c6bae8b353179"},{url:"/bundles/appclient/static/media/Geometria-Bold.woff",revision:"fdd15f825a6db43442a758e2db168314"},{url:"/bundles/appclient/static/media/Geometria-Medium.woff",revision:"45656b73e1a07f979bfb56559b359b07"},{url:"/bundles/appclient/static/media/Geometria.woff",revision:"3c6a7d3ae76a5aec78aac69db1af15cf"},{url:"/bundles/appclient/static/media/Phone.svg",revision:"945e5fe40f18ea537b9edb74a234aa3a"},{url:"/bundles/appclient/static/media/back.svg",revision:"0d1e47531b2b73e70e96abcba8408482"},{url:"/bundles/appclient/static/media/email.svg",revision:"7054a015bffd2ab7e7bb24246305e4e9"},{url:"/bundles/appclient/static/media/favicon.ico",revision:"99dbb1ac10f49b8b1fcc4879f60b7313"},{url:"/bundles/appclient/static/media/home.svg",revision:"b76a57350d7411c0b33691650c41b686"},{url:"/bundles/appclient/static/media/home_white.svg",revision:"3cf502742ad86b25bda3aad5be532c44"},{url:"/bundles/appclient/static/media/notification.svg",revision:"fb0a826830df0d4153b80a79f02fc9b6"},{url:"/bundles/appclient/static/media/profile.svg",revision:"3c4693e3fd4e436324413be997e25d7f"},{url:"/bundles/appclient/static/media/user.svg",revision:"c185a9ec69565c2ff847b6c5281fabdf"},{url:"/bundles/appclient/static/media/wallet.svg",revision:"6c820dfea64d9f943698acdcbfcbcd96"},{url:"/index.html",revision:"1a2c155a6aab63adfbc2d37f5416a6df"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("./index.html"))),e.registerRoute(/http(s)?:\/\/\S+/,new e.NetworkFirst,"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
//# sourceMappingURL=sw.js.map
