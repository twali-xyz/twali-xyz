"use strict";
exports.id = 691;
exports.ids = [691];
exports.modules = {

/***/ 37489:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const { v4  } = __webpack_require__(72211);
const TableName = "main_user_profiles_db";
const getDynamoDBClient = ()=>{
    const AWS = __webpack_require__(25990);
    const edgeRegion = process.env.CURRENT_AWS_REGION || "us-east-1";
    const dynamoDBRegion = edgeRegion.startsWith("us") ? "us-east-1" : "us-east-2";
    // Only needed with local development.
    // if (process.env.LOCAL_DYNAMO_DB_ENDPOINT) {
    AWS.config.update({
        // accessKeyId: "xxxx",
        // secretAccessKey: "xxxx",
        region: "us-east-1"
    });
    // }
    const options = {
        convertEmptyValues: true,
        region: dynamoDBRegion
    };
    const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT ? new AWS.DynamoDB.DocumentClient() : // process.env.LOCAL_DYNAMO_DB_ENDPOINT
    new AWS.DynamoDB.DocumentClient(options);
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
                userWallet: userWallet
            },
            ProjectionExpression: "UserNonce"
        }).promise().then((data)=>data.Items
        ).catch((err)=>console.log(err)
        );
        return dbUser;
    },
    /**
   * @desc Creates a user profile with the `userName` being set as the primary key in the database.
   * @param {Object} userData holds the primary key from object to process to database and any addtional metadata.
   * @dev This is a flexible creation function and is not perminit. Can be adjusted to a required user needs.
   * @example See docs about including additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
   **/ createUser: async (userData)=>{
        console.log(userData);
        const { userName , userWallet , firstName , lastName , accType , email , bio , twitter , linkedIn , website , businessName , businessType , businessLocation , currTitle , currLocation , functionalExpertise , industryExpertise , companyInfo ,  } = userData;
        await getDynamoDBClient().put({
            TableName,
            Item: {
                userName: userName,
                userWallet: userWallet,
                accType: accType,
                uuid: v4(),
                createdAt: Date.now(),
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
                functionalExpertise: functionalExpertise,
                industryExpertise: industryExpertise,
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
   */ updateUserExpertise: async (userWallet, attributes)=>{
        console.log("UPDATE USER EXP DYNAMO");
        console.log(userWallet);
        console.log(attributes);
        let { userName , functionalExpertise , industryExpertise  } = attributes;
        console.log(attributes);
        await getDynamoDBClient().update({
            TableName,
            Key: {
                userWallet: userWallet,
                userName: userName
            },
            UpdateExpression: "SET functionalExpertise = :functionalExpertise, industryExpertise = :industryExpertise",
            // ConditionExpression: "",
            ExpressionAttributeValues: {
                ":functionalExpertise": functionalExpertise,
                ":industryExpertise": industryExpertise
            }
        }).promise().then((data)=>console.log(data)
        ).catch(console.error);
    },
    /**
   * @desc Edits an existing users item's attributes, or adds a new item to the table if it does not already exist.
   * @param {object} - function takes an object as a the parameter with primary and attributes. Object will need to the primary key and any attributes that are being updated or created.
   * @dev New items can be added to a user and does need to be predefined in the table. Any values in 'UpdateExpression' need to be defined will values within 'ExpressionAttributeValues'.
   * @example See docs about editing existing attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   */ updateUserProfile: async (userWallet, attributes)=>{
        console.log("UPDATE USER PROF DYNAMO");
        console.log(userWallet);
        console.log(attributes);
        let { userName , firstName , lastName , currTitle , currLocation , bio , linkedIn , twitter , email ,  } = attributes;
        await getDynamoDBClient().update({
            TableName,
            Key: {
                userWallet: userWallet,
                userName: userName
            },
            UpdateExpression: "SET firstName = :firstName, lastName = :lastName, currTitle = :currTitle, currLocation = :currLocation, bio = :bio, linkedIn = :linkedIn, twitter = :twitter, email = :email",
            // ConditionExpression: "",
            ExpressionAttributeValues: {
                ":firstName": firstName,
                ":lastName": lastName,
                ":currTitle": currTitle,
                ":currLocation": currLocation,
                ":bio": bio,
                ":linkedIn": linkedIn,
                ":twitter": twitter,
                ":email": email
            }
        }).promise().then((data)=>console.log(data)
        ).catch(console.error);
    },
    /**
   * @desc Edits an existing users item's attributes, or adds a new item to the table if it does not already exist.
   * @param {object} - function takes an object as a the parameter with primary and attributes. Object will need to the primary key and any attributes that are being updated or created.
   * @dev New items can be added to a user and does need to be predefined in the table. Any values in 'UpdateExpression' need to be defined will values within 'ExpressionAttributeValues'.
   * @example See docs about editing existing attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   */ updateUserCompanyData: async (userWallet, attributes)=>{
        console.log("UPDATE USER COMPANY DATA DYNAMO");
        let { companyData , userName  } = attributes;
        let companyInfo = companyData; // to use companyInfo as the new array obj in the front-end
        console.log("COMPANY INFO", companyInfo);
        const getParams = (updatedCompanyData)=>{
            const params = {
                TableName,
                Key: {
                    userWallet: userWallet,
                    userName: userName
                },
                UpdateExpression: "SET companyInfo = :updatedData",
                ExpressionAttributeValues: {
                    ":updatedData": updatedCompanyData
                },
                ReturnValues: "UPDATED_NEW"
            };
            return params;
        };
        // Updating the companyInfo array
        let params1 = getParams(companyInfo);
        await getDynamoDBClient().update({
            TableName: params1.TableName,
            Key: {
                userWallet: userWallet,
                userName: userName
            },
            UpdateExpression: params1.UpdateExpression,
            ExpressionAttributeValues: params1.ExpressionAttributeValues,
            ReturnValues: "ALL_NEW"
        }).promise().catch(console.error);
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
    },
    /**
   * @desc Checks if userName does not exsit in db table by checking if a return object is returned from DB.
   * @dev Can implement a value check in the near future.
   * @returns Returns a boolean value
   */ userNameIsValid: async (userName)=>{
        let exists = false;
        const dbUserName = await getDynamoDBClient().query({
            TableName,
            IndexName: "wallet_name_index",
            // ProjectionExpression: "userName",
            KeyConditionExpression: "userName = :userName",
            ExpressionAttributeValues: {
                ":userName": userName
            }
        }).promise();
        // console.log(dbUserName.Items)
        if (dbUserName.Items[0] !== undefined && dbUserName.Items[0] !== null) {
            exists = true;
        }
        console.log("exists", exists);
        return exists;
    }
};


/***/ }),

/***/ 43691:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(37489);


/***/ })

};
;