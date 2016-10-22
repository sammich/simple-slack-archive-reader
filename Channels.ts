import { dataDir } from './config';
import * as utils from './utils';

import Channel from './Channel';

class Channels {
    channels: Channel[];

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

export default new Channels();
