"use strict";
exports.id = 442;
exports.ids = [442];
exports.modules = {

/***/ 3021:
/***/ ((module) => {


class NotAllParametersWereRecievedError extends Error {
    constructor(message){
        super(message);
        this.name = "NotAllParametersWereRecieved";
    }
}
class IncorrectDataException extends Error {
    constructor(message){
        super(message);
        this.name = "IncorrectData";
    }
}
module.exports = {
    NotAllParametersWereRecievedError,
    IncorrectDataException
};


/***/ }),

/***/ 3969:
/***/ ((module) => {


class DataNotFoundException extends Error {
    constructor(message){
        super(message);
        this.name = "DataNotFound";
    }
}
module.exports = {
    DataNotFoundException
};


/***/ }),

/***/ 9996:
/***/ ((module) => {


class FarmNotFoundException extends Error {
    constructor(message){
        super(message);
        this.name = "FarmNotFound";
    }
}
class FarmGetAccessException extends Error {
    constructor(message){
        super(message);
        this.name = "AccessDataNotValid";
    }
}
class GetTasksException extends Error {
    constructor(message){
        super(message);
        this.name = "GetTasksError";
    }
}
class TasksNotFondException extends Error {
    constructor(message){
        super(message);
        this.name = "TasksNotFond";
    }
}
class GetWorkersExceptin extends Error {
    constructor(message){
        super(message);
        this.name = "ErrorGetWorkers";
    }
}
class WorkerNotOwnedToFarmException extends Error {
    constructor(message){
        super(message);
        this.name = "WorkerNotOwnedToFarm";
    }
}
class AddTaskException extends Error {
    constructor(message){
        super(message);
        this.name = "AddTaskError";
    }
}
class CultureNotOwnedToUserException extends Error {
    constructor(message){
        super(message);
        this.name = "CultureNotOwnedToUserError";
    }
}
module.exports = {
    FarmNotFoundException,
    FarmGetAccessException,
    GetTasksException,
    TasksNotFondException,
    GetWorkersExceptin,
    WorkerNotOwnedToFarmException,
    AddTaskException,
    CultureNotOwnedToUserException
};


/***/ }),

/***/ 4442:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const { NotAllParametersWereRecievedError  } = __webpack_require__(3021);
const { UserLoginDataIncorrectError , UserNotFoundError , UserNotLoginedError , UserHasNoDevicesError , UserNameAlreadyExist  } = __webpack_require__(1011);
const AccountTypes = __webpack_require__(8922);
const SpecificPermissions = __webpack_require__(8267);
const Actions = __webpack_require__(1476);
const DBWork = __webpack_require__(1799);
// Get hash from string
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++){
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
class User {
    /**
     * Actions with user. Contains infromations of user, function for work with user.
     * @param {DBWork} dbWork
     */ constructor(dbWork){
        if (dbWork === undefined || dbWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        this.dbWork = dbWork;
        this.isUserLogined = false;
        this.userData = {};
    }
    /**
     * Formatting info about user
     */ FormatUserData() {
        if (!this.isUserLogined) throw new UserNotLoginedError("User not logined");
        let CloneObject = (fromArray, toArray)=>{
            for(let key in fromArray)toArray[key] = fromArray[key];
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
     */ constructor(userId, sessionToken, dbWork){
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
     */ async Login() {
        let isTokenValid = false;
        let dbWork = this.dbWork;
        try {
            let userData = await dbWork.GetUserData({
                userId: this.userData.userId
            });
            userData.sessions.forEach((validSessionToken)=>{
                if (validSessionToken == this.userData.sessionToken) isTokenValid = true;
            }); // Check is session token is valid 
            if (!isTokenValid) throw new UserLoginDataIncorrectError("User login failed, data incorrected");
            this.userData = userData;
            this.isUserLogined = true;
            this.FormatUserData();
        } catch (e) {
            switch(e.name){
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
     * Check is user has permission to make some action
     * @param {string} action
     */ CheckPermission(action) {
        switch(action){
            // Group headman perrmissions
            case Actions.CONFIRM_ACCOUNT:
            case Actions.GET_UNCONFIRMED_ACCOUNTS:
            case Actions.UPDATE_TIMETABLE:
                if (this.userData.accountType === AccountTypes.HEADMAN_GROUP && this.userData.isConfirmed) return true;
                else return false;
            case Actions.GET_TIMETABLE:
                if (this.userData.isConfirmed) return true;
                else return false;
            default:
                return false;
        }
    }
    /**
     * @return List of specific user permissions
     */ GetSpecificPermissions() {
        let permissions = [];
        let accountType = this.userData.accountType;
        let isConfirmed = this.userData.isConfirmed;
        switch(accountType){
            case AccountTypes.HEADMAN_GROUP:
                if (isConfirmed) {
                    permissions.push(SpecificPermissions.UPDATE_TIME_TABLE);
                    permissions.push(SpecificPermissions.CONFIRM_ACCOUNT);
                }
                break;
        }
        return permissions;
    }
}
class UserWithPassword extends User {
    /**
     * Action with user. Login with user name and password
     * @param {String} userName 
     * @param {String} password 
     * @param {DBWork} dbWork 
     */ constructor(userName, password, dbWork){
        if (userName === undefined || password === undefined || dbWork === undefined) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        if (userName === null || password === null || dbWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        super(dbWork);
        this.userData = {
            userName: userName,
            password: password
        };
    }
    /**
         * Loggining user.
         * Throw UserLoginDataIncorrectError if login failed, beause entered data incorrect.
         * Throw TypeError if login incorrect for other reasons.
         */ async Login() {
        let dbWork = this.dbWork;
        try {
            let userData = await dbWork.GetUserData({
                userName: this.userData.userName
            });
            if (userData.userName !== this.userData.userName || userData.password !== this.userData.password) throw new UserLoginDataIncorrectError("User login failed, data incorrected");
            this.userData = userData;
            this.isUserLogined = true;
            this.FormatUserData();
        } catch (e) {
            switch(e.name){
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
     * Validate data for registration
     * @param {string} accountType
     * @param {object} data 
     */ ValidateRegistryData(accountType, data, realInfo) {
        switch(accountType){
            // If we registry student/group headman
            case AccountTypes.STUDENT:
            case AccountTypes.HEADMAN_GROUP:
                if (data.id === undefined || data.directionId === undefined || data.group === undefined || data.faculty === undefined || data.course === undefined || data.studentIdNumber === undefined) throw new NotAllParametersWereRecievedError("Not all registry parameters were recieved");
                break;
        }
        if (realInfo === undefined || realInfo.firstName === undefined || realInfo.secondName === undefined) throw new NotAllParametersWereRecievedError("Not all registry parameters were recieved");
    }
    /**
     * Check is username is free
     */ async CheckUserName() {
        let userName = this.userData.userName;
        const database = this.dbWork;
        let result;
        try {
            result = await database.GetUserData({
                userName: userName
            });
        } catch  {
            result = undefined;
        }
        if (result != undefined || result != null) throw new UserNameAlreadyExist("User name already exist");
    }
    /**
     * Registry new user
     * @param {any} accountType
     * @param {string} academyInfo 
     */ async Registry(accountType, academyInfo, eMail, realInfo) {
        // Validate recieved data
        this.ValidateRegistryData(accountType, academyInfo, realInfo);
        await this.CheckUserName();
        let date_ob = new Date();
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
        this.userData.accountType = accountType;
        this.userData.userId = String(accountId);
        this.userData.isConfirmed = false;
        this.userData.sessions = [];
        this.userData.eMail = eMail;
        this.userData.realInfo = realInfo;
        this.userData.academy = {
            id: academyInfo.id,
            directionId: academyInfo.directionId,
            group: academyInfo.group,
            faculty: academyInfo.faculty,
            course: academyInfo.course,
            studentIdNumber: academyInfo.studentIdNumber
        };
        await this.dbWork.AddNewUser(this.userData);
    }
    /**
     * Creating new session and generate session token
     * @returns sessionToken
     */ async CreateNewSession() {
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
module.exports = {
    UserWithPassword,
    UserWithToken
};


/***/ }),

/***/ 1799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const { UserNotFoundError  } = __webpack_require__(1011);
const { NotAllParametersWereRecievedError  } = __webpack_require__(3021);
const { DataNotFoundException  } = __webpack_require__(3969);
const MongoClient = (__webpack_require__(8013).MongoClient);
const { FarmNotFoundException  } = __webpack_require__(9996);
// Database parameters
const dbName = "StudTable";
const usersCollection = "Users";
const timeTablePermanentCollection = "TimeTablesPermanent";
const academiesCollection = "Academies";
const specificDaysChangesCollect = "SpecificDaysChanges";
/**
 * Access to db information.
 */ class DBWork {
    constructor(url){
        this.mongoClient = new MongoClient(url);
    }
    /**
     * Searching user in DB.
     * @param {any} searchParameters 
     * @returns User data if user exist.
     */ async GetUserData(searchParameters) {
        let userExist = false;
        let userData;
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(usersCollection);
        const results = await collection.find(searchParameters).toArray();
        if (results.length != 0) {
            userExist = true;
            userData = results[0];
        }
        if (userExist) return userData; // If user exist, return information of user.
        throw new UserNotFoundError("User not founded in DB"); // If use not exist, throw error.
    }
    /**
     * Adding user session token to data base
     * @param {String} userId 
     * @param {String} sessionToken 
     */ async AddNewUserSession(userId, sessionToken) {
        if (userId == undefined || sessionToken == undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved"); // Check,  is all parameters were recieved
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(usersCollection);
        await collection.updateOne({
            userId: userId
        }, {
            $push: {
                sessions: sessionToken
            }
        });
    }
    /**
     * Adding new user to database
     * @param {any} userData 
     */ async AddNewUser(userData) {
        if (userData === undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved"); // Check,  is all parameters were recieved
        const datataBase = this.mongoClient.db(dbName);
        const userCollection = datataBase.collection(usersCollection);
        await userCollection.insertOne(userData);
    }
    /**
     * Get uncofirmed account for concrete course
     * @param {any} academyId 
     * @param {any} directionId 
     * @param {any} course 
     * @param {any} group 
     */ async GetUnconfirmedAccounts(academyId, directionId, course, group, accountType) {
        if (academyId === undefined || directionId === undefined || course === undefined || group === undefined || accountType === undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved"); // Check,  is all parameters were recieved
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(usersCollection);
        let result = await collection.find({
            accountType: accountType,
            isConfirmed: false,
            "academy.id": academyId,
            "academy.directionId": directionId,
            "academy.group": group,
            "academy.course": course
        });
        return result.toArray();
    }
    /**
     * Getting time table
     * @param {string} academyId 
     * @param {string} direction 
     * @param {string} group 
     * @param {string} course
     * @param {string} date Set this parameter, if you want get timeTable of specific day
     * @returns 
     */ async GetTimeTable(academyId, direction, group, course, date = undefined) {
        if (academyId === undefined || direction == undefined || group === undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved");
        const datataBase = this.mongoClient.db(dbName);
        let collection;
        let result = {};
        switch(date){
            case undefined:
                // If date not setted -> user want to get permanent timeTable
                collection = datataBase.collection(timeTablePermanentCollection);
                result = await collection.findOne({
                    academyId: academyId,
                    direction: direction,
                    group: group,
                    course: course
                });
                break;
            default:
                // If date setted -> user want to get timeTable for specific day
                collection = datataBase.collection(specificDaysChangesCollect);
                result = await collection.findOne({
                    academyId: academyId,
                    direction: direction,
                    group: group,
                    date: date
                });
                break;
        }
        return result;
    }
    /**
     * Getting info about university
     * @param {string} academyId 
     */ async GetUniversityInfo(academyId) {
        if (academyId === undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved");
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(academiesCollection);
        let result = await collection.findOne({
            id: academyId
        });
        return result;
    }
    /**
     * Confirm account
     * @param {String} userId
     */ async ConfirmAccount(userId) {
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(usersCollection);
        collection.updateOne({
            userId: userId
        }, {
            $set: {
                isConfirmed: true
            }
        });
    }
    /**
     * Update timeTable for ALL week
     * @param {String} academyId 
     * @param {String} direction 
     * @param {String} group 
     * @param {String} day 
     * @param {any} newTimeTable 
     */ async UpdateTimeTable(academyId, direction, group, course, newTimeTable) {
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(timeTablePermanentCollection);
        collection.updateOne({
            academyId: academyId,
            direction: direction,
            group: group,
            course: course
        }, {
            $set: {
                table: newTimeTable
            }
        });
    }
    /**
     * Get raw academies info
     */ async GetAcademies() {
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(academiesCollection);
        let result = collection.find({}).toArray();
        return result;
    }
    isConnected() {
        return !!this.mongoClient && !!this.mongoClient.topology && this.mongoClient.topology.isConnected();
    }
    /**
     * Open connection to database
     */ async Connect() {
        if (!this.isConnected()) await this.mongoClient.connect();
    }
    /**
     * Close connection ro database
     */ async CloseConnection() {
        await this.mongoClient.close();
    }
}
const StudTableDatabase = new DBWork("mongodb://127.0.0.1:27017/");
module.exports = {
    StudTableDatabase: StudTableDatabase,
    DBWork
};


/***/ }),

/***/ 8922:
/***/ ((module) => {

module.exports = JSON.parse('{"STUDENT":"Student","HEADMAN_GROUP":"GroupHeadman"}');

/***/ }),

/***/ 1476:
/***/ ((module) => {

module.exports = JSON.parse('{"UPDATE_TIMETABLE":"updtt","GET_TIMETABLE":"gtt","GET_UNCONFIRMED_ACCOUNTS":"gua","CONFIRM_ACCOUNT":"ca","GET_ACADEMIES":"ga","GET_FACULTIES":"gf","GET_DIRECTIONS":"gd"}');

/***/ }),

/***/ 8267:
/***/ ((module) => {

module.exports = JSON.parse('{"UPDATE_TIME_TABLE":"updtt","CONFIRM_ACCOUNT":"ca"}');

/***/ })

};
;