import boto3
import uuid
import time

# uuid package to create a user unqiue ID
useruuid = str(uuid.uuid4())
# getting current time to create a unix timestamp for DB when it was created.
now = int(time.time())
dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

table = dynamodb.Table('Twali-core-test')

# Script to input a user to db for testing purposes.
# If user does already exist in the DB it will just update any new fileds to DB.
try:
    table.put_item(
        Item={
            "PK": "USER#0x0DF95D14A635058dd9Dc7dF51E4980b224b50Bd2",
            "SK": "USER#0x0DF95D14A635058dd9Dc7dF51E4980b224b50Bd2",
            "userWallet": "0x0DF95D14A635058dd9Dc7dF51E4980b224b50Bd2",
            "userName": "nagmak",
            "accType": "Expert",
            "business": "",
            "bio": "",
            "Location": "",
            "businessName": "",
            "businessType": "",
            "companyInfo": "",
            "createdAt": now,
            "currLocation": "",
            "currTitle": "Software Engineer",
            "email": "nagma@twali.xyz",
            "firstName": "Nagma",
            "lastName": "Kapoor",
            "functionalExpertise": "",
            "industryExpertise": "",
            "linkedIn": "",
            "twitter": "https://twitter.com/notnagma",
            "uuid": useruuid,
            "website": ""
        }
    )
    print("User created successfully.")
except Exception as e:
    print("Could not create table. Error:")
    print(e)
