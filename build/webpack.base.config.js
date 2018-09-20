/**
 * 基础配置
 */
const webpack = require('webpack');
const { getLatestDllFile, getPath, createLintingRule, createEntry } = require('./config/utils');
const vueLoader = require('./config/vue.loader');
const jsLoader = require('./config/js.loader');
const publicjs = require('./config/public');
const config = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const HappyPack = require('happypack');

const filePath = config.build.filePath;

function createHtmlWebpackPlugins(filePath) {
    let htmlWebpackPlugins = [];
    Object.keys(filePath).forEach(key => {
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            title: 'Pretty',
            template: filePath[key].html,
            filename: key + '.html',
            chunks: ['runtime', 'common', key],
            favicon: getPath('favicon.ico'),
            inject: true
        }))
    });
    return htmlWebpackPlugins;
}
// const outputPath = public.isProd ? public.outputPath.prod : public.outputPath.dev;
const baseConfig = {
    // entry: {
    //     test: getPath('./src/pages/test.js')
    //     // vendor: [ 'vue', 'vue-router', 'axios', 'babel-polyfill' ]//使用dll
    // },
    entry: createEntry(filePath),
    output: {
        /**
         * chunkhash变化的因素
         * 包含模块的源代码
         * webpack 用于启动运行的 runtime 代码
         * webpack 生成的模块 moduleid(包括包含模块 id 和被引用的依赖模块 id)
         * chunkID
         */
        // filename: 'js/[name][chunkhash:8].js',
        // publicPath: '/learning-spa/',
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            ...(config.build.useEslint ? [createLintingRule()] : []),
            {
                test: /\.(js|jsx)$/,
                // , utils.resolve('node_modules/webpack-dev-server/client')使用node启动
                exclude: [getPath('./src/static')],
                include: [getPath('./src'), getPath('./node_modules/vux/src')],
                use: ['happypack/loader?id=babel']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'img/' + publicjs.mediaName
                }
            },
            {
                test: /\.vue$/,
                use: ['happypack/loader?id=vue']
                // loader: vueLoader(),
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.json5$/,
                loader: 'json5-loader'
            }
            // 无需手动添加
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // }
        ]
    },
    // 其他解决方案
    resolve: {
        // require 文件时可省略的后缀
        extensions: [ '.js', '.vue', '.scss', '.css', '.json', '.json5' ],
        // 模块别名定义
        alias: {
            '~comp': getPath('./src/components'),
            '~compCss': getPath('./src/assets/css'),
            '~compJs': getPath('./src/assets/js'),
            '~compImg': getPath('./src/assets/img'),
            '~vuex': getPath('./src/store'),
            'vue$': 'vue/dist/vue.common.js'// vue2在npm安装时的规定
        }
    },
    plugins: [
        // 让无牵无挂的模块在对应的入口文件提升作用域
        new webpack.optimize.ModuleConcatenationPlugin(),
        /**
         * 1、分离业务代码和第三方的代码：之所以将业务代码和第三方代码分离出来，是因为业务代码更新频率高，而第三方代码更新迭代速度慢，所以我们将第三方代码(库，框架)进行抽离，这样可以充分利用浏览器的缓存来加载第三方库。
         * 2、按需加载：比如在使用 React-Router 的时候，当用户需要访问到某个路由的时候再去加载对应的组件，那么用户没有必要在一开始的时候就将所有的路由组件下载到本地。
         * 3、在多页面应用中，我们往往可以将公共模块进行抽离，比如 header, footer 等等，这样页面在进行跳转的时候这些公共模块因为存在于缓存里，就可以直接进行加载了，而不是再进行网络请求了。
         */
        /**
         * 首先 webpack 执行存在一部分运行时代码，即一部分初始化的工作，
         * 就像之前单文件中的__webpack_require__（The require function模块加载函数），这部分代码需要加载于
         * 所有文件之前，相当于初始化工作，少了这部分代码，后面加载过来的代码就
         * 无法识别并工作了
         */
        /**
         * 在这些入口文件中，找到那些引用两次的模块（如：utilB），帮我抽离成一个叫
         * vendor文件，此时那部分初始化工作的代码会被抽离到vendor文件中
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        // 提取每个页面的axios
        new webpack.optimize.CommonsChunkPlugin({
            async: 'common-in-lazy',
            minChunks: ({ resource } = {}) => (
                resource &&
                resource.includes('node_modules') &&
                /axios/.test(resource)
            )
        }),
        /**
         * 在所有的 async chunk ( Emoji.chunk.js 和 Photos.chunk.js ) 中找到引用 2 次以上的模块，
         * 也就是 MagicBtn 咯，那把他挪到 used-twice chunk 中
         */
        new webpack.optimize.CommonsChunkPlugin({
            async: 'used-twice',
            minChunks: (module, count) => (
                count >= 2
            )
        }),
        // 提取第三方代码、使用了dll
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     // minChunks: Infinity,
        // }),
        /**
         * 意思是在vendor文件中帮我把初始化代码抽离到mainifest文件中，
         * 此时vendor文件中就剩下utilB这个模块了，为什么这么做？
         */
        /**
         * 因为这样可以给 vendor 生成稳定的 hash 值，每次修改业务代码(pageA)，
         * 这段初始化时代码就会发生变化，那么如果将这段初始化代码放在 vendor 文件中的话，
         * 每次都会生成新的 vendor.xxxx.js，这样不利于持久化缓存
         * 另外 webpack 默认会抽离异步加载的代码，这个不需要你做额外的配置，
         * pageB 中异步加载的 utilC 文件会直接抽离为 chunk.xxxx.js 文件。
         */
        /**
         * 页面加载文件的顺序是
         * mainifest.xxx.js//初始化代码
         * vendor.xxx.js//pageA和pageB共同用到的模块
         * pageX.xxx.js//业务代码
         * 当pageB需要utilC的时候异步加载utilC
         */
        // 放在其他CommonsChunkPlugin之后
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            // name: 'minfest',
            // chunks: ['vendor'],
            minChunks: Infinity// 可写可不写
        }),
        // 暂不使用jquery
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        // 复制文件
        // new CopyWebpackPlugin([
        //     {
        //         from: 'src/lib',
        //         to: 'lib'
        //     }
        // ]),
        // 复制文件
        new CopyWebpackPlugin([
            {
                from: 'src/static',
                to: 'static'
            }
        ]),
        ...createHtmlWebpackPlugins(filePath),
        // new HtmlWebpackPlugin({
        //     template: './src/app/test.html',
        //     /**
        //      * true || 'head' || 'body' || false
        //      * Inject all assets into the given
        //      * template or templateContent. When
        //      * passing true or 'body' all javascript
        //      * resources will be placed at the bottom
        //      *  of the body element. 'head' will
        //      * place the scripts in the head element
        //      */
        //     inject: true,
        //     filename: 'index.html'
        //     // vendorJsName: '/static/dll.js',//???
        // }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: getLatestDllFile('static/dll.js'),
            append: false// 指定资产是否应在任何现有资产之前添加（false），或在其之后追加（true）。
        }),
        /**
         * 第三点就是使用 happypack 开启多核构建，webpack 之所以慢，
         * 是因为由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，
         * 特别是当文件数量变多后，webpack 构建慢的问题会显得严重。
         * 也就是说 Webpack 需要处理的任务需要一件件挨着做，不能多个事情一起做。
         * 在整个 webpack 构建流程中，最耗时的流程可能就是 loader 对文件的转换操作了，
         * 因为要转换的文件数据巨多，而且这些转换操作都只能一个个挨着处理。 Happypack
         * 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少了总的构建时间。
         * 需要配置哪些 loader 使用 Happypack 就要改写那些配置，比如你想要修改 babel 为多核编译:
         */
        new HappyPack({
            id: 'babel',
            // threads: 4,
            loaders: [jsLoader()]
        }),
        // vux不支持HappyPack所以没有配置vux,不支持不使用postcss配置文件
        new HappyPack({
            id: 'vue',
            // threads: 4,
            loaders: [vueLoader()]
        }),
        /**
         * DllPlugin 本身有几个缺点：
         * 首先你需要额外多配置一份 webpack 配置，增加工作量。
         * 其中一个页面用到了一个体积很大的第三方依赖库而其它页面根本不需要用到，但若直接将它打包在 dll.js 里很不值得，每次页面打开都要去加载这段无用的代码，无法使用到 webpack2 的 Code Splitting 功能。
         * 第一次打开的时候需要下载 dll 文件，因为你把很多库全部打在一起了，导致 dll 文件很大，首次进入页面加载速度很慢。
         * 虽然你可以打包成 dll 文件，然后让浏览器去读取缓存，这样下次就不用再去请求，比如你用 lodash 其中一个函数，而你用dll会将整个 lodash 文件打进去，这就会导致你加载无用代码过多，不利于首屏渲染时间。
         * 我认为的正确的姿势是：
         * 像 React、Vue 这样整体性偏强的库，可以生成 vendor 第三方库来去做缓存，因为你一般技术体系是固定的，一个站点里面基本上都会用到统一技术体系，所以生成 vendor 库用于缓存。
         * 像 antd、lodash 这种功能性组件库，可以通过 tree shaking 来进行消除，只保留有用的代码，千万不要直接打到 vendor 第三方库里，不然你将大量执行无用的代码。
         */
        new webpack.DllReferencePlugin({
            manifest: require('./../src/static/dll.mainfest.json')
            // name: require('./../static/dll.mainfest.json').name,
            // content: require('./../static/dll.mainfest.json').content,
        })
    ]
}

// baseConfig.module.rules.concat(styleLoaders());
module.exports = baseConfig;
