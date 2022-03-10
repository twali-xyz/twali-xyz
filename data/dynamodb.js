const { v4 } = require("uuid");
const TableName = process.env.TABLE_NAME;

const getDynamoDBClient = () => {
  const AWS = require("aws-sdk");

  const edgeRegion = process.env.CURRENT_AWS_REGION || "us-east-1";
  const dynamoDBRegion = edgeRegion.startsWith("us")
    ? "us-east-1"
    : "us-east-2";

  // Only needed with local development.
  // if (process.env.LOCAL_DYNAMO_DB_ENDPOINT) {
  //   AWS.config.update({
  //     // accessKeyId: 'xxxx',
  //     // secretAccessKey: 'xxxx',
  //     region: "us-east-1",
  //     endpoint: "http://localhost:8000",
  //   })};
  

  const options = {
    convertEmptyValues: true,
    region: dynamoDBRegion,
  };

  const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT
    ? new AWS.DynamoDB.DocumentClient(
      // ...options,
      // process.env.LOCAL_DYNAMO_DB_ENDPOINT
    )
    : new AWS.DynamoDB.DocumentClient(options);

  return client;
};

module.exports = {
    /**
  * @desc Gets a users nonce from database that is generated upon user creation to authenticate user that is accessing database.
  * @param {String} userWallet is the primary key to allow look up on database to access metadata to items belonging to user.
  * 
  * 
  **/
 getUserAuth: async(userWallet) => {
  const dbUser = await getDynamoDBClient()
  .get({
      TableName,
      Key: {
        "userWallet": userWallet,
      },
      ProjectionExpression: "UserNonce"
  })
  .promise()
  .then(data => data.Items)
  .catch(err => console.log(err))
  return dbUser;
},

  /**
   * @desc Creates a user profile with the `userName` being set as the primary key in the database.
   * @param {Object} userData holds the primary key from object to process to database and any addtional metadata.
   * @dev This is a flexible creation function and is not perminit. Can be adjusted to a required user needs.
   * @example See docs about including additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
   **/
  createUser: async (userData) => {
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
      funcExpertise,
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
          uuid: v4(), // unique ID associated with each user account // create nonce a user creation
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
          companyInfo: companyInfo ? companyInfo : null,
        },
        // ConditionExpression: attribute_not_exists(userWallet)
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
  updateUser: async (userName) => {
    const { updateAttributes } = await getDynamoDBClient().update({
      TableName,
      Key: {
        userName: userName,
      },
      UpdateExpression: "SET ",
      ExpressionAttributeValues: {},
      ReturnValues: "",
    });
    return updateAttributes;
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
};
