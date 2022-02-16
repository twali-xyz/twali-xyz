"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
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

/***/ 60303:
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
      processEnv([{"path":".env","contents":"AWS_ACCESS_KEY_ID=AKIAXRF2N5UWAISCEIPK\nAWS_SECRET_ACCESS_KEY=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\nAWS_REGION=us-east-2"}])
    
        
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
          pageModule: __webpack_require__(29067),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/users",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"0442d1750bce4c56dba428ffe02e7683",previewModeSigningKey:"595031b884e331d111db32308684a1982edb180da5ed37445efc48925eb6ca3b",previewModeEncryptionKey:"9f3a435c6cdce47143aa00a21ff130cf71710771cfd6aacc9a10446f8ca394a5"}
        })
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiHandler);
      

/***/ }),

/***/ 37489:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const TableName = "user_passport";
const getDynamoDBClient = ()=>{
    const AWS = __webpack_require__(25990);
    const edgeRegion = process.env.AWS_REGION || "us-east-2";
    const dynamoDBRegion = edgeRegion.startsWith("us") ? "us-east-1" : "us-east-2";
    const options = {
        convertEmptyValues: true,
        region: dynamoDBRegion
    };
    const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT ? new AWS.DynamoDB.DocumentClient({
        ...options,
        endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT
    }) : new AWS.DynamoDB.DocumentClient(options);
    return client;
};
module.exports = {
    createUser: async (userDescription)=>{
        await getDynamoDBClient().put({
            TableName,
            Item: {
                userDescription
            }
        }).promise();
    },
    getUser: async (userName)=>{
        const { Items  } = await getDynamoDBClient().query({
            TableName
        }).promise();
        const users = Items.find((user)=>user.user_name == userName
        );
        return users;
    }
};


/***/ }),

/***/ 43691:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(37489);


/***/ }),

/***/ 29067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43691);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_data__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{
    console.log("api/users/newUser");
    const userDescription = JSON.parse(req.body).userDescription;
    await _data__WEBPACK_IMPORTED_MODULE_0___default().createUser(userDescription);
    res.status(200).end("User Created");
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [458,800], () => (__webpack_exec__(60303)));
module.exports = __webpack_exports__;

})();