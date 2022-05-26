import boto3

dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')

try:
    dynamodb.update_table(
        # Table Name to update (can be changed for a created Table)
        TableName='Twali-core-test',
        AttributeDefinitions=[
            {
                # Attribute that becomes a Global Secondary Index needs to be defined.
                "AttributeName": "contract_status",
                "AttributeType": "S"
            }
        ],
        GlobalSecondaryIndexUpdates=[
            {
                "Create": {
                    "IndexName": "contract_statusIndex",  # Global secondary index name
                    "KeySchema": [
                        {
                            # Attribute we defined will be set as the key look up in table.
                            "AttributeName": "contract_status",
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
