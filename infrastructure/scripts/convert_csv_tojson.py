import pandas as pd

# add new columns for prod db and export to json
csv_input = pd.read_csv (r'../mock-data/main_user_profiles_db.csv')
csv_input.insert(loc=0, column='SK', value='USER#' + csv_input['userWallet'])
csv_input.insert(loc=0, column='PK', value='USER#' + csv_input['userWallet'])
# csv_input.to_csv('../mock-data/production_twali-core.csv')

# converts this updated db to json and the orientation must be in records to get the right row/col data
csv_input.to_json(r'../mock-data/production_twali_core.json', orient='records', lines=True)