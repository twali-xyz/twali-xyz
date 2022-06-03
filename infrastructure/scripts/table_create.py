import boto3
import uuid
import time
import json


class Table:
    def __init__(self, table_name, pk, sk, attributes):
        self.table_name = table_name
        self.pk = pk
        self.sk = sk
        # attributes example >> [{attribute_name: "PK", attribute_type: "S", key_type: "HASH"}, {attribute_name: "SK", attribute_type: "S", key_type: "RANGE"}]
        self.attributes = attributes
        self.dynamodb = boto3.client(
            'dynamodb', endpoint_url='http://localhost:8000')

# 1
    def create_table(self):
        print([{"AttributeName": i["AttributeName"],
                "KeyType":i["KeyType"]} for i in self.attributes])
        try:
            self.dynamodb.create_table(
                TableName=self.table_name,

                AttributeDefinitions=[{"AttributeName": i["AttributeName"],
                                       "AttributeType": i["AttributeType"]} for i in self.attributes],
                KeySchema=[{"AttributeName": i["AttributeName"],
                            "KeyType":i["KeyType"]} for i in self.attributes],
                ProvisionedThroughput={
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            )

            print("Table created successfully.")
        except Exception as e:
            print("Could not create table. Error:")
            print(e)
# 2

    def secondary_index(self):
        try:
            self.dynamodb.update_table(
                # Table Name to update (can be changed for a created Table)
                TableName=self.table_name,
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
# 3

    def contract_status(self):
        try:
            self.dynamodb.update_table(
                # Table Name to update (can be changed for a created Table)
                TableName=self.table_name,
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
# 4

    def put_item(self, item):
        dynamodb = boto3.resource(
            'dynamodb', endpoint_url='http://localhost:8000')
        table = dynamodb.Table(self.table_name)

        # Script to input a user to db for testing purposes.
        # If user does already exist in the DB it will just update any new fileds to DB.
        try:
            table.put_item(
                Item=item
            )
            print("User created successfully.")
        except Exception as e:
            print("Could not create table. Error:")
            print(e)

    def batch_write(self, json_file):
        # Gets the service resource we want to use
        dynamodb = boto3.resource(
            'dynamodb', endpoint_url='http://localhost:8000')
        table = dynamodb.Table(self.table_name)

        items = []
        # open Json file to parse and load into rows for dynamoDb table
        with open(json_file, 'r') as f:
            for row in f:
                items.append(json.loads(row))
            print(items)

        # batch_writer allows for loading a lot of data at a time to reduce the number of writes
        with table.batch_writer(overwrite_by_pkeys=['PK', 'SK']) as batch:
            for item in items:
                print(item['PK'])
                batch.put_item(Item=item)


if __name__ == '__main__':
    import uuid
    import time
    # Twali-core-test
    twali_core_test_attributes = [{
        "AttributeName": "PK",
        "AttributeType": "S",
        "KeyType": "HASH"
    },
        {
        "AttributeName": "SK",
        "AttributeType": "S",
        "KeyType": "RANGE"
    }
    ]

    # uuid package to create a user unqiue ID
    useruuid = str(uuid.uuid4())
    # getting current time to create a unix timestamp for DB when it was created.
    now = int(time.time())

    twali_core_test_put_item = {
        "PK": "USER#0x3e1d10cf0af0386f03faa1db1b4e62a6752795d0",
        "SK": "USER#0x3e1d10cf0af0386f03faa1db1b4e62a6752795d0",
        "userWallet": "0x3e1d10cf0af0386f03faa1db1b4e62a6752795d0",
        "userName": "NickGonzalezz__",
                    "accType": "Expert",
                    "business": "",
                    "bio": "booiiiiiiiii this faastttt",
                    "Location": "",
                    "businessName": "",
                    "businessType": "",
                    "companyInfo": "",
                    "createdAt": now,
                    "currLocation": "",
                    "currTitle": "Software Engineer",
                    "email": "gonzaleznick5@gmail.com",
                    "firstName": "Nicholas Gonzalez",
                    "lastName": "Gonzalez",
                    "functionalExpertise": "",
                    "industryExpertise": "",
                    "linkedIn": "",
                    "twitter": "https://twitter.com/nickgonzalez__",
                    "uuid": useruuid,
                    "website": "https://memes.net"
    }
    try:
        Table = Table("Twali-core-test", "PK", "SK",
                      twali_core_test_attributes)
        Table.create_table()
        Table.secondary_index()
        Table.put_item(twali_core_test_put_item)
        Table.batch_write('infrastructure/scripts/items.json')
        print("Table created successfully.")
    except Exception as e:
        print("Could not create table. Error:")
        print(e)

    # Whitelist table
    # Table = Table("whitelist_table", "userWallet", "contractStatus",
    #               twali_core_test_attributes)
    # Table.create_table()
    # Table.secondary_index()
    # Table.put_item(twali_core_test_put_item)
    # Table.batch_write('infrastructure/scripts/items.json')
