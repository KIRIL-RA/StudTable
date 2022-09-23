"use strict";
(() => {
var exports = {};
exports.id = 221;
exports.ids = [221];
exports.modules = {

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 4033:
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
    if (userId === undefined || sessionToken === undefined) {
        // If not all parameters were recieved send response
        res.send(ResponseSamples.DefaultResponse("Login data not recieved", StatusCodes.USER_LOGIN_ERROR));
        return;
    }
    // Check is user exist and login data correct
    try {
        // Connecting to DB and create user copy
        await Database.Connect();
        let user = new UserWithToken(userId, sessionToken, Database);
        await user.Login();
        let userData = user.userData;
        res.setHeader("Accept-Encoding", "gzip, deflate, br");
        res.setHeader("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7");
        res.setHeader("Content-Type", "application/json");
        res.send(ResponseSamples.Data(userData, StatusCodes.OK));
        return;
    } // Catching errors
    catch (e) {
        switch(e.name){
            case new UserNotFoundError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return;
            case new UserLoginDataIncorrectError().name:
                res.send(ResponseSamples.DefaultResponse("Incorrect user login data", StatusCodes.USER_LOGIN_ERROR));
                return;
            default:
                res.send(ResponseSamples.DefaultResponse("Error get user data", StatusCodes.ERROR_CHECK_USER_LOGIN_DATA));
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
var __webpack_exports__ = __webpack_require__.X(0, [805,442], () => (__webpack_exec__(4033)));
module.exports = __webpack_exports__;

})();