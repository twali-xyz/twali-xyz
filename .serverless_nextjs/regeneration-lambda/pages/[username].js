"use strict";
(() => {
var exports = {};
exports.id = 280;
exports.ids = [280];
exports.modules = {

/***/ 20745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "unstable_getStaticParams": () => (/* binding */ unstable_getStaticParams),
/* harmony export */   "unstable_getStaticProps": () => (/* binding */ unstable_getStaticProps),
/* harmony export */   "unstable_getStaticPaths": () => (/* binding */ unstable_getStaticPaths),
/* harmony export */   "unstable_getServerProps": () => (/* binding */ unstable_getServerProps),
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "_app": () => (/* binding */ _app),
/* harmony export */   "renderReqToHTML": () => (/* binding */ renderReqToHTML),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70607);
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59450);
/* harmony import */ var private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97020);
/* harmony import */ var private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73978);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99436);

      
      
      
      

      
      const { processEnv } = __webpack_require__(72333)
      processEnv([{"path":".env","contents":"AWS_ACCESS_KEY_ID=AKIAXRF2N5UWAISCEIPK\nAWS_SECRET_ACCESS_KEY=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\nAWS_REGION=us-east-1\n\n\n"}])
    
      
      const runtimeConfig = {}
      ;

      const documentModule = __webpack_require__(23105)

      const appMod = __webpack_require__(35656)
      let App = appMod.default || appMod.then && appMod.then(mod => mod.default);

      const compMod = __webpack_require__(84835)

      const Component = compMod.default || compMod.then && compMod.then(mod => mod.default)
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);
      const getStaticProps = compMod['getStaticProp' + 's'] || compMod.then && compMod.then(mod => mod['getStaticProp' + 's'])
      const getStaticPaths = compMod['getStaticPath' + 's'] || compMod.then && compMod.then(mod => mod['getStaticPath' + 's'])
      const getServerSideProps = compMod['getServerSideProp' + 's'] || compMod.then && compMod.then(mod => mod['getServerSideProp' + 's'])

      // kept for detecting legacy exports
      const unstable_getStaticParams = compMod['unstable_getStaticParam' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticParam' + 's'])
      const unstable_getStaticProps = compMod['unstable_getStaticProp' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticProp' + 's'])
      const unstable_getStaticPaths = compMod['unstable_getStaticPath' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticPath' + 's'])
      const unstable_getServerProps = compMod['unstable_getServerProp' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getServerProp' + 's'])

      let config = compMod['confi' + 'g'] || (compMod.then && compMod.then(mod => mod['confi' + 'g'])) || {}
      const _app = App

      const combinedRewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
        ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
        : []

      if (!Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)) {
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.beforeFiles */ .Dg.beforeFiles)
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.afterFiles */ .Dg.afterFiles)
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.fallback */ .Dg.fallback)
      }

      const { renderReqToHTML, render } = (0,next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__/* .getPageHandler */ .u)({
        pageModule: compMod,
        pageComponent: Component,
        pageConfig: config,
        appModule: App,
        documentModule: documentModule,
        errorModule: __webpack_require__(89185),
        notFoundModule: undefined,
        pageGetStaticProps: getStaticProps,
        pageGetStaticPaths: getStaticPaths,
        pageGetServerSideProps: getServerSideProps,

        assetPrefix: "",
        canonicalBase: "",
        generateEtags: true,
        poweredByHeader: true,
        reactRoot: false,

        runtimeConfig,
        buildManifest: private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__,
        reactLoadableManifest: private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__,

        rewrites: combinedRewrites,
        i18n: undefined,
        page: "/[username]",
        buildId: "1pw8vcJ--IEQIgoihXH2A",
        escapedBuildId: "1pw8vcJ\-\-IEQIgoihXH2A",
        basePath: "",
        pageIsDynamic: true,
        encodedPreviewProps: {previewModeId:"96747b2515b991b83cf4be41a36a51bf",previewModeSigningKey:"98fb3d4aa4608350a4566d117ee3145a2c0af9ec02c3f1605f3b01588da4c81a",previewModeEncryptionKey:"24c9c774b0e8ee96b665bf581dfb26efa4efb7912e67fbcfe2e1c93f82f63807"}
      })
      
    

/***/ }),

/***/ 19156:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const { v4  } = __webpack_require__(57731);
const TableName = "user_profile_staging_1";
const getDynamoDBClient = ()=>{
    const AWS = __webpack_require__(25990);
    const edgeRegion = process.env.CURRENT_AWS_REGION || "us-east-1";
    const dynamoDBRegion = edgeRegion.startsWith("us") ? "us-east-1" : "us-east-2";
    // Only needed with local development.
    // if (process.env.LOCAL_DYNAMO_DB_ENDPOINT) {
    //   AWS.config.update({
    //     // accessKeyId: process.env.AWS_ACCESS_KEY_ID_DEV,
    //     // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEV,
    //     region: "localhost",
    //     endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT,
    //   });
    // }
    const options = {
        convertEmptyValues: true,
        region: dynamoDBRegion
    };
    const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT ? new AWS.DynamoDB.DocumentClient() : new AWS.DynamoDB.DocumentClient(options);
    return client;
};
module.exports = {
    /**
  * @desc Gets a users nonce from database that is generated upon user creation to authenticate user that is accessing database.
  * @param {String} userWallet is the primary key to allow look up on database to access metadata to items belonging to user.
  * 
  * 
  **/ getUserAuth: async (userWallet)=>{
        const dbUser = await getDynamoDBClient().get({
            TableName,
            Key: {
                "userWallet": userWallet
            },
            ProjectionExpression: "UserNonce"
        }).promise().then((data)=>data.Items
        ).catch((err)=>console.log(err)
        );
        return dbUser;
    },
    /**
   * @desc Creates a user profile with the `userName` being set as the primary key in the database.
   * @param {Object} userDescription holds the primary key from object to process to database and any addtional metadata.
   * @dev This is a flexible creation function and is not perminit. Can be adjusted to a required user needs.
   * @example See docs about including additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
   **/ createUser: async (userDescription)=>{
        const { userName , userWallet , firstName , lastName , email , bio , twitter , linkedIn , website , businessName , businessType , businessLocation , currTitle , currLocation , funcExpertise , industryExpertise , companyInfo ,  } = userDescription;
        await getDynamoDBClient().put({
            TableName,
            Item: {
                userName: userName,
                userWallet: userWallet,
                uuid: v4(),
                // nonce: v4(), // create nonce a user creation
                firstName: firstName,
                lastName: lastName,
                email: email,
                bio: bio ? bio : null,
                twitter: twitter ? twitter : null,
                linkedIn: linkedIn ? linkedIn : null,
                website: website ? website : null,
                businessName: businessName,
                businessType: businessType,
                businessLocation: businessLocation,
                currTitle: currTitle,
                currLocation: currLocation ? currLocation : null,
                funcExpertise: funcExpertise ? funcExpertise : null,
                industryExpertise: industryExpertise ? industryExpertise : null,
                companyInfo: companyInfo ? companyInfo : null
            }
        }).promise();
    },
    /**
   * @desc Access a user in the table by primary key on a GSI using `userName`.
   * @param {string} - function takes in a input string of the users userName
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/ getUser: async (userName)=>{
        const dbUser = await getDynamoDBClient().query({
            TableName,
            IndexName: "wallet_name_index",
            // ProjectionExpression: "userName",
            KeyConditionExpression: "userName = :userName",
            ExpressionAttributeValues: {
                ":userName": userName
            }
        }).promise().then((data)=>data.Items[0]
        ).catch(console.error);
        return dbUser;
    },
    /**
   * @desc Directly access a user in the table by primary key `userWallet`.
   * @param {string} - function takes in a input string of the users userWallet
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/ getUserByWallet: async (userWallet)=>{
        console.log(userWallet);
        const dbUser = await getDynamoDBClient().query({
            TableName,
            // ProjectionExpression: "userWallet",
            KeyConditionExpression: "userWallet = :userWallet",
            ExpressionAttributeValues: {
                ":userWallet": userWallet
            }
        }).promise().then((data)=>data.Items[0]
        ).catch(console.error);
        return dbUser;
    },
    /**
   * @desc Edits an existing users item's attributes, or adds a new item to the table if it does not already exist.
   * @param {object} - function takes an object as a the parameter with primary and attributes. Object will need to the primary key and any attributes that are being updated or created.
   * @dev New items can be added to a user and does need to be predefined in the table. Any values in 'UpdateExpression' need to be defined will values within 'ExpressionAttributeValues'.
   * @example See docs about editing existing attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   */ updateUser: async (userName)=>{
        const { updateAttributes  } = await getDynamoDBClient().update({
            TableName,
            Key: {
                userName: userName
            },
            UpdateExpression: "SET ",
            ExpressionAttributeValues: {},
            ReturnValues: ""
        });
        return updateAttributes;
    },
    /**
   * @desc Directly access a list of users in the table by scanning the table with `TableName`
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/ getUsers: async ()=>{
        const allUsers = await getDynamoDBClient().scan({
            TableName
        }).promise().then((data)=>data.Items
        ).catch(console.error);
        return allUsers;
    }
};


/***/ }),

