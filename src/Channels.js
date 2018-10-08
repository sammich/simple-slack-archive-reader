const { dataDir } = require('./config'),
    utils = require('./utils'),

    Channel = require('./Channel')

class Channels {
    constructor() {
        this.channels = utils.loadJsonSync(dataDir, 'channels.json').map((rawChannel) => {
            return new Channel(rawChannel);
        });
    }

    load() {
        this.channels.map((c) => {
            c.load();
        });
    }
}

module.exports = new Channels()
