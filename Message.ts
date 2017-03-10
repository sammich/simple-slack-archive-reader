/// <reference path="typings/index.d.ts" />

import * as utils from './utils';

import Users from './Users';
import User from './User';
import Channel from "./Channel";

interface RawJSONMessageData {
    user: string
    type: string
    subtype: string
    text: string
    ts: string
    edited: Object
    file: any
    comment: any;
}

class Message {
    text: string;
    user: User;
    type: string;
    subtype: string;
    when: Date;
    edited: boolean;
    file: any;
    fileName: string;
    downloadUrl: string;
    channel: Channel;

    constructor(rawData: RawJSONMessageData, channel) {
        if (rawData.subtype === 'file_comment') return;

        this.user = Users.get(rawData.user);
        this.channel = channel;

        this.type = rawData.type;
        this.subtype = rawData.subtype;
        this.when = utils.dateFromSlackTs(rawData.ts);
        this.edited = !!rawData.edited;

        this.text = rawData.text;

        if (rawData.file) {
            const file = rawData.file;

            if (!this.user) {
                console.log(rawData);
            }

            this.fileName = `${file.timestamp}-${this.user.name}-${file.name}`;
            this.downloadUrl = file.url_private_download;
        }
    }
}

export default Message;
