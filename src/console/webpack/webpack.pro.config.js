const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const os = require('os');

const proConfig = {
    mode: 'production',
    devtool: false, // source-map
    optimization: {
        providedExports: true,
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']
                    }
                },
                parallel: os.cpus().length // 开启多线程压缩
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJsPlugin(),
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            title: "用户工作台",
            filename: 'index.html',
            inject: true,
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true,// 压缩内联css
                removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            loadingGifUrl: `/child/idpStudio-console/static/loading.gif`,
            chunks: ['index']
        }),
        // new AntdDayjsWebpackPlugin(),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: path.join(__dirname, `../dll/vendor.manifest.json`)
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static'), to: path.resolve(__dirname, '../dist/static') },
            ],
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/vendor.dll.js'),
            outputPath: '../dist/js',
            publicPath: '/child/idpStudio-console/js'
        })
    ]
};

module.exports = merge(webpackBaseConfig, proConfig);