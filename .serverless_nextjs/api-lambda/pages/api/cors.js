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

/***/ 51396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ next_serverless_loaderpage_2Fapi_2Fcors_absolutePagePath_private_next_pages_2Fapi_2Fcors_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_absoluteErrorPath_next_2Fdist_2Fpages_2F_error_absolute404Path_distDir_private_dot_next_buildId_EZOWKL8_GZIESezynrnnb_assetPrefix_generateEtags_true_poweredByHeader_true_canonicalBase_basePath_runtimeConfig_previewProps_7B_22previewModeId_22_3A_22361b70d4b3b9c796a6410bab18aadb80_22_2C_22previewModeSigningKey_22_3A_223418c2fd96d791a9b89540dc2763540807f8a1c89f5355ae0382a237318b3634_22_2C_22previewModeEncryptionKey_22_3A_22b1caa35255b680b273ec1593166d00e8c2207d79fb71bd7206eb3b8f9fd45e5c_22_7D_loadedEnvFiles_W3sicGF0aCI6Ii5lbnYiLCJjb250ZW50cyI6IkFXU19BQ0NFU1NfS0VZX0lEPUFLSUFYUkYyTjVVV0FJU0NFSVBLXG5BV1NfU0VDUkVUX0FDQ0VTU19LRVk9UTY1dlZhcjJvSkpTSHpyUVA4NWFXbEhITVVObXIwSnBqb1hzV3Q1blxuIn1d_i18n_)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-fetch.js
var node_polyfill_fetch = __webpack_require__(7157);
;// CONCATENATED MODULE: ./.next/routes-manifest.json
const routes_manifest_namespaceObject = {"Dg":[]};
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-serverless-loader/api-handler.js
var api_handler = __webpack_require__(6249);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-serverless-loader/index.js?page=%2Fapi%2Fcors&absolutePagePath=private-next-pages%2Fapi%2Fcors.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&absoluteErrorPath=next%2Fdist%2Fpages%2F_error&absolute404Path=&distDir=private-dot-next&buildId=EZOWKL8-GZIESezynrnnb&assetPrefix=&generateEtags=true&poweredByHeader=true&canonicalBase=&basePath=&runtimeConfig=&previewProps=%7B%22previewModeId%22%3A%22361b70d4b3b9c796a6410bab18aadb80%22%2C%22previewModeSigningKey%22%3A%223418c2fd96d791a9b89540dc2763540807f8a1c89f5355ae0382a237318b3634%22%2C%22previewModeEncryptionKey%22%3A%22b1caa35255b680b273ec1593166d00e8c2207d79fb71bd7206eb3b8f9fd45e5c%22%7D&loadedEnvFiles=W3sicGF0aCI6Ii5lbnYiLCJjb250ZW50cyI6IkFXU19BQ0NFU1NfS0VZX0lEPUFLSUFYUkYyTjVVV0FJU0NFSVBLXG5BV1NfU0VDUkVUX0FDQ0VTU19LRVk9UTY1dlZhcjJvSkpTSHpyUVA4NWFXbEhITVVObXIwSnBqb1hzV3Q1blxuIn1d&i18n=!

        
      const { processEnv } = __webpack_require__(19936)
      processEnv([{"path":".env","contents":"AWS_ACCESS_KEY_ID=AKIAXRF2N5UWAISCEIPK\nAWS_SECRET_ACCESS_KEY=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\n"}])
    
        
        const runtimeConfig = {}
        ;
        

        

        const combinedRewrites = Array.isArray(routes_manifest_namespaceObject.Dg)
          ? routes_manifest_namespaceObject.Dg
          : []

        if (!Array.isArray(routes_manifest_namespaceObject.Dg)) {
          combinedRewrites.push(...routes_manifest_namespaceObject.Dg.beforeFiles)
          combinedRewrites.push(...routes_manifest_namespaceObject.Dg.afterFiles)
          combinedRewrites.push(...routes_manifest_namespaceObject.Dg.fallback)
        }

        const apiHandler = (0,api_handler/* getApiHandler */.Y)({
          pageModule: __webpack_require__(63449),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/cors",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"361b70d4b3b9c796a6410bab18aadb80",previewModeSigningKey:"3418c2fd96d791a9b89540dc2763540807f8a1c89f5355ae0382a237318b3634",previewModeEncryptionKey:"b1caa35255b680b273ec1593166d00e8c2207d79fb71bd7206eb3b8f9fd45e5c"}
        })
        /* harmony default export */ const next_serverless_loaderpage_2Fapi_2Fcors_absolutePagePath_private_next_pages_2Fapi_2Fcors_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_absoluteErrorPath_next_2Fdist_2Fpages_2F_error_absolute404Path_distDir_private_dot_next_buildId_EZOWKL8_GZIESezynrnnb_assetPrefix_generateEtags_true_poweredByHeader_true_canonicalBase_basePath_runtimeConfig_previewProps_7B_22previewModeId_22_3A_22361b70d4b3b9c796a6410bab18aadb80_22_2C_22previewModeSigningKey_22_3A_223418c2fd96d791a9b89540dc2763540807f8a1c89f5355ae0382a237318b3634_22_2C_22previewModeEncryptionKey_22_3A_22b1caa35255b680b273ec1593166d00e8c2207d79fb71bd7206eb3b8f9fd45e5c_22_7D_loadedEnvFiles_W3sicGF0aCI6Ii5lbnYiLCJjb250ZW50cyI6IkFXU19BQ0NFU1NfS0VZX0lEPUFLSUFYUkYyTjVVV0FJU0NFSVBLXG5BV1NfU0VDUkVUX0FDQ0VTU19LRVk9UTY1dlZhcjJvSkpTSHpyUVA4NWFXbEhITVVObXIwSnBqb1hzV3Q1blxuIn1d_i18n_ = (apiHandler);
      

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
        'GET',
        'POST',
        'OPTIONS'
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
        console.log('USER SENT REQUEST', req.query.params);
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
var __webpack_exports__ = __webpack_require__.X(0, [507], () => (__webpack_exec__(51396)));
module.exports = __webpack_exports__;

})();