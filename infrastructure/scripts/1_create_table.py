import boto3

dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')

try:
    dynamodb.create_table(
        TableName="Twali-core-test",
        AttributeDefinitions=[
            {
                "AttributeName": "PK",
                "AttributeType": "S"
            },
            {
                "AttributeName": "SK",
                "AttributeType": "S"
            }
        ],
        KeySchema=[
            {
                "AttributeName": "PK",
                "KeyType": "HASH"
            },
            {
                "AttributeName": "SK",
                "KeyType": "RANGE"
            }
        ],
        ProvisionedThroughput={
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
        }
    )
    print("Table created successfully.")
except Exception as e:
    print("Could not create table. Error:")
    print(e)
