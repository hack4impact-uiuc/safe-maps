from mongoengine.fields import (
    StringField,
    IntField,
    DateTimeField,
    FloatField,
    ObjectIdField,
    ListField,
)
import mongoengine
from api.models.User import User

# DynamicDocument allows for unspecified fields to be put in as well
class Tips(mongoengine.DynamicDocument):
    """Tips Document Schema"""

    title = StringField(required=True)
    content = StringField(required=True)
    author = ObjectIdField(required=True)
    posted_time = DateTimeField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    category = StringField(required=True)
    upvotes = ListField(ObjectIdField())
    downvotes = ListField(ObjectIdField())
