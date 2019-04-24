from mongoengine.fields import (
    StringField,
    IntField,
    BooleanField,
    DateTimeField,
    ListField,
    ObjectIdField,
)
import mongoengine

# DynamicDocument allows for unspecified fields to be put in as well
class User(mongoengine.DynamicDocument):
    """User Document Schema"""

    net_id = StringField(required=True)
    username = StringField(required=True)
    verified = BooleanField(required=True, default=False)
    anon = BooleanField(required=True, default=False)
    karma = IntField(required=True, default=0)
    posted_tips = ListField(ObjectIdField())
    date_created = DateTimeField(required=True)
    pro_pic = StringField(
        required=True,
        default="https://pngimage.net/wp-content/uploads/2018/05/default-profile-image-png-5.png",
    )
    auth_server_uid = StringField(required=True)
