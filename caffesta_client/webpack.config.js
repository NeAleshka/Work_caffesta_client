const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extension: ['.tsx', '.ts', '.module.css', '.js', '.svg', '.png', '.eot', '.woff', '.ttf']
    },
    module: {
        rules: [
            {
                test: /\.(js|svg|png|eot|woff|ttf)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                exclude: "/node_modules/",
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: "/node_modules/",
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                options:{
                    modules:true
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: "/node_modules/",
                use: 'ts-loader'
            }
        ],
        plugins:[
            new HtmlWebpackPlugin({
                template:'./public/index.html',
                filename:'index.html'
            }),
            new MiniCssExtractPlugin({
                filename:'assets/[name].css'
            })
        ]
    }
}*/
module.exports={
    entry:'./src/index.tsx',
    output:{
        path:path.resolve(__dirname+'dist'),
        filename:'bundle.js',
    },
    resolve:{
        extensions:['.js','.jsx','.tsx']
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader'
                }
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].css'
        }),
    ],
    /*devServer:{
        static:path.join(__dirname,'dist'),
        compress:true,
        port:3005,
        historyApiFallback:true,
        open:true
    }*/
}