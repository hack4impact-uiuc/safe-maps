import pdb
from flask import Blueprint, request
from datetime import datetime
from api.models.User import User
from api.core import create_response, serialize_list, logger, authenticated_route

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
        username=data["username"],
        verified=False,
        anon=data["anon"],
        pro_pic=data["pro_pic"],
        karma=0,
        posted_tips=[],
        date_created=datetime.now(),
    )
    user.save()
    return create_response(message="success!")


@user.route("/userinfo", methods=["GET"])
@authenticated_route
def current_user_info(db_user):
    return create_response(
        message="Success!", status=200, data=dict(db_user.to_mongo())
    )


@user.route("/users/<id>", methods=["GET"])
def get_user(id):
    """
    GET function for retrieving a single User
    """
    response = User.objects.get(id=id).to_mongo()
    return create_response(data=dict(response))


@user.route("/users", methods=["PUT"])
@authenticated_route
def update_user(user):
    """
    PUT function for updating a User
    """
    data = request.get_json()
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
    if "pro_pic" in data:
        user.update(pro_pic=data["pro_pic"])
    if "trusted" in data:
        user.update(trusted=data["trusted"])
    return create_response(message="success!")


@user.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    """
    DELETE function for deleting a user
    """
    User.objects(id=id).delete()
    return create_response(message="success!")


@user.route("/users/<id>/verify", methods=["PUT"])
def update_verified(id):
    """
    PUT function for changing the user's verified status
    """
    user = User.objects.get(id=id)
    if request.args.get("verified") == "True":
        user.update(verified=True)
        return create_response(message="success!")
    if request.args.get("verified") == "False":
        user.update(verified=False)
        return create_response(message="success!")
    return create_response(
        message="query string not recognized, it must be either True or False"
    )
