// import { v4 as uuidv4 } from 'uuid';

const TableName = process.env.TABLE_NAME;

const getDynamoDBClient = () => {

 const AWS = require("aws-sdk");

    const edgeRegion = process.env.AWS_REGION || "us-east-1";
    const dynamoDBRegion = edgeRegion.startsWith("us")
    ? "us-east-1"
    : "us-east-2";

    
    AWS.config.update({
            // accessKeyId: process.env.AWS_ACCESS_KEY_ID_DEV,
            // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEV,
            // region: "localhost",
            endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT
      });
    
    const options = {
    convertEmptyValues: true,
    region: "us-east-1"
    };

    const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT
    ? new AWS.DynamoDB.DocumentClient()
    : new AWS.DynamoDB.DocumentClient(options);

    return client;
        
};

module.exports = {
  /**
   * @desc Creates a user profile with the `user_name` being set as the primary key in the database.
   * @param {Object} userDescription holds the primary key from object to process to database and any addtional metadata.
   * @dev This is a flexible creation function and is not perminit. Can be adjusted to a required user needs.
   * @example See docs about including additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
   **/
  createUser: async (userDescription) => {
    const { user_name, user_wallet } = userDescription;
    await getDynamoDBClient()
      .put({
        TableName,
        Item: {
          user_name: user_name,
          user_wallet: user_wallet,
          // Optional - Can set a UUID here to be generated on creation. Already imported on line 1 if it is needed here.
          // Date Creation was a test case for extra column data
          createdAt: Date.now(),

        },
      })
      .promise();
  },

  /** 
   * @desc Directly access a user in the table by primary key `user_name`.
   * @param {string} - function takes in a input string of the users user_name 
   * @dev This can be altered to included any additional attributes with 'ProjectionExpression'.
   * @example See docs to add additonal attributes -> https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   * @returns Returns a user as and object.
   **/
  getUser: async (userName) => {
      const dbUser = await getDynamoDBClient()
        .query({
          TableName,
          // ProjectionExpression: "user_name",
          KeyConditionExpression: "user_name = :user_name",
          ExpressionAttributeValues: {
            ":user_name": userName,
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
    const { updateAttributes } = await getDynamoDBClient()
    .update({
        TableName,
        Key: {
            user_name: userName
        },
        UpdateExpression: "SET ",
        ExpressionAttributeValues: {

        },
        ReturnValues: ""
    })
    return updateAttributes;
  }
};