const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
 entry: './src/client/index.js',
 mode: 'development',
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
    new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
    }),
    new Dotenv({
        path: './.env', // Path to your .env file (default is './.env')
    })
]
}