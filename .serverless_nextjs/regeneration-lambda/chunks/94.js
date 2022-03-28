"use strict";
exports.id = 94;
exports.ids = [94];
exports.modules = {

/***/ 37374:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ MultiSelect)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23863);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);



function MultiSelect({ formLabel , name , handleChange , options , defaultValues , maxSelections , ...props }) {
    // maxDisplayIndex tracks the index of the last element in the array that contains data
    const { 0: maxDisplayIndex , 1: setMaxDisplayIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: count , 1: setCount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(maxDisplayIndex + 1 > 1 ? maxDisplayIndex + 1 : 1);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let defaults = [];
        for(let i = 0; i < (defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.length); i++){
            const element = defaultValues[i];
            if (element !== "" && element !== null && element !== undefined) {
                defaults.push(element);
                if (i >= maxDisplayIndex) {
                    setMaxDisplayIndex(i + 1);
                    setCount(i + 1);
                }
            }
        }
    }, [
        count
    ]);
    const splitLabel = name.split(/(?=[A-Z])/);
    function createSelectors() {
        let selectors = [];
        for(let i = 1; i <= count; i++){
            const element = defaultValues && (defaultValues[i - 1] || i === 1 || count >= i) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Selector, {
                splitLabel: splitLabel,
                handleChange: handleChange,
                options: options,
                idx: i,
                defaultValue: (defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.length) ? defaultValues[i - 1] : null
            }, `${i}--selector`);
            selectors.push(element);
        }
        return selectors;
    }
    function handleAddSelector() {
        if (count < maxSelections) {
            setCount(count + 1);
            setMaxDisplayIndex(maxDisplayIndex + 1);
        }
    }
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.FormControl, {
        p: 2,
        id: `${splitLabel[0]}-${splitLabel[1]}`,
        isRequired: true,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.FormLabel, {
                pos: "relative",
                left: "1px",
                fontFamily: "PP Telegraf",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "24p",
                letterSpacing: "0.02em",
                textAlign: "left",
                children: formLabel
            }),
            createSelectors(),
            count !== maxSelections ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {
                backgroundColor: "transparent",
                marginTop: "16px",
                onClick: handleAddSelector,
                paddingLeft: "0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.HStack, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Img, {
                            borderRadius: "full",
                            backgroundColor: "transparent",
                            width: "32px",
                            src: "twali-assets/plusicon.png",
                            alt: "add img"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
                            fontFamily: "PP Telegraf Light",
                            fontWeight: "400",
                            color: "#C7F83C",
                            fontSize: "16px",
                            lineHeight: "24px",
                            children: "Add expertise"
                        })
                    ]
                })
            }) : null
        ]
    }));
}
function Selector({ splitLabel , handleChange , options , idx: idx1 , defaultValue  }) {
    const { 0: color , 1: setColor  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("#98B2B2");
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Select, {
        marginTop: "8px",
        placeholder: `Select ${splitLabel[0]} ${splitLabel[1]}`,
        name: `${splitLabel[0]}${splitLabel[1] + idx1}`,
        onChange: (e)=>{
            handleChange(e);
            if (e.target.value) {
                setColor("#F9FFF2");
            } else {
                setColor("#98B2B2");
            }
        },
        defaultValue: defaultValue,
        errorBorderColor: "red.300",
        fontFamily: "PP Telegraf light",
        color: defaultValue ? "#F9FFF2" : color,
        _placeholder: {
            color: "#98B2B2"
        },
        children: options === null || options === void 0 ? void 0 : options.map((option, idx)=>{
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                children: option
            }, `${option}--option-${idx}`));
        })
    }, `${splitLabel[0]}-${idx1}`));
}


/***/ }),

/***/ 79339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ setEventArray)
/* harmony export */ });
//                                                    _
//         (:)_
//         ,'    `.
//        :        :
//        |        |              ___
//        |       /|    ______   // _\
//        ; -  _,' :  ,'      `. \\  -\
//       /          \/          \ \\  :
//      (            :  ------.  `-'  |
//   ____\___    ____|______   \______|_______
//           |::|           '--`
//           |::|
//           |::|
//           |::|
//           |::;
//           `:/
//
// sets new values & identity for the corresponding event in an array
// requires an event with event.target.name == <stateName><number> e.g. "industryExpertise2" or "functionalExpertise1"
// (e.g. values/identity = {bio: "",
//                          name: "userName",
//                          ...,
//                       -> functionalExpertiseindustryExpertise = [oldValue, newValue, ""],
//                       -> industryExpertise = [newValue, oldValue, ""]
//                       -> strippedEventName = [...eventArray]
// })
function setEventArray({ evt , values: values1 , setValues , userData , setUserData ,  }) {
    if (!evt) return;
    const eventName = evt.target.name;
    const [strippedEventName, eventIndex] = [
        eventName.substring(0, eventName.length - 1),
        Number(eventName[eventName.length - 1]), 
    ];
    const eventValues = values1[strippedEventName];
    let eventArray = [];
    for(let i = 0; i <= (eventValues === null || eventValues === void 0 ? void 0 : eventValues.length); i++){
        if (i === eventIndex - 1) {
            eventArray.push(evt.target.value);
        } else {
            eventArray.push(eventValues[i]);
        }
    }
    setValues((values)=>({
            ...values,
            [strippedEventName]: eventArray
        })
    );
    setUserData({
        ...userData,
        [strippedEventName]: eventArray
    });
}


