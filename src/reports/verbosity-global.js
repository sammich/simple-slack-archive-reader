const _ = require('lodash'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const users = {},
        output = [];

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user || m.user.isBot) return;

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
        output.push(`@${user} has said ${stat.words} words using ${stat.letters} letters for an average word length of ${(stat.letters/stat.words).toFixed(1)}.`);
    });

    writeText('verbosity', output)
}
