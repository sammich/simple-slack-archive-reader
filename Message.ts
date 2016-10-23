/// <reference path="typings/index.d.ts" />

import * as utils from './utils';

import Users from './Users';
import User from './User';

interface RawJSONMessageData {
    user: string
    type: string
    subtype: string
    text: string
    ts: string;
    edited: Object;
}

class Message {
    text: string;
    user: User;
    type: string;
    subtype: string;
    when: Date;
    edited: boolean;

    constructor(rawData: RawJSONMessageData) {
        if (rawData.subtype) return;

        this.user = Users.get(rawData.user);

        this.type = rawData.type;
        this.subtype = rawData.subtype;
        this.when = utils.dateFromSlackTs(rawData.ts);
        this.edited = !!rawData.edited;

        this.text = rawData.text;
    }
}

export default Message;
