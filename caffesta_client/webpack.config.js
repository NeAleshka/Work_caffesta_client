import path from 'path';
import {fileURLToPath} from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

const config = {
    mode: 'production',
    entry: dirname+'/src' + '/app.tsx',
    output: {
        path: dirname + '/dist',
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.css$/i,
            /* use: [
                 MiniCssExtractPlugin.loader,
                 {
                     loader: "css-loader",
                     options: {
                         importLoaders: 1,
                         modules: true,
                     },
                     },
             ],*/
            use:[MiniCssExtractPlugin.loader,"css-loader"],
        }, {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /(node_modules|bower_components)/
        },
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [/node_modules/],
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                exclude: [/node_modules/],
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(pdf|json)$/i,
                exclude: [/node_modules/],
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.json$/i,
                loader: 'json-loader',
                include:[/public/]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: dirname + '/public/index.html',
        filename: 'index.html',
    }), new MiniCssExtractPlugin({
        filename:'main.css'
    })],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
};

export default config