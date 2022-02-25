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
   * Creates a user profile with the `user_name` respersenting the primary key
   * in the database table.
   * @param {Object} userDescription holds the primary key from object to process to database and any addtional metadata.
   *
   **/
  createUser: async (userDescription) => {
    const { user_name, user_wallet } = userDescription;
    await getDynamoDBClient()
      .put({
        TableName,
        Item: {
          user_name: user_name,
          user_wallet: user_wallet,
          // Optional - Can set a UUID here to be generated on creation.
          // Date Creation was a test case for extra column data
          createdAt: Date.now(),
          
        },
      })
      .promise();
  },

  /** 
   * Calls a user from database by the primary key `useer_name`.
   * 
   * @returns Returns a user as and object.
   * 
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

      //   console.log('return', dbUser)
      return dbUser;
  },

    /** 
     * 
     * 
     * 
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