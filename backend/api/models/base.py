from mongoengine import connect
from api.core import get_mongo_credentials

(db_name, mongo_url) = get_mongo_credentials()

connect(db_name, host=mongo_url)
