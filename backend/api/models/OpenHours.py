from mongoengine.fields import StringField, BooleanField, IntField
from mongoengine import EmbeddedDocument


class OpenHours(EmbeddedDocument):
    """Hours Embedded Document Schema"""

    start = StringField(required=True)
    end = StringField(required=True)
    is_overnight = BooleanField(required=True)
    day = IntField(required=True)