/***/ 93820:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(19156);


/***/ }),

/***/ 84835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _username_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/react/dist/chakra-ui-react.cjs.prod.js
var chakra_ui_react_cjs_prod = __webpack_require__(23863);
// EXTERNAL MODULE: ./components/HeaderNav/HeaderNav.tsx
var HeaderNav = __webpack_require__(94429);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__(11163);
// EXTERNAL MODULE: ./utils/walletUtils.tsx
var walletUtils = __webpack_require__(67679);
// EXTERNAL MODULE: ./node_modules/@ceramicnetwork/http-client/lib/ceramic-http-client.js
var ceramic_http_client = __webpack_require__(2097);
// EXTERNAL MODULE: ./node_modules/@ceramicnetwork/3id-did-resolver/lib/index.js
var lib = __webpack_require__(52585);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
// EXTERNAL MODULE: ./node_modules/@3id/connect/dist/connect.esm.js + 7 modules
var connect_esm = __webpack_require__(23180);
// EXTERNAL MODULE: ./node_modules/dids/lib/index.js
var dids_lib = __webpack_require__(77075);
// EXTERNAL MODULE: ./node_modules/@ceramicstudio/idx/dist/index.js
var dist = __webpack_require__(43979);
// EXTERNAL MODULE: ./node_modules/@ceramicnetwork/stream-tile/lib/index.js
var stream_tile_lib = __webpack_require__(58745);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.js
var react_fontawesome = __webpack_require__(21559);
;// CONCATENATED MODULE: ./components/Profile/EditProfileModal/EditProfileModal.tsx










// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";
const EditProfileModal = (props)=>{
    const finalRef = (0,react.useRef)();
    const { 0: isSubmitted , 1: setIsSubmitted  } = (0,react.useState)(false);
    const { 0: accType1 , 1: setAccType  } = (0,react.useState)(props.profileData.content.accType);
    const { 0: identity1 , 1: setIdentity  } = (0,react.useState)(props.profileData.content.identity);
    const { 0: fileUploaded1 , 1: setFileUploaded  } = (0,react.useState)();
    const { 0: profileData1 , 1: setProfileData  } = (0,react.useState)(props.profileData);
    const { 0: values1 , 1: setValues  } = (0,react.useState)({
        firstName: props.profileData.content.identity.firstName,
        lastName: props.profileData.content.identity.lastName,
        currTitle: props.profileData.content.identity.currTitle,
        bio: props.profileData.content.identity.bio,
        linkedIn: props.profileData.content.identity.linkedIn,
        twitter: props.profileData.content.identity.twitter
    });
    const { 0: errors1 , 1: setErrors  } = (0,react.useState)({
        firstName: null,
        lastName: null,
        currTitle: null,
        bio: null,
        linkedIn: null,
        twitter: null
    });
    async function updateProfileInfo() {
        const address = await (0,walletUtils/* connect */.$)(); // first address in the array
        if (address) {
            const ceramic = new ceramic_http_client/* default */.ZP(endpoint);
            const threeIdConnect = new connect_esm/* ThreeIdConnect */.$F();
            const provider = new connect_esm/* EthereumAuthProvider */.KS(window.ethereum, address);
            setIsSubmitted(true);
            await threeIdConnect.connect(provider);
            const did = new dids_lib.DID({
                provider: threeIdConnect.getDidProvider(),
                resolver: {
                    ...lib_default().getResolver(ceramic)
                }
            });
            ceramic.setDID(did);
            await ceramic.did.authenticate();
            const idx = new dist.IDX({
                ceramic
            });
            // does not require signing to get user's public data
            const data = await idx.get("basicProfile", `${address}@eip155:1`);
            console.log("data: ", data);
            if (fileUploaded1) {
                // await idx.merge('basicProfile', { image: '💻' })
                console.log(fileUploaded1);
            }
            await updateProfileData(ceramic, identity1, accType1);
            console.log("Profile updated!");
            console.log(identity1);
            if (identity1.firstName && identity1.lastName && identity1.email) {
                setIsSubmitted(false);
                props.handleUpdatedProfile(profileData1, false);
                props.onClose();
            } else {
                console.log("No profile, pls create one...");
            }
        }
    }
    // Updates a stream to store JSON data with ceramic
    const updateProfileData = async (ceramic, identity, accType)=>{
        const profileData = await stream_tile_lib.TileDocument.deterministic(ceramic, {
            family: "user-profile-data"
        });
        await profileData.update({
            identity,
            accType
        });
    };
    const handleChange = (evt)=>{
        evt.persist();
        setValues((values)=>({
                ...values,
                [evt.target.name]: evt.target.value
            })
        );
        setErrors(validate(values1));
        setIdentity({
            ...identity1,
            [evt.target.name]: evt.target.value
        });
        const newProfileData = {
            content: {
                identity: identity1,
                accType: props.profileData.content.accType
            }
        };
        setProfileData(newProfileData);
    };
    const handleFile = (fileUploaded)=>{
        setFileUploaded(fileUploaded);
    };
    const validate = (values)=>{
        let errors = {};
        if (!values.firstName) {
            errors.firstName = "First name is required";
        }
        if (!values.lastName) {
            errors.lastName = "Last name is required";
        }
        if (!values.currTitle) {
            errors.currTitle = "Current title is required";
        }
        if (values.bio && values.bio.length > 280) {
            errors.bio = "Bio is too long. It should be less than 280 characters.";
        }
        var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        if (values.linkedIn && !urlPattern.test(values.linkedIn)) {
            errors.linkedIn = "Please enter a valid URL";
        }
        if (values.twitter && !urlPattern.test(values.twitter)) {
            errors.twitter = "Please enter a valid URL";
        }
        return errors;
    };
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Modal, {
            finalFocusRef: finalRef,
            isOpen: props.isOpen,
            onClose: props.onClose,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalOverlay, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalContent, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalHeader, {
                            children: "Edit your profile details"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalCloseButton, {}),
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalBody, {
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                                style: {
                                    alignSelf: "center"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                            children: "Update profile picture"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "first-name",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "First name"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                required: true,
                                                isInvalid: errors1.firstName && (!props.profileData.content.identity.firstName || !values1.firstName),
                                                errorBorderColor: "red.300",
                                                placeholder: "First name",
                                                name: "firstName",
                                                defaultValue: props.profileData.content.identity.firstName || "",
                                                onChange: handleChange
                                            }),
                                            errors1.firstName && (!props.profileData.content.identity.firstName || !values1.firstName) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.firstName
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "last-name",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "Last name"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                required: true,
                                                isInvalid: errors1.lastName && (!props.profileData.content.identity.lastName || !values1.lastName),
                                                errorBorderColor: "red.300",
                                                placeholder: "Last name",
                                                name: "lastName",
                                                defaultValue: props.profileData.content.identity.lastName || "",
                                                onChange: handleChange
                                            }),
                                            errors1.lastName && (!props.profileData.content.identity.lastName || !values1.lastName) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.lastName
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "current-title",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "What's your current title?"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                isInvalid: errors1.currTitle && (!props.profileData.content.identity.currTitle || !values1.currTitle),
                                                required: true,
                                                errorBorderColor: "red.300",
                                                defaultValue: props.profileData.content.identity.currTitle || "",
                                                name: "currTitle",
                                                onChange: handleChange
                                            }),
                                            errors1.currTitle && (!props.profileData.content.identity.currTitle || !values1.currTitle) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.currTitle
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "currLocation",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "Where do you call home?"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                defaultValue: props.profileData.content.identity.currLocation || "",
                                                name: "currLocation",
                                                onChange: handleChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "bio",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "Bio"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Textarea, {
                                                isInvalid: errors1.bio,
                                                errorBorderColor: "red.300",
                                                defaultValue: props.profileData.content.identity.bio || "",
                                                name: "bio",
                                                onChange: handleChange
                                            }),
                                            errors1.bio && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.bio
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "linkedIn",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "LinkedIn URL"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                isInvalid: errors1.linkedIn,
                                                errorBorderColor: "red.300",
                                                name: "linkedIn",
                                                defaultValue: props.profileData.content.identity.linkedIn || "",
                                                onChange: handleChange
                                            }),
                                            errors1.linkedIn && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.linkedIn
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "twitter",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "Twitter URL"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                isInvalid: errors1.twitter,
                                                errorBorderColor: "red.300",
                                                name: "twitter",
                                                defaultValue: props.profileData.content.identity.twitter || "",
                                                onChange: handleChange
                                            }),
                                            errors1.twitter && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.twitter
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalFooter, {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Button, {
                                    colorScheme: "blue",
                                    mr: 3,
                                    onClick: props.onClose,
                                    children: "Close"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Button, {
                                    variant: "ghost",
                                    onClick: updateProfileInfo,
                                    children: [
                                        "Save",
                                        " ",
                                        isSubmitted ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.CircularProgress, {
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
        })
    }));
};
/* harmony default export */ const EditProfileModal_EditProfileModal = (EditProfileModal);

