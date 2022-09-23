"use strict";
(() => {
var exports = {};
exports.id = 994;
exports.ids = [994];
exports.modules = {

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 7202:
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
const { UserWithPassword  } = __webpack_require__(4442);

var Database = StudTableDatabase;
async function handler(req, res) {
    let userName = req.query.username;
    let userPassword = req.query.password;
    if (userName === undefined || userPassword === undefined) {
        // If not all parameters were recieved send response, and stop saving file
        res.end(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
        return;
    }
    // Check is user exist and login data correct
    try {
        // Connecting to DB and create user copy
        await Database.Connect();
        let user = new UserWithPassword(userName, userPassword, Database);
        await user.Login();
        await user.CreateNewSession();
        let userData = user.userData;
        (0,cookies_next__WEBPACK_IMPORTED_MODULE_0__.setCookie)("sessionToken", userData.sessionToken, {
            req,
            res,
            maxAge: 60 * 60 * 24,
            httpOnly: true
        });
        (0,cookies_next__WEBPACK_IMPORTED_MODULE_0__.setCookie)("userId", userData.userId, {
            req,
            res,
            maxAge: 60 * 60 * 24,
            httpOnly: true
        });
        res.send(ResponseSamples.DefaultResponse("Sucessfully logined", StatusCodes.OK));
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
                res.send(ResponseSamples.DefaultResponse("Error check login data", StatusCodes.ERROR_CHECK_USER_LOGIN_DATA));
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
var __webpack_exports__ = __webpack_require__.X(0, [805,442], () => (__webpack_exec__(7202)));
module.exports = __webpack_exports__;

})();