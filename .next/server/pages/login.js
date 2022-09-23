(() => {
var exports = {};
exports.id = 459;
exports.ids = [459];
exports.modules = {

/***/ 3897:
/***/ ((module) => {

// Exports
module.exports = {
	"login__wrapper": "login_login__wrapper__ngAPz",
	"login__title": "login_login__title__C3B_B",
	"form__wrapper": "login_form__wrapper__g1r8i",
	"form__input": "login_form__input__1AyKk",
	"form__button": "login_form__button__rJknA",
	"form__error": "login_form__error__TZwJH"
};


/***/ }),

/***/ 4984:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3897);
/* harmony import */ var _styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5__);





const parameters = __webpack_require__(1617);

const login = ()=>{
    const { 0: serverError , 1: setServerError  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        fetch(`${parameters.API_HOST}/checklogin`).then((res)=>res.json()).then((result)=>result.statusCode === "100" ? next_router__WEBPACK_IMPORTED_MODULE_3___default().push("/timetable") : null);
    // eslint-disable-next-line
    }, []);
    const formik = (0,formik__WEBPACK_IMPORTED_MODULE_1__.useFormik)({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: yup__WEBPACK_IMPORTED_MODULE_2__.object({
            username: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Обязательное поле!"),
            password: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Обязательное поле!")
        }),
        onSubmit: (values)=>{
            let body = `/login?username=${values.username}&password=${values.password}`;
            fetch(`${parameters.API_HOST}${body}`).then((res)=>res.json()).then((result)=>{
                if (result.statusCode === "100") next_router__WEBPACK_IMPORTED_MODULE_3___default().push("/timetable");
                if (result.statusCode === "110") setServerError("Неправильное имя пользователя или пароль");
                if (result.statusCode !== "100" && result.statusCode !== "110") setServerError("Что-то не так, перезагрузите страницу");
            });
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        if (formik.touched.username || formik.touched.password) setServerError("");
    }, [
        formik.values.username,
        formik.values.password
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().login__wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().login__title),
                children: "StubTable!"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                onSubmit: formik.handleSubmit,
                className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__wrapper),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__input),
                        type: "text",
                        value: formik.values.username,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                        name: "username",
                        placeholder: "Имя пользователя"
                    }),
                    formik.errors.username && formik.touched.username ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__error),
                        children: formik.errors.username
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__input),
                        type: "text",
                        value: formik.values.password,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                        name: "password",
                        placeholder: "Пароль"
                    }),
                    formik.errors.password && formik.touched.password ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__error),
                        children: formik.errors.password
                    }) : null,
                    serverError !== "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__error),
                        children: serverError
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "submit",
                        className: (_styles_pages_login_module_css__WEBPACK_IMPORTED_MODULE_5___default().form__button),
                        children: "Войти"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (login);


/***/ }),

/***/ 2296:
/***/ ((module) => {

"use strict";
module.exports = require("formik");

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

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5609:
/***/ ((module) => {

"use strict";
module.exports = require("yup");

/***/ }),

/***/ 1617:
/***/ ((module) => {

"use strict";
module.exports = {"API_HOST":"/api"};

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4984));
module.exports = __webpack_exports__;

})();