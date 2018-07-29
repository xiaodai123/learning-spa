const isCacheLoader = true;
const babelLoaderQuery = '?cacheDirectory';
const mediaName = process.env.NODE_ENV !== 'production' ? '[name].[ext]' : '[name][hash7].[ext]';
const cssName = process.env.NODE_ENV !== 'production' ? '[name].css' : '[name].[contenthash:3].css';
const isProd = process.env.NODE_ENV === 'production';
const outputPath = {
    dev: 'dist',
    prod: 'dist'
}
module.exports = {
    isCacheLoader,
    babelLoaderQuery,
    mediaName,
    cssName,
    isProd,
    outputPath
}