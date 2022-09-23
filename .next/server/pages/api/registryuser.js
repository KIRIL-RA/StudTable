"use strict";
(() => {
var exports = {};
exports.id = 266;
exports.ids = [266];
exports.modules = {

/***/ 8982:
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 6746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8982);
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_0__);
const { UserLoginDataIncorrectError , UserNotFoundError , UserNameAlreadyExist  } = __webpack_require__(1011);
const ResponseSamples = __webpack_require__(8573);
const StatusCodes = __webpack_require__(4592);
const AccountTypes = __webpack_require__(8922);
const { DBWork , StudTableDatabase  } = __webpack_require__(1799);
const { UserWithPassword  } = __webpack_require__(4442);

var Database = StudTableDatabase;
async function handler(req, res) {
    let userName = req.body.userName;
    let userPassword = req.body.password;
    let userEmail = req.body.email;
    let registryData = req.body;
    let realInfo = req.body.realInfo;
    if (userName === undefined || userPassword === undefined || userEmail === undefined) {
        // If not all parameters were recieved send response, and stop saving file
        res.end(ResponseSamples.DefaultResponse("Not all parameters were recieved", StatusCodes.NOT_ALL_PARAMETERS_WERE_RECIEVED));
        return;
    }
    // Registry new user
    try {
        // Connecting to DB
        await Database.Connect();
        let user = new UserWithPassword(userName, userPassword, Database);
        await user.Registry(registryData.accountType, registryData.academyInfo, userEmail, realInfo);
        res.send(ResponseSamples.DefaultResponse("Sucessfully registrated", StatusCodes.OK));
        return;
    } // Catching errors
    catch (e) {
        switch(e.name){
            case new UserNameAlreadyExist().name:
                res.send(ResponseSamples.DefaultResponse("User name already exist", StatusCodes.USERNAME_ALREADY_EXIST));
                return;
            default:
                res.send(ResponseSamples.DefaultResponse("Error registry user", StatusCodes.ERROR_CHECK_USER_LOGIN_DATA));
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
var __webpack_exports__ = __webpack_require__.X(0, [805,442], () => (__webpack_exec__(6746)));
module.exports = __webpack_exports__;

})();