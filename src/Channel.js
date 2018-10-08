const fs = require('fs'),
    path = require('path'),

    { dataDir } = require('./config'),
    utils = require('./utils'),

    Message = require('./Message'),
    User = require('./User'),
    Users = require('./Users')

class Channel {
    constructor(rawData) {
        this.id = rawData.id;
        this.name = rawData.name;
        this.created = utils.dateFromSlackTs(rawData.created);
        this.creator = Users.get(rawData.creator);
        this.isArchived = rawData.is_archived;
    
        this.messages = []
    }

    load() {
        const folderPath = path.join(dataDir, this.name);
        const messageJsonFiles = fs.readdirSync(folderPath);

        messageJsonFiles.map(filename => {
            utils.loadJsonSync(folderPath, filename).map(rawMessages => {
                this.messages.push(new Message(rawMessages, this));
            });
        });
    }
}

module.exports = Channel;
