const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const Actions = require("../static/Actions.json");
const { DayOfWeek, SpecificDay } = require("../../classes/TimeTable");
const { DBWork, StudTableDatabase } = require('../../classes/databaseWork');
const { UserWithToken } = require("../../classes/User");
const {Academy} = require("../../classes/Academy");
import { getCookie } from 'cookies-next';
var Database = StudTableDatabase;

export default async function handler(req, res) {
    let request = req.body.request;
    let academyId = req.body.academyId;
    let faculty = req.body.faculty;

    try{
        // Check is session data is valid
        await Database.Connect();
        let academy;
        let result;

        switch(request){
            case Actions.GET_ACADEMIES:
                academy = new Academy(Database, undefined);
                result = await academy.GetAcademies();
                break;

            case Actions.GET_FACULTIES:
                academy = new Academy(Database, academyId);
                await academy.Init();

                result = academy.GetFaculties(true);
                break;

            case Actions.GET_DIRECTIONS:
                academy = new Academy(Database, academyId);
                await academy.Init();

                result = academy.GetDirections(faculty, true);
                break;

            default:
                break;
        }

        res.setHeader('Accept-Encoding','gzip, deflate, br');
        res.setHeader('Accept-Language','ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
        res.setHeader('Content-Type', 'application/json');
        res.send(ResponseSamples.Data(result, StatusCodes.OK));
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