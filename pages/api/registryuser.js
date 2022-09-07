const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithPassword } = require("../../classes/User");
import { setCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let userName = req.query.username;
    let userPassword = req.query.password;

    if (userName === undefined ||
        userPassword === undefined) {
        // If not all parameters were recieved send response, and stop saving file
        res.end(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
        return;
    }

    // Check is user exist and login data correct
    try {
        // Connecting to DB and create user copy
        await Database.Connect();
        let user = new UserWithPassword(userName, userPassword, Database);

        await user.Login();
        await user.CreateNewSession();

        let userData = user.userData;
        
        setCookie("sessionToken", userData.sessionToken,{ req, res, maxAge: 60 * 60 * 24, httpOnly: true });
        setCookie("userId", userData.userId,{ req, res, maxAge: 60 * 60 * 24, httpOnly: true });
        res.send(ResponseSamples.DefaultResponse("Sucessfully logined", StatusCodes.OK));
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