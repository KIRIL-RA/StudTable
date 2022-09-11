const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithToken } = require("../../classes/User");
import { getCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let userId = getCookie('userId', {req, res});
    let sessionToken = getCookie('sessionToken', {req, res});

    if (userId === undefined ||
        sessionToken === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Login data not recieved", StatusCodes.USER_LOGIN_ERROR));
        return;
    }

    // Check is user exist and login data correct
    try {
        // Connecting to DB and create user copy
        await Database.Connect();
        let user = new UserWithToken(userId, sessionToken, Database);

        await user.Login();

        let userData = user.userData;

        res.setHeader('Accept-Encoding','gzip, deflate, br');
        res.setHeader('Accept-Language','ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
        res.setHeader('Content-Type', 'application/json');
        res.send(ResponseSamples.Data(userData, StatusCodes.OK));
        return;
    }

    // Catching errors
    catch (e) {
        switch (e.name) {
            case new UserNotFoundError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return

            case new UserLoginDataIncorrectError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return;

            default:
                res.send(ResponseSamples.DefaultResponse("Error get user data", StatusCodes.ERROR_CHECK_USER_LOGIN_DATA));
                return;
        }
    }
}