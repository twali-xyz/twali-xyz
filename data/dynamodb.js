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
            endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT})
    : new AWS.DynamoDB.DocumentClient(options);

    return client;

};

module.exports = {
    createUser: async (userDescription) => {
        const { user_name, user_wallet} = userDescription;
        await getDynamoDBClient()
        .put({
            TableName,
            Item: {
                user_name: user_name, // PK needs to be defined when doing posting to DB
                user_wallet: user_wallet
            }
        })
        .promise();
    },
    getUser: async (userName) => {
        const { Items } = await getDynamoDBClient()
        .query({
            TableName
        })
        .promise();

        const users = Items.find((user) => user.user_name == userName);
        return users;
    }
};