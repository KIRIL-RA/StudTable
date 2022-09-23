exports.id = 203;
exports.ids = [203];
exports.modules = {

/***/ 8118:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "Layout_wrapper__pGf4r",
	"container": "Layout_container__K9hpm",
	"logo": "Layout_logo__AuZPt"
};


/***/ }),

/***/ 3203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./components/Layout/Layout.module.css
var Layout_module = __webpack_require__(8118);
var Layout_module_default = /*#__PURE__*/__webpack_require__.n(Layout_module);
;// CONCATENATED MODULE: ./images/toActionPage.png
/* harmony default export */ const toActionPage = ({"src":"/_next/static/media/toActionPage.03808b97.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAPUlEQVR42mWNoREAIAwDf3/PGiC4Y4tyh2SMIqqJbvMmiUigMekM0ZlKXALnCSeUqhYHYwuTW7XIqqP59gP+rSXlpXgMQwAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./images/profile.png
/* harmony default export */ const profile = ({"src":"/_next/static/media/profile.dd830eb9.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAV0lEQVR42i3HLQ6CYAAA0LevmERN6szOM8jG+DsPYxRGgQIJEonrQmAvPQLumsMDARilEhPAVwdaPwjoFTLDOU+bxWzzgqvVB7ytIiolLgdyNX83AJF4BwLQCyeNu7i4AAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./components/Layout/Layout.js






const Layout = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Layout_module_default()).wrapper,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/actions",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        className: (Layout_module_default()).first,
                        src: toActionPage,
                        width: "30",
                        height: "30"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/timetable",
                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: (Layout_module_default()).logo,
                    children: "Studtable"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/profile",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        className: (Layout_module_default()).first,
                        src: profile,
                        width: "30",
                        height: "30"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const Layout_Layout = (Layout);


/***/ })

};
;