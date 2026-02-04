const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const webpackBaseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rescriptsrc = require('../config/rescriptsrc');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devConfig = {
    mode: 'development',
    // devtool: 'eval-source-map',
    devtool: false,
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static'), to: path.resolve(__dirname, '../dist/static') },
            ],
        }),
        new HtmlWebpackPlugin({ 
            title: "用户工作台",
            template: 'index.ejs',
            filename: 'index.html',
            loadingGifUrl: `//localhost:${rescriptsrc.devServer().port}/static/loading.gif`,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = merge(webpackBaseConfig, devConfig);