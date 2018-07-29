const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');
const { styleLoaders } = require('./config/style.loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin');
const config = require('./config');
const publicjs = require('./config/public');
const baseConfig = require('./webpack.base.config');

const prodConfig = merge(baseConfig, {
    output: {
        path: config.prod.path,
        filename: config.prod.filename,
        publicPath: config.prod.publicPath,
        chunkFilename: config.prod.chunkFilename
    },
    devtool: config.prod.productionSourceMap ? config.prod.devtool : false,
    module: {
        rules: styleLoaders()
    },
    plugins: [
        // 清空输出目录utils.resolve(outputPath)
        // new CleanPlugin(['../dist/*'],{
        //     verbose: true,//Write logs to console.
        //     dry: false,//Use boolean "true" to test/emulate delete. (will not remove files).
        // }),
        new CleanPlugin(
            ['dist/*'],
            {
                root: path.join(__dirname, '..'),
                verbose: true,
                dry: false
            }
        ),
        // 生产环境，放在最前面
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // 会导致z-index优化，到手机版样式发生变化
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.prod.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // 生产环境
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: config.prod.productionSourceMap, // 生产环境
            output: {
                comments: false// 注释相关的配置
            },
            mangle: {
                // 跳过这些
                except: ['$super', '$', 'exports', 'require']
            },
            warnings: false// warnings作用是当插件在压缩过程中移除的无效代码或定义是显示警告信息,一旦配置了 compress 其它选项，那就需同时配置warnings: false
        }), // 压缩你的JavaScript代码
        // css单独打包,自动添加css前缀，生产环境
        new ExtractTextPlugin({
            filename: 'css/' + publicjs.cssName,
            allChunks: true// 把所有的css打包成一个文件
        })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks (module) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //           module.resource &&
        //           /\.js$/.test(module.resource) &&
        //           module.resource.indexOf(
        //             path.join(__dirname, '../node_modules')
        //           ) === 0
        //         )
        //       }
        // }),
    ]
});

if (config.prod.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    prodConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
            config.prod.productionGzipExtensions.join('|') +
            ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}
/**
 * 这里我们使用webpack-bundle-analyzer来分析 Webpack 生成的包体组成并且以可视化的方式反馈给开发者
 */
if (config.prod.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = prodConfig;