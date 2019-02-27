import pdb
from flask import Blueprint, request
from datetime import datetime
from api.models.User import User
from api.core import create_response, serialize_list, logger

user = Blueprint("user", __name__)


@user.route("/users", methods=["GET"])
def get_users():
    """
    GET function for retrieving User objects
    """
    response = [user.to_mongo() for user in User.objects]
    response = {"users": response}
    logger.info("USERS: %s", response)
    return create_response(data=response)


@user.route("/users", methods=["POST"])
def create_user():
    """
    POST function for creating a new User
    """
    data = request.get_json()
    user = User.objects.create(
        net_id=data["net_id"],
        username=data["username"],
        verified=False,
        anon=data["anon"],
        karma=0,
        posted_tips=[],
        date_created=datetime.now(),
    )
    user.save()
    return create_response(message="success!")


@user.route("/users/<id>", methods=["GET"])
def get_user(id):
    """
    GET function for retrieving a single User
    """
    response = User.objects.get(id=id).to_mongo()
    return create_response(data=dict(response))


@user.route("/users/<id>", methods=["PUT"])
def update_user(id):
    """
    PUT function for updating a User
    """
    data = request.get_json()
    user = User.objects.get(id=id)
    if "net_id" in data:
        user.update(net_id=data["net_id"])
    if "username" in data:
        user.update(username=data["username"])
    if "verified" in data:
        user.update(verified=data["verified"])
    if "anon" in data:
        user.update(anon=data["anon"])
    if "karma" in data:
        user.update(karma=data["karma"])
    if "posted_tips" in data:
        user.update(posted_tips=data["posted_tips"])
    return create_response(message="success!")


@user.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    """
    DELETE function for deleting a user
    """
    User.objects(id=id).delete()
    return create_response(message="success!")


# @emergencyPhone.route("/emergency-phones", methods=["POST"])
# def scrape_phones():
#     """
#     POST function which calls get_phones() from the emergency_phones.py scraper
#     and stores phone data to the database.
#     This data is hardcoded and will probably never change, so this endpoint
#     only needs to be called if the db is reset or the collection is lost.
#     """
#     try:
#         data = get_phones()
#         delete_phone_collection()
#         for phone in data:
#             save_phone_to_db(phone)
#         return create_response(status=200, message="success!")
#     except Exception as e:
#         return create_response(status=500, message="Exception raised: " + repr(e))
