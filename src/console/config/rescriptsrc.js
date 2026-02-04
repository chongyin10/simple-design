const { name } = require('../package.json');
const global = require('../../config/global.js')

module.exports = {
    originTargetUrl: global.originTargetUrl,
    webpack: (config = {}) => {
        config.library = `${name}-[name]`;
        config.libraryTarget = 'umd';
        config.globalObject = 'window';
        config.chunkLoadingGlobal = `webpackJsonp_${name}`;
        return config;
    },
    devServer: (_ = {}) => {
        const config = _;
        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        config.historyApiFallback = true;
        config.hot = true;
        config.liveReload = false;
        config.port = 8089;
        config.proxy = {  //进行代理转发
            '/**/api/**': {
                target: global.originTargetUrl ,
                changeOrigin: true,
                ws: true,
            }
        }
        return config;
    },
};
