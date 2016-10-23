import Channels from '../Channels'
import * as _ from 'lodash'

export default function run() {
    const users = {};

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user) return;

            if (!users[m.user.name]) {
                users[m.user.name] = {
                    words: 0,
                    letters: 0
                };
            }

            users[m.user.name].words += m.text.split(/\s/g).length;
            users[m.user.name].letters += m.text.split(/\s/g).join('').length;
        });
    });

    _.forEach(users, (stat, user) => {
        console.log(`@${user} has said ${stat.words} words using ${stat.letters} letters for an average word length of ${(stat.letters/stat.words).toFixed(1)}.`);
    })
}
