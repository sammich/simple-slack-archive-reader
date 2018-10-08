const _ = require('lodash'),
    moment = require('moment'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const data = new Map,
        output = [];

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user) return;

            const date = moment(m.when).format('YYYY-MM-DD');
            if (!data.has(date)) {
                data.set(date, 0);
            }

            let curr = data.get(date);
            if (curr !== undefined) {
                data.set(date, ++curr);
            } else {
                output.push('no curr');
            }
        });
    });

    data.forEach((count, datetime) => {
        output.push([datetime, count]);
    });

    output.sort((a, b) => {
        return a[0] - b[0];
    });

    output.forEach(row => {
        output.push(`${row[0]}\t${row[1]}`);
    });

    writeText('message-growth', output)
}
