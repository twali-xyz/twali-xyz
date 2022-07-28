import boto3

dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')

try:
    dynamodb.update_table(
        # Table Name to update (can be changed for a created Table)
        TableName='Twali-core-test',
        AttributeDefinitions=[
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