;// CONCATENATED MODULE: ./components/Profile/EditExperienceModal/EditExperienceModal.tsx










// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const EditExperienceModal_endpoint = "https://ceramic-clay.3boxlabs.com";
const EditExperienceModal = (props)=>{
    const finalRef = (0,react.useRef)();
    const { 0: isSubmitted , 1: setIsSubmitted  } = (0,react.useState)(false);
    const { 0: accType1 , 1: setAccType  } = (0,react.useState)(props.profileData.content.accType);
    const { 0: identity1 , 1: setIdentity  } = (0,react.useState)(props.profileData.content.identity);
    const { 0: profileData1 , 1: setProfileData  } = (0,react.useState)(props.profileData);
    const { 0: values1 , 1: setValues  } = (0,react.useState)({
        userName: props.profileData.content.identity.userName,
        email: props.profileData.content.identity.email
    });
    const { 0: errors1 , 1: setErrors  } = (0,react.useState)({
        userName: null,
        email: null
    });
    async function updateExperiences() {
        setErrors(validate(values1));
        const address = await (0,walletUtils/* connect */.$)(); // first address in the array
        if (address) {
            const ceramic = new ceramic_http_client/* default */.ZP(EditExperienceModal_endpoint);
            const threeIdConnect = new connect_esm/* ThreeIdConnect */.$F();
            const provider = new connect_esm/* EthereumAuthProvider */.KS(window.ethereum, address);
            setIsSubmitted(true);
            await threeIdConnect.connect(provider);
            const did = new dids_lib.DID({
                provider: threeIdConnect.getDidProvider(),
                resolver: {
                    ...lib_default().getResolver(ceramic)
                }
            });
            ceramic.setDID(did);
            await ceramic.did.authenticate();
            const idx = new dist.IDX({
                ceramic
            });
            // does not require signing to get user's public data
            const data = await idx.get("basicProfile", `${address}@eip155:1`);
            console.log("data: ", data);
            await updateProfileData(ceramic, identity1, accType1);
            console.log("Profile updated!");
            console.log(identity1);
            if (identity1.firstName && identity1.lastName && identity1.email) {
                setIsSubmitted(false);
                props.handleUpdatedExperiences(profileData1, false);
                props.onClose();
            } else {
                console.log("No profile, pls create one...");
            }
        }
    }
    // Updates a stream to store JSON data with ceramic
    const updateProfileData = async (ceramic, identity, accType)=>{
        const profileData = await stream_tile_lib.TileDocument.deterministic(ceramic, {
            family: "user-profile-data"
        });
        await profileData.update({
            identity,
            accType
        });
    };
    const validate = (values)=>{
        let errors = {};
        if (!values.userName) {
            errors.userName = "User name is required";
        }
        var emailPattern = /(.+)@(.+){1,}\.(.+){1,}/;
        if (!values.email) {
            errors.email = "Email address is required";
        }
        if (values.email && !emailPattern.test(values.email)) {
            errors.email = "Email address is invalid";
        }
        if (values.funcExpertise === "") {
            errors.funcExpertise = "Functional expertise is required";
        }
        if (values.industryExpertise === "") {
            errors.industryExpertise = "Industry expertise is required";
        }
        return errors;
    };
    const handleChange = (evt)=>{
        evt.persist();
        setValues((values)=>({
                ...values,
                [evt.target.name]: evt.target.value
            })
        );
        setErrors(validate(values1));
        setIdentity({
            ...identity1,
            [evt.target.name]: evt.target.value
        });
        const newProfileData = {
            content: {
                identity: identity1,
                accType: props.profileData.content.accType
            }
        };
        setProfileData(newProfileData);
    };
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Modal, {
            finalFocusRef: finalRef,
            isOpen: props.isOpen,
            onClose: props.onClose,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalOverlay, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalContent, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalHeader, {
                            children: "Update your background expertise"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalCloseButton, {}),
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalBody, {
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                                style: {
                                    alignSelf: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "display-name",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "User name"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                required: true,
                                                isInvalid: errors1.userName && (!props.profileData.content.identity.userName || !values1.userName),
                                                errorBorderColor: "red.300",
                                                placeholder: "User name",
                                                name: "userName",
                                                defaultValue: props.profileData.content.identity.userName || "",
                                                onChange: handleChange
                                            }),
                                            errors1.userName && (!props.profileData.content.identity.userName || !values1.userName) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.userName
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "email",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "Email"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                required: true,
                                                isInvalid: errors1.email && props.profileData.content.identity.email === values1.email,
                                                errorBorderColor: "red.300",
                                                placeholder: "Email",
                                                name: "email",
                                                defaultValue: props.profileData.content.identity.email || "",
                                                onChange: handleChange
                                            }),
                                            errors1.email && props.profileData.content.identity.email !== values1.email && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                fontSize: "xs",
                                                fontWeight: "400",
                                                color: "red.500",
                                                children: errors1.email
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "functional-expertise",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "So...what would you say you do?"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Select, {
                                                required: true,
                                                defaultValue: props.profileData.content.identity.funcExpertise,
                                                errorBorderColor: "red.300",
                                                placeholder: "Select functional expertise",
                                                name: "funcExpertise",
                                                onChange: handleChange,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Accounting"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Creative"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Audit"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Board & Advisory"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Corporate Development"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Comp & Benefits"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Compliance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Management Consulting"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Data & Analytics"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Product Design"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Digital"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Engineering"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Entrepreneurship"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Finance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "General Management"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Human Resources"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "IT Infrastructure"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Innovation"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Investor"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Legal"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Marketing"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Media & Comms"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Merchandising"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Security"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Operations"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Portfolio Operations"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Procurement"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Product Management"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Investor Relations"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Regulatory"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Research"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Risk"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Strategy"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Technology"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Transformation"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Sales & Customer"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Data Science"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Talent Acquisition"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Tax"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Cybersecurity"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Investment Banking"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Supply Chain"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                        p: 2,
                                        id: "industry-expertise",
                                        isRequired: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                children: "Where would you say you work?"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Select, {
                                                required: true,
                                                defaultValue: props.profileData.content.identity.industryExpertise,
                                                placeholder: "Select industry expertise",
                                                name: "industryExpertise",
                                                onChange: handleChange,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Accounting"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Angel Investment"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Asset Management"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Auto Insurance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Banking"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Bitcoin"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Commercial Insurance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Commercial Lending"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Credit"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Credit Bureau"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Credit Cards"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Crowdfunding"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Cryptocurrency"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Debit Cards"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Debt Collections"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Finance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Financial Exchanges"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Financial Services"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "FinTech"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Fraud Detection"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Funding Platform"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Gift Card"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Health Insurance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Hedge Funds"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Impact Investing"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Incubators"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Insurance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "InsurTech"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Leasing"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Lending"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Life Insurance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Micro Lending"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Mobile Payments"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Payments"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Personal Finance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Prediction Markets"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Property Insurance"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Real Estate Investment"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Stock Exchanges"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Trading Platform"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Transaction Processing"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Venture Capital"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Virtual Currency"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        children: "Wealth Management"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalFooter, {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Button, {
                                    colorScheme: "blue",
                                    mr: 3,
                                    onClick: props.onClose,
                                    children: "Close"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Button, {
                                    variant: "ghost",
                                    onClick: updateExperiences,
                                    children: [
                                        "Save",
                                        " ",
                                        isSubmitted ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.CircularProgress, {
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
        })
    }));
};
/* harmony default export */ const EditExperienceModal_EditExperienceModal = (EditExperienceModal);

// EXTERNAL MODULE: ./node_modules/graphql-request/dist/index.js
var graphql_request_dist = __webpack_require__(28687);
;// CONCATENATED MODULE: ./components/Profile/SnapshotModal/SnapshotModal.tsx



const SnapshotModal = (props)=>{
    const finalRef = (0,react.useRef)();
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Modal, {
            finalFocusRef: finalRef,
            isOpen: props.isOpen,
            onClose: props.onClose,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalOverlay, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalContent, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalCloseButton, {}),
                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalBody, {
                            alignSelf: "center",
                            children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.VStack, {
                                spacing: 6,
                                padding: 10,
                                children: props.snapshotData ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Heading, {
                                            children: props.snapshotData.spaceID
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                                            borderRadius: "full",
                                            width: "150px",
                                            src: props.snapshotData.avatar,
                                            alt: "fox stock img"
                                        }, props.snapshotData.spaceID),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            children: [
                                                "you have ",
                                                props.snapshotData.walletVotes,
                                                " vote(s) at",
                                                " ",
                                                props.snapshotData.spaceID,
                                                "!"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            children: [
                                                props.snapshotData.walletVotes,
                                                "/",
                                                props.snapshotData.totalVotes
                                            ]
                                        })
                                    ]
                                }) : null
                            })
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const SnapshotModal_SnapshotModal = (SnapshotModal);

