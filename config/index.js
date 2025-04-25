const path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        // index: path.resolve(__dirname, '../dist/index.html'),
        index: path.resolve(__dirname, '../poi/index.html'),
        // assetsRoot: path.resolve(__dirname, '../dist'),
        assetsRoot: path.resolve(__dirname, '../poi'),
        assetsSubDirectory: 'static',

        // assetsPublicPath: '/dist/',
        assetsPublicPath: '/poi/',
        productionSourceMap: false,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: true
    },
    dev: {
        env: require('./dev.env'),
        port: 3000,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: require('./dev.proxy'),
        // proxyTable: false,
        cssSourceMap: false
    }
};
