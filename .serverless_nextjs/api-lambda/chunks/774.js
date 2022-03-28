"use strict";
exports.id = 774;
exports.ids = [774];
exports.modules = {

/***/ 68729:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/backgroundscreen.209e3756.png","height":1024,"width":1440,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAMFBMVEUHFxcOP0MQNDkWQUwJIiMLLTAOOzwUPSIYREEcNTUoPEgWJiwuWDYYTSMuRz4jSjo8PN2YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImRXBhw0AIAwDsKQTWsb/3yJshOFzhIUZqehWdwpxTqlTBGvdMWsK9s7MGPoAF0UBFDPAv4AAAAAASUVORK5CYII="});

/***/ }),

/***/ 94429:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23863);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11163);
/* harmony import */ var _utils_walletUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67679);





const HeaderNav = (props)=>{
    const whichPage = props.whichPage;
    const isConnectWalletBtn = props.isConnectWalletBtn;
    const userPage = props.userPage;
    const userWallet = props.userWallet;
    const { 0: isSubmitted , 1: setIsSubmitted  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: loaded , 1: setLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {
        height: "80px",
        p: 4,
        px: 8,
        as: "nav",
        align: "center",
        justify: "space-between",
        wrap: "wrap",
        w: "100%",
        pos: props.step == 0 ? "absolute" : "relative",
        backgroundColor: whichPage === "profile" ? "#0A1313" : "transparent",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Img, {
                width: "144px",
                height: "auto",
                src: "/twali-assets/navbar_logo.png"
            }),
            isConnectWalletBtn ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {
                alignItems: "center",
                w: "180px",
                height: "32px",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {
                    paddingLeft: 4,
                    paddingRight: 4,
                    width: 180,
                    height: "52px",
                    color: "#062B2A",
                    backgroundColor: "#C7F83C",
                    onClick: ()=>(0,_utils_walletUtils__WEBPACK_IMPORTED_MODULE_3__/* .handleWalletConnect */ .wO)(userPage, setIsSubmitted, setLoaded, router)
                    ,
                    children: [
                        "Connect Wallet",
                        " ",
                        isSubmitted ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.CircularProgress, {
                            size: "22px",
                            thickness: "4px",
                            isIndeterminate: true,
                            color: "#3C2E26"
                        }) : null
                    ]
                })
            }) : userWallet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.HStack, {
                alignItems: "center",
                w: "130px",
                height: "32px",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                    ml: "2",
                    mt: "1",
                    pl: 2,
                    width: "100%",
                    height: "100%",
                    border: "1px solid #F9FFF2",
                    alignItems: "center",
                    justifyItems: "center",
                    borderRadius: 32,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        color: "white",
                        maxW: "75px",
                        fontSize: "14px",
                        margin: "auto",
                        alignSelf: "center",
                        fontWeight: "700",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        isTruncated: true,
                        children: userWallet
                    })
                })
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderNav);


/***/ }),

/***/ 67679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$j": () => (/* binding */ connect),
/* harmony export */   "wO": () => (/* binding */ handleWalletConnect),
/* harmony export */   "GO": () => (/* binding */ getUserByWallet)
/* harmony export */ });
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3283);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42484);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(web3modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _walletconnect_web3_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63984);



/**
 *  walletUtils.tsx contains util methods for wallet connection
 */ // Get user's eth address
async function connect() {
    const { ethereum  } = window;
    let account;
    if (!ethereum) {
        console.log("Connect your ethereum wallet!");
        return;
    }
    await ethereum.request({
        method: "eth_requestAccounts"
    }).then((accounts)=>{
        if (accounts.length !== 0) {
            account = accounts[0];
            console.log("Found an authorized account: ", account);
        } else {
            console.log("No authorized account found!");
        }
    });
    return account;
}
const handleWalletConnect = async (userPage, setIsSubmitted, setLoaded, router)=>{
    try {
        const web3Modal = new (web3modal__WEBPACK_IMPORTED_MODULE_1___default())({
            disableInjectedProvider: false,
            network: "rinkeby",
            cacheProvider: false,
            providerOptions: {
                walletconnect: {
                    package: _walletconnect_web3_provider__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
                    options: {
                        rpc: {
                            1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky"
                        }
                    }
                }
            }
        });
        web3Modal.clearCachedProvider();
        const provider = await web3Modal.connect();
        const web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(provider);
        const accounts = await web3.eth.getAccounts();
        const currAccount = accounts[0];
        setIsSubmitted(true);
        let userData = await getUserByWallet(currAccount);
        console.log(userData);
        if (userData && userData.userName && userData.userWallet) {
            var ref, ref1;
            if (((ref = router.query) === null || ref === void 0 ? void 0 : ref.view) == "public" && userPage && userPage.userName) {
                await router.push(`/${userPage.userName}`);
                router.reload(); // reloads the profile page after changing the shallow route
            } else if (((ref1 = router.query) === null || ref1 === void 0 ? void 0 : ref1.view) == "public" && userData && userData.userName) {
                await router.push(`/${userData.userName}`);
                router.reload(); // reloads the profile page after changing the shallow route
            } else {
                router.reload(); // reloads the profile page upon login
            }
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
const getUserByWallet = async (userWallet)=>{
    let lowerCaseWallet = userWallet.toLowerCase();
    const res = await fetch(`/api/users/wallet/${lowerCaseWallet}`);
    const data = await res.json();
    console.log("RETRIEVE USER BY WALLET YO");
    return data;
};


/***/ })

};
;