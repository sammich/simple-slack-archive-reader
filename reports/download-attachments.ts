import Channels from '../Channels'
import * as async from 'async'
import * as path from "path";

const ProgressBar = require('progress');
const utils = require('../utils');
const config = require('../config');

export default function run() {
    const imageUrls = [];

    Channels.channels.map(ch => {
        ch.messages.map(m => {
            if (m.downloadUrl) {
                imageUrls.push([path.join(config.dataDir, m.channel.name, m.fileName), m.downloadUrl]);
            }
        });
    });

    const downloadBar = new ProgressBar('Downloading files [:bar] :percent :etas [:current/:total]', {
        complete: '.',
        incomplete: ' ',
        width: 80,
        total: imageUrls.length
    });

    const q = async.queue((task, callback) => {
        utils.download(task.nameUrl[1], task.nameUrl[0], () => {
            downloadBar.tick();
            callback();
        });
    }, 10);

    q.drain = () => {
        console.log(`download complete`);
    };

    imageUrls.forEach(nameUrl => {
        q.push({
            nameUrl
        });
    });
}
