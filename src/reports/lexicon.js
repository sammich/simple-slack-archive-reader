const _ = require('lodash'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const users = {};

    let output = [];

    /*
    count all the words people use

     */

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user || m.user.isBot) return;

            if (!users[m.user.name]) {
                users[m.user.name] = new Map() // <word, count>
            }

            m.text.split(/\s/g).map(word => {
                if (!isWord(word)) {
                    return
                }

                word = cleanWord(word);

                const dict = users[m.user.name];

                if (!dict.has(word)) {
                    dict.set(word, 0);
                }

                dict.set(word, dict.get(word) + 1)
            });
        });
    });

    _.forEach(users, (stat, user) => {
        output = [`@${user} has used ${stat.size} different words. Here are the words:`];

        let dict = Array.from(stat).filter(wordCount => {
            return wordCount[1] > 1
        }).sort((a, b) => {
            return b[1] - a[1]
        }).map(wordCount => {
            return `${wordCount[1]}\t${wordCount[0]}`
        });

        output.push(dict.join('\n'));

        writeText(`lexicon-${user}`, output)
    });
}

function isWord(word) {
    return !!word &&
        word.indexOf('http') === -1 &&
        word.indexOf('<@U') === -1 &&
        word.indexOf('<#c') === -1
}

function cleanWord(word) {
    return word.replace(/[?.,;"”…()*~\-<>`!]/g, '')
        .toLowerCase()
}
