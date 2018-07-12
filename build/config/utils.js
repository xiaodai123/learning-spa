const path = require('path');
function getPath(relPath) {
    return path.resolve(__dirname, '../../', relPath);
}
function getLatestDllFile(toPath) {
    let new_path = toPath.replace(/\./g, '.**.');
    let latest_file = '';
    let latest_file_mtime = 0;
    let glob = require('glob');
    let fs = require('fs');
    glob.sync(path.resolve(__dirname, './../../src/' + new_path)).forEach(function (file) {
        let fileInfo = fs.statSync(file);
        let file_mtime = +new Date(fileInfo.mtimeMs);

        latest_file = file_mtime > latest_file_mtime ? file : latest_file;
        latest_file_mtime = file_mtime > latest_file_mtime ? file_mtime : latest_file_mtime;
    })
    return latest_file.replace(/^.*\/(static\/)/ig, "$1");
}
function createLintingRule() {
    return {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        options: {
            formatter: require('eslint-friendly-formatter'),
            // emitWarning: false
        }
    }
}
module.exports = {
    getPath,
    getLatestDllFile,
    createLintingRule
}