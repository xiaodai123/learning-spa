/**
 * 使用 DLLPlugin 预先打包好第三方库，避免每次都要去编译
 * 另外需要在你的 html 模板里面引入 dll.js，webpack 不会自动帮你引入，用好这一步编译速度应该能快一倍左右的时间。
 */
const webpack = require('webpack');
const { getPath } = require('./config/utils');
const vendors = ['vue', 'vue-router', 'axios', 'babel-polyfill'];
module.exports = {
    entry: {
        'dll': vendors
    },
    output: {
        filename: '[name].[hash].js',
        path: getPath('src/static'),
        library: '__[name]__lib'
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.less', '.json', '.json5'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new webpack.DllPlugin({
            name: '__[name]__lib',
            path: getPath('src/static/[name].mainfest.json')
        })
    ]
}