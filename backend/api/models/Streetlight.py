from mongoengine.fields import IntField, FloatField
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class Streetlight(mongoengine.DynamicDocument):
    """Streetlight Document Schema"""

    streetlight_id = IntField(required=True, unique=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
