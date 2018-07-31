const path = require('path');
function getPath(relPath) {
    return path.resolve(__dirname, '../../', relPath);
}
function getLatestDllFile(toPath) {
    let newPath = toPath.replace(/\./g, '.**.');
    let latestFile = '';
    let latestFileMtime = 0;
    let glob = require('glob');
    let fs = require('fs');
    glob.sync(path.resolve(__dirname, './../../src/' + newPath)).forEach(function (file) {
        let fileInfo = fs.statSync(file);
        let fileMtime = +new Date(fileInfo.mtimeMs);

        latestFile = fileMtime > latestFileMtime ? file : latestFile;
        latestFileMtime = fileMtime > latestFileMtime ? fileMtime : latestFileMtime;
    })
    return latestFile.replace(/^.*\/(static\/)/ig, '$1');
}
function createLintingRule() {
    return {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        options: {
            formatter: require('eslint-friendly-formatter')
            // emitWarning: false
        }
    }
}
function createEntry(filePath) {
    let entry = {};
    Object.keys(filePath).forEach(key => {
        entry[key] = filePath[key].js;
    });
    return entry;
}
module.exports = {
    getPath,
    getLatestDllFile,
    createLintingRule,
    createEntry
}