var AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
    region: "us-west-2",
    endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT
  });

   
let dynamodb = new AWS.DynamoDB();

// Table Definition to deploy locally and to production
let params = {
    TableName: "user_passport",
    KeySchema: 
    [
        { AttributeName: "user_name", KeyType: "HASH"},        // Partition Key 
        { AttributeName: "user_wallet", KeyType: "RANGE"}      // Sort Ket
    ],
    AttributeDefinitions: [
        { AttributeName: "user_name", AttributeType: "S"},
        { AttributeName: "user_wallet", AttributeType: "S"}
    ],
    StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: "NEW_AND_OLD_IMAGES"
    },
    BillingMode: "PAY_PER_REQUEST"
};


// Deploying the dynamoDB table instance
(async function() {
    await dynamodb.createTable(params).promise();

    console.log("Created table in us-east-1");

    // Only a replicated instance for production. Not Supported by local.
    if (!process.env.LOCAL_DYNAMO_DB_ENDPOINT) {

        AWS.config.update({ region: "us-east-2"});

        dynamodb = new AWS.DynamoDB();

        await dynamodb.createTable(params).promise();

        console.log("Created table in us-east-2");


        const createGlobalTableParams = {
            GlobalTableName: "user_passport",
            ReplicationGroup: [
                {
                    RegionName: "us-east-1",
                },
                {
                    RegionName: "us-east-2"
                }
            ]
        };

        await dynamodb.createGlobalTable(createGlobalTableParams).promise();
        console.log("Replication of table completed");
    }
})();

