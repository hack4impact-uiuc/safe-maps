from mongoengine.fields import IntField, FloatField
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class EmergencyPhone(mongoengine.DynamicDocument):
    """EmergencyPhone Document Schema"""

    emergencyPhone_id = IntField(required=True, unique=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
