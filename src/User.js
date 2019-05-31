const bots = new Set()
bots.add('citationneededbot')
bots.add('github')
bots.add('Slackbot')
bots.add('charlotte')

class User {
    constructor(rawData) {
        this.id = rawData.id;
        this.name = rawData.name;
        this.isBot = bots.has(rawData.name)
    }
}

module.exports = User
