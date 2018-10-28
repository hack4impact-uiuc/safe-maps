from mongoengine.fields import StringField, DateTimeField, FloatField, IntField
from api.models.Location import Location
from api.models.OpenHours import OpenHours
import mongoengine
from mongoengine import *
import datetime

# DynamicDocument allows for unspecified fields to be put in as well
class Crime(mongoengine.DynamicDocument):
    """Crime Document Schema"""

    incident_id = StringField(required=True, unique=True)
    incident_datetime = DateTimeField(default=datetime.datetime.now())
    incident_type_primary = StringField(required=True)
    incident_description = StringField(required=True)
    address_1 = StringField(required=True)
    city = StringField(required=True)
    state = StringField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    hour_of_day = IntField(required=True)
    day_of_week = StringField(required=True)
    parent_incident_type = StringField(required=True)
