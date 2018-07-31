const webpack = require('webpack');
const merge = require('webpack-merge');
const { styleLoaders } = require('./config/style.loader');
const RefreshBrowserPlugin = require('refresh-browser-webpack-plugin'); // 监听html-webpack-plugin的hook，模板文件改变时使浏览器自动刷新
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');// 一般在开发环境下使用,更友好显示 webpack 错误信息的插件
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const { getPath } = require('./config/utils');
const config = require('./config');

// webpack-dev-server在用node.js的api启动时需要使用，具体解释看笔记
// Object.keys(baseWebpackConfig.entry).forEach(name => {
//     baseWebpackConfig.entry[name] = [
//         `webpack-dev-server/client?http://localhost:${config.dev.port}/`,
//         'webpack/hot/dev-server'
//     ].concat(baseWebpackConfig.entry[name])
// });

module.exports = merge(baseConfig, {
    output: {
        path: config.dev.path,
        filename: config.dev.filename,
        publicPath: config.dev.publicPath,
        chunkFilename: config.dev.chunkFilename
        // sourceMapFilename: '[name].map',
    },
    // source-map生成.map文件。用于定位vue里js的错误
    // eval-source-map打包进vendor.js和test.js里
    devtool: config.prod.devtool, // 开发使用，给源文件生成映射。
    module: {
        rules: styleLoaders()
    },
    plugins: [
        // 清空输出目录
        // new CleanPlugin([utils.resolve(public.outputPath.dev)],{
        //     verbose: true,//Write logs to console.
        //     dry: false,//Use boolean "true" to test/emulate delete. (will not remove files).
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // 不懂？ 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
        new RefreshBrowserPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new OpenBrowserPlugin({
            url: `http://${config.dev.host}:${config.dev.port}${config.dev.publicPath}login.html`
        })
    ],
    // 配置webpack-dev-server,node启动时不需要
    devServer: {
        contentBase: getPath('dist'),
        historyApiFallback: true, // 任意的跳转或者404响应可以指向index.html
        inline: true, // 用来支持dev-server自动刷新的配置
        hot: true, // webpack热模块替换特性
        compress: true,
        host: config.dev.host,
        port: config.dev.port,
        proxy: config.dev.proxyTable,
        // open: config.dev.autoOpenBrowser,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        }
    }
})