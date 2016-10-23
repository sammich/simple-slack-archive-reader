/// <reference path="typings/index.d.ts" />

import * as fs from 'fs';
import * as path  from 'path';

import { dataDir } from './config';
import * as utils from './utils';

import Message from './Message';
import User from './User';
import Users from './Users';

interface RawJSONChannelData {
    id: string;
    name: string;
    created: string;
    creator: string;
    is_archived: boolean;
}

class Channel {
    id: string;
    name: string;
    created: Date;
    creator: User;
    isArchived: boolean;
    messages: Message[] = [];

    constructor(rawData: RawJSONChannelData) {
        this.id = rawData.id;
        this.name = rawData.name;
        this.created = utils.dateFromSlackTs(rawData.created);
        this.creator = Users.get(rawData.creator);
        this.isArchived = rawData.is_archived;
    }

    load() {
        const folderPath = path.join(dataDir, this.name);
        const messageJsonFiles = fs.readdirSync(folderPath);

        messageJsonFiles.map((filename) => {
            utils.loadJsonSync(folderPath, filename).map((rawMessages) => {
                this.messages.push(new Message(rawMessages));
            });
        });
    }
}

enum MessageType {
    message
}

enum MessageSubType {
    none,
    channel_join,
    channel_topic
}

export default Channel;
