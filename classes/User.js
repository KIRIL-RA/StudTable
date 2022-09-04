const { NotAllParametersWereRecievedError } = require("./Exceptions/CommonExceptions");
const { UserLoginDataIncorrectError, UserNotFoundError, UserNotLoginedError, UserHasNoDevicesError } = require("./Exceptions/UserExceptions");
const AccountTypes = require("../pages/static/AccountTypes.json");
const DBWork = require("./databaseWork");

// Get hash from string
const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

class User {

    /**
     * Actions with user. Contains infromations of user, function for work with user.
     * @param {DBWork} dbWork
     */
    constructor(dbWork) {
        if (dbWork === undefined || dbWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");

        this.dbWork = dbWork;
        this.isUserLogined = false;
        this.userData = {};
    }

    /**
     * Formatting info about user
     */
    FormatUserData() {
        if (!this.isUserLogined) throw new UserNotLoginedError("User not logined");

        let CloneObject = (fromArray, toArray) => {
            for (let key in fromArray) toArray[key] = fromArray[key];
        };

        let userData = {};
        CloneObject(this.userData, userData);

        delete userData.password;
        delete userData.password;
        delete userData.sessions;

        this.userData = userData;
    }
}

class UserWithToken extends User {

    /**
     * Actions with user. Login with session token.
     * @param {String} userId 
     * @param {String} sessionToken 
     * @param {DBWork} dbWork 
     */
    constructor(userId, sessionToken, dbWork) {
        if (userId === undefined || sessionToken === undefined || dbWork === undefined) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        if (userId === null || sessionToken === null || dbWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");

        super(dbWork);

        this.userData = {
            userId: userId,
            sessionToken: sessionToken
        };
    }

    /**
     * Login user. 
     * Checks correct of login data.
     */
    async Login() {
        let isTokenValid = false;
        let dbWork = this.dbWork;
        try {
            let userData = await dbWork.GetUserData({ userId: this.userData.userId });

            userData.sessions.forEach(validSessionToken => {
                if (validSessionToken == this.userData.sessionToken) isTokenValid = true;
            }); // Check is session token is valid 

            if (!isTokenValid) throw new UserLoginDataIncorrectError("User login failed, data incorrected");
            this.userData = userData;
            this.isUserLogined = true;

            this.FormatUserData();
        }
        catch (e) {
            switch (e.name) {
                case new UserNotFoundError().name:
                    throw new UserLoginDataIncorrectError("User not found");

                case new UserLoginDataIncorrectError().name:
                    throw new UserLoginDataIncorrectError("User login failed, data incorrected");

                default:
                    throw "User login failed, uncaught error";
            }
        }
    }

}

class UserWithPassword extends User {

    /**
     * Action with user. Login with user name and password
     * @param {String} userName 
     * @param {String} password 
     * @param {DBWork} dbWork 
     */
    constructor(userName, password, dbWork) {
        if (userName === undefined || password === undefined || dbWork === undefined) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        if (userName === null || password === null || dbWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");

        super(dbWork);

        this.userData = {
            userName: userName,
            password: password,
        }
    }

    /**
         * Loggining user.
         * Throw UserLoginDataIncorrectError if login failed, beause entered data incorrect.
         * Throw TypeError if login incorrect for other reasons.
         */
    async Login() {
        let dbWork = this.dbWork;
        try {
            let userData = await dbWork.GetUserData({ userName: this.userData.userName });

            if (userData.userName !== this.userData.userName || userData.password !== this.userData.password) throw new UserLoginDataIncorrectError("User login failed, data incorrected");
            this.userData = userData;
            this.isUserLogined = true;

            this.FormatUserData();
        }
        catch (e) {
            switch (e.name) {
                case new UserNotFoundError().name:
                    throw new UserLoginDataIncorrectError("User not found");

                case new UserLoginDataIncorrectError().name:
                    throw new UserLoginDataIncorrectError("User login failed, data incorrected");

                default:
                    throw "User login failed, uncaught error";
            }
        }
    }

    /**
     * Registry new user
     * @param {any} accountType 
     */
    async Registry(accountType){

        // Get date s
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        // Generate account id
        let stringToHash = date + month + year + hours + minutes + seconds + this.userData.userName;
        let accountId = cyrb53(stringToHash);

        this.userData.accessLevel = accountType;
        this.userData.userId = accountId;
        this.userData.sessions = [];

        switch(accountType){
            case AccountTypes.FARMER:
                this.userData.farms = [];
                this.userData.specialCultures = [];
                break;

            case AccountTypes.WORKER:
                this.userData.rate = 5.0;
                break;

            default:
                break;
        }

        await this.dbWork.AddNewUser(this.userData);
    }

    /**
     * Creating new session and generate session token
     * @returns sessionToken
     */
    async CreateNewSession() {
        if (!this.isUserLogined) throw new UserNotLoginedError("User not logined"); // Check is user logined

        // Variables
        let dbWork = this.dbWork;
        let date_ob = new Date();

        // Get date s
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        // Generate session token
        let stringToHash = date + month + year + hours + minutes + seconds + this.userData.userName;
        let sessionToken = cyrb53(stringToHash);

        // Save session token
        await dbWork.AddNewUserSession(this.userData.userId, sessionToken);
        this.userData.sessionToken = sessionToken;
    }
}

module.exports = { UserWithPassword, UserWithToken };