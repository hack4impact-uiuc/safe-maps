import os
from mongoengine import connect
from api.core import get_mongo_credentials
import sys

if "pytest" in sys.modules:
    connect("mongoenginetest", host="mongomock://localhost", alias="testdb")
else:
    (db_name, mongo_url) = get_mongo_credentials()

    connect(db_name, host=mongo_url)
