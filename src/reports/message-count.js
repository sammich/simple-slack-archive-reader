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
                users[m.user.name] = 0;
            }

            users[m.user.name]++;
        });
    });

    _.forEach(users, (count, user) => {
        output.push(`@${user} has sent ${count} messages`);
    });

    writeText('message-count', output)
}
