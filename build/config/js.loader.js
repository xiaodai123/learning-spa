module.exports = function jsLoader() {
    return {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            babelrc: false,
            /**
             * Babel 默认是将ES6模块语法转化为CommonJS
             * 规范写法，配置为modules:false则不转化。
             * 如果使用了 Webpack 且配置为modules:false，
             * Webpack 会进行 tree shaking(DCE( dead code elimination),无用代码清除)，去除一些无用
             * 代码。
             */
            presets: [['env', { modules: false }], ['vue-app', { ie: 9, uglify: true }]],
            /**
             * syntax-dynamic-import使es7 import异步加载语法生效
             */
            /**
             * Babel 默认只转换新的 JavaScript 语法，而不转换新的
             * API。例如，Iterator、Generator、Set、Maps、Proxy、
             * Reflect、Symbol、Promise 等全局对象，以及一些定义
             * 在全局对象上的方法（比如 Object.assign）都不会转译
             * 。如果想使用这些新的对象和方法，必须使用
             * babel-polyfill，为当前环境提供一个垫片。
             * transform-runtime:避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；,
             * runtime转换器插件主要做了三件事：

                当你使用generators/async方法、函数时自动调用babel-runtime/regenerator

                当你使用ES6 的Map或者内置的东西时自动调用babel-runtime/core-js

                移除内联babel helpers并替换使用babel-runtime/helpers来替换
             * 总的来说一句话，你可以使用内置的一些东西例如Promise,Set,Symbol等，就像使用无缝的使用polyfill
             * ,来使用babel 特性，并且无全局污染、极高代码库适用性
             */
            plugins: ['syntax-dynamic-import', 'transform-runtime', 'transform-vue-jsx', ['component', {'libraryName': 'element-ui', 'styleLibraryName': 'theme-chalk'}]]
        }
    }
}