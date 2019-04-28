import requests
from flask import Blueprint, request
from api.core import create_response, serialize_list, logger, invalid_model_helper
from api.core import necessary_post_params
from api.models.User import User
from datetime import datetime

auth = Blueprint("auth", __name__)
auth_server_host = "https://c2tc-auth-server.herokuapp.com/"
# auth_server_host = "http://localhost:8001/"


def invalid_email(email_address):
    return not email_address.endswith("@illinois.edu")


@auth.route("/register", methods=["POST"])
@necessary_post_params("email", "password", "anon", "username", "role")
def register():
    client_data = request.get_json()

    if invalid_email(client_data["email"]):
        return create_response(
            message="Not a valid email to register with!",
            status=422,
            data={"status": "fail"},
        )

    our_response, code = post_to_auth_server("register", "email", "password", "role")
    if code == 200:
        res_data = our_response.get_json()["result"]
        auth_uid = res_data["auth_uid"]
        create_new_db_user(request.get_json(), auth_uid)
    return (our_response, code)


@auth.route("/login", methods=["POST"])
@necessary_post_params("email", "password")
def login():
    print("attempting to login")
    return post_to_auth_server("login", "email", "password")


def post_to_auth_server(endpoint, *properties_to_post):
    user_input = request.get_json()

    auth_post_data = {key: user_input[key] for key in properties_to_post}

    print("auth_server_host + endpoint: ", auth_server_host + endpoint)
    auth_server_response = requests.post(
        auth_server_host + endpoint, json=auth_post_data
    )
    response_body = auth_server_response.json()
    print("response_body: ", response_body)

    if "token" not in response_body:
        return create_response(
            message=response_body["message"], status=auth_server_response.status_code
        )
    else:
        jwt_token = response_body["token"]
        our_response_body = {"token": jwt_token, "auth_uid": response_body["uid"]}
        our_response, code = create_response(
            message=response_body["message"],
            status=auth_server_response.status_code,
            data=our_response_body,
        )
        return (our_response, code)


@auth.route("/verifyEmail", methods=["POST"])
@necessary_post_params("pin")
def verifyEmail():
    token = request.headers.get("token")
    print("request.headers: ", request.headers)
    post_body = {"pin": request.get_json()["pin"]}
    auth_server_res = requests.post(
        auth_server_host + "verifyEmail/",
        headers={
            "Content-Type": "application/json",
            "token": token,
            "google": "undefined",
        },
        json=post_body,
    )

    response_body = auth_server_res.json()

    return create_response(
        message=response_body["message"], status=auth_server_res.status_code
    )


def create_new_db_user(client_data, auth_uid):
    user = User.objects.create(
        username=client_data["username"],
        verified=False,
        anon=client_data["anon"],
        karma=0,
        posted_tips=[],
        date_created=datetime.now(),
        auth_server_uid=auth_uid,
    )
    user.save()
