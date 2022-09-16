const { UserLoginDataIncorrectError, UserNotFoundError, UserNameAlreadyExist } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const AccountTypes = require("../static/AccountTypes.json");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithPassword } = require("../../classes/User");
import { setCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let userName = req.body.userName;
    let userPassword = req.body.password;
    let userEmail = req.body.email;
    let registryData = req.body;
    let realInfo = req.body.realInfo;

    if (userName === undefined ||
        userPassword === undefined ||
        userEmail === undefined) {
        // If not all parameters were recieved send response, and stop saving file
        res.end(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
        return;
    }

    // Registry new user
    try {
        // Connecting to DB
        await Database.Connect();
        let user = new UserWithPassword(userName, userPassword, Database);

        await user.Registry(registryData.accountType, registryData.academyInfo, userEmail, realInfo);

        res.send(ResponseSamples.DefaultResponse("Sucessfully registrated", StatusCodes.OK));
        return;
    }

    // Catching errors
    catch (e) {
        switch (e.name) {
            case new UserNameAlreadyExist().name:
                res.send(ResponseSamples.DefaultResponse("User name already exist", StatusCodes.USERNAME_ALREADY_EXIST));
                return;

            default:
                res.send(ResponseSamples.DefaultResponse("Error registry user", StatusCodes.ERROR_CHECK_USER_LOGIN_DATA));
                return;
        }
    }
}