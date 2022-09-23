"use strict";
(() => {
var exports = {};
exports.id = 393;
exports.ids = [393];
exports.modules = {

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 2260:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8982);
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_0__);
const { UserLoginDataIncorrectError , UserNotFoundError , UserHasNoPermission  } = __webpack_require__(1011);
const ResponseSamples = __webpack_require__(8573);
const StatusCodes = __webpack_require__(4592);
const TableTypes = __webpack_require__(8952);
const Actions = __webpack_require__(1476);
const { DayOfWeek  } = __webpack_require__(3341);
const { DBWork , StudTableDatabase  } = __webpack_require__(1799);
const { UserWithToken  } = __webpack_require__(4442);

var Database = StudTableDatabase;
async function handler(req, res) {
    let userId = (0,cookies_next__WEBPACK_IMPORTED_MODULE_0__.getCookie)("userId", {
        req,
        res
    });
    let sessionToken = (0,cookies_next__WEBPACK_IMPORTED_MODULE_0__.getCookie)("sessionToken", {
        req,
        res
    });
    let request = req.body.type;
    let dayToUpdate = req.body.day;
    let changes = req.body.changes;
    if (request === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
        return;
    }
    if (userId === undefined || sessionToken === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Login data not recieved", StatusCodes.USER_LOGIN_ERROR));
        return;
    }
    //try {
    // Check is session data is valid
    await Database.Connect();
    let user = new UserWithToken(userId, sessionToken, Database);
    await user.Login();
    if (!user.CheckPermission(Actions.UPDATE_TIMETABLE)) throw new UserHasNoPermission("Not permitted");
    // What user want to update
    switch(request){
        // If user wants to update permanent timtable
        case TableTypes.PERMANENT:
            if (changes === undefined || dayToUpdate === undefined) {
                // If not all parameters were recieved send response
                res.send(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
                return;
            }
            let academyInfo = user.userData.academy;
            let dayTimeTable = new DayOfWeek(Database, dayToUpdate, academyInfo.id, academyInfo.directionId, academyInfo.group, academyInfo.course, changes);
            await dayTimeTable.UpdateTimeTable();
            break;
    }
    res.send(ResponseSamples.DefaultResponse("Table updated sucessfully", StatusCodes.OK));
/*}

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
    }*/ };


/***/ }),

/***/ 8952:
/***/ ((module) => {

module.exports = JSON.parse('{"PERMANENT":"per","AT_SPECIFIC_DAY":"asd","BY_WEEK":"byWeek"}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [805,442,341], () => (__webpack_exec__(2260)));
module.exports = __webpack_exports__;

})();