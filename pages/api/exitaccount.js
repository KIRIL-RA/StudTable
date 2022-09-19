const { UserLoginDataIncorrectError, UserNotFoundError } = require("../../classes/Exceptions/UserExceptions");
const ResponseSamples = require("../../classes/ResponseSamples");
const StatusCodes = require("../static/StatusCodes.json");
import { deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
    // Delete login data 
    deleteCookie("sessionToken", { req, res});
    deleteCookie("userId", { req, res});
    res.send(ResponseSamples.DefaultResponse("Sucessfully exited", StatusCodes.OK));
    return;
}