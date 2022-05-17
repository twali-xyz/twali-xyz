import boto3
import uuid
import time

# uuid package to create a user unqiue ID
useruuid = str(uuid.uuid4())
# getting current time to create a unix timestamp for DB when it was created.
now = int(time.time())
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('Twali-core-test')

# Script to input a user to db for testing purposes.
# If user does already exist in the DB it will just update any new fileds to DB.
try:
    table.put_item(
        Item={
            "PK":"USER#0x3e1d10cf0af0386f03faa1db1b4e62a6752795d0",
            "SK":"USER#0x3e1d10cf0af0386f03faa1db1b4e62a6752795d0",
            "userWallet":"0x3e1d10cf0af0386f03faa1db1b4e62a6752795d0",
            "userName":"NickGonzalezz__",
            "accType":"Expert",
            "business":"",
            "bio":"booiiiiiiiii this faastttt",
            "Location":"",
            "businessName":"",
            "businessType":"",
            "companyInfo": "",
            "createdAt":now,
            "currLocation":"",
            "currTitle":"Software Engineer",
            "email":"gonzaleznick5@gmail.com",
            "firstName":"Nicholas Gonzalez",
            "lastName":"Gonzalez",
            "functionalExpertise":"",
            "industryExpertise":"",
            "linkedIn":"",
            "twitter":"https://twitter.com/nickgonzalez__",
            "uuid":useruuid,
            "website":"https://memes.net"
        }
    )
    print("User created successfully.")
except Exception as e:
    print("Could not create table. Error:")
    print(e)