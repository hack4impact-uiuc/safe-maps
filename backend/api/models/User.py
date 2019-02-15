from mongoengine.fields import (
    StringField,
    IntField,
    BooleanField,
    DateTimeField,
    EmbeddedDocumentListField,
    ListField,
    ObjectIdField,
)
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class User(mongoengine.EmbeddedDocument):
    """User Document Schema"""

    net_id = StringField(required=True)
    username = StringField(required=True)
    verified = BooleanField(required=True)
    anonymous = BooleanField(required=True)
    karma = IntField(required=True)
    posted_tips = ListField(ObjectIdField())
    date_created = DateTimeField(required=True)