// EXTERNAL MODULE: ./node_modules/swr/dist/index.mjs
var swr_dist = __webpack_require__(8100);
;// CONCATENATED MODULE: ./components/UserPermissionsProvider/UserPermissionsContext.ts

// Default behaviour for the Permission Provider Context
// i.e. if for whatever reason the consumer is used outside of a provider
// The permission will not be granted if no provider says otherwise
const defaultBehaviour = {
    isAllowedTo: ()=>Promise.resolve(false)
};
// Create the context
const UserPermissionsContext = react.createContext(defaultBehaviour);
/* harmony default export */ const UserPermissionsProvider_UserPermissionsContext = (UserPermissionsContext);

;// CONCATENATED MODULE: ./components/UserPermissionsProvider/enablePermission.ts


const enablePermission = (permission)=>{
    const { 0: loading , 1: setLoading  } = (0,react.useState)(true);
    const { 0: allowed1 , 1: setAllowed  } = (0,react.useState)();
    const { isAllowedTo  } = (0,react.useContext)(UserPermissionsProvider_UserPermissionsContext);
    isAllowedTo(permission).then((allowed)=>{
        setLoading(false);
        setAllowed(allowed);
    });
    return [
        loading,
        allowed1
    ];
};
/* harmony default export */ const UserPermissionsProvider_enablePermission = (enablePermission);

;// CONCATENATED MODULE: ./components/UserPermissionsProvider/UserPermissionsRestricted.tsx



// This component is meant to be used everywhere a restriction based on user permission is needed
const UserPermissionsRestricted = ({ to , fallback , loadingComponent , children ,  })=>{
    // We "connect" to the provider thanks to the PermissionContext
    const [loading, allowed] = UserPermissionsProvider_enablePermission(to);
    if (loading) {
        return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
            children: loadingComponent
        }));
    }
    // If the user has that permission, render the children
    if (allowed) {
        return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
            children: children
        }));
    }
    // Otherwise, render the fallback
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: fallback
    }));
};
/* harmony default export */ const UserPermissionsProvider_UserPermissionsRestricted = (UserPermissionsRestricted);

;// CONCATENATED MODULE: ./components/Profile/CompanyModal/CompanyModal.tsx












// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const CompanyModal_endpoint = "https://ceramic-clay.3boxlabs.com";
const CompanyModal = (props)=>{
    const finalRef = (0,react.useRef)();
    const { 0: isSubmitted , 1: setIsSubmitted  } = (0,react.useState)(false);
    const { 0: companyName , 1: setCompanyName  } = (0,react.useState)("");
    const { 0: companyTitle , 1: setCompanyTitle  } = (0,react.useState)("");
    const { 0: companyStart , 1: setCompanyStart  } = (0,react.useState)();
    const { 0: companyEnd , 1: setCompanyEnd  } = (0,react.useState)();
    const { 0: companyFunc , 1: setCompanyFunc  } = (0,react.useState)();
    const { 0: companyIndustry , 1: setCompanyIndustry  } = (0,react.useState)();
    const { 0: shouldFetch , 1: setShouldFetch  } = (0,react.useState)(false);
    const { 0: isDisabled1 , 1: setIsDisabled  } = (0,react.useState)(false);
    const { 0: accType1 , 1: setAccType  } = (0,react.useState)(props.profileData.content.accType);
    const { 0: identity1 , 1: setIdentity  } = (0,react.useState)(props.profileData.content.identity);
    const { 0: profileData1 , 1: setProfileData  } = (0,react.useState)(props.profileData);
    const emptyCompanyInfo = {
        companyName: "",
        companyTitle: "",
        companyStart: "",
        companyEnd: "",
        companyFunc: "",
        companyIndustry: ""
    };
    const companyInfo = props.profileData.content.identity.companyInfo && props.profileData.content.identity.companyInfo[props.currCompany] ? props.profileData.content.identity.companyInfo[props.currCompany] : emptyCompanyInfo;
    const { 0: errors1 , 1: setErrors  } = (0,react.useState)({
        companyName: null,
        companyTitle: null,
        companyStart: null,
        companyEnd: null,
        companyFunc: null,
        companyIndustry: null
    });
    const { 0: values1 , 1: setValues  } = (0,react.useState)({
        companyName: companyInfo && companyInfo.companyName ? companyInfo.companyName : "",
        companyTitle: companyInfo && companyInfo.companyTitle ? companyInfo.companyTitle : "",
        companyStart: companyInfo && companyInfo.companyStart ? companyInfo.companyStart : "",
        companyEnd: companyInfo && companyInfo.companyEnd ? companyInfo.companyEnd : "",
        companyFunc: companyInfo && companyInfo.companyFunc ? companyInfo.companyFunc : "",
        companyIndustry: companyInfo && companyInfo.companyIndustry ? companyInfo.companyIndustry : ""
    });
    const convertDates = (start, end)=>{
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        let newStart = new Date(start).toLocaleDateString(undefined, options);
        let newEnd = new Date(end).toLocaleDateString(undefined, options);
        return `${newStart} - ${newEnd}`;
    };
    let companyDateRange;
    if (companyInfo && companyInfo.companyStart && companyInfo.companyEnd) {
        companyDateRange = convertDates(companyInfo.companyStart, companyInfo.companyEnd);
    }
    async function updateCompanyInfo() {
        const address = await (0,walletUtils/* connect */.$)(); // first address in the array
        if (address) {
            const ceramic = new ceramic_http_client/* default */.ZP(CompanyModal_endpoint);
            const threeIdConnect = new connect_esm/* ThreeIdConnect */.$F();
            const provider = new connect_esm/* EthereumAuthProvider */.KS(window.ethereum, address);
            setIsSubmitted(true);
            await threeIdConnect.connect(provider);
            const did = new dids_lib.DID({
                provider: threeIdConnect.getDidProvider(),
                resolver: {
                    ...lib_default().getResolver(ceramic)
                }
            });
            ceramic.setDID(did);
            await ceramic.did.authenticate();
            const idx = new dist.IDX({
                ceramic
            });
            // does not require signing to get user's public data
            const data = await idx.get("basicProfile", `${address}@eip155:1`);
            identity1.companyInfo[props.currCompany] = {
                companyName: companyName,
                companyTitle: companyTitle,
                companyStart: companyStart,
                companyEnd: companyEnd,
                companyFunc: companyFunc,
                companyIndustry: companyIndustry
            };
            await updateProfileData(ceramic, identity1, accType1);
            console.log("Profile updated!");
            console.log(identity1);
            if (identity1.firstName && identity1.lastName && identity1.email) {
                setIsSubmitted(false);
                props.handleUpdatedCompanyInfo(profileData1, false);
                props.onClose();
            } else {
                console.log("No profile, pls create one...");
            }
        }
    }
    // Updates a stream to store JSON data with ceramic
    const updateProfileData = async (ceramic, identity, accType)=>{
        const profileData = await stream_tile_lib.TileDocument.deterministic(ceramic, {
            family: "user-profile-data"
        });
        await profileData.update({
            identity,
            accType
        });
    };
    const handleChange = (evt)=>{
        evt.persist();
        setValues((values)=>({
                ...values,
                [evt.target.name]: evt.target.value
            })
        );
        setErrors(validate(values1));
        setIdentity({
            ...identity1
        });
        const newProfileData = {
            content: {
                identity: identity1,
                accType: props.profileData.content.accType
            }
        };
        setProfileData(newProfileData);
        if (evt.target.name == "companyName") {
            setCompanyName(evt.target.value);
            setShouldFetch(true);
        } else {
            setShouldFetch(false);
        }
        if (evt.target.name == "companyTitle") {
            setCompanyTitle(evt.target.value);
        }
        if (evt.target.name == "companyStart") {
            setCompanyStart(evt.target.value);
        }
        if (evt.target.name == "companyEnd") {
            setCompanyEnd(evt.target.value);
        }
        if (evt.target.name == "funcExpertise") {
            setCompanyFunc(evt.target.value);
        }
        if (evt.target.name == "industryExpertise") {
            setCompanyIndustry(evt.target.value);
        }
    };
    const validate = (values)=>{
        let errors = {};
        if (!values.companyName) {
            errors.companyName = "Company name is required";
        }
        if (!values.companyTitle) {
            errors.companyTitle = "Job title is required";
        }
        var datePattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (!values.companyStart) {
            errors.companyStart = "Start date (DD-MM-YYYY) is required";
        }
        if (values.companyStart && !datePattern.test(values.companyStart)) {
            errors.companyStart = "Start date (DD-MM-YYYY) is incorrect";
        }
        if (!values.companyEnd) {
            errors.companyEnd = "End date (DD-MM-YYYY) is required";
        }
        if (values.companyEnd && !datePattern.test(values.companyEnd)) {
            errors.companyEnd = "End date (DD-MM-YYYY) is incorrect";
        }
        if (values.companyFunc === "") {
            errors.companyFunc = "Functional expertise is required";
        }
        if (values.companyIndustry === "") {
            errors.companyIndustry = "Industry expertise is required";
        }
        return errors;
    };
    const setDisabled = (isDisabled)=>{
        setIsDisabled(isDisabled);
    };
    const companyModalView = /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalContent, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalCloseButton, {}),
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalBody, {
                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.VStack, {
                        spacing: 6,
                        padding: 10,
                        children: companyInfo ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                            children: [
                                companyInfo.companyName ? /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Heading, {
                                        children: companyInfo.companyName
                                    })
                                }) : null,
                                companyInfo.companyTitle ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                    fontSize: "2xl",
                                    children: companyInfo.companyTitle
                                }) : null,
                                companyInfo.companyStart && companyInfo.companyEnd ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                    fontSize: "md",
                                    color: "gray.500",
                                    children: companyDateRange
                                }) : null,
                                companyInfo.companyFunc && companyInfo.companyIndustry ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.HStack, {
                                    spacing: 4,
                                    children: [
                                        companyInfo.companyFunc,
                                        companyInfo.companyIndustry
                                    ].map((name)=>/*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Tag, {
                                            size: "md",
                                            variant: "solid",
                                            colorScheme: "teal",
                                            children: name
                                        }, `sm--${name}`)
                                    )
                                }) : null
                            ]
                        }) : null
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalFooter, {
                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Button, {
                        colorScheme: "blue",
                        mr: 3,
                        onClick: ()=>{
                            props.onClose();
                        },
                        children: "Close"
                    })
                })
            ]
        })
    });
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Modal, {
            finalFocusRef: finalRef,
            isOpen: props.isOpen,
            onClose: props.onClose,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalOverlay, {}),
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalContent, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(UserPermissionsProvider_UserPermissionsRestricted, {
                        to: "edit",
                        fallback: companyModalView,
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalHeader, {
                                children: "Update your work experience"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalCloseButton, {}),
                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.ModalBody, {
                                children: companyInfo ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                                    style: {
                                        alignSelf: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                            p: 2,
                                            id: "company-name",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                    children: "Company name"
                                                }),
                                                shouldFetch && /*#__PURE__*/ jsx_runtime.jsx(CompanyInfoData, {
                                                    companyName: companyName,
                                                    isDisabled: setDisabled
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                    required: true,
                                                    isInvalid: errors1.companyName && (!companyInfo.companyName || !values1.companyName),
                                                    errorBorderColor: "red.300",
                                                    placeholder: "Company name",
                                                    name: "companyName",
                                                    defaultValue: companyInfo.companyName || "",
                                                    onChange: handleChange
                                                }),
                                                errors1.companyName && (!companyInfo.companyName || !values1.companyName) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                    fontSize: "xs",
                                                    fontWeight: "400",
                                                    color: "red.500",
                                                    children: errors1.companyName
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                            p: 2,
                                            id: "company-title",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                    children: "Job title"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                    required: true,
                                                    isInvalid: errors1.companyTitle && (!companyInfo.companyTitle || !values1.companyTitle),
                                                    errorBorderColor: "red.300",
                                                    placeholder: "Job title",
                                                    name: "companyTitle",
                                                    defaultValue: companyInfo.companyTitle || "",
                                                    onChange: handleChange
                                                }),
                                                errors1.companyTitle && (!companyInfo.companyTitle || !values1.companyTitle) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                    fontSize: "xs",
                                                    fontWeight: "400",
                                                    color: "red.500",
                                                    children: errors1.companyTitle
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                            p: 2,
                                            id: "company-start",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                    children: "What was your start date?"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                    required: true,
                                                    isInvalid: errors1.companyStart && (!companyInfo.companyStart || !values1.companyStart),
                                                    errorBorderColor: "red.300",
                                                    name: "companyStart",
                                                    defaultValue: companyInfo.companyStart || "",
                                                    onChange: handleChange
                                                }),
                                                errors1.companyStart && (!companyInfo.companyStart || !values1.companyStart) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                    fontSize: "xs",
                                                    fontWeight: "400",
                                                    color: "red.500",
                                                    children: errors1.companyStart
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                            p: 2,
                                            id: "company-end",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                    children: "What was your end date?"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Input, {
                                                    required: true,
                                                    isInvalid: errors1.companyEnd && (!companyInfo.companyEnd || !values1.companyEnd),
                                                    errorBorderColor: "red.300",
                                                    name: "companyEnd",
                                                    defaultValue: companyInfo.companyEnd || "",
                                                    onChange: handleChange
                                                }),
                                                errors1.companyEnd && (!companyInfo.companyEnd || !values1.companyEnd) && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                    fontSize: "xs",
                                                    fontWeight: "400",
                                                    color: "red.500",
                                                    children: errors1.companyEnd
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                            p: 2,
                                            id: "company-func",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                    children: "Functional expertise"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Select, {
                                                    required: true,
                                                    defaultValue: companyInfo.companyFunc,
                                                    errorBorderColor: "red.300",
                                                    placeholder: "Select functional expertise",
                                                    name: "funcExpertise",
                                                    onChange: handleChange,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Accounting"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Creative"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Audit"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Board & Advisory"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Corporate Development"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Comp & Benefits"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Compliance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Management Consulting"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Data & Analytics"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Product Design"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Digital"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Engineering"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Entrepreneurship"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Finance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "General Management"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Human Resources"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "IT Infrastructure"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Innovation"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Investor"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Legal"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Marketing"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Media & Comms"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Merchandising"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Security"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Operations"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Portfolio Operations"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Procurement"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Product Management"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Investor Relations"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Regulatory"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Research"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Risk"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Strategy"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Technology"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Transformation"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Sales & Customer"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Data Science"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Talent Acquisition"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Tax"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Cybersecurity"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Investment Banking"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Supply Chain"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.FormControl, {
                                            p: 2,
                                            id: "company-industry",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.FormLabel, {
                                                    children: "Industry"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Select, {
                                                    required: true,
                                                    defaultValue: companyInfo.companyIndustry,
                                                    errorBorderColor: "red.300",
                                                    placeholder: "Select industry expertise",
                                                    name: "industryExpertise",
                                                    onChange: handleChange,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Accounting"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Angel Investment"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Asset Management"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Auto Insurance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Banking"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Bitcoin"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Commercial Insurance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Commercial Lending"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Credit"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Credit Bureau"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Credit Cards"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Crowdfunding"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Cryptocurrency"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Debit Cards"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Debt Collections"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Finance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Financial Exchanges"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Financial Services"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "FinTech"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Fraud Detection"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Funding Platform"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Gift Card"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Health Insurance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Hedge Funds"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Impact Investing"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Incubators"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Insurance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "InsurTech"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Leasing"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Lending"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Life Insurance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Micro Lending"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Mobile Payments"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Payments"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Personal Finance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Prediction Markets"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Property Insurance"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Real Estate Investment"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Stock Exchanges"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Trading Platform"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Transaction Processing"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Venture Capital"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Virtual Currency"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            children: "Wealth Management"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }) : null
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.ModalFooter, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Button, {
                                        colorScheme: "blue",
                                        mr: 3,
                                        onClick: props.onClose,
                                        children: "Close"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Button, {
                                        isDisabled: isDisabled1,
                                        onClick: ()=>{
                                            setShouldFetch(false);
                                            updateCompanyInfo();
                                        },
                                        variant: "ghost",
                                        children: [
                                            "Save",
                                            " ",
                                            isSubmitted ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.CircularProgress, {
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
                })
            ]
        }, `companymodal--${props.currCompany}`)
    }));
};
// Client-side data fetching for Clearbit's NameToDomain API (on company modal load)
function CompanyInfoData(props) {
    console.log(props);
    const fetcher = (companyDomain, ...args)=>fetch(companyDomain).then((response)=>response.json()
        )
    ;
    let paramsObj = {
        params: props.companyName
    };
    let searchParams = new URLSearchParams(paramsObj);
    // Create a stable key for SWR
    searchParams.sort();
    const qs = searchParams.toString();
    const { data  } = (0,swr_dist/* default */.ZP)(`/api/cors?${qs}`, fetcher);
    console.log("DATA: ", data);
    if (!data) {
        props.isDisabled(true);
    } else {
        props.isDisabled(false);
    }
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: data && data.message && data.message.logo ? /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
            w: "full",
            borderRadius: "lg",
            overflow: "hidden",
            p: 4,
            children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                height: "30px",
                src: data.message.logo,
                alt: data.message.domain
            })
        }) : /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
            w: "full",
            borderRadius: "lg",
            overflow: "hidden",
            p: 4,
            children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                fontSize: "xs",
                fontWeight: "400",
                color: "red.500",
                children: "Company logo is unavailable or name is incorrect."
            })
        })
    }));
}
/* harmony default export */ const CompanyModal_CompanyModal = (CompanyModal);

