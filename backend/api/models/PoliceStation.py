from mongoengine.fields import StringField, FloatField
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class PoliceStation(mongoengine.DynamicDocument):
    """Police Station Document Schema"""

    name = StringField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
