const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const TableTypes = require("../static/TableTypes.json");
const { DayOfWeek } = require("../../classes/TimeTable");
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
                let academyInfo = user.userData.academy;
                let dayTimeTable = new DayOfWeek(Database, day, academyInfo.id, academyInfo.directionId, academyInfo.group);
                let timeTable = await dayTimeTable.GetTimeTable();

                res.send(ResponseSamples.Data(timeTable, StatusCodes.OK));
                break;
        }
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