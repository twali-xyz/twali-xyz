import boto3
import time
import uuid

# uuid package to create a contract unqiue ID
contractuuid = str(uuid.uuid4())
# getting current time to create a unix timestamp for DB when it was created.
now = int(time.time())
dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

table = dynamodb.Table('Twali-core-test')

# A one off put_item for contracts with a base format object we change fields on or update with more attributes.
# # If contract does already exist in the DB it will just update any new fields to DB.
try:
    table.put_item(
        Item={
            "PK": "USER#0x0DF95D14A635058dd9Dc7dF51E4980b224b50Bd2",
            "SK": "#CONTRACT#0021",
            # TBD - if we create ID on creation with different format, (e.g., 0-100 or random).
            "contract_id": contractuuid,
            # using the now from line 5 to get current time in unix format.
            "contract_created_on": now,
            "contractOwner_userName": "nagma92",
            "contract_title": "werk title 1",
            "contract_description": "leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus",
            "contract_start_date": 1666224000,
            "contract_end_date": 1672963200,
            "contract_duration": 6739200,
            "token": "ETH",
            "contract_amount": 6,
            "converted_amount": 18000,
            "application_deadline": 1665014400,
            "contract_industry": "Micro Lending",
            "contract_expertise": ["Media & Comms", "Operations"],
            "contract_status": "closed",
            "attached_files": ""
        }
    )
    print("User created successfully.")
except Exception as e:
    print("Could not create table. Error:")
    print(e)
