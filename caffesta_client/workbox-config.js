import workboxBuild from 'workbox-build';

workboxBuild.generateSW({
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{css,woff2,png,svg,jpg,js}',
		'*.html'
	],
	swDest: 'build/sw.js',
	runtimeCaching:[
		{
			urlPattern:new RegExp('http://\\S+'),
			handler:'NetworkFirst'
		}
	],
	skipWaiting:true,
	clientsClaim:true,
});
