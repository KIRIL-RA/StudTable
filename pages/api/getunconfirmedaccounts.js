const { UserLoginDataIncorrectError, UserNotFoundError, UserHasNoPermission } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const AccountTypes = require("../static/AccountTypes.json");
const Actions = require("../static/Actions.json");
const { Academy } = require("../../classes/Academy");
const { DayOfWeek } = require("../../classes/TimeTable");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithToken } = require("../../classes/User");
import { getCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let userId = getCookie('userId', { req, res });
    let sessionToken = getCookie('sessionToken', { req, res });

    if (userId === undefined ||
        sessionToken === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Login data not recieved", StatusCodes.USER_LOGIN_ERROR));
        return;
    }

    try {
        // Check is session data is valid
        await Database.Connect();
        let user = new UserWithToken(userId, sessionToken, Database);
        await user.Login();
        if (!user.CheckPermission(Actions.GET_UNCONFIRMED_ACCOUNTS)) throw new UserHasNoPermission("Not permitted");
        let userData = user.userData;
        let academyInfo = userData.academy;

        let academy = new Academy(Database, academyInfo.id);
        await academy.Init();
        let notConfirmedAccounts = await academy.GetUnconfirmedAccounts(userData.academy.directionId,
            userData.academy.course,
            userData.academy.group,
            AccountTypes.STUDENT);

        res.setHeader('Accept-Encoding', 'gzip, deflate, br');
        res.setHeader('Accept-Language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
        res.setHeader('Content-Type', 'application/json');
        res.send(ResponseSamples.Data(notConfirmedAccounts, StatusCodes.OK));
    }

    catch (e) {
        switch (e.name) {
            case new UserNotFoundError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return

            case new UserLoginDataIncorrectError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return;

            default:
                res.send(ResponseSamples.DefaultResponse(e.message, StatusCodes.OPERATION_FAILED));
                return;
        }
    }
}