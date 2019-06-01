const _ = require('lodash'),
    { padify, writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const users = {};

    let output = [];

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user || m.user.isBot) return;

            if (!users[m.user.name]) {
                users[m.user.name] = new Map() // <word, count>
            }

            const mojis = m.text.match(/(:[a-z_]*?:)/g)

            if (!mojis) return

            console.log(mojis);

            mojis.forEach(moji => {
                const dict = users[m.user.name]

                if (moji.length < 3) return

                if (!dict.has(moji)) {
                    dict.set(moji, 0)
                }

                dict.set(moji, dict.get(moji) + 1)
            });
        });
    });

    _.forEach(users, (stat, user) => {
        output = [`@${user} uses these emoji:`];

        let dict = Array.from(stat).filter(wordCount => {
            return wordCount[1] > 1
        }).sort((a, b) => {
            return b[1] - a[1]
        }).map(wordCount => {
            return `${padify(wordCount[1], 5, true)}  ${wordCount[0]}`
        });

        output.push(dict.join('\n'));

        writeText(`moji-${user}`, output)
    });
}
