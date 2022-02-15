const TableName = process.env.TABLE_NAME;

const getDynamoDBClient = () => {

 const AWS = require("aws-sdk");

    const edgeRegion = process.env.AWS_REGION || "us-east-2";
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

}

module.exports = {
    createUser: async (userDescription) => {
        await getDynamoDBClient()
        .put({
            TableName,
            Item: {
                userDescription
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
}