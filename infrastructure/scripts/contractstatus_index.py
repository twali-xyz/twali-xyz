import boto3

dynamodb = boto3.client('dynamodb')

try:
    dynamodb.update_table(
        TableName='Twali-core-test',   # Table Name to update (can be changed for a created Table)
        AttributeDefinitions=[
            {
                "AttributeName": "contract_status",  #Attribute that becomes a Global Secondary Index needs to be defined.
                "AttributeType": "S"
            }
        ],
        GlobalSecondaryIndexUpdates=[
            {
                "Create": {
                    "IndexName": "contract_statusIndex",   #Global secondary index name 
                    "KeySchema": [
                        {
                            "AttributeName": "contract_status",  #Attribute we defined will be set as the key look up in table.
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