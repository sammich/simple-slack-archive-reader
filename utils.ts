/// <reference path="typings/index.d.ts" />

import * as fs from 'fs';
import * as path  from 'path';

export function dateFromSlackTs(str: string) {
    return new Date(str.split('.')[0] + '000');
}

export function loadJsonSync(...pathParts: string[]) {
    try {
        return JSON.parse(fs.readFileSync(path.join.apply(null, pathParts), 'utf-8'));
    } catch (e) {
        throw new Error('failed to load json file: ' + e.message);
    }
}