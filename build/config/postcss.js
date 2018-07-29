// /**
//  * 没整明白
//  */
// const path = require('path');
// const createResolver = require('postcss-import-resolver');
// const config = require('./index');
// const publicjs = require('./public');
// const isProd = publicjs.isProd;
// const sourceMapEnabled = isProd ? config.prod.productionSourceMap : config.dev.cssSourceMap;
// module.exports = function postcssConfig(isArr) {
//     const pluginsArr = [
//         require('postcss-import')({
//             resolve: createResolver({
//                 alias: {
//                     '@': path.join(__dirname, '../..', 'src'),
//                     '~': path.join(__dirname, '../..', 'src')
//                 }
//             })
//         }),
//         require('autoprefixer')({browsers: 'last 5 versions'}),
//         require('cssnano')()
//     ]
//     return {
//         sourceMap: sourceMapEnabled,
//         plugins: isArr ? pluginsArr : (loader) => pluginsArr,
//         useConfigFile: false
//     }
// }
