const WebpackPlugin=require('workbox-webpack-plugin')

module.exports = {
    webpack: {
        plugins:{
            add:[
                new WebpackPlugin.GenerateSW({
                    swDest:'sw.js',
                    skipWaiting:true,
                    clientsClaim:true,
                    navigateFallback:'./index.html',
                    runtimeCaching:[
                        {
                            urlPattern:new RegExp('http(s)?://\\S+'),
                            handler:'NetworkFirst'
                        }
                    ]
                })
            ]
        },
        configure: (webpackConfig) => {
            const miniCssExtractPlugin=webpackConfig.plugins.find(
                plugin=>plugin.constructor.name==='MiniCssExtractPlugin'
            )
            if(miniCssExtractPlugin){
                miniCssExtractPlugin.options.filename='bundles/appclient/static/css/[name].css'
            }

            webpackConfig.module.rules[1].oneOf[2].use[1].options.name = 'bundles/appclient/static/media/[name].[ext]'

            return {
                ...webpackConfig,
                output: {
                    ...webpackConfig.output,
                    filename: 'bundles/appclient/static/js/[name].js',
                    assetModuleFilename: 'bundles/appclient/static/media/[name][ext]',
                },
            };
        },
    },
}