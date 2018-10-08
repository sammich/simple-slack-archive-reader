const fs = require('fs'),
    path = require('path'),
    request = require('request'),
    { reportDir } = require('./config')

module.exports = {
    dateFromSlackTs,
    loadJsonSync,
    download,
    writeText
}

function dateFromSlackTs(str) {
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
