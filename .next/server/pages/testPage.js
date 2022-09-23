"use strict";
(() => {
var exports = {};
exports.id = 498;
exports.ids = [498];
exports.modules = {

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

/***/ 4633:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useHttps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5492);


const parameters = __webpack_require__(1617);
const testPage = ()=>{
    const { request  } = (0,_hooks_useHttps__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
    const onClickedUpdateTTPP = ()=>{
        let body = {
            day: "Friday",
            changes: {
                1: {
                    lessionName: "Math",
                    audience: 409,
                    teacher: "Matcheno P. V.",
                    type: "per"
                },
                2: {
                    numerator: {
                        lessionName: "Math1",
                        audience: 408,
                        teacher: "Matcheno "
                    },
                    denumerator: {
                        lessionName: "Math",
                        audience: 409,
                        teacher: "Matcheno P. V."
                    },
                    type: "byWeek"
                }
            },
            type: "per"
        };
        request(`${parameters.API_HOST}/updatetable`, "POST", JSON.stringify(body));
    };
    const onClickedGetTT = ()=>{
        let body = {
            day: "17.9.2022",
            request: "asd"
        };
        request(`${parameters.API_HOST}/gettable`, "POST", JSON.stringify(body));
    };
    const onClickedGetLessons = ()=>{
        request(`${parameters.API_HOST}/getdisciplinies`, "POST");
    };
    const onClickedCheckLogin = ()=>{
        request(`${parameters.API_HOST}/checklogin`, "POST");
    };
    const onClickedregisryNewUser = ()=>{
        let body = {
            userName: "Popov 12",
            password: "qwerty",
            accountType: "Student",
            email: "anna@dosbox.com",
            realInfo: {
                firstName: "Нацист",
                secondName: "Попов"
            },
            academyInfo: {
                id: "cdfasff",
                directionId: "02.03.01",
                group: "3.2",
                faculty: "Mathematics",
                course: "1",
                studentIdNumber: "707"
            }
        };
        request(`${parameters.API_HOST}/registryuser`, "POST", JSON.stringify(body));
    };
    const onClickedGetInfo = ()=>{
        request(`${parameters.API_HOST}/getuserinfo`, "POST");
    };
    const onClickedGetUncofirmedAccounts = ()=>{
        request(`${parameters.API_HOST}/getunconfirmedaccounts`, "POST");
    };
    const onClickedConfirmAccount = ()=>{
        let body = {
            userId: "7779494225911263"
        };
        request(`${parameters.API_HOST}/confirmaccount`, "POST", JSON.stringify(body));
    };
    const onClickGetSpecialPermicions = ()=>{
        request(`${parameters.API_HOST}/getspecificpermissions`, "POST");
    };
    const onClickGetAcademies = ()=>{
        let body = {
            request: "gd",
            academyId: "cdfasff",
            faculty: "Mathematics"
        };
        request(`${parameters.API_HOST}/getacademyinfo`, "POST", JSON.stringify(body));
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedUpdateTTPP(),
                children: "Update time table permanent permanent"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedGetTT(),
                children: "Get time table"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedGetLessons(),
                children: "Get available lessons"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedCheckLogin(),
                children: "Check login"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedregisryNewUser(),
                children: "Registry new user"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedGetInfo(),
                children: "Get user info"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedGetUncofirmedAccounts(),
                children: "Get uncofirmed accounts"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickedConfirmAccount(),
                children: "Confirm account"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickGetSpecialPermicions(),
                children: "Get special permissions"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>onClickGetAcademies(),
                children: "Get academies"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (testPage);


/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1617:
/***/ ((module) => {

module.exports = {"API_HOST":"/api"};

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4633));
module.exports = __webpack_exports__;

})();