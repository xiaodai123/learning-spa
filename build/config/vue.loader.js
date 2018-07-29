const config = require('./index');
const publicjs = require('./public');
// const postcssConfig = require('./postcss');
const { cssLang, genCssLoader } = require('./style.loader');
const jsLoaderOptions = require('./js.loader');
const isProd = publicjs.isProd;
const sourceMapEnabled = isProd ? config.prod.productionSourceMap : config.dev.cssSourceMap;
const cacheBusting = config.dev.cacheBusting
// vue-loader的options
module.exports = function vueLoader() {
    const vueLoaderOptions = {
        // vue配置postcss时的plugins返回数组。css返回函数
        /**
         * 看来你正在使用带有vue-loader的内联postcss选项的HappyPack。
         * 这不受支持，因为在不同线程中运行的加载器无法共享不可序列化的选项。
         * 建议使用postcss配置文件。
         */
        // postcss: postcssConfig(true),
        extractCSS: true,
        preserveWhitespace: false,
        loaders: {},
        cssSourceMap: sourceMapEnabled,
        cacheBusting
        // transformToRequire: {
        //     video: 'src',
        //     source: 'src',
        //     img: 'src',
        //     image: 'xlink:href'
        // }
    };
    cssLang.forEach(lang => {
        vueLoaderOptions.loaders[lang.name] = genCssLoader(lang);
    });
    vueLoaderOptions.loaders['js'] = jsLoaderOptions();
    return {
        loader: 'vue-loader',
        options: vueLoaderOptions
    }
}