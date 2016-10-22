interface RawJSONUserData {
    id: string;
    name: string;
}

class User {
    id: String;
    name: String;
    constructor(rawData: RawJSONUserData) {
        this.id = rawData.id;
        this.name = rawData.name;
    }
}

export default User;
