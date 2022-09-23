"use strict";
(() => {
var exports = {};
exports.id = 94;
exports.ids = [94];
exports.modules = {

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8982);
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_0__);
const { UserLoginDataIncorrectError , UserNotFoundError  } = __webpack_require__(1011);
const ResponseSamples = __webpack_require__(8573);
const StatusCodes = __webpack_require__(4592);
const Actions = __webpack_require__(1476);
const { DayOfWeek , SpecificDay  } = __webpack_require__(3341);
const { DBWork , StudTableDatabase  } = __webpack_require__(1799);
const { UserWithToken  } = __webpack_require__(4442);
const { Academy  } = __webpack_require__(749);

var Database = StudTableDatabase;
async function handler(req, res) {
    let request = req.body.request;
    let academyId = req.body.academyId;
    let faculty = req.body.faculty;
    try {
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
        res.setHeader("Accept-Encoding", "gzip, deflate, br");
        res.setHeader("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7");
        res.setHeader("Content-Type", "application/json");
        res.send(ResponseSamples.Data(result, StatusCodes.OK));
    } catch (e) {
        switch(e.name){
            case new UserNotFoundError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return;
            case new UserLoginDataIncorrectError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return;
            default:
                res.send(ResponseSamples.DefaultResponse(e.message, StatusCodes.OPERATION_FAILED));
                return;
        }
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [805,442,341,749], () => (__webpack_exec__(773)));
module.exports = __webpack_exports__;

})();