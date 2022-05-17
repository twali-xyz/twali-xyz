import boto3
import time

# getting current time to create a unix timestamp for DB when it was created.
now = int(time.time())
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('Twali-core-test')

# A one off put_item for contracts with a base format object we change fields on or update with more attributes.
# # If contract does already exist in the DB it will just update any new fields to DB.
try:
    table.put_item(
        Item={
            "PK": "USER#0x4949567a31ee75242ebcba5b101f4e65d0e6fe92",
            "SK": "#CONTRACT#0001",
            "contract_id": "0021", # TBD - if we create ID on creation with different format, (e.g., 0-100 or random).
            "contract_created_on": now, # using the now from line 5 to get current time in unix format.
            "contractOwner_userName": "NickGonzalez4__",
            "contract_title": "werk title 1",
            "contract_description": "leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus",
            "contract_start_date": 1666224000,
            "contract_end_date": 1672963200,
            "contract_duration": 6739200,
            "token": "ETH",
            "contract_amount": 6,
            "converted_amount": 18000,
            "due_date": 1665014400,
            "contract_industry": "Micro Lending",
            "contract_expertise": ["Media & Comms","Operations"],
            "contract_status": "closed",
            "attached_files": ""
            }
    )
    print("User created successfully.")
except Exception as e:
    print("Could not create table. Error:")
    print(e)