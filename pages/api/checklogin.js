const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples")
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
        await Database.Connect();
        let user = new UserWithToken(userId, sessionToken, Database);

        await user.Login();

        res.send(ResponseSamples.DefaultResponse("Logined", StatusCodes.OK));
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
                res.send(ResponseSamples.DefaultResponse("Error check login data", StatusCodes.ERROR_CHECK_USER_LOGIN_DATA));
                return;
        }
    }
}