/***/ }),

/***/ 39715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ functionalExpertiseList)
/* harmony export */ });
const functionalExpertiseList = [
    "Accounting",
    "Creative",
    "Audit",
    "Board & Advisory",
    "Corporate Development",
    "Comp & Benefits",
    "Compliance",
    "Management Consulting",
    "Data & Analytics",
    "Product Design",
    "Digital",
    "Engineering",
    "Entrepreneurship",
    "Finance",
    "General Management",
    "Human Resources",
    "IT Infrastructure",
    "Innovation",
    "Investor",
    "Legal",
    "Marketing",
    "Media & Comms",
    "Merchandising",
    "Security",
    "Operations",
    "Portfolio Operations",
    "Procurement",
    "Product Management",
    "Investor Relations",
    "Regulatory",
    "Research",
    "Risk",
    "Strategy",
    "Technology",
    "Transformation",
    "Sales & Customer",
    "Data Science",
    "Talent Acquisition",
    "Tax",
    "Cybersecurity",
    "Investment Banking",
    "Supply Chain", 
];


/***/ }),

/***/ 79769:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ industryExpertiseList)
/* harmony export */ });
const industryExpertiseList = [
    "Accounting",
    "Angel Investment",
    "Asset Management",
    "Auto Insurance",
    "Banking",
    "Bitcoin",
    "Commercial Insurance",
    "Commercial Lending",
    "Credit",
    "Credit Bureau",
    "Credit Cards",
    "Crowdfunding",
    "Cryptocurrency",
    "Debit Cards",
    "Debt Collections",
    "Finance",
    "Financial Exchanges",
    "Financial Services",
    "FinTech",
    "Fraud Detection",
    "Funding Platform",
    "Gift Card",
    "Health Insurance",
    "Hedge Funds",
    "Impact Investing",
    "Incubators",
    "Insurance",
    "InsurTech",
    "Leasing",
    "Lending",
    "Life Insurance",
    "Micro Lending",
    "Mobile Payments",
    "Payments",
    "Personal Finance",
    "Prediction Markets",
    "Property Insurance",
    "Real Estate Investment",
    "Stock Exchanges",
    "Trading Platform",
    "Transaction Processing",
    "Venture Capital",
    "Virtual Currency",
    "Wealth Management", 
];


/***/ }),

/***/ 95094:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "I": () => (/* binding */ fetchPermission),
  "k": () => (/* binding */ listOfCountries)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
;// CONCATENATED MODULE: ./utils/countriesConstants.ts
const countriesConstants = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "C\xf4te d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic (Czechia)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "DR Congo",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts & Nevis",
    "Saint Lucia",
    "Samoa",
    "San Marino",
    "Sao Tome & Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Vincent & Grenadines",
    "State of Palestine",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe", 
];

;// CONCATENATED MODULE: ./utils/profileUtils.tsx


const cache = {};
// Function that simulates fetching a permission from remote server
const fetchPermission = (currentUserName, loggedInUserAddress)=>async (permission)=>{
        let user = {
            userName: currentUserName,
            permissions: [
                "view"
            ]
        };
        // permissions: ["view"] for restricted
        let userData;
        if (!cache[permission]) {
            const data = await fetch(`/api/users/${currentUserName}`);
            userData = await data.json();
            cache[permission] = userData;
        } else {
            userData = cache[permission];
        }
        if (userData && userData.userWallet === loggedInUserAddress) {
            user = {
                userName: currentUserName,
                permissions: [
                    "edit"
                ]
            };
            cache[currentUserName] = userData;
            return user.permissions.includes(permission);
        } else {
            cache[currentUserName] = userData;
            return user.permissions.includes(permission);
        }
    }
;
// Function that retrieves a list of countries options for a dropdown
const listOfCountries = ()=>{
    let list = [];
    for(let i = 0; i < countriesConstants.length; i++){
        list.push(/*#__PURE__*/ jsx_runtime.jsx("option", {
            children: countriesConstants[i]
        }, `${i}--countryOption`));
    }
    return list;
};


/***/ })

};
;