const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
 entry: './src/client/index.js',
 mode: 'production',
 devtool: 'source-map',
 module: {
    rules: [
            {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
    ]
},
output: {
    libraryTarget: 'var',
    library: 'Client', 
},
plugins: [
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new Dotenv({
        path: './.env', // Path to your .env file (default is './.env')
    }),
    new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // Ensure the generated precache manifest has valid paths
        modifyURLPrefix: {
            auto: '', // Fix the incorrect 'auto' prefix
        },
    })
]
}