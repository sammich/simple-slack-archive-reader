const _ = require('lodash'),
    moment = require('moment'),
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
                    total: 0,
                    hour: {}
                };
            }

            const user = users[m.user.name];
            const _m = moment(m.when);
            const hr = _m.hour() * 60 + (_m.minute() - _m.minute() % 15);

            if (!user.hour[hr])
                user.hour[hr] = 0;

            user.total++;
            user.hour[hr]++;
        });
    });
/*
    _.forEach(users, (stat, user) => {
        let maxHourCount = 0;

        _.forEach(stat.hour, (count, hour) => {
            maxHourCount = Math.max(count, maxHourCount);
        });

        _.forEach(stat.hour, (count, hour) => {
            stat.hour[hour] = Math.round((count / maxHourCount) * 1000)
        });
    });*/

    let ln = ' Hour';
    _.forEach(users, (stat, user) => {
        ln += `${padify(user, 12, true)}`;
    });
    output.push(ln);

    for (let i = 0; i < 24*4; i++) {
        const hr = `${Math.floor(i / 4)}:${(i % 4)*15}`;
        
        ln = `${padify(hr, 5, true)}`;
        _.forEach(users, (stat, user) => {
            ln += `${padify((stat.hour[i*15] || 0), 12, true)}`;
        });
        output.push(ln);
    }

    ln = ' Hour';
    _.forEach(users, (stat, user) => {
        ln += `${user},`;
    });
    output.push(ln);

    for (let i = 0; i < 24*4; i++) {
        const hr = `${Math.floor(i / 4)}:${(i % 4)*15}`;

        ln = `${hr},`;
        _.forEach(users, (stat, user) => {
            ln += `${(stat.hour[i*15] || 0)},`;
        });
        output.push(ln);
    }

    writeText('time-of-day', output)
}

function padify(text, len, left) {
    text = text + '';
    if (left) {
        return '                             '.substring(0, len - text.length) + text;
    }
    return text + '                             '.substring(0, len - text.length);
}
