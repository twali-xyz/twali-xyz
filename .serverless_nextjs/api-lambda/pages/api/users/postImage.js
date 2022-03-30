"use strict";
(() => {
var exports = {};
exports.id = 458;
exports.ids = [458];
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

/***/ 58963:
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
      processEnv([{"path":".env","contents":"AWS_ACCESS_KEY_ID=AKIAXRF2N5UWJVURXJMZ\nAWS_SECRET_ACCESS_KEY=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\nAWS_REGION=us-east-1\nNEXT_PUBLIC_GA_TRACKING_ID=G-LEJSEW5LRM\nCLEARBIT_APIKEY=sk_6bcc4eeacc2e0695ccd95e414e0633a6\nLOCAL_DYNAMO_DB_ENDPOINT=http://localhost:8000"}])
    
        
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
          pageModule: __webpack_require__(74530),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/users/postImage",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"e6934d09c1cd132877bb068545e35710",previewModeSigningKey:"05e16188fd0aa41b188a83ce7473c57051fa88837e1574b54c9e2cb05dd7f090",previewModeEncryptionKey:"59d597e298fb0cbd5f78f042e58edd9c523e4be1a4971f074d6633ca14e7d596"}
        })
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiHandler);
      

/***/ }),

/***/ 74530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ postImage)
});

// EXTERNAL MODULE: ./node_modules/next-connect/dist/index.js
var dist = __webpack_require__(13419);
// EXTERNAL MODULE: ./node_modules/multiparty/index.js
var multiparty = __webpack_require__(50128);
;// CONCATENATED MODULE: ./infrastructure/middleware.js


const middleware = (0,dist/* default */.Z)();
middleware.use(async (req, res, next)=>{
    const form = new multiparty/* Form */.l();
    // Parse form data retrieved from front-end
    await form.parse(req, function(err, fields, files) {
        req.body = fields;
        req.files = files;
        next();
    });
});
/* harmony default export */ const infrastructure_middleware = (middleware);

// EXTERNAL MODULE: external "aws-sdk"
var external_aws_sdk_ = __webpack_require__(25990);
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
;// CONCATENATED MODULE: ./pages/api/users/postImage.tsx




const config = {
    api: {
        bodyParser: false
    }
};
external_aws_sdk_default().config.update({
    region: "us-east-1"
});
const uploadImageHandler = (0,dist/* default */.Z)();
uploadImageHandler.use(infrastructure_middleware);
uploadImageHandler.post(async (req, res)=>{
    const s3 = new (external_aws_sdk_default()).S3({
        region: "us-east-1"
    });
    let file = req.files.file[0];
    let uuid = req.body.uuid[0];
    const fileStream = external_fs_default().createReadStream(file.path);
    // Setting up S3 upload parameters
    const params = {
        Bucket: "test-pfp-images",
        Key: `images/${uuid}/profileImage.jpg`,
        Body: fileStream
    };
    let uploaded = s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
    if (uploaded) {
        res.status(200).json("UPLOADED");
    }
});
/* harmony default export */ const postImage = (uploadImageHandler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [930,348,800], () => (__webpack_exec__(58963)));
module.exports = __webpack_exports__;

})();