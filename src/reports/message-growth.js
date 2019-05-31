const _ = require('lodash'),
    moment = require('moment'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    let data = new Map(),
        output = [];

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user || m.user.isBot) return;

            const date = +new Date(m.when).setHours(0,0,0,0)

            if (!data.has(date)) {
                data.set(date, 0);
            }

            let curr = data.get(date);
            if (curr !== undefined) {
                data.set(date, ++curr);
            }/* else {
                output.push('no curr');
            }*/
        });
    });

    data.forEach((count, datetime) => {
        output.push([datetime, count])
    });

    output = output.sort((a, b) => {
        return a[0] - b[0];
    }).map(row => {
        return `${new Date(row[0]).toLocaleDateString()}\t${row[1]}`;
    });

    writeText('message-growth', output)
}
