from mongoengine.fields import StringField
from mongoengine import EmbeddedDocument


class Location(EmbeddedDocument):
    """Location Embedded Document Schema"""

    city = StringField()
    country = StringField()
    address1 = StringField()
    address2 = StringField()
    address3 = StringField()
    state = StringField()
    zip_code = StringField()
