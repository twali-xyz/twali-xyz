"use strict";
(() => {
var exports = {};
exports.id = 76;
exports.ids = [76];
exports.modules = {

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 85477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 71576:
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ 39512:
/***/ ((module) => {

module.exports = require("timers");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 28834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7157);
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92800);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6249);

        
      const { processEnv } = __webpack_require__(19936)
      processEnv([{"path":".env","contents":"AWS_ACCESS_KEY_ID=AKIAXRF2N5UWPIIKMK7J\nAWS_SECRET_ACCESS_KEY=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\nAWS_REGION=us-east-1\nNEXT_PUBLIC_GA_TRACKING_ID=G-LEJSEW5LRM\nCLEARBIT_APIKEY=sk_6bcc4eeacc2e0695ccd95e414e0633a6\nLOCAL_DYNAMO_DB_ENDPOINT=http://localhost:8000"}])
    
        
        const runtimeConfig = {}
        ;
        

        

        const combinedRewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
          ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
          : []

        if (!Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)) {
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.beforeFiles */ .Dg.beforeFiles)
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.afterFiles */ .Dg.afterFiles)
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.fallback */ .Dg.fallback)
        }

        const apiHandler = (0,next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .getApiHandler */ .Y)({
          pageModule: __webpack_require__(63449),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/cors",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"453d294e057d87ae5b8fc249ff4b7ed6",previewModeSigningKey:"00390b738bdd27877b6e9909b221a1dcac56607eeff50aa272d7013b7f719434",previewModeEncryptionKey:"07f00f533371a0b9613da9ddef8ebf17bd227215a6d6634604786d9e3b8b768d"}
        })
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiHandler);
      

/***/ }),

/***/ 63449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19783);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_0__);

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
    return (req, res)=>new Promise((resolve, reject)=>{
            middleware(req, res, (result)=>{
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        })
    ;
}
// Initialize the cors middleware
const cors = initMiddleware(// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
cors__WEBPACK_IMPORTED_MODULE_0___default()({
    // Only allow requests with GET, POST and OPTIONS
    methods: [
        "GET",
        "POST",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));
async function handler(req, res) {
    // Run cors
    await cors(req, res);
    // Rest of the API logic
    try {
        const data = await getData(req, res);
        res.status(200).json({
            message: data
        });
    } catch (error) {
        console.error(error);
    }
};
// Clearbit NameToDomain API request
const getData = (req, res)=>{
    return new Promise((resolve, reject)=>{
        var clearbit = __webpack_require__(77772)(process.env.CLEARBIT_APIKEY);
        var Autocomplete = clearbit.NameToDomain;
        console.log("USER SENT REQUEST", req.query.params);
        return resolve(Autocomplete.find({
            name: req.query.params
        }));
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [930,551,800], () => (__webpack_exec__(28834)));
module.exports = __webpack_exports__;

})();