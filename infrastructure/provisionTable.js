var AWS = require("aws-sdk");

require("dotenv").config();

// Only used in local development
AWS.config.update({
  region: "us-east-1",
  // endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT,
});

let dynamodb = new AWS.DynamoDB();

/**
 * * @desc Table Definition to deploy locally and to production.
 *
 * **/
let params = {
  TableName: "main_user_profiles_db",
  KeySchema: [
    { AttributeName: "userWallet", KeyType: "HASH" }, // Partition Key
    { AttributeName: "userName", KeyType: "RANGE" }, // Sort Ket
  ],
  AttributeDefinitions: [
    { AttributeName: "userWallet", AttributeType: "S" },
    { AttributeName: "userName", AttributeType: "S" },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "wallet_name_index",
      KeySchema: [
        {
          AttributeName: "userName",
          KeyType: "HASH",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
    },
  ],
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: "NEW_AND_OLD_IMAGES",
  },
  BillingMode: "PAY_PER_REQUEST",
};

// Deploying the dynamoDB table instance
(async function () {
  await dynamodb.createTable(params).promise();

  console.log("dev_staging_user_profile_test");

  // Only a replicated instance for production. Not Supported by local.
  if (!process.env.LOCAL_DYNAMO_DB_ENDPOINT) {
    AWS.config.update({ region: "us-east-1" });

    dynamodb = new AWS.DynamoDB();

    await dynamodb.createTable(params).promise();

    console.log("Created table in us-east-1");

    const createGlobalTableParams = {
      GlobalTableName: "main_user_profiles_db",
      ReplicationGroup: [
        {
          RegionName: "us-east-1",
        },
        {
          RegionName: "us-east-2",
        },
      ],
    };

    await dynamodb.createGlobalTable(createGlobalTableParams).promise();
    console.log("Replication of table completed");
  }
})();
