const _ = require('lodash'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const users = {},
        output = [];

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
        output.push(`@${user} has edited ${stat.edits} messages of their ${stat.messages} messages.`);
    });

    writeText('edits', output)
}
