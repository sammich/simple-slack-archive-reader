import * as fs from 'fs';
import * as path  from 'path';
import * as request from 'request';

export function dateFromSlackTs(str: string) {
    return new Date(+(str.split('.')[0] + '000'));
}

export function loadJsonSync(...pathParts: string[]) {
    const dir = path.join.apply(null, pathParts);

    if (!dir.match(/json$/)) return [];

    try {
        return JSON.parse(fs.readFileSync(dir, 'utf-8'));
    } catch (e) {
        console.log('error loading json file', pathParts);
        throw new Error('failed to load json file: ' + e.message);
    }
}

export function download(uri, filename, callback) {
    request.head(uri, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}
