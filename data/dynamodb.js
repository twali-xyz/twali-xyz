const TableName = process.env.TABLE_NAME;

const getDynamoDBClient = () => {

 const AWS = require("aws-sdk");

    const edgeRegion = process.env.AWS_REGION || "us-east-1";
    const dynamoDBRegion = edgeRegion.startsWith("us")
    ? "us-east-1"
    : "us-east-2";


    const options = {
    convertEmptyValues: true,
    region: dynamoDBRegion
    };

    const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT
    ? new AWS.DynamoDB.DocumentClient({
            ...options,
            endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT
        })
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
    const { Items } = await getDynamoDBClient()
      .query({
        TableName,
      })
      .promise();

    const users = Items.find((user) => user.user_name == userName);
    return users;
  },


    /** 
     * 
     * 
     * 
    */
  updateUser: async () => {
    

  }
};