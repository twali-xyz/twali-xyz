exports.id = 896;
exports.ids = [896];
exports.modules = {

/***/ 94429:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(23863);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(23005);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41664);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11163);
/* harmony import */ var _ceramicnetwork_http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2097);
/* harmony import */ var _ceramicnetwork_3id_did_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52585);
/* harmony import */ var _ceramicnetwork_3id_did_resolver__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ceramicnetwork_3id_did_resolver__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3283);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42484);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(web3modal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ceramicnetwork_stream_tile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(58745);
/* harmony import */ var _ceramicnetwork_stream_tile__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ceramicnetwork_stream_tile__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _walletconnect_web3_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(63984);
/* harmony import */ var _3id_connect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(23180);
/* harmony import */ var dids__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(77075);
/* harmony import */ var dids__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dids__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ceramicstudio_idx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(43979);















// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";
const HamburgerItem = ({ children , isLast , to ="/"  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Button, {
        variant: "ghost",
        mb: {
            base: isLast ? 0 : 8,
            sm: 0
        },
        mr: {
            base: 0,
            sm: isLast ? 0 : 8
        },
        display: "block",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
            href: to,
            children: children
        })
    }));
};
const HeaderNav = (props)=>{
    const whichPage = props.whichPage;
    const { 0: show , 1: setShow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const toggleMenu = ()=>setShow(!show)
    ;
    const [isSubmitted, setIsSubmitted] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
    const { 0: loaded , 1: setLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const getUserByWallet = async (userWallet)=>{
        let lowerCaseWallet = userWallet.toLowerCase();
        let apiURL = process.env.NEXT_PUBLIC_LOCALHOST ? process.env.NEXT_PUBLIC_LOCALHOST : `https://${process.env.VERCEL_URL}`; // TEMP: vercel URL doesn't include http
        const res = await fetch(`${apiURL}/api/users/wallet/${lowerCaseWallet}`);
        const data = await res.json();
        console.log("RETRIEVE USER BY WALLET YO");
        return data;
    };
    const handleWalletConnect = async ()=>{
        const web3Modal = new (web3modal__WEBPACK_IMPORTED_MODULE_7___default())({
            disableInjectedProvider: false,
            network: "rinkeby",
            cacheProvider: false,
            providerOptions: {
                walletconnect: {
                    package: _walletconnect_web3_provider__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z,
                    options: {
                        rpc: {
                            1: "https://eth-rinkeby.alchemyapi.io/v2/QtLM8rW9nB6DobDu8KQx-7fYMS2rBlky"
                        }
                    }
                }
            }
        });
        const provider = await web3Modal.connect();
        console.log('p', provider);
        const web3 = new (web3__WEBPACK_IMPORTED_MODULE_6___default())(provider);
        console.log(web3);
        const accounts = await web3.eth.getAccounts();
        const currAccount = accounts[0];
        const ceramic = new _ceramicnetwork_http_client__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP(endpoint);
        const idx = new _ceramicstudio_idx__WEBPACK_IMPORTED_MODULE_12__.IDX({
            ceramic
        });
        setIsSubmitted(true);
        try {
            const threeIdConnect = new _3id_connect__WEBPACK_IMPORTED_MODULE_10__/* .ThreeIdConnect */ .$F();
            const ethProvider = new _3id_connect__WEBPACK_IMPORTED_MODULE_10__/* .EthereumAuthProvider */ .KS(window.ethereum, currAccount);
            await threeIdConnect.connect(ethProvider);
            const did = new dids__WEBPACK_IMPORTED_MODULE_11__.DID({
                provider: threeIdConnect.getDidProvider(),
                resolver: {
                    ..._ceramicnetwork_3id_did_resolver__WEBPACK_IMPORTED_MODULE_5___default().getResolver(ceramic)
                }
            });
            ceramic.setDID(did);
            await ceramic.did.authenticate();
            // does not require signing to get user's public data
            const data = await idx.get("basicProfile", `${currAccount}@eip155:1`);
            const profileData = await _ceramicnetwork_stream_tile__WEBPACK_IMPORTED_MODULE_8__.TileDocument.deterministic(ceramic, {
                family: "user-profile-data"
            }, {
                anchor: false,
                publish: false
            });
            let identity = profileData.content.identity;
            let userData = await getUserByWallet(currAccount);
            console.log(userData);
            if (identity.userName && identity.userWallet && userData && userData.userName && userData.userWallet) {
                setIsSubmitted(false);
                // router.push("/profile");
                router.push(`/${userData.userName}`);
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
    if (whichPage === "index") {
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Flex, {
            h: 10,
            mb: 8,
            p: 10,
            as: "nav",
            align: "center",
            justify: "space-between",
            wrap: "wrap",
            w: "100%",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.HStack, {
                    spacing: 10,
                    alignItems: "flex-start",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Heading, {
                        w: "300px",
                        children: "Twali 👁‍🗨"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Box, {
                    display: {
                        base: "block",
                        md: "block"
                    },
                    flexBasis: {
                        base: "100%",
                        md: "auto"
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Button, {
                        mb: {
                            base: 8,
                            sm: 0
                        },
                        mr: {
                            base: 0,
                            sm: 8
                        },
                        display: "block",
                        onClick: handleWalletConnect,
                        colorScheme: "teal",
                        children: [
                            "Connect Wallet",
                            " ",
                            isSubmitted ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.CircularProgress, {
                                size: "22px",
                                thickness: "4px",
                                isIndeterminate: true,
                                color: "#3C2E26"
                            }) : null
                        ]
                    })
                })
            ]
        }));
    } else if (whichPage === "sign-up" || whichPage === "steps") {
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Flex, {
            h: 10,
            mb: 8,
            p: 10,
            as: "nav",
            align: "left",
            justify: "space-between",
            wrap: "wrap",
            w: "100%",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.HStack, {
                    alignItems: "flex-start",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Heading, {
                        as: "h4",
                        size: "md",
                        w: "300px",
                        children: "Twali 👁‍🗨"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.HStack, {
                    alignItems: "flex-end",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Box, {
                        ml: "2",
                        mt: "1",
                        w: "150px",
                        backgroundColor: "teal",
                        borderRadius: 16,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Text, {
                            pl: 6,
                            color: "white",
                            size: "xs",
                            children: "0xP0...Z0p4"
                        })
                    })
                })
            ]
        }));
    } else {
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Flex, {
            h: 10,
            mb: 8,
            p: 10,
            as: "nav",
            align: "center",
            justify: "space-between",
            wrap: "wrap",
            w: "100%",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.HStack, {
                    spacing: 10,
                    alignItems: "flex-start",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Heading, {
                        w: "300px",
                        children: "Twali 👁‍🗨"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Box, {
                    display: {
                        base: "block",
                        md: "none"
                    },
                    onClick: toggleMenu,
                    children: show ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14__.CloseIcon, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_14__.HamburgerIcon, {})
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Box, {
                    display: {
                        base: show ? "block" : "none",
                        md: "block"
                    },
                    flexBasis: {
                        base: "100%",
                        md: "auto"
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Flex, {
                        align: "center",
                        justify: [
                            "center",
                            "space-between",
                            "flex-end",
                            "flex-end"
                        ],
                        direction: [
                            "column",
                            "row",
                            "row",
                            "row"
                        ],
                        pt: [
                            4,
                            4,
                            0,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HamburgerItem, {
                                isLast: false,
                                to: "/directory",
                                children: "Directory"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HamburgerItem, {
                                isLast: false,
                                to: "/profile",
                                children: "Profile"
                            })
                        ]
                    })
                })
            ]
        }));
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderNav);


/***/ }),

/***/ 2230:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 2230;
module.exports = webpackEmptyContext;

/***/ })

};
;