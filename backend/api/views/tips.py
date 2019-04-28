from flask import Blueprint, request, jsonify
from api.models.Tips import Tips
from api.models.User import User
from api.core import (
    create_response,
    serialize_list,
    logger,
    authenticated_route,
    necessary_post_params,
    can_be_authenticated,
)
from datetime import datetime
import functools
from bson.objectid import ObjectId
import json
from geopy import distance
from api.constants import UPVOTE, DOWNVOTE

tips = Blueprint("tips", __name__)


@tips.route("/tips", methods=["GET"])
def get_all_tips():
    latitude = request.args.get("lat")
    longitude = request.args.get("long")
    if latitude is None or longitude is None:
        response = [tips.to_mongo() for tips in Tips.objects]
    else:
        response = [
            tips.to_mongo()
            for tips in Tips.objects
            if distance.distance(
                (tips.latitude, tips.longitude), (latitude, longitude)
            ).miles
            <= 0.1
        ]
    response = {"tips": response}
    return create_response(data=response)


@tips.route("/tips/<id>", methods=["GET"])
def get_tip(id):
    response = Tips.objects.get(id=id).to_mongo()
    return create_response(data=dict(response))


@tips.route("/user/tips", methods=["GET"])
@authenticated_route
def get_tips_by_user(user_db):
    posted_tips = (user_db.to_mongo())["posted_tips"]
    posted_tips_list = [
        Tips.objects.get(id=str(tips)).to_mongo() for tips in posted_tips
    ]
    return create_response(data={"tips": posted_tips_list})


@tips.route("/tips_category/<category>", methods=["GET"])
def get_tips_by_category(category):
    response = [tips.to_mongo() for tips in Tips.objects if tips.category == category]
    response = {"tips": response}
    return create_response(data=response)


@tips.route("/tips_upvotes/<tips_id>", methods=["GET"])
def get_tip_upvotes(tips_id):
    tip = Tips.objects.get(id=tips_id)
    tips_upvotes = (tip.to_mongo())["upvotes"]
    tips_upvotes_list = [
        User.objects.get(id=str(user)).to_mongo() for user in tips_upvotes
    ]
    response = {"users": tips_upvotes_list}
    return create_response(data=response)


@tips.route("/tips_downvotes/<tips_id>", methods=["GET"])
def get_tip_downvotes(tips_id):
    """
    GET function for retrieving all User objects that have downvoted a tip
    """
    tip = Tips.objects.get(id=tips_id)
    tips_downvotes = (tip.to_mongo())["downvotes"]
    tips_downvotes_list = [
        User.objects.get(id=str(user)).to_mongo() for user in tips_downvotes
    ]
    response = {"users": tips_downvotes_list}
    return create_response(data=response)


@tips.route("/tips/verified", methods=["GET"])
@can_be_authenticated
def get_verified_tips(user_db):
    if user_db is None:
        response = [tip.to_mongo() for tip in Tips.objects if tip.status == "verified"]
    else:
        user_id = user_db.id
        response = [
            tip.to_mongo()
            for tip in Tips.objects
            if tip.status == "verified" and user_id == str(tip.author)
        ]
    response = {"verified_tips": response}
    return create_response(data=response)


@tips.route("/tips/pending", methods=["GET"])
@can_be_authenticated
def get_pending_tips(user_db):
    if user_db is None:
        response = [tip.to_mongo() for tip in Tips.objects if tip.status == "pending"]
    else:
        user_id = user_db.id
        response = [
            tip.to_mongo()
            for tip in Tips.objects
            if tip.status == "pending" and user_id == str(tip.author)
        ]
    response = {"pending_tips": response}
    return create_response(data=response)


@tips.route("/tips/denied", methods=["GET"])
@can_be_authenticated
def get_denied_tips(user_db):
    if user_db is None:
        response = [tip.to_mongo() for tip in Tips.objects if tip.status == "denied"]
    else:
        user_id = user_db.id
        response = [
            tip.to_mongo()
            for tip in Tips.objects
            if tip.status == "denied" and user_id == str(tip.author)
        ]
    response = {"denied_tips": response}
    return create_response(data=response)


