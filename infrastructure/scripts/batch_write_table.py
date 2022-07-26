import json
# Python AWS SDK is boto3
import boto3
# Gets the service resource we want to use
dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')
table = dynamodb.Table('Twali-core-test')

items = []
# open Json file to parse and load into rows for dynamoDb table
with open('items.json', 'r') as f:
    for row in f:
        items.append(json.loads(row))
    print(items)

# batch_writer allows for loading a lot of data at a time to reduce the number of writes
with table.batch_writer(overwrite_by_pkeys=['PK', 'SK']) as batch:
    for item in items:
        print(item['PK'])
        batch.put_item(Item=item)