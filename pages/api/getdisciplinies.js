const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const TableTypes = require("../static/TableTypes.json");
const { DayOfWeek, SpecificDay } = require("../../classes/TimeTable");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithToken } = require("../../classes/User");
const {Academy} = require("../../classes/Academy");
import { getCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let userId = getCookie('userId', {req, res});
    let sessionToken = getCookie('sessionToken', {req, res});
    let direction = req.body.direction;

    if (userId === undefined ||
        sessionToken === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Login data not recieved", StatusCodes.USER_LOGIN_ERROR));
        return;
    }

    try{
        // Check is session data is valid
        await Database.Connect();
        let academyInfo;
        let user = new UserWithToken(userId, sessionToken, Database);
        let disciplinies;
        await user.Login();
        academyInfo = user.userData.academy;

        let academy = new Academy(Database, academyInfo.id);
        await academy.Init();

        // If user wants to get available only for his direction disciplinies
        if(direction === undefined) disciplinies = academy.GetDisciplinies(academyInfo.directionId, academyInfo.faculty);

        res.setHeader('Accept-Encoding','gzip, deflate, br');
        res.setHeader('Accept-Language','ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
        res.setHeader('Content-Type', 'application/json');
        res.send(ResponseSamples.Data(disciplinies, StatusCodes.OK));
   }

    catch(e){
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