export default class User {
    _infos = null;

    constructor(infos = null) {
        this._infos = infos;
    }

    get infos() {
        return this._infos;
    }

    get isAuthenticated() {
        return this.infos != null
    }

    static login(userInfos) {
        return new User(userInfos);
    }

    static logout() {
        return new User();
    }

    login(userInfos) {
        return new User(userInfos);
    }

    logout() {
        return new User();
    }
}

export class UserInfos {
    _id = null;
    _fdIb = null;
    _username = null;
    _first_name = null;
    _last_name = null;
    _email = null;
    _avatar = null;

    constructor(id, fdIb, username, first_name, last_name, email, avatar) {
        this._id = id;
        this._fdIb = fdIb;
        this._username = username;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._avatar = avatar;
    }


    get avatar() {
        return this._avatar;
    }

    get id() {
        return this._id;
    }

    get fdIb() {
        return this._fdIb;
    }

    get username() {
        return this._username;
    }

    get first_name() {
        return this._first_name;
    }

    get last_name() {
        return this._last_name;
    }

    get email() {
        return this._email;
    }
}