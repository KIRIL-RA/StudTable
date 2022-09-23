(() => {
var exports = {};
exports.id = 645;
exports.ids = [645];
exports.modules = {

/***/ 984:
/***/ ((module) => {

// Exports
module.exports = {
	"title": "confirmAccounts_title__ve23I",
	"name": "confirmAccounts_name__eIsW1",
	"list__item": "confirmAccounts_list__item__c78wH",
	"list__item_confirmed": "confirmAccounts_list__item_confirmed__FHuyV",
	"decline": "confirmAccounts_decline__UpoPX",
	"accept": "confirmAccounts_accept__2QJJ5"
};


/***/ }),

/***/ 4736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ checkLogin)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);

const parametrs = __webpack_require__(1617);
const statusCodes = __webpack_require__(263);
function checkLogin() {
    fetch(`${parametrs.API_HOST}/checklogin`).then((response)=>response.json()).then((result)=>{
        if (result.statusCode !== statusCodes.OK) next_router__WEBPACK_IMPORTED_MODULE_0___default().push("/login");
    });
};


/***/ }),

/***/ 7613:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);

const parameters = __webpack_require__(1617);
function checkPermissons() {
    fetch(`${parameters.API_HOST}/getspecificpermissions`).then((response)=>response.json()).then((response)=>{
        response.data?.includes("updtt") ? null : next_router__WEBPACK_IMPORTED_MODULE_0___default().push("/timetable");
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkPermissons);


/***/ }),

/***/ 5032:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions_checkLogin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4736);
/* harmony import */ var _functions_checkPermissons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7613);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(984);
/* harmony import */ var _styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_Layout_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3203);
/* harmony import */ var _hooks_useHttps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5492);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(986);







const parameters = __webpack_require__(1617);


const confirmAccounts = ()=>{
    const { request  } = (0,_hooks_useHttps__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
    const { unconfirmed  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state)=>state.reducer);
    const { 0: confirmed , 1: setConfirmed  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const onConfirm = (id)=>{
        let body = {
            userId: id
        };
        request(`${parameters.API_HOST}/confirmaccount`, "POST", JSON.stringify(body)).then((res)=>{
            if (res.statusCode === "100") {
                setConfirmed((confirmed)=>[
                        ...confirmed,
                        id
                    ]);
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        (0,_functions_checkLogin__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
        (0,_functions_checkPermissons__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        dispatch((0,_actions_actions__WEBPACK_IMPORTED_MODULE_7__/* .unconfirmedFetching */ .n3)());
        request(`${parameters.API_HOST}/getunconfirmedaccounts`).then((res)=>dispatch((0,_actions_actions__WEBPACK_IMPORTED_MODULE_7__/* .unconfirmedFetched */ .Ur)(res.data))).catch(()=>dispatch((0,_actions_actions__WEBPACK_IMPORTED_MODULE_7__/* .unconfirmedFetchingError */ .hh)()));
    }, []);
    let unconfirmedList = unconfirmed.map((item)=>{
        if (confirmed?.includes(item.userId)) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().list__item_confirmed),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().name),
                        children: [
                            item.realInfo.firstName,
                            " ",
                            item.realInfo.secondName
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {})
                ]
            }, item.userId);
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().list__item),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().name),
                    children: [
                        item.realInfo.firstName,
                        " ",
                        item.realInfo.secondName
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().decline),
                            children: "Отклонить"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().accept),
                            onClick: ()=>onConfirm(item.userId),
                            children: "Принять"
                        })
                    ]
                })
            ]
        }, item.userId);
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout_Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().title),
                children: "Подтвердить аккаунты:"
            }),
            unconfirmedList,
            unconfirmedList.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_pages_confirmAccounts_module_css__WEBPACK_IMPORTED_MODULE_8___default().title),
                children: "Нет аккаунтов для подтверждения"
            }) : null
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (confirmAccounts);


/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,61,203,589], () => (__webpack_exec__(5032)));
module.exports = __webpack_exports__;

})();