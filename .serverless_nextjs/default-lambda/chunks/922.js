"use strict";
exports.id = 922;
exports.ids = [922];
exports.modules = {

/***/ 61828:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/react/dist/chakra-ui-react.cjs.prod.js
var chakra_ui_react_cjs_prod = __webpack_require__(23863);
// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/index.es.js
var index_es = __webpack_require__(78947);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-brands-svg-icons/index.es.js
var free_brands_svg_icons_index_es = __webpack_require__(51417);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.es.js
var free_solid_svg_icons_index_es = __webpack_require__(51436);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/theme-tools/dist/chakra-ui-theme-tools.cjs.prod.js
var chakra_ui_theme_tools_cjs_prod = __webpack_require__(5970);
;// CONCATENATED MODULE: ./styles/customStepsTheme.ts
// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
const customSteps = {
    // The parts of the component
    parts: [
        "connector",
        "description",
        "icon",
        "label",
        "labelContainer",
        "step",
        "stepContainer",
        "stepIconContainer",
        "steps", 
    ],
    // The base styles for each part
    baseStyle: {
        steps: {
            display: "flex",
            fontFamily: "PP Telegraf",
            fontSize: "16px",
            lineHeight: "24px",
            width: "600px"
        },
        connector: {
            borderTopWidth: "0"
        },
        stepContainer: {
            color: "#98B2B2",
            display: "flex"
        },
        stepIconContainer: {
            display: "flex",
            alignSelf: "center",
            justifySelf: "center",
            width: "24px",
            height: "24px",
            border: "1px solid white",
            borderRadius: "50%",
            span: {
                fontSize: "12px"
            }
        },
        label: {
            paddingLeft: "7px",
            color: "#F9FFF2"
        },
        icon: {
            borderRadius: "50%",
            height: "24px",
            width: "24px",
            border: "1px solid white",
            backgroundColor: "transparent",
            color: "#F9FFF2",
            fontSize: "12px"
        }
    },
    // The size styles for each part
    sizes: {},
    // The variant styles for each part
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {}
};

;// CONCATENATED MODULE: ./pages/_app.tsx









index_es/* library.add */.vI.add(free_brands_svg_icons_index_es/* fab */.vnX, free_solid_svg_icons_index_es/* fas */.mRB);
const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
};
const theme = (0,chakra_ui_react_cjs_prod.extendTheme)({
    config,
    styles: {
        color: {
            textPrimary: "#F9FFF2",
            textSubtle: "#98B2B2",
            textBold: "#C7F83C"
        },
        backgroundColor: {
            actionBold: "#C7F83C"
        },
        global: (props)=>({
                body: {
                    bg: (0,chakra_ui_theme_tools_cjs_prod.mode)("white", "rgb(30, 30, 30)")(props),
                    color: (0,chakra_ui_theme_tools_cjs_prod.mode)("rgb(0, 0, 0)", "rgb(255, 255, 255)")(props)
                }
            })
    },
    components: {
        Steps: customSteps
    }
});
function App({ Component , pageProps  }) {
    return(// <>
    //   {/* Global Site Tag (gtag.js) - Google Analytics */}
    // <Script
    // strategy="afterInteractive"
    // src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
    // />
    // <Script
    // id="gtag-init"
    // strategy="afterInteractive"
    // dangerouslySetInnerHTML={{
    //   __html:`
    //   window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}'); 
    //   `,
    // }}
    // />
    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ChakraProvider, {
        theme: theme,
        children: /*#__PURE__*/ jsx_runtime.jsx(Component, {
            ...pageProps
        })
    }));
}
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 97020:
/***/ ((module) => {

module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-5cd94c89d3acac5f.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/2k10DKaO-0dTLsocktheG/_buildManifest.js","static/2k10DKaO-0dTLsocktheG/_ssgManifest.js","static/2k10DKaO-0dTLsocktheG/_middlewareManifest.js"],"pages":{"/":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/chunks/ea88be26-78fb58968e6ea4e1.js","static/chunks/944-5cb7bd51a727e429.js","static/chunks/815-d1ea3868f923bc74.js","static/chunks/pages/index-3b19b7f18fe79a88.js"],"/[userName]":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/chunks/061e6b60-28bd444bb64e34ae.js","static/chunks/fec483df-7b77906a52cde6f0.js","static/chunks/0a6e12db-618a59df53cb564c.js","static/chunks/944-5cb7bd51a727e429.js","static/chunks/781-f72db17f29491681.js","static/chunks/815-d1ea3868f923bc74.js","static/chunks/612-312bab403206de07.js","static/chunks/540-11da73eda651b670.js","static/chunks/526-c4f41592c2b18e5d.js","static/chunks/861-c51642a6569f87fd.js","static/chunks/pages/[userName]-93382e08a67b98a4.js"],"/_app":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/css/44151933bb680e75.css","static/chunks/pages/_app-a6b9ca4b2c6ac657.js"],"/_error":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/chunks/pages/_error-a3f18418a2205cb8.js"],"/login":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/chunks/061e6b60-28bd444bb64e34ae.js","static/chunks/fec483df-7b77906a52cde6f0.js","static/chunks/0a6e12db-618a59df53cb564c.js","static/chunks/944-5cb7bd51a727e429.js","static/chunks/781-f72db17f29491681.js","static/chunks/pages/login-fdc063fbdd04ce56.js"],"/steps":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/chunks/061e6b60-28bd444bb64e34ae.js","static/chunks/fec483df-7b77906a52cde6f0.js","static/chunks/0a6e12db-618a59df53cb564c.js","static/chunks/944-5cb7bd51a727e429.js","static/chunks/781-f72db17f29491681.js","static/chunks/815-d1ea3868f923bc74.js","static/chunks/612-312bab403206de07.js","static/chunks/540-11da73eda651b670.js","static/chunks/616-c56edde1d4cf5686.js","static/chunks/861-c51642a6569f87fd.js","static/chunks/pages/steps-a173ab484cfaf680.js"],"/user":["static/chunks/webpack-5761f3a204ffdf4a.js","static/chunks/framework-bb5c596eafb42b22.js","static/chunks/main-914fbfab4f90b52f.js","static/chunks/612-312bab403206de07.js","static/chunks/pages/user-96cb09930a955b65.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 73978:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 59450:
/***/ ((module) => {

module.exports = {"Dg":[]};

/***/ })

};
;