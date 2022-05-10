const { v4 } = require("uuid");
const TableName = process.env.TABLE_NAME;

const getDynamoDBClient = () => {
  const AWS = require("aws-sdk");
  const edgeRegion = process.env.CURRENT_AWS_REGION || "us-east-1";
  const dynamoDBRegion = edgeRegion.startsWith("us")
    ? "us-east-1"
    : "us-east-2";

  // Only needed with local development.
  AWS.config.update({
    // accessKeyId: "xxxx",
    // secretAccessKey: "xxxx",
    region: "us-east-1",
    // endpoint: "http://localhost:8000",
  });

  const options = {
    convertEmptyValues: true,
    region: dynamoDBRegion,
  };

  const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT
    ? new AWS.DynamoDB.DocumentClient()
    : // ...options,
      // process.env.LOCAL_DYNAMO_DB_ENDPOINT
      new AWS.DynamoDB.DocumentClient(options);

  return client;
};

module.exports = {
  /**
   * @desc Gets a users nonce from database that is generated upon user creation to authenticate user that is accessing database.
   * @param {String} userWallet is the primary key to allow look up on database to access metadata to items belonging to user.
   *
   *
   **/
  getUserAuth: async (userWallet) => {
    const dbUser = await getDynamoDBClient()
      .get({
        TableName,
        Key: {
          userWallet: userWallet,
        },
        ProjectionExpression: "UserNonce",
      })
      .promise()
      .then((data) => data.Items)
      .catch((err) => console.log(err));
    return dbUser;
  },
  /**
   * @desc Creates a user profile with the `userName` being set as the primary key in the database.
   * @param {Object} userData holds the primary key from object to process to database and any addtional metadata.
   * @dev This is a flexible creation function and is not perminit. Can be adjusted to a required user needs.
   * @example See docs about including additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
   **/
  createUser: async (userData) => {
    console.log(userData);
    const {
      userName,
      userWallet,
      firstName,
      lastName,
      accType,
      email,
      bio,
      twitter,
      linkedIn,
      website,
      businessName,
      businessType,
      businessLocation,
      currTitle,
      currLocation,
      functionalExpertise,
      industryExpertise,
      companyInfo,
    } = userData;

    await getDynamoDBClient()
      .put({
        TableName,
        Item: {
          userName: userName,
          userWallet: userWallet,
          accType: accType,
          uuid: v4(), // unique ID associated with each user account
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
          companyInfo: companyInfo ? companyInfo : null,
        },
        /**
         * Set create user condition that no duplicate 'SK' -- userName can be created
         */
        // ConditionExpression: "attribute_not_exists(#userName)",
        //   ExpressionAttributeNames: {
        //     "#userName": userName,
        // }
      })
      .promise();
  },

  /**
   * @desc Access a user in the table by primary key on a GSI using `userName`.
   * @param {string} - function takes in a input string of the users userName
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/
  getUser: async (userName) => {
    const dbUser = await getDynamoDBClient()
      .query({
        TableName,
        IndexName: "wallet_name_index",
        // ProjectionExpression: "userName",
        KeyConditionExpression: "userName = :userName",
        ExpressionAttributeValues: {
          ":userName": userName,
        },
      })
      .promise()
      .then((data) => data.Items[0])
      .catch(console.error);
    return dbUser;
  },

  /**
   * @desc Directly access a user in the table by primary key `userWallet`.
   * @param {string} - function takes in a input string of the users userWallet
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/
  getUserByWallet: async (userWallet) => {
    console.log(userWallet);
    const dbUser = await getDynamoDBClient()
      .query({
        TableName,
        // ProjectionExpression: "userWallet",
        KeyConditionExpression: "userWallet = :userWallet",
        ExpressionAttributeValues: {
          ":userWallet": userWallet,
        },
      })
      .promise()
      .then((data) => data.Items[0])
      .catch(console.error);
    return dbUser;
  },

  /**
   * @desc Edits an existing users item's attributes, or adds a new item to the table if it does not already exist.
   * @param {object} - function takes an object as a the parameter with primary and attributes. Object will need to the primary key and any attributes that are being updated or created.
   * @dev New items can be added to a user and does need to be predefined in the table. Any values in 'UpdateExpression' need to be defined will values within 'ExpressionAttributeValues'.
   * @example See docs about editing existing attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   */
  updateUserExpertise: async (userWallet, attributes) => {
    console.log("UPDATE USER EXP DYNAMO");
    console.log(userWallet);
    console.log(attributes);
    let { userName, functionalExpertise, industryExpertise } = attributes;
    console.log(attributes);
    await getDynamoDBClient()
      .update({
        TableName,
        Key: {
          userWallet: userWallet,
          userName: userName,
        },
        UpdateExpression:
          "SET functionalExpertise = :functionalExpertise, industryExpertise = :industryExpertise",
        // ConditionExpression: "",
        ExpressionAttributeValues: {
          ":functionalExpertise": functionalExpertise,
          ":industryExpertise": industryExpertise,
        },
      })
      .promise()
      .then((data) => console.log(data))
      .catch(console.error);
  },
  /**
   * @desc Edits an existing users item's attributes, or adds a new item to the table if it does not already exist.
   * @param {object} - function takes an object as a the parameter with primary and attributes. Object will need to the primary key and any attributes that are being updated or created.
   * @dev New items can be added to a user and does need to be predefined in the table. Any values in 'UpdateExpression' need to be defined will values within 'ExpressionAttributeValues'.
   * @example See docs about editing existing attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   */
  updateUserProfile: async (userWallet, attributes) => {
    console.log("UPDATE USER PROF DYNAMO");
    console.log(userWallet);
    console.log(attributes);
    let {
      userName,
      firstName,
      lastName,
      currTitle,
      currLocation,
      bio,
      linkedIn,
      twitter,
      email,
    } = attributes;

    await getDynamoDBClient()
      .update({
        TableName,
        Key: {
          userWallet: userWallet,
          userName: userName,
        },
        UpdateExpression:
          "SET firstName = :firstName, lastName = :lastName, currTitle = :currTitle, currLocation = :currLocation, bio = :bio, linkedIn = :linkedIn, twitter = :twitter, email = :email",
        // ConditionExpression: "",
        ExpressionAttributeValues: {
          ":firstName": firstName,
          ":lastName": lastName,
          ":currTitle": currTitle,
          ":currLocation": currLocation,
          ":bio": bio,
          ":linkedIn": linkedIn,
          ":twitter": twitter,
          ":email": email,
        },
      })
      .promise()
      .then((data) => console.log(data))
      .catch(console.error);
  },
  /**
   * @desc Edits an existing users item's attributes, or adds a new item to the table if it does not already exist.
   * @param {object} - function takes an object as a the parameter with primary and attributes. Object will need to the primary key and any attributes that are being updated or created.
   * @dev New items can be added to a user and does need to be predefined in the table. Any values in 'UpdateExpression' need to be defined will values within 'ExpressionAttributeValues'.
   * @example See docs about editing existing attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   */
  updateUserCompanyData: async (userWallet, attributes) => {
    console.log("UPDATE USER COMPANY DATA DYNAMO");

    let { companyData, userName } = attributes;

    let companyInfo = companyData; // to use companyInfo as the new array obj in the front-end

    console.log("COMPANY INFO", companyInfo);
    const getParams = (updatedCompanyData) => {
      const params = {
        TableName,
        Key: {
          userWallet: userWallet,
          userName: userName,
        },
        UpdateExpression: "SET companyInfo = :updatedData",
        ExpressionAttributeValues: {
          ":updatedData": updatedCompanyData,
        },
        ReturnValues: "UPDATED_NEW",
      };
      return params;
    };

    // Updating the companyInfo array
    let params = getParams(companyInfo);

    await getDynamoDBClient()
      .update({
        TableName: params.TableName,
        Key: {
          userWallet: userWallet,
          userName: userName,
        },
        UpdateExpression: params.UpdateExpression,
        ExpressionAttributeValues: params.ExpressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
      .promise()
      .catch(console.error);
  },
  /**
   * @desc Directly access a list of users in the table by scanning the table with `TableName`
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/
  getUsers: async () => {
    const allUsers = await getDynamoDBClient()
      .scan({
        TableName,
      })
      .promise()
      .then((data) => data.Items)
      .catch(console.error);
    return allUsers;
  },
  /**
   * @desc Checks if userName does not exsit in db table by checking if a return object is returned from DB.
   * @dev Can implement a value check in the near future.
   * @returns Returns a boolean value
   */
  userNameIsValid: async (userName) => {
    const dbUser = await getDynamoDBClient()
      .query({
        TableName,
        IndexName: "wallet_name_index",
        // ProjectionExpression: "userName",
        KeyConditionExpression: "userName = :userName",
        ExpressionAttributeValues: {
          ":userName": userName,
        },
      })
      .promise()
      .then((data) => data.Items[0])
      .catch(console.error);

    if (dbUser && dbUser.userName !== undefined && dbUser.userName !== null) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * @desc Takes in a query and filters contracts for the marketplace
   * @dev
   * @returns returns json object containing contracts
   */
  filterMarketplace: async (query) => {
    // Create the DynamoDB Client with the region you want
    const dynamoDbClient = getDynamoDBClient();

    // Create the input for scan call
    const scanInput = createScanInput(query);

    // Call DynamoDB's scan API
    const output = executeScan(dynamoDbClient, scanInput).then((output) => {
      console.info("Scan API call has been executed.");
      return output;
    });

    function createDynamoDbClient(regionName) {
      // Set the region
      AWS.config.update({ region: regionName });
      // Use the following config instead when using DynamoDB Local
      // AWS.config.update({region: 'localhost', endpoint: 'http://localhost:8000', accessKeyId: 'access_key_id', secretAccessKey: 'secret_access_key'});
      return new AWS.DynamoDB();
    }

    function createScanInput(query) {
      // marketplace starts filterExpression with Status = Open
      let FilterExpression = "#Status = :status";

      let ExpressionAttributeValues = {
        ":status": "live",
      };
      let ExpressionAttributeNames = {
        "#Status": "status",
      };

      Object.entries(query).forEach(([filterType, filter], idx) => {
        if (filterType === "pid") return;
        // queryPortions always come after the status so they begin with " And"
        let queryPortion = " And";

        // contains(#b3890, :b3890)
        const arrayFilterString = `${queryPortion} (contains(#${filterType}, ${
          typeof filter === "string"
            ? `:${filterType}`
            : filter
                .map((item, itemID) => {
                  return `:${filterType}${itemID}`;
                })
                .join(`) Or contains(#${filterType}, `)
        }))`;
        // for each filter type, create a portion of the query, add it to the filter expression,
        // and add key/value to ExpressionAttributeNames
        switch (filterType) {
          case "industry":
            queryPortion = arrayFilterString;
            FilterExpression = FilterExpression + queryPortion;
            ExpressionAttributeNames[`#${filterType}`] = "industry";
            break;

          case "expertise":
            queryPortion = arrayFilterString;
            FilterExpression = FilterExpression + queryPortion;
            ExpressionAttributeNames[`#${filterType}`] = "expertise";
            break;

          case "duration":
            queryPortion = `${queryPortion} #${filterType} BETWEEN :${filterType}0 AND :${filterType}1`;
            FilterExpression = FilterExpression + queryPortion;
            ExpressionAttributeNames[`#${filterType}`] = "duration";
            break;

          case "budget":
            queryPortion = `${queryPortion} #${filterType} BETWEEN :${filterType}0 AND :${filterType}1`;
            FilterExpression = FilterExpression + queryPortion;
            ExpressionAttributeNames[`#${filterType}`] = "converted_amount";
            break;

          case "startDate":
            queryPortion = `${queryPortion} #${filterType} > :${filterType}`;
            FilterExpression = FilterExpression + queryPortion;
            ExpressionAttributeNames[`#${filterType}`] = "start_date";
            break;

          default:
            break;
        }
        // set ExpressionAttributeValues
        if (typeof filter === "string") {
          if (filterType === "startDate") {
            ExpressionAttributeValues[`:${filterType}`] =
              Date.parse(filter) / 1000;
          } else {
            ExpressionAttributeValues[`:${filterType}`] = filter;
          }
        } else {
          filter.forEach((filterAttribute, idx) => {
            if (filterType === "budget") {
              ExpressionAttributeValues[`:${filterType}${idx}`] =
                Number(filterAttribute);
            } else if (filterType === "duration") {
              ExpressionAttributeValues[`:${filterType}${idx}`] =
                Number(filterAttribute) * 86400;
            } else {
              ExpressionAttributeValues[`:${filterType}${idx}`] =
                filterAttribute;
            }
          });
        }
      });

      return {
        TableName,
        ConsistentRead: false,
        FilterExpression: FilterExpression,
        ExpressionAttributeValues: ExpressionAttributeValues,
        ExpressionAttributeNames: ExpressionAttributeNames,
      };
    }

    async function executeScan(dynamoDbClient, scanInput) {
      // Call DynamoDB's scan API
      try {
        const scanOutput = await dynamoDbClient.scan(scanInput).promise();
        console.info("Scan successful.");
        return scanOutput;
        // Handle scanOutput
      } catch (err) {
        handleScanError(err);
      }
    }

    // Handles errors during Scan execution. Use recommendations in error messages below to
    // add error handling specific to your application use-case.
    function handleScanError(err) {
      if (!err) {
        console.error("Encountered error object was empty");
        return;
      }
      if (!err.code) {
        console.error(
          `An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(
            err
          )}`
        );
        return;
      }
      // here are no API specific errors to handle for Scan, common DynamoDB API errors are handled below
      handleCommonErrors(err);
    }

    function handleCommonErrors(err) {
      switch (err.code) {
        case "InternalServerError":
          console.error(
            `Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`
          );
          return;
        case "ProvisionedThroughputExceededException":
          console.error(
            `Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. ` +
              `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`
          );
          return;
        case "ResourceNotFoundException":
          console.error(
            `One of the tables was not found, verify table exists before retrying. Error: ${err.message}`
          );
          return;
        case "ServiceUnavailable":
          console.error(
            `Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`
          );
          return;
        case "ThrottlingException":
          console.error(
            `Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`
          );
          return;
        case "UnrecognizedClientException":
          console.error(
            `The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. ` +
              `Error: ${err.message}`
          );
          return;
        case "ValidationException":
          console.error(
            `The input fails to satisfy the constraints specified by DynamoDB, ` +
              `fix input before retrying. Error: ${err.message}`
          );
          return;
        case "RequestLimitExceeded":
          console.error(
            `Throughput exceeds the current throughput limit for your account, ` +
              `increase account level throughput before retrying. Error: ${err.message}`
          );
          return;
        default:
          console.error(
            `An exception occurred, investigate and configure retry strategy. Error: ${err.message}`
          );
          return;
      }
    }
    return output;
  },
};
