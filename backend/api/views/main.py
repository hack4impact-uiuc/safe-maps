from flask import Blueprint
from api.models import User
from api.core import create_response, serialize_list, logger

main = Blueprint("main", __name__)


# function that is called when you visit /
@main.route("/")
def index():
    # access the logger with the logger from api.core and uses the standard logging module
    logger.info("Hello World!")
    return "<h1>Hello World!</h1>"


# function that is called when you visit /persons
@main.route("/users", methods=["GET"])
def get_user():
    logger.info("USERS: %s", User.objects)  # use log formatting
    return create_response(data={"megha": ["is", "a", "weab"]})


@main.route("/users", methods=["POST"])
def create_user():
    User(net_id="tk2", first_name="Tim", last_name="Ko").save()
    return create_response(message="success!")

