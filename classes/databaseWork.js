const { UserNotFoundError } = require("./Exceptions/UserExceptions");
const { NotAllParametersWereRecievedError } = require("./Exceptions/CommonExceptions");
const { DataNotFoundException } = require('./Exceptions/DatabaseExceptions');
const MongoClient = require("mongodb").MongoClient;
const { FarmNotFoundException } = require("./Exceptions/FarmExceptions");

// Database parameters
const dbName = "StudTable";
const usersCollection = "Users";
const timeTablePermanentCollection = "TimeTablesPermanent";
const academiesCollection = "Academies";

/**
 * Access to db information.
 */
class DBWork {
    constructor(url) {
        this.mongoClient = new MongoClient(url);
    }

    /**
     * Searching user in DB.
     * @param {any} searchParameters 
     * @returns User data if user exist.
     */
    async GetUserData(searchParameters) {
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
     */
    async AddNewUserSession(userId, sessionToken) {
        if (userId == undefined || sessionToken == undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved"); // Check,  is all parameters were recieved

        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(usersCollection);
        await collection.updateOne({ userId: userId }, { $push: { sessions: sessionToken } });
    }

    /**
     * Getting time table
     * @param {string} academyId 
     * @param {string} direction 
     * @param {string} group 
     * @param {string} date Set this parameter, if you want get timeTable of specific day
     * @returns 
     */
    async GetTimeTable(academyId, direction, group, date = undefined) {
        if (academyId === undefined || direction == undefined || group === undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved");
        const datataBase = this.mongoClient.db(dbName);
        let result = {};

        switch (date) {
            case undefined:
                // If date not setted -> user want to get permanent timeTable
                const collection = datataBase.collection(timeTablePermanentCollection);
                result = await collection.findOne({
                    academyId: academyId,
                    direction: direction,
                    group: group
                });
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * Getting info about university
     * @param {string} academyId 
     */
    async GetUniversityInfo(academyId){
        if(academyId === undefined) throw new NotAllParametersWereRecievedError("Not all parameters were recieved");

        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(academiesCollection);
        let result = await collection.findOne({id: academyId});

        return result;
    }

    /**
     * Update timeTable for ALL week
     * @param {String} academyId 
     * @param {String} direction 
     * @param {String} group 
     * @param {String} day 
     * @param {any} newTimeTable 
     */
    async UpdateTimeTable(academyId, direction, group, day, newTimeTable){
        const datataBase = this.mongoClient.db(dbName);
        const collection = datataBase.collection(timeTablePermanentCollection);

        collection.updateOne({
            academyId: academyId,
            direction: direction,
            group: group
        }, {$set: { table: newTimeTable}});
    }

    isConnected() {
        return !!this.mongoClient && !!this.mongoClient.topology && this.mongoClient.topology.isConnected()
    }

    /**
     * Open connection to database
     */
    async Connect() {
        if (!this.isConnected()) await this.mongoClient.connect();
    }

    /**
     * Close connection ro database
     */
    async CloseConnection() {
        await this.mongoClient.close();
    }
}

const StudTableDatabase = new DBWork("mongodb://127.0.0.1:27017/");

module.exports = { StudTableDatabase: StudTableDatabase, DBWork };