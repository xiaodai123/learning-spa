/**
 * 使用node启动express服务
 */
const webpack = require('webpack');
const webpackProdServer = require('./webpack.prod.config');
webpack(webpackProdServer, (err, stats) => {
    if (err) {
        console.log(err);
        return;
    }
    process.stdout.write(stats.toString());
})