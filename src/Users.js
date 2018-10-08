const { dataDir } = require('./config'),
    utils = require('./utils'),

    User = require('./User')

class Users {
    constructor() {
        this.users = utils.loadJsonSync(dataDir, 'users.json').map((rawUser) => {
            return new User(rawUser);
        });

        this.users.push(new User({
            id: 'USLACKBOT',
            name: 'Slackbot'
        }));
    }

    get(id) {
        for (let i = 0, x = this.users.length; i < x; i++) {
            if (this.users[i].id === id)
                return this.users[i];
        }

        return;
    }
}

module.exports = new Users()

