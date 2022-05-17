import boto3

dynamodb = boto3.client('dynamodb')

try:
    dynamodb.update_table(
        TableName='Twali-core-test',    # Table Name to update (can be changed for a created Table)
        AttributeDefinitions=[
            {
                "AttributeName":"PK",
                "AttributeType":"S",
            },
            {
                "AttributeName":"SK",
                "AttributeType":"S"
            },
            {
                "AttributeName": "userName",
                "AttributeType": "S"
            }
        ],
        GlobalSecondaryIndexUpdates=[
            {
                "Create": {
                    "IndexName": "userNameIndex",
                    "KeySchema": [
                        {
                            "AttributeName": "userName",
                            "KeyType": "HASH"
                        },
                    ],
                    "Projection": {
                        "ProjectionType": "ALL"
                    },
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 1,
                        "WriteCapacityUnits": 1
                    }
                }
            }

        ],
    )
    print("Table updated successfully.")
except Exception as e:
    print("Could not update table. Error:")
    print(e)