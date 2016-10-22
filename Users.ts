import * as utils from './utils';
import { dataDir } from './config';

import User from './User';

class Users {
    users: User[];

    constructor() {
        this.users = utils.loadJsonSync(dataDir, 'users.json').map((rawUser) => {
            return new User(rawUser);
        });
    }

    get(id: String) {
        for (let i = 0, x = this.users.length; i < x; i++) {
            if (this.users[i].id === id)
                return this.users[i];
        }

        return;
    }
}

export default new Users();

