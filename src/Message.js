const utils = require('./utils'),
    Channel = require('./Channel'),
    User = require('./User'),
    Users = require('./Users')

class Message {
    constructor(rawData, channel) {
        if (rawData.subtype === 'file_comment') return;

        this.user = Users.get(rawData.user);
        //this.channel = channel;

        this.type = rawData.type;
        this.subtype = rawData.subtype;
        this.when = utils.dateFromSlackTs(rawData.ts);
        this.edited = !!rawData.edited;

        this.text = rawData.text;

        if (rawData.file) {
            const file = rawData.file;

            if (!this.user) {
                console.log(rawData);
            }

            this.fileName = `${file.timestamp}-${this.user.name}-${file.name}`;
            this.downloadUrl = file.url_private_download;
        }
    }
    
    describe() {
        let name = this.user.name,
            date = this.when.toISOString().replace('.000Z', '').replace('T', ' ')
        
        name = name + '               '.slice(0, 10 - name.length)
        
        return `${date} - ${name} - ${this.text}`
    }
}

module.exports = Message
