
const config = require('./index');
const publicjs = require('./public');
// const postcssConfig = require('./postcss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = publicjs.isProd;
const sourceMapEnabled = isProd ? config.prod.productionSourceMap : config.dev.cssSourceMap;

let cssLang = [{
    name: 'css',
    reg: /\.css$/,
    loader: 'css-loader'
},
{
    name: 'sass',
    reg: /\.scss$/,
    loader: 'sass-loader'
}
];
function genloader(name) {
    let loader = {
        loader: name + '-loader',
        options: {
            sourceMap: sourceMapEnabled,
            modules: false
        }
    }
    if (name === 'scss') {
        loader.options.indentedSyntax = true;
    }
    return loader;
}
function genCssLoader(lang) {
    let cssLoader = genloader('css');
    let postcssLoader = genloader('postcss');
    // let postcssLoader = {
    //     loader: 'postcss-loader',
    //     options: postcssConfig(),
    // }
    let loaders = [cssLoader, postcssLoader];
    if (lang.name !== 'css') {
        loaders.push(genloader(lang.name));
    }
    if (isProd) {
        // 生产环境需要提取css
        loaders = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: loaders
        });
    } else {
        // 开发环境需要vue-style-loader将css提取到页面头部
        // 实现开发环境热加载
        loaders.unshift('vue-style-loader');
    }
    return loaders;
}

function styleLoaders() {
    const output = [];
    cssLang.forEach(lang => {
        output.push({
            test: lang.reg,
            use: genCssLoader(lang)
        })
    });
    return output;
}

module.exports = {
    cssLang,
    genCssLoader,
    styleLoaders
}