"use strict";
exports.id = 729;
exports.ids = [729];
exports.modules = {

/***/ 43990:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23863);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _public_twali_assets_backgroundscreen_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68729);
/* harmony import */ var _components_HeaderNav_HeaderNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94429);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67294);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11163);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3283);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42484);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(web3modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _walletconnect_web3_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(63984);
/* harmony import */ var _utils_walletUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67679);




// import { handleConnect } from "../components/Profile/helpers/handleConnect";






const LoginPage = (props)=>{
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setLoaded(!props.loaded);
    }, []);
    const { 0: show , 1: setShow  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const toggleMenu = ()=>setShow(!show)
    ;
    const [isSubmitted, setIsSubmitted] = react__WEBPACK_IMPORTED_MODULE_3__.useState(false);
    const { 0: loaded , 1: setLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const handleWalletConnectOnLogin = async ()=>{
        const web3Modal = new (web3modal__WEBPACK_IMPORTED_MODULE_6___default())({
            disableInjectedProvider: false,
            network: "rinkeby",
            cacheProvider: false,
            providerOptions: {
                walletconnect: {
                    package: _walletconnect_web3_provider__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z,
                    options: {
                        rpc: {
                            1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky"
                        }
                    }
                }
            }
        });
        const provider = await web3Modal.connect();
        const web3 = new (web3__WEBPACK_IMPORTED_MODULE_5___default())(provider);
        const accounts = await web3.eth.getAccounts();
        const currAccount = accounts[0];
        setIsSubmitted(true);
        try {
            let userData = await (0,_utils_walletUtils__WEBPACK_IMPORTED_MODULE_8__/* .getUserByWallet */ .GO)(currAccount);
            if (userData && userData.userName && userData.userWallet) {
                router.push(`/${userData.userName}`);
                setIsSubmitted(false);
            } else {
                console.log("No profile, pls create one...");
                router.push("/steps");
            }
        } catch (err) {
            console.log("error: ", err);
            router.push("/steps");
            setLoaded(true);
        }
    };
    // const handleWalletConnect = handleConnect(
    //   setIsSubmitted,
    //   setName,
    //   setEmail,
    //   setAccType,
    //   router,
    //   setLoaded,
    //   setProfileData
    // );
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                children: "twali.xyz - login"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Container, {
                width: "100%",
                height: "1024px",
                minH: "100vh",
                maxW: "100%",
                pos: "relative",
                bgSize: "cover",
                bgPosition: "center",
                bgImg: `url(${_public_twali_assets_backgroundscreen_png__WEBPACK_IMPORTED_MODULE_1__/* ["default"].src */ .Z.src})`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_HeaderNav_HeaderNav__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        whichPage: "index"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.VStack, {
                        width: "100%",
                        minH: "100vh",
                        maxW: "100%",
                        pos: "absolute",
                        right: "1.9%",
                        bottom: "4.5%",
                        display: "flex",
                        flexDir: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Text, {
                                alignSelf: "center",
                                fontFamily: "GrandSlang",
                                fontSize: "40px",
                                lineHeight: "56px",
                                letterSpacing: "wide",
                                children: "welcome to"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Img, {
                                src: "twali-assets/twali_rainbow.png",
                                width: "300px",
                                height: "64.38px",
                                marginTop: "49px !important"
                            }),
                            !loaded ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.CircularProgress, {
                                marginTop: "109px !important",
                                size: "32px",
                                thickness: "4px",
                                isIndeterminate: true,
                                color: "#3C2E26"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Button, {
                                marginTop: "96px !important",
                                width: "207px",
                                height: "52px",
                                color: "#062B2A",
                                backgroundColor: "#C7F83C",
                                onClick: handleWalletConnectOnLogin,
                                children: [
                                    "Connect Wallet",
                                    " ",
                                    isSubmitted ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.CircularProgress, {
                                        size: "22px",
                                        thickness: "4px",
                                        isIndeterminate: true,
                                        color: "#3C2E26"
                                    }) : null
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginPage);


/***/ })

};
;