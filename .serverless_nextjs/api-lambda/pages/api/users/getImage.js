"use strict";
(() => {
var exports = {};
exports.id = 42;
exports.ids = [42];
exports.modules = {

/***/ 25990:
/***/ ((module) => {

module.exports = require("aws-sdk");

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

/***/ 22392:
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
      processEnv([{"path":".env","contents":"AWS_ACCESS_KEY_ID=AKIAXRF2N5UWPIIKMK7J\nAWS_SECRET_ACCESS_KEY=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\nAWS_REGION=us-east-1\n\nCLEARBIT_APIKEY=sk_6bcc4eeacc2e0695ccd95e414e0633a6\nLOCAL_DYNAMO_DB_ENDPOINT=http://localhost:8000"}])
    
        
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
          pageModule: __webpack_require__(10564),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/users/getImage",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"b69521bbb9025f9c9b950a08bdb14a8c",previewModeSigningKey:"aaed18208d04526bd1808630cf7ec7ca146bdfeca7cde8474c217d98ae3fdf94",previewModeEncryptionKey:"188be8412dfcecede6ced50cc022815391ce5aa17e8f6c7c9bda3b22b40e5a0c"}
        })
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiHandler);
      

/***/ }),

/***/ 10564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25990);
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);

aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().config.update({
    region: "us-east-1"
});
function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString("base64");
    return base64;
}
const getAllUsersHandler = async (req, res1)=>{
    try {
        const s3 = new (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().S3)({
            region: "us-east-1"
        });
        // Setting up S3 upload parameters
        const params = {
            Bucket: "test-pfp-images",
            Key: `images/${req.query.uuid}/profileImage.jpg`
        };
        const data = await s3.getObject(params).promise().then((res)=>{
            let url = encode(res.Body);
            return url;
        });
        return res1.status(200).json(JSON.stringify(data));
    } catch  {
        res1.status(404).json("Image not found");
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAllUsersHandler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [930,800], () => (__webpack_exec__(22392)));
module.exports = __webpack_exports__;

})();