;// CONCATENATED MODULE: ./components/UserPermissionsProvider/UserPermissionsProvider.tsx



// This provider is intended to be surrounding the whole application.
// It should receive the users permissions as parameter
const UserPermissionProvider = ({ fetchPermission , children ,  })=>{
    const cache = {};
    // Creates a method that returns whether the requested permission is available in the list of permissions
    // passed as parameter
    const isAllowedTo = async (permission)=>{
        if (Object.keys(cache).includes(permission)) {
            return cache[permission];
        }
        const isAllowed = await fetchPermission(permission);
        cache[permission] = isAllowed;
        return isAllowed;
    };
    // This component will render its children wrapped around a PermissionContext's provider whose
    // value is set to the method defined above
    return(/*#__PURE__*/ jsx_runtime.jsx(UserPermissionsProvider_UserPermissionsContext.Provider, {
        value: {
            isAllowedTo
        },
        children: children
    }));
};
/* harmony default export */ const UserPermissionsProvider = (UserPermissionProvider);

;// CONCATENATED MODULE: ./utils/profileUtils.tsx
const fetcher = (...args)=>fetch(...args).then((response)=>response.json()
    )
;
// Function that simulates fetching a permission from remote server
const fetchPermission = (currentUserName, loggedInUserAddress)=>async (permission)=>{
        let user = {
            userName: currentUserName,
            permissions: [
                "view"
            ]
        };
        // permissions: ["view"] for restricted
        // Simulate a delay from a request
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // const { data, error } = await useSWR(`/api/users/${currentUserName}`, fetcher);
        const data = await fetch(`/api/users/getUser/${currentUserName}`).then((res)=>res.json()
        );
        console.log("PERMISSION DATA:", data);
        // console.log(data);
        if (data && data.userWallet === loggedInUserAddress) {
            user = {
                userName: currentUserName,
                permissions: [
                    "edit"
                ]
            };
            return user.permissions.includes(permission);
        }
        return user.permissions.includes(permission);
    }
;

;// CONCATENATED MODULE: ./components/Profile/ProfileDetails.tsx





















