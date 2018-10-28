from mongoengine.fields import StringField, FloatField, DictField
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class BusStop(mongoengine.DynamicDocument):
    """BusStop Document Schema"""

    stop_id = StringField(required=True, unique=True)
    stop_name = StringField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    routes = DictField()
