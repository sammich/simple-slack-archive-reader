const fs = require('fs'),
    path = require('path'),
    request = require('request'),
    { reportDir } = require('./config')

module.exports = {
    dateFromSlackTs,
    loadJsonSync,
    download,
    writeText,
    padify
}

function dateFromSlackTs(str) {
    str = String(str)

    return new Date(+(str.split('.')[0] + '000'));
}

function loadJsonSync(...pathParts) {
    const dir = path.join.apply(null, pathParts);

    if (!dir.match(/json$/)) return [];

    try {
        return JSON.parse(fs.readFileSync(dir, 'utf-8'));
    } catch (e) {
        console.log('error loading json file', pathParts);
        throw new Error('failed to load json file: ' + e.message);
    }
}

function download(uri, filename, callback) {
    request.head(uri, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}

function writeText(name, text) {
    fs.writeFileSync(path.join(reportDir, `/${name}.txt`), Array.isArray(text) ? text.join('\n') : text)
}

function padify(text, len, left, char = ' ') {
    text = String(text)

    if (len - text.length <= 0) {
        return text
    }

    const padder = char.repeat(len - text.length)

    if (left) {
        return padder + text
    }

    return text + padder
}