@tips.route("/tips", methods=["POST"])
@authenticated_route
@necessary_post_params("title", "content", "latitude", "longitude", "category")
def create_tip(db_user):
    data = request.get_json()
    tips = Tips.objects.create(
        title=data["title"],
        content=data["content"],
        author=db_user.id,
        posted_time=datetime.now(),
        status="pending",
        latitude=data["latitude"],
        longitude=data["longitude"],
        category=data["category"],
    )
    tips.save()
    posted_tips = (db_user.to_mongo())["posted_tips"]
    posted_tips.append(ObjectId(tips.id))
    db_user.update(posted_tips=posted_tips)
    return create_response(message="success!")


@tips.route("/tips/<tips_id>", methods=["PUT"])
def edit_tip(tips_id):
    """
    PUT function for editing Tips objects
    """
    data = request.get_json()
    tip = Tips.objects.get(id=tips_id)
    if "title" in data:
        tip.title = data["title"]
    if "content" in data:
        tip.content = data["content"]
    if "status" in data:
        tip.status = data["status"]
    if "latitude" in data:
        tip.latitude = data["latitude"]
    if "longitude" in data:
        tip.longitude = data["longitude"]
    if "category" in data:
        tip.category = data["category"]
    tip.save()
    return create_response(message="success!")


@tips.route("/tips/<id>/status", methods=["PUT"])
def update_status(id):
    """
    PUT function for changing the tip's status
    """
    data = request.get_json()
    tip = Tips.objects.get(id=id)
    if (
        data["status"] != "verified"
        and data["status"] != "pending"
        and data["status"] != "denied"
    ):
        return create_response(message="Please enter a valid status")
    tip.update(status=data["status"])
    return create_response(message="success!")


@tips.route("/tips_votes", methods=["PUT"])
@authenticated_route
def change_vote(user_db):
    """
    PUT function for changing a user's upvote or downvote
    """
    data = request.get_json()
    data["user_id"] = user_db.id
    tip = Tips.objects.get(id=data["tips_id"])
    if data["vote_type"] == UPVOTE:
        if ObjectId(data["user_id"]) in tip.to_mongo()["upvotes"]:
            tip.update(pull__upvotes=ObjectId(data["user_id"]))
        else:
            tip_upvotes = tip.to_mongo()["upvotes"]
            tip_upvotes.append(ObjectId(data["user_id"]))
            tip.update(upvotes=tip_upvotes)
            if ObjectId(data["user_id"]) in tip.to_mongo()["downvotes"]:
                tip.update(pull__downvotes=ObjectId(data["user_id"]))

    if data["vote_type"] == DOWNVOTE:
        if ObjectId(data["user_id"]) in tip.to_mongo()["downvotes"]:
            tip.update(pull__downvotes=ObjectId(data["user_id"]))
        else:
            tip_downvotes = tip.to_mongo()["downvotes"]
            tip_downvotes.append(ObjectId(data["user_id"]))
            tip.update(downvotes=tip_downvotes)
            if ObjectId(data["user_id"]) in tip.to_mongo()["upvotes"]:
                tip.update(pull__upvotes=ObjectId(data["user_id"]))
    return create_response(message="success!")


@tips.route("/tips/<tips_id>", methods=["DELETE"])
def delete_tips_by_id(tips_id):
    """
    DELETE function for deleting a tips object by id
    """
    for tips in Tips.objects:
        if tips_id == str(tips.id):
            user = User.objects.get(id=str(tips.author))
            posted_tips = (user.to_mongo())["posted_tips"]
            posted_tips.remove(ObjectId(tips.id))
            user.update(posted_tips=posted_tips)
            tips.delete()
            return create_response(message="success!")
    return create_response(message="Tip not found")


@tips.route("/tips", methods=["DELETE"])
def clear_tips():
    """
    DELETE method which wraps the clear tips function as
    an API endpoint.
    """
    try:
        count = delete_tips_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_tips_collection():
    """
    Helper function to delete tips collection in db.
    """
    result = Tips.objects().delete()
    return result
