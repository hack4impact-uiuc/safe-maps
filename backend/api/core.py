import configparser
import requests
from typing import Tuple, List
from pathlib import Path

from werkzeug.local import LocalProxy
from flask import current_app, jsonify, request
from flask.wrappers import Response

from bson import ObjectId
from datetime import datetime
import json

import functools

from api.models.User import User

# logger object for all views to use
logger = LocalProxy(lambda: current_app.logger)

auth_server_host = "https://c2tc-auth-server.herokuapp.com/"
# auth_server_host = "http://localhost:8001/"


class Mixin:
    """Utility Base Class for SQLAlchemy Models.

    Adds `to_dict()` to easily serialize objects to dictionaries.
    """

    def to_dict(self) -> dict:
        d_out = dict((key, val) for key, val in self.__dict__.items())
        d_out.pop("_sa_instance_state", None)
        d_out["_id"] = d_out.pop("id", None)  # rename id key to interface with response
        return d_out


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return o.strftime("%m/%d/%Y, %H:%M:%S")
        return json.JSONEncoder.default(self, o)


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """
    Wraps response in a consistent format throughout the API.

    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response

    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int
    """

    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")
    # if data is None:
    #     raise TypeError("Data is empty 😞")
    # for key in data:
    #     if isinstance(data[key], ObjectId):
    # data[key] = str(data[key])
    data = JSONEncoder().encode(data)
    response = {
        "success": 200 <= status < 300,
        "message": message,
        "result": json.loads(data),
    }
    return jsonify(response), status


def serialize_list(items: List) -> List:
    """Serializes a list of SQLAlchemy Objects, exposing their attributes.

    :param items - List of Objects that inherit from Mixin
    :returns List of dictionaries
    """
    if not items or items is None:
        return []
    return [x.to_dict() for x in items]


# add specific Exception handlers before this, if needed
def all_exception_handler(error: Exception) -> Tuple[Response, int]:
    """Catches and handles all exceptions, add more specific error Handlers.
    :param Exception
    :returns Tuple of a Flask Response and int
    """
    return create_response(message=str(error), status=500)


def can_be_authenticated(route):
    @functools.wraps(route)
    def wrapper_wroute(*args, **kwargs):
        token = request.headers.get("token")
        auth_server_res = requests.get(
            auth_server_host + "getUser/",
            headers={
                "Content-Type": "application/json",
                "token": token,
                "google": "undefined",
            },
        )
        if auth_server_res.status_code != 200:
            return route(None, *args, **kwargs)
        auth_uid = auth_server_res.json()["user_id"]
        db_user = User.objects.get(auth_server_uid=auth_uid)
        return route(db_user, *args, **kwargs)

    return wrapper_wroute


def authenticated_route(route):
    @functools.wraps(route)
    def wrapper_wroute(*args, **kwargs):
        token = request.headers.get("token")
        auth_server_res = requests.get(
            auth_server_host + "getUser/",
            headers={
                "Content-Type": "application/json",
                "token": token,
                "google": "undefined",
            },
        )
        if auth_server_res.status_code != 200:
            return create_response(
                message=auth_server_res.json()["message"],
                status=401,
                data={"status": "fail"},
            )
        auth_uid = auth_server_res.json()["user_id"]
        db_user = User.objects.get(auth_server_uid=auth_uid)
        return route(db_user, *args, **kwargs)

    return wrapper_wroute


def necessary_post_params(*important_properties):
    def real_decorator(route):
        @functools.wraps(route)
        def wrapper_wroute(*args, **kwargs):
            user_data = request.get_json()
            missing_fields = invalid_model_helper(user_data, important_properties)
            if missing_fields is not None:
                return create_response(
                    message="Missing the following necesary field(s): "
                    + ", ".join(missing_fields),
                    status=422,
                    data={"status": "fail"},
                )
            return route(*args, **kwargs)

        return wrapper_wroute

    return real_decorator


def invalid_model_helper(user_data, props):
    missing_fields = []
    for prop in props:
        if prop not in user_data:
            missing_fields.append(prop)
    if len(missing_fields) == 0:
        return None
    return missing_fields


def get_mongo_credentials(file: str = "creds.ini") -> Tuple:
    config = configparser.ConfigParser()
    config.read(file)
    try:
        mongo_section = config["mongo_creds"]
        return (mongo_section["mongo_db_name"], mongo_section["mongo_url"])
    except KeyError:
        print("Couldn't parse {file} for mongo creds... Check whether it exists.")
        return (None, None)
