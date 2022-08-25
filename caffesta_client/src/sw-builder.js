const {injectManifest} =require ('workbox-build')

let workboxConfig={
    globDirectory:'../build',
    globPatterns:[
        'favicon.ico',
        'index.html',
        'static/css/*.*.css',
        'static/js/*.*.js',
        'manifest.json',
        'static/media/*.*.svg',
        'static/media/*.*.woff',
    ],
    swSrc:'sw.js',
    swDest:'../public/sw.js',
}

injectManifest(workboxConfig).then(({count,size})=>{
    console.log(`Generate ${workboxConfig.swDest}, which will precache ${count} files, total ${size} bytes`)
})
