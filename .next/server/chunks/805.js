"use strict";
exports.id = 805;
exports.ids = [805];
exports.modules = {

/***/ 1011:
/***/ ((module) => {


class UserNotFoundError extends Error {
    constructor(message){
        super(message);
        this.name = "UserNotFound";
    }
}
class UserLoginDataIncorrectError extends Error {
    constructor(message){
        super(message);
        this.name = "UserLoginDataIncorrect";
    }
}
class UserNotLoginedError extends Error {
    constructor(message){
        super(message);
        this.name = "UserNotLogined";
    }
}
class UserHasNoPermission extends Error {
    constructor(message){
        super(message);
        this.name = "UserHasNoPermission";
    }
}
;
class UserAreadyConfirmed extends Error {
    constructor(message){
        super(message);
        this.name = "UserAlreadyConfirmed";
    }
}
;
class UserNameAlreadyExist extends Error {
    constructor(message){
        super(message);
        this.name = "UserNameAlreadyExists";
    }
}
module.exports = {
    UserNotFoundError,
    UserLoginDataIncorrectError,
    UserNotLoginedError,
    UserHasNoPermission,
    UserAreadyConfirmed,
    UserNameAlreadyExist
};


/***/ }),

/***/ 8573:
/***/ ((module) => {

/**
 * Samples response from server
 */ 
module.exports = {
    /**
     * Sample for default response
     * @param {string} message 
     * @param {number} statusCode 
     * @returns String, contains response status and status code
     */ DefaultResponse (message, statusCode) {
        return `{"Status":"${message}", "statusCode":"${statusCode}"}`;
    },
    ToUserUserData (userData, statusCode) {
        let response = {
            userData: userData,
            statusCode: statusCode
        };
        return JSON.stringify(response);
    },
    Data (data, statusCode) {
        let response = {
            data: data,
            statusCode: statusCode
        };
        return JSON.stringify(response);
    }
};


/***/ }),

/***/ 4592:
/***/ ((module) => {

module.exports = JSON.parse('{"NOT_ALL_PARAMETERS_WERE_RECIEVED":"20","INCORRECT_REQUEST":"80","OPERATION_FAILED":"90","NOT_FOUNDED":"70","OK":"100","USER_LOGIN_ERROR":"110","ERROR_CHECK_USER_LOGIN_DATA":"120","DATE_CONFLICT":"130","QUALIFICATION_ERROR":"140","USERNAME_ALREADY_EXIST":"150"}');

/***/ })

};
;