// network node that we're interacting with, can be local/prod
// we're using a test network here
const ProfileDetails_endpoint = "https://ceramic-clay.3boxlabs.com";
const ProfileDetails = ({ user  })=>{
    // Fallback for getStaticPaths, when fallback: true
    // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
    // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
    const router = (0,next_router.useRouter)();
    if (router.isFallback) {
        return(/*#__PURE__*/ jsx_runtime.jsx("div", {
            children: "Loading data"
        }));
    }
    const { 0: profileData1 , 1: setProfileData  } = (0,react.useState)();
    const { 0: userData , 1: setUserData  } = (0,react.useState)();
    const { 0: name , 1: setName  } = (0,react.useState)("");
    const { isOpen: isProfileModalOpen , onOpen: onProfileModalOpen , onClose: onProfileModalClose ,  } = (0,chakra_ui_react_cjs_prod.useDisclosure)();
    const { isOpen: isExpModalOpen , onOpen: onExpModalOpen , onClose: onExpModalClose ,  } = (0,chakra_ui_react_cjs_prod.useDisclosure)();
    const { isOpen: isSnapshotModalOpen , onOpen: onSnapshotModalOpen , onClose: onSnapshotModalClose ,  } = (0,chakra_ui_react_cjs_prod.useDisclosure)();
    const { isOpen: isCompanyModalOpen , onOpen: onCompanyModalOpen , onClose: onCompanyModalClose ,  } = (0,chakra_ui_react_cjs_prod.useDisclosure)();
    const { 0: loaded , 1: setLoaded  } = (0,react.useState)(false);
    const { 0: snapshotData , 1: setSnapshotData  } = (0,react.useState)();
    const { 0: currentSnapshot , 1: setCurrentSnapshot  } = (0,react.useState)();
    const { 0: loggedInUserAddress , 1: setLoggedInUserAddress  } = (0,react.useState)("");
    const { 0: currCompany , 1: setCurrCompany  } = (0,react.useState)(0);
    console.log(user);
    async function readProfile1() {
        const address = await (0,walletUtils/* connect */.$)(); // first address in the array
        const ceramic = new ceramic_http_client/* default */.ZP(ProfileDetails_endpoint);
        const idx = new dist.IDX({
            ceramic
        });
        const threeIdConnect = new connect_esm/* ThreeIdConnect */.$F();
        const authProvider = new connect_esm/* EthereumAuthProvider */.KS(window.ethereum, address);
        await threeIdConnect.connect(authProvider);
        const provider = await threeIdConnect.getDidProvider();
        ceramic.did = new dids_lib.DID({
            provider: provider,
            resolver: {
                ...lib_default().getResolver(ceramic)
            }
        });
        await ceramic.did.authenticate();
        try {
            // does not require signing to get user's public data
            const data = await idx.get("basicProfile", `${address}@eip155:1`);
            console.log("data: ", data);
            const profile = await stream_tile_lib.TileDocument.deterministic(ceramic, {
                family: "user-profile-data"
            }, {
                anchor: false,
                publish: false
            });
            if (data.name) setName(data.name);
            if (profile) {
                setProfileData(profile);
            }
            setLoaded(true);
        } catch (err) {
            console.log("error: ", err);
            setLoaded(false);
        }
    }
    (0,react.useEffect)(()=>{
        async function readProfile() {
            const address = await (0,walletUtils/* connect */.$)(); // first address in the array
            const ceramic = new ceramic_http_client/* default */.ZP(ProfileDetails_endpoint);
            const idx = new dist.IDX({
                ceramic
            });
            const threeIdConnect = new connect_esm/* ThreeIdConnect */.$F();
            const authProvider = new connect_esm/* EthereumAuthProvider */.KS(window.ethereum, address);
            await threeIdConnect.connect(authProvider);
            const provider = await threeIdConnect.getDidProvider();
            ceramic.did = new dids_lib.DID({
                provider: provider,
                resolver: {
                    ...lib_default().getResolver(ceramic)
                }
            });
            await ceramic.did.authenticate();
            try {
                // does not require signing to get user's public data
                const data = await idx.get("basicProfile", `${address}@eip155:1`);
                console.log("data: ", data);
                const profile = await stream_tile_lib.TileDocument.deterministic(ceramic, {
                    family: "user-profile-data"
                }, {
                    anchor: false,
                    publish: false
                });
                if (data.name) setName(data.name);
                if (profile) {
                    setProfileData(profile);
                }
                if (user) {
                    setUserData(user);
                }
                if (address) {
                    setLoggedInUserAddress(address);
                }
                setLoaded(true);
            } catch (err) {
                console.log("error: ", err);
                setLoaded(false);
            }
            const query = graphql_request_dist.gql`
        query getSnapshotVotes($wallet: String!) {
          votes(where: { voter: $wallet }) {
            id
            space {
              id
              avatar
            }
          }
        }
      `;
            const walletVar = {
                wallet: address
            };
            // Run GraphQL queries
            (0,graphql_request_dist.request)("https://hub.snapshot.org/graphql", query, walletVar).then((data)=>{
                data.votes.find((v)=>{
                    if (v.space.avatar) {
                        v.space.avatar = v.space.avatar.replace("ipfs://", "https://ipfs.io/ipfs/");
                    }
                });
                getVoterSnapshotQueries(data, address);
            });
        }
        async function getVoterSnapshotQueries(data, address) {
            let finalData = [];
            if (data) {
                data.votes.forEach((snapshot)=>{
                    let finalObj = {
                        spaceID: "",
                        totalVotes: 0,
                        walletVotes: 0,
                        voter: "",
                        avatar: snapshot.space.avatar
                    };
                    const variables = {
                        spaceID: snapshot.space.id,
                        wallet: address
                    };
                    const query2 = graphql_request_dist.gql`
            query getProposals($spaceID: String!) {
              proposals(where: { space: $spaceID }) {
                title
                scores
                scores_total
                votes
              }
            }
          `;
                    (0,graphql_request_dist.request)("https://hub.snapshot.org/graphql", query2, variables).then((propData)=>{
                        let totalVotes = 0;
                        propData.proposals.forEach((proposal)=>{
                            totalVotes += proposal.votes;
                        });
                        finalObj.totalVotes = totalVotes;
                    });
                    const query3 = graphql_request_dist.gql`
            query getVotes($spaceID: String!, $wallet: String!) {
              votes(where: { voter: $wallet, space: $spaceID }) {
                id
              }
            }
          `;
                    (0,graphql_request_dist.request)("https://hub.snapshot.org/graphql", query3, variables).then((totals)=>{
                        finalObj.walletVotes = totals.votes.length;
                        finalObj.voter = address;
                    });
                    finalObj.spaceID = snapshot.space.id;
                    finalData.push(finalObj);
                });
            }
            let resArr = [];
            finalData.forEach(function(item) {
                var i = resArr.findIndex((x)=>x.spaceID == item.spaceID
                );
                if (i <= -1) {
                    resArr.push(item);
                }
            });
            setSnapshotData(resArr);
        }
        readProfile();
    }, []);
    const handleUpdatedProfile = (profileData)=>{
        setProfileData({
            ...profileData
        });
        readProfile1();
    };
    const handleUpdatedCompanyInfo = (profileData)=>{
        setProfileData({
            ...profileData
        });
        readProfile1();
    };
    function createWorkElements(number) {
        var elements = [];
        let totalLen = profileData1.content.identity.companyInfo ? profileData1.content.identity.companyInfo.length : 0;
        for(let i = 0; i < number; i++){
            if (profileData1.content.identity.companyInfo && i < totalLen && profileData1.content.identity.companyInfo[i].companyName) {
                elements.push(/*#__PURE__*/ jsx_runtime.jsx(GetCompany, {
                    companyName: profileData1.content.identity.companyInfo[i].companyName,
                    currCompany: i,
                    setCurrCompany: setCurrCompany,
                    onCompanyModalOpen: onCompanyModalOpen
                }));
            } else {
                elements.push(/*#__PURE__*/ jsx_runtime.jsx(UserPermissionsProvider_UserPermissionsRestricted, {
                    to: "edit",
                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                        borderRadius: "full",
                        style: {
                            cursor: "pointer"
                        },
                        backgroundColor: "lightgray",
                        width: "100px",
                        src: "add.svg",
                        alt: "add img",
                        onClick: ()=>{
                            setCurrCompany(i);
                            onCompanyModalOpen();
                        }
                    }, `${i}--empty-company-exp`)
                }));
            }
        }
        return elements;
    }
    const viewCompany = /*#__PURE__*/ jsx_runtime.jsx(CompanyModal_CompanyModal, {
        isOpen: isCompanyModalOpen,
        onClose: onCompanyModalClose,
        currCompany: currCompany,
        profileData: profileData1,
        userPermission: "view",
        handleUpdatedCompanyInfo: handleUpdatedCompanyInfo
    });
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: !loaded ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.VStack, {
            alignSelf: "center",
            spacing: 8,
            pt: 8,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.CircularProgress, {
                    size: "50px",
                    thickness: "8px",
                    isIndeterminate: true,
                    color: "#3C2E26"
                }),
                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                    fontSize: "2xl",
                    children: "Loading"
                })
            ]
        }) : profileData1 && name && profileData1.content && profileData1.content.accType && profileData1.content.identity && /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(UserPermissionsProvider, {
                fetchPermission: fetchPermission(userData.userName, loggedInUserAddress ? loggedInUserAddress : null),
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
                        w: "full",
                        borderWidth: "1px",
                        borderRadius: "lg",
                        overflow: "hidden",
                        children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                            objectFit: "cover",
                            width: "100%",
                            height: "200px",
                            overflow: "hidden",
                            src: "https://i.pinimg.com/originals/92/4e/c3/924ec3d75761aa0e5b84e4031f718de6.jpg",
                            alt: "aesthetic brown"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.HStack, {
                        w: "full",
                        spacing: 24,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.VStack, {
                                marginTop: 0,
                                paddingTop: 0,
                                align: "flex-start",
                                spacing: 6,
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
                                        alignSelf: "flex-start",
                                        overflow: "hidden",
                                        children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                                            borderRadius: "full",
                                            width: "500px",
                                            src: "fox-pfp.png",
                                            alt: "fox stock img"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(UserPermissionsProvider_UserPermissionsRestricted, {
                                        to: "edit",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.IconButton, {
                                                onClick: onExpModalOpen,
                                                alignSelf: "flex-end",
                                                variant: "ghost",
                                                "aria-label": "Update experience",
                                                icon: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
                                                    size: "sm",
                                                    icon: [
                                                        "fas",
                                                        "edit"
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx(EditExperienceModal_EditExperienceModal, {
                                                isOpen: isExpModalOpen,
                                                onClose: onExpModalClose,
                                                profileData: profileData1,
                                                handleUpdatedExperiences: handleUpdatedProfile
                                            })
                                        ]
                                    }),
                                    profileData1.content.identity.userName && /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Text, {
                                        fontSize: "xl",
                                        children: [
                                            "@",
                                            profileData1.content.identity.userName
                                        ]
                                    }),
                                    profileData1.content.identity.email && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                        fontSize: "md",
                                        children: profileData1.content.identity.email
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
                                        p: 4,
                                        ml: 8,
                                        borderWidth: "1px",
                                        color: "rgb(0, 0, 0)",
                                        borderRadius: "lg",
                                        overflow: "hidden",
                                        backgroundColor: "rgb(222, 222, 222)",
                                        children: profileData1 && profileData1.content.identity && profileData1.content.identity.funcExpertise && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                            fontSize: "md",
                                            children: profileData1.content.identity.funcExpertise
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
                                        p: 4,
                                        ml: 8,
                                        borderWidth: "1px",
                                        borderRadius: "lg",
                                        overflow: "hidden",
                                        color: "rgb(0, 0, 0)",
                                        backgroundColor: "rgb(222, 222, 222)",
                                        children: profileData1 && profileData1.content.identity && profileData1.content.identity.industryExpertise && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                            fontSize: "md",
                                            children: profileData1.content.identity.industryExpertise
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
                                alignSelf: "flex-start",
                                w: "full",
                                pt: 16,
                                pl: 4,
                                overflow: "hidden",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Stack, {
                                    spacing: 6,
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.HStack, {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                    fontSize: "xl",
                                                    children: name + ", " + profileData1.content.accType
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
                                                    size: "lg",
                                                    icon: [
                                                        "fas",
                                                        "map-pin"
                                                    ]
                                                }),
                                                profileData1.content.identity.businessLocation && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                    fontSize: "md",
                                                    children: profileData1.content.identity.businessLocation
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                            fontSize: "md",
                                            children: profileData1.content.identity.currTitle
                                        }),
                                        profileData1.content.identity.bio && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                            fontSize: "md",
                                            children: profileData1.content.identity.bio
                                        }),
                                        ")",
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.HStack, {
                                            width: "6rem",
                                            justifyContent: "space-between",
                                            children: [
                                                profileData1.content.identity.linkedIn && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Link, {
                                                    href: profileData1.content.identity.linkedIn,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    width: "fit-content",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Image, {
                                                        src: "LI-In-Bug.png",
                                                        height: "2rem",
                                                        width: "auto"
                                                    })
                                                }),
                                                profileData1.content.identity.twitter && /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Link, {
                                                    href: profileData1.content.identity.twitter,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Image, {
                                                        src: "2021_Twitter_logo - blue.png",
                                                        height: "2rem",
                                                        width: "auto"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.VStack, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Box, {
                                                    alignSelf: "flex-start",
                                                    w: "full",
                                                    overflow: "hidden",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                            pb: 8,
                                                            fontSize: "xl",
                                                            children: "Work Experience"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.HStack, {
                                                            spacing: 4,
                                                            children: createWorkElements(5)
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx(UserPermissionsProvider_UserPermissionsRestricted, {
                                                            to: "edit",
                                                            fallback: viewCompany,
                                                            children: /*#__PURE__*/ jsx_runtime.jsx(CompanyModal_CompanyModal, {
                                                                isOpen: isCompanyModalOpen,
                                                                onClose: onCompanyModalClose,
                                                                currCompany: currCompany,
                                                                profileData: profileData1,
                                                                handleUpdatedCompanyInfo: handleUpdatedCompanyInfo
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Box, {
                                                    alignSelf: "flex-start",
                                                    w: "full",
                                                    overflow: "hidden",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Text, {
                                                            pt: 8,
                                                            pb: 4,
                                                            fontSize: "xl",
                                                            children: "Web3 Credentials"
                                                        }),
                                                        snapshotData ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.HStack, {
                                                                    spacing: 4,
                                                                    children: snapshotData.map((vote)=>/*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                                                                            style: {
                                                                                cursor: "pointer"
                                                                            },
                                                                            borderRadius: "full",
                                                                            width: "100px",
                                                                            src: vote.avatar,
                                                                            alt: "fox stock img",
                                                                            onClick: ()=>{
                                                                                setCurrentSnapshot(vote);
                                                                                onSnapshotModalOpen();
                                                                            }
                                                                        }, vote.spaceID)
                                                                    )
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx(SnapshotModal_SnapshotModal, {
                                                                    isOpen: isSnapshotModalOpen,
                                                                    onClose: onSnapshotModalClose,
                                                                    snapshotData: currentSnapshot
                                                                })
                                                            ]
                                                        }) : null
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Box, {
                                marginTop: 8,
                                w: "150px",
                                alignSelf: "flex-start",
                                overflow: "hidden",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(UserPermissionsProvider_UserPermissionsRestricted, {
                                    to: "edit",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.IconButton, {
                                            onClick: onProfileModalOpen,
                                            alignSelf: "flex-end",
                                            variant: "ghost",
                                            "aria-label": "Update experience",
                                            icon: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
                                                size: "sm",
                                                icon: [
                                                    "fas",
                                                    "edit"
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(EditProfileModal_EditProfileModal, {
                                            isOpen: isProfileModalOpen,
                                            onClose: onProfileModalClose,
                                            profileData: profileData1,
                                            handleUpdatedProfile: handleUpdatedProfile
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        })
    }));
};
// Client-side data fetching for Clearbit's NameToDomain API (on page load)
const GetCompany = (companyName)=>{
    const fetcher = (companyDomain, ...args)=>fetch(companyDomain).then((response)=>response.json()
        )
    ;
    let paramsObj = {
        params: companyName.companyName
    };
    let searchParams = new URLSearchParams(paramsObj);
    // Create a stable key for SWR
    searchParams.sort();
    const qs = searchParams.toString();
    const { data , error  } = (0,swr_dist/* default */.ZP)(`/api/cors?${qs}`, fetcher);
    console.log("DATA: ", data);
    return(/*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: data && data.message && data.message.logo ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Box, {
            w: "100px",
            height: "100px",
            borderRadius: "full",
            backgroundColor: "rgb(222, 222, 222)",
            overflow: "hidden",
            p: 4,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(UserPermissionsProvider_UserPermissionsRestricted, {
                    to: "view",
                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                        backgroundColor: "rgb(222, 222, 222)",
                        style: {
                            cursor: "pointer"
                        },
                        alignSelf: "center",
                        src: data.message.logo,
                        alt: "fox stock img",
                        onClick: ()=>{
                            companyName.setCurrCompany(companyName.currCompany);
                            companyName.onCompanyModalOpen();
                        }
                    }, `${data.message.name}--${companyName.currCompany}`)
                }),
                /*#__PURE__*/ jsx_runtime.jsx(UserPermissionsProvider_UserPermissionsRestricted, {
                    to: "edit",
                    children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
                        backgroundColor: "rgb(222, 222, 222)",
                        style: {
                            cursor: "pointer"
                        },
                        alignSelf: "center",
                        src: data.message.logo,
                        alt: "fox stock img",
                        onMouseEnter: (e)=>e.currentTarget.src = "edit.svg"
                        ,
                        onMouseLeave: (e)=>e.currentTarget.src = data.message.logo
                        ,
                        onClick: ()=>{
                            companyName.setCurrCompany(companyName.currCompany);
                            companyName.onCompanyModalOpen();
                        }
                    }, `${data.message.name}--${companyName.currCompany}`)
                })
            ]
        }, `${data.message.name}--${companyName.currCompany}--box`) : /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Img, {
            borderRadius: "full",
            style: {
                cursor: "pointer"
            },
            backgroundColor: "lightgray",
            width: "100px",
            src: "add.svg",
            alt: "add img",
            onClick: ()=>{
                companyName.setCurrCompany(companyName.currCompany);
                companyName.onCompanyModalOpen();
            }
        }, `${companyName.currCompany}--empty-company-exp`)
    }));
};
/* harmony default export */ const Profile_ProfileDetails = (ProfileDetails);

