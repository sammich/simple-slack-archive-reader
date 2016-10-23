import Channels from '../Channels'
import * as _ from 'lodash'

export default function run() {
    const users = {};

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user) return;

            if (!users[m.user.name]) {
                users[m.user.name] = {
                    messages: 0,
                    edits: 0
                };
            }

            users[m.user.name].messages++;

            if (m.edited)
                users[m.user.name].edits++;
        });
    });

    _.forEach(users, (stat, user) => {
        console.log(`@${user} has edited ${stat.edits} messages of their ${stat.messages} messages.`);
    })
}
