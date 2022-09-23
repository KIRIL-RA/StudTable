(() => {
var exports = {};
exports.id = 907;
exports.ids = [907];
exports.modules = {

/***/ 3658:
/***/ ((module) => {

// Exports
module.exports = {
	"pageWrapper": "registration_pageWrapper__ZbIz5",
	"input": "registration_input__F0Hkd",
	"button": "registration_button__XqPaz",
	"select": "registration_select__IIhG4",
	"error": "registration_error__ftuLS",
	"formWrapper": "registration_formWrapper__js3n1"
};


/***/ }),

/***/ 5492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 5256:
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useHttps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5492);
/* harmony import */ var _styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3658);
/* harmony import */ var _styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);





const parameters = __webpack_require__(1617);


const registration = ()=>{
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        fetch(`${parameters.API_HOST}/checklogin`).then((res)=>res.json()).then((result)=>result.statusCode === "100" ? next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/timetable") : null);
    // eslint-disable-next-line
    }, []);
    const { request  } = (0,_hooks_useHttps__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const { 0: university , 1: setUniversity  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: faculties , 1: setFaculties  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: directions , 1: setDerections  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const formik = (0,formik__WEBPACK_IMPORTED_MODULE_1__.useFormik)({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            accountType: "",
            firstName: "",
            secondName: "",
            lastName: "",
            academy: "",
            faculty: "",
            direction: "",
            groupe: "",
            course: "",
            studentIdNumber: ""
        },
        validationSchema: yup__WEBPACK_IMPORTED_MODULE_2__.object({
            username: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите имя пользователя!"),
            email: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите почту!"),
            password: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите пароль!"),
            confirmPassword: yup__WEBPACK_IMPORTED_MODULE_2__.string().oneOf([
                yup__WEBPACK_IMPORTED_MODULE_2__.ref("password"),
                null
            ], "Пароль должен совпадать!").required("Подтвердите пароль!"),
            accountType: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Выберете тип аккаунта!"),
            firstName: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите имя!"),
            secondName: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите фамилию!"),
            lastName: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите отчество!"),
            academy: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Выберете университет!"),
            faculty: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Выберете факультет!"),
            direction: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Выберете направление!"),
            groupe: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите группу!"),
            course: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Выберете курс!"),
            studentIdNumber: yup__WEBPACK_IMPORTED_MODULE_2__.string().required("Введите номер студенческого!")
        }),
        onSubmit: (values)=>{
            let registrationInfo = {
                userName: formik.values.username,
                email: formik.values.email,
                password: formik.values.password,
                accountType: formik.values.accountType,
                academyInfo: {
                    id: formik.values.academy,
                    directionId: formik.values.direction,
                    group: formik.values.groupe,
                    faculty: formik.values.faculty,
                    course: formik.values.course,
                    studentIdNumber: formik.values.studentIdNumber
                },
                realInfo: {
                    firstName: formik.values.firstName,
                    secondName: formik.values.secondName,
                    lastName: formik.values.lastName
                }
            };
            request(`${parameters.API_HOST}/registryuser`, "POST", JSON.stringify(registrationInfo)).then((res)=>{
                if (res.statusCode === "100") {
                    next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/login");
                } else {
                    setError(res.Status);
                }
            });
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        let body = {
            request: "ga"
        };
        request(`${parameters.API_HOST}/getacademyinfo`, "POST", JSON.stringify(body)).then((res)=>setUniversity(res.data));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (formik.values.academy) {
            let body = {
                request: "gf",
                academyId: formik.values.academy
            };
            request(`${parameters.API_HOST}/getacademyinfo`, "POST", JSON.stringify(body)).then((res)=>setFaculties(res.data));
        }
    }, [
        formik.values.academy
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (formik.values.academy && formik.values.faculty) {
            let body = {
                request: "gd",
                academyId: formik.values.academy,
                faculty: formik.values.faculty
            };
            request(`${parameters.API_HOST}/getacademyinfo`, "POST", JSON.stringify(body)).then((res)=>setDerections(res.data));
        }
    }, [
        formik.values.faculty
    ]);
    let universityList = university.map((item)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
            value: item.id,
            children: item.name
        }, item.id);
    });
    let facultiesList = Object.keys(faculties).map((item)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
            value: item,
            children: faculties[item]?.name
        }, item);
    });
    let derectionList = Object.keys(directions).map((item)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
            value: item,
            children: directions[item]?.name
        }, item);
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().pageWrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                children: "Добро пожаловать в Studtable!"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                children: "Пройдите регистрацию перед началом"
            }),
            error ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                children: error
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                onSubmit: formik.handleSubmit,
                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().formWrapper),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "username",
                        placeholder: "Логин",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.username && formik.touched.username ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.username
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "email",
                        placeholder: "Почта",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.email && formik.touched.email ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.email
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "password",
                        placeholder: "Пароль",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.password && formik.touched.password ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.password
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "confirmPassword",
                        placeholder: "Подтвердите пароль",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.confirmPassword && formik.touched.confirmPassword ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.confirmPassword
                    }) : null,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().select),
                        name: "accountType",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: "",
                                children: "Выберите тип аккаунта"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: "Student",
                                children: "Студент"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: "GroupHeadman",
                                children: "Староста"
                            })
                        ]
                    }),
                    formik.errors.accountType && formik.touched.accountType ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.accountType
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "firstName",
                        placeholder: "Имя",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.firstName && formik.touched.firstName ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.firstName
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "secondName",
                        placeholder: "Фамилия",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.secondName && formik.touched.secondName ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.secondName
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                        name: "lastName",
                        placeholder: "Отчество",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur
                    }),
                    formik.errors.lastName && formik.touched.lastName ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.lastName
                    }) : null,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().select),
                        name: "academy",
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: "",
                                children: "Выберите университет"
                            }),
                            universityList
                        ]
                    }),
                    formik.errors.academy && formik.touched.academy ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                        children: formik.errors.academy
                    }) : null,
                    formik.values.academy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().select),
                                name: "faculty",
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "",
                                        children: "Выберите факультет"
                                    }),
                                    facultiesList
                                ]
                            }),
                            formik.errors.faculty && formik.touched.faculty ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                                children: formik.errors.faculty
                            }) : null
                        ]
                    }) : null,
                    formik.values.faculty ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().select),
                                name: "direction",
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "",
                                        children: "Выберите направление"
                                    }),
                                    derectionList
                                ]
                            }),
                            formik.errors.direction && formik.touched.direction ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                                children: formik.errors.direction
                            }) : null
                        ]
                    }) : null,
                    formik.values.direction ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                name: "groupe",
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                                placeholder: "Группа",
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur
                            }),
                            formik.errors.groupe && formik.touched.groupe ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                                children: formik.errors.groupe
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().select),
                                name: "course",
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "",
                                        children: "Выберите курс"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "1",
                                        children: "1"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "2",
                                        children: "2"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "3",
                                        children: "3"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "4",
                                        children: "4"
                                    })
                                ]
                            }),
                            formik.errors.course && formik.touched.course ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                                children: formik.errors.course
                            }) : null,
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),
                                name: "studentIdNumber",
                                placeholder: "Номер студенческого",
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur
                            }),
                            formik.errors.studentIdNumber && formik.touched.studentIdNumber ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().error),
                                children: formik.errors.studentIdNumber
                            }) : null
                        ]
                    }) : null,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "submit",
                        className: (_styles_pages_registration_module_css__WEBPACK_IMPORTED_MODULE_6___default().button),
                        children: "Подтвердить"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registration);


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
var __webpack_exports__ = (__webpack_exec__(5256));
module.exports = __webpack_exports__;

})();