// EXTERNAL MODULE: ./data/index.js
var data = __webpack_require__(93820);
var data_default = /*#__PURE__*/__webpack_require__.n(data);
;// CONCATENATED MODULE: ./pages/api/users/getUser/[userName].tsx

const getUserHandler = async (req, res)=>{
    console.log(req);
    try {
        const jsonData = await getUser(req.query.userName);
        console.log(jsonData);
        res.status(200).json(JSON.stringify(jsonData));
    } catch  {
        res.status(404).json("User not found");
    }
};
/* harmony default export */ const _userName_ = ((/* unused pure expression or super */ null && (getUserHandler)));
async function getUser(userName) {
    const getUserInfo = await data_default().getUser(userName);
    return getUserInfo;
}

;// CONCATENATED MODULE: ./pages/[username].tsx





// export const getStaticPaths = async () => {
//   const res: any = await data.getUsers();
//   console.log("ALL USERS", res);
//   // Should get a list of all users from the backend here
//   const allUsers = await res.json();
//   if (!res.ok) {
//     // If there is a server error, you might want to
//     // throw an error instead of returning so that the cache is not updated
//     // until the next successful request.
//     throw new Error(`Failed to fetch data, received status ${res.status}`)
//   }
//   const paths = allUsers.map((user: any) => {
//     return {
//       params: { userName: user.userName },
//     };
//   });
//   // Setting fallback: true
//   // Useful for an app that has a large number of static pages, and this prevents the build time from slowing down
//   // More info in Nextjs docs here: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };
// This gets called on every request
async function getServerSideProps(context) {
    const userName = context.params.userName;
    console.log("Context:", context);
    const user = await getUser(userName);
    // Should get a list of all users from the backend here
    // const res = await user.json();
    // console.log("DATA: ", res);
    // if (!res.ok) {
    //   // If there is a server error, you might want to
    //   // throw an error instead of returning so that the cache is not updated
    //   // until the next successful request.
    //   throw new Error(`Failed to fetch data, received status ${res.status}`)
    // }
    // Pass data to the page via props
    return {
        props: {
            user: user
        }
    };
}
// export const getStaticProps = async (context) => {
//   const userName = context.params.userName;
//   console.log("Context:", context);
//   const user: any = await data.getUser(userName);
//   // Should get a list of all users from the backend here
//   const res = await user.json();
//   console.log("DATA: ", res);
//   if (!res.ok) {
//     // If there is a server error, you might want to
//     // throw an error instead of returning so that the cache is not updated
//     // until the next successful request.
//     throw new Error(`Failed to fetch data, received status ${res.status}`)
//   }
//   return {
//     props: { user: res },
//     revalidate: 10,
//   };
// };
const ProfilePage = ({ user  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime.jsxs)(chakra_ui_react_cjs_prod.Container, {
        maxW: "container.xl",
        p: 12,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(HeaderNav/* default */.Z, {
                whichPage: "profile"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.Flex, {
                h: "full",
                children: /*#__PURE__*/ jsx_runtime.jsx(chakra_ui_react_cjs_prod.VStack, {
                    w: "full",
                    h: "full",
                    spacing: 8,
                    alignItems: "flex-start",
                    children: /*#__PURE__*/ jsx_runtime.jsx(Profile_ProfileDetails, {
                        user: user
                    })
                })
            })
        ]
    }));
};
/* harmony default export */ const _username_ = (ProfilePage);


/***/ }),

/***/ 67679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ connect)
/* harmony export */ });
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


/***/ }),

/***/ 25990:
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ 1014:
/***/ ((module) => {

module.exports = require("critters");

/***/ }),

/***/ 2186:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@ampproject/toolbox-optimizer");

/***/ }),

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 50852:
/***/ ((module) => {

module.exports = require("async_hooks");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 32081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 35001:
/***/ ((module) => {

module.exports = require("cluster");

/***/ }),

/***/ 22057:
/***/ ((module) => {

module.exports = require("constants");

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

/***/ 41808:
/***/ ((module) => {

module.exports = require("net");

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

/***/ 24404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [885,218,559,332,640,896], () => (__webpack_exec__(20745)));
module.exports = __webpack_exports__;

})();