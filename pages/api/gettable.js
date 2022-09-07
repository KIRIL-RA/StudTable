const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const TableTypes = require("../static/TableTypes.json");
const { DayOfWeek, SpecificDay } = require("../../classes/TimeTable");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithToken } = require("../../classes/User");
import { getCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let userId = getCookie('userId', {req, res});
    let sessionToken = getCookie('sessionToken', {req, res});
    let request = req.body.request;
    let day = req.body.day;

    if (request === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
        return;
    }

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
        let dayTimeTable;
        let timeTable;
        let user = new UserWithToken(userId, sessionToken, Database);
        await user.Login();

        // What user want to get
        switch(request){

            // If user wants to get permanent timtable
            case TableTypes.PERMANENT:

                if (day === undefined) {
                    // If not all parameters were recieved send response
                    res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                    return;
                }

                // Get time table
                academyInfo = user.userData.academy;
                dayTimeTable = new DayOfWeek(Database, day, academyInfo.id, academyInfo.directionId, academyInfo.group, academyInfo.course);
                timeTable = await dayTimeTable.GetTimeTable();
                timeTable = timeTable[day];
                console.log(timeTable);
                break;

            case TableTypes.AT_SPECIFIC_DAY:

                if (day === undefined) {
                    // If not all parameters were recieved send response
                    res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                    return;
                }

                // Get time table
                academyInfo = user.userData.academy;
                dayTimeTable = new SpecificDay(Database, day, academyInfo.id, academyInfo.directionId, academyInfo.group, academyInfo.course);
                timeTable = await dayTimeTable.GetTimeTable();
                break;
        }

        res.setHeader('Accept-Encoding','gzip, deflate, br');
        res.setHeader('Accept-Language','ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
        res.setHeader('Content-Type', 'application/json');
        res.send(ResponseSamples.Data(timeTable, StatusCodes.OK));
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