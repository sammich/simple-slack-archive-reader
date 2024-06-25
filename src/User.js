const ignore = new Set()
ignore.add('citationneededbot')
ignore.add('github')
ignore.add('Slackbot')
ignore.add('charlotte')
ignore.add('simplepoll')

class User {
    constructor(rawData) {
        this.id = rawData.id;
        this.name = rawData.name;
        this.isBot = ignore.has(rawData.name)
    }
}

module.exports = User
