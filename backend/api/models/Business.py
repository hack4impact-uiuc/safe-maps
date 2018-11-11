from mongoengine.fields import (
    StringField,
    ListField,
    EmbeddedDocumentField,
    EmbeddedDocumentListField,
    FloatField,
)
from api.models.Location import Location
from api.models.OpenHours import OpenHours
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class Business(mongoengine.DynamicDocument):
    """Business Document Schema"""

    name = StringField(required=True)
    yelp_id = StringField(required=True, unique=True)
    location = EmbeddedDocumentField(Location)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    image_url = StringField()
    display_phone = StringField()
    open_hours = EmbeddedDocumentListField(OpenHours)
