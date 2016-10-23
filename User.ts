interface RawJSONUserData {
    id: string;
    name: string;
}

class User {
    id: string;
    name: string;
    constructor(rawData: RawJSONUserData) {
        this.id = rawData.id;
        this.name = rawData.name;
    }
}

export default User;
