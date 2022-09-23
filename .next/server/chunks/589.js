"use strict";
exports.id = 589;
exports.ids = [589];
exports.modules = {

/***/ 986:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DI": () => (/* binding */ userFetchingError),
/* harmony export */   "OL": () => (/* binding */ setSelectedDay),
/* harmony export */   "Ur": () => (/* binding */ unconfirmedFetched),
/* harmony export */   "V3": () => (/* binding */ userFetched),
/* harmony export */   "Wn": () => (/* binding */ timetableFetching),
/* harmony export */   "bC": () => (/* binding */ discliplinesFetching),
/* harmony export */   "hR": () => (/* binding */ userFetching),
/* harmony export */   "hh": () => (/* binding */ unconfirmedFetchingError),
/* harmony export */   "k9": () => (/* binding */ discliplinesFetched),
/* harmony export */   "n3": () => (/* binding */ unconfirmedFetching),
/* harmony export */   "uC": () => (/* binding */ discliplinesFetchingError),
/* harmony export */   "wF": () => (/* binding */ timetableFetchingError),
/* harmony export */   "x5": () => (/* binding */ timetableFetched)
/* harmony export */ });
const setSelectedDay = (value)=>{
    return {
        type: "SET_SELECTED_DAY",
        payload: value
    };
};
const timetableFetching = ()=>{
    return {
        type: "TIMETABLE_FETCHING"
    };
};
const timetableFetched = (timetable)=>{
    return {
        type: "TIMETABLE_FETCHED",
        payload: timetable
    };
};
const timetableFetchingError = ()=>{
    return {
        type: "TIMETABLE_FETCHING_ERROR"
    };
};
const discliplinesFetching = ()=>{
    return {
        type: "DISCLIPLINES_FETCHING"
    };
};
const discliplinesFetched = (discliplines)=>{
    return {
        type: "DISCLIPLINES_FETCHED",
        payload: discliplines
    };
};
const discliplinesFetchingError = ()=>{
    return {
        type: "DISCLIPLINES_FETCHING_ERROR"
    };
};
const userFetching = ()=>{
    return {
        type: "USER_FETCHING"
    };
};
const userFetched = (user)=>{
    return {
        type: "USER_FETCHED",
        payload: user
    };
};
const userFetchingError = ()=>{
    return {
        type: "USER_FETCHING_ERROR"
    };
};
const unconfirmedFetching = ()=>{
    return {
        type: "UNCONFIRMED_FETCHING"
    };
};
const unconfirmedFetched = (array)=>{
    return {
        type: "UNCONFIRMED_FETCHED",
        payload: array
    };
};
const unconfirmedFetchingError = ()=>{
    return {
        type: "UNCONFIRMED_FETCHING_ERROR"
    };
};


/***/ }),

/***/ 5492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useHttp = ()=>{
    const request = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(async (url, method = "GET", body = null, headers = {
        "Content-Type": "application/json"
    })=>{
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    }, []);
    return {
        request
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useHttp);


/***/ }),

/***/ 263:
/***/ ((module) => {

module.exports = JSON.parse('{"NOT_ALL_PARAMETERS_WERE_RECIEVED":"20","INCORRECT_REQUEST":"80","OPERATION_FAILED":"90","NOT_FOUNDED":"70","OK":"100","USER_LOGIN_ERROR":"110","ERROR_CHECK_USER_LOGIN_DATA":"120","DATE_CONFLICT":"130","QUALIFICATION_ERROR":"140","USERNAME_ALREADY_EXIST":"150"}');

/***/ }),

/***/ 1617:
/***/ ((module) => {

module.exports = {"API_HOST":"/api"};

/***/ })

};
;