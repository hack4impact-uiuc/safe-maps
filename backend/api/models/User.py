from mongoengine.fields import (
    StringField,
    IntField,
    DateTimeField,
    BooleanField,
    FloatField,
)
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class User(mongoengine.DynamicDocument):
    """User Document Schema"""

    net_id = StringField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(require=True)

