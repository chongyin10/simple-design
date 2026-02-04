const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');
const { name } = require('../package.json');
const rescriptsrc = require('../config/rescriptsrc');
const { REACT_APP_VERSION, theme } = require('../../config/global');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('@正在启动的环境是Console:', process.env.NODE_ENV, '版本：', REACT_APP_VERSION);

const baseConfig = {
    entry: {
        index: './src/index.js'
    },
    output: {
        publicPath: process.env.NODE_ENV === 'dev' ? '/' : '/child/idpStudio-console/',
        path: path.join(__dirname, "../dist"),
        filename: `js/[name].[hash].js`,
        ...rescriptsrc.webpack()
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, '../src'),
            "react": path.resolve(__dirname, '../node_modules/react'),
            "react-dom": path.resolve(__dirname, '../node_modules/react-dom')
        },
        extensions: [".ts", ".js", ".tsx", ".jsx", ".json", '.css', '.less']
    },
    module: {
        rules: [
            { test: /\.(j|t)sx?$/, use: ['cache-loader', 'thread-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: process.env.NODE_ENV === 'dev' ? `//localhost:${rescriptsrc.devServer().port}` : '/child/idpStudio-console/',
                        }
                    }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: path.join('../dist/font/[name].[hash:7].[ext]')
                    }
                }]
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    }
                ]
            },
            {
                test: /\.module\.(less)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]-[hash:6]'
                            }
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE': JSON.stringify(process.env.NODE_ENV),
                'REACT_APP_VERSION': JSON.stringify(REACT_APP_VERSION),
                // 'THEME': JSON.stringify(theme),
            }
        }),
    ]
};

module.exports = baseConfig;
