import Channels from '../Channels'
import * as _ from 'lodash'

export default function run() {
    const users = {};

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user) return;

            if (!users[m.user.name]) {
                users[m.user.name] = 0;
            }

            users[m.user.name]++;
        });
    });

    _.forEach(users, (count, user) => {
        console.log(`@${user} has sent ${count} messages`);
    })
}
