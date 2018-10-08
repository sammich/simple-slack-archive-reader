const async = require('async'),
    path = require('path'),
    ProgressBar = require('progress'),
    utils = require('../utils'),
    config = require('../config'),
    Channels = require('../Channels')

module.exports = function run() {
    const imageUrls = [],
        output = [];

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
        output.push(`download complete`);
    };

    imageUrls.forEach(nameUrl => {
        q.push({
            nameUrl
        });
    });
}
