/**
 * 使用node启动express服务
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev.config');
const config = require('./config');
const compiler = webpack(devConfig);

const server = new WebpackDevServer(compiler, {
    hot: true,
    // noInfo:true,
    publicPath: config.dev.publicPath,
    stats: { colors: true }
})

server.listen(config.dev.port, 'localhost');
const url = `http://localhost:${config.dev.port}/`;

const opn = require('opn');

// 打包完毕后启动浏览器
server.middleware.waitUntilValid(() => {
    console.log(`> Listening at ${url}`);
    opn(`${url}`, {app: ['google chrome', '--incognito']});
})
