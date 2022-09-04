const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
const { DBWork, zkDB } = require('../../classes/databaseWork');
const { UserWithToken } = require("../../classes/User");
const { Farm } = require('../../classes/Farm');
import { getCookie } from 'cookies-next';
var Database = zkDB;

export default async function handler(req, res, next) {
    let userId = getCookie('userId', {req, res});
    let sessionToken = getCookie('sessionToken', {req, res});;
    let request = req.body.request;
    let farmId = req.body.farmId;
    let taskId = req.body.taskId;
    let workerId = req.body.workerId;

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

    try {
        await Database.Connect();
        let user = new UserWithToken(userId, sessionToken, Database);

        await user.Login();
        let data = {};
        let userFarms = [];
        let foundedFarm;
        let farm;

        // If client wants to get data about cultures
        if (request.find(el => el == "cultures") != undefined) data.cultures = await user.GetAvailableCultures();


        if (request.find(el => el == "farms") != undefined) {
            // If client wants to get data about farms
            userFarms = user.userData.farms;
            data.farms = [];

            // Getting needed data from all user farms
            for (let farm_ = 0; farm_ < userFarms.length; farm_++) {
                let farm = new Farm(userFarms[farm_].id, Database);
                await farm.Login();
                data.farms.push({ name: farm.data.name, id: farm.data.farm_id });
            };

        }

        if (request.find(el => el == "activetasks") != undefined) {

            if (farmId === undefined) {
                // If not all parameters were recieved send response
                res.end(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                return;
            }

            // Search in owned to user farms
            foundedFarm = undefined;
            userFarms = user.userData.farms;
            foundedFarm = userFarms.find((element, index, array) => element.id == farmId);
            if (foundedFarm == undefined) {
                res.send(ResponseSamples.DefaultResponse("Farm not found", StatusCodes.NOT_FOUNDED));
                return;
            }

            // Get farm tasks
            farm = new Farm(foundedFarm.id, Database);
            await farm.Login();
            data.activeTasks = await farm.GetTasks("active");
        }

        if (request.find(el => el == "task") != undefined) {

            if (taskId === undefined) {
                // If not all parameters were recieved send response
                res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                return;
            }

            // Searching task in db
            userFarms = user.userData.farms;
            let task = await Database.GetData("Task", { id: Number(taskId) });
            if (userFarms.find(farm => farm.id == task.manufactureId) === undefined) {
                // Check if task not owned to user
                res.send(ResponseSamples.DefaultResponse("Task doesn't exist or not owned to user", StatusCodes.NOT_FOUNDED));
                return;
            }

            // Get workers and cultures info
            let farm = new Farm(task.manufactureId, Database);
            await farm.Login();
            let workers = await farm.GetWorkers();
            let cultures = await user.GetAvailableCultures();

            let cultureInfo = cultures.find(culture => culture.culture_id === task.cultureId);

            task.cultureInfo = cultureInfo;
            data.task = task;
        }

        if (request.find(el => el == "workers") != undefined) {

            if (farmId === undefined) {
                // If not all parameters were recieved send response
                res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                return;
            }

            // Search in owned to user farms
            foundedFarm = undefined;
            userFarms = user.userData.farms;
            foundedFarm = userFarms.find((element, index, array) => element.id == farmId);
            if (foundedFarm == undefined) res.send(ResponseSamples.DefaultResponse("Farm not found", StatusCodes.NOT_FOUNDED));

            // Get farm workers
            farm = new Farm(foundedFarm.id, Database);
            await farm.Login();
            data.workers = await farm.GetWorkers();

        }
        
        if (request.find(el => el == "workers") != undefined) {
            if (workerId === undefined ||
                farmId === undefined) {
                // If not all parameters were recieved send response
                res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                return;
            }

            foundedFarm = userFarms.find((element, index, array) => element.id == farmId);
            if (foundedFarm == undefined) res.send(ResponseSamples.DefaultResponse("Farm not found", StatusCodes.NOT_FOUNDED));

            // Get farm worker
            farm = new Farm(foundedFarm.id, Database);
            await farm.Login();
            let workerData = await farm.GetWorker(workerId);

            data.worker = workerData;
        }

        res.send(ResponseSamples.Data(data, StatusCodes.OK));

        return;
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