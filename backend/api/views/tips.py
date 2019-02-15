from flask import Blueprint
from api.models.Tips import Tips
from api.core import create_response, serialize_list, logger

tips = Blueprint("tips", __name__)


@tips.route("/tips", methods=["GET"])
def get_tips():
    """
    GET function for retrieving Tips objects
    """
    response = [tips.to_mongo() for tips in Tips.objects]
    response = {"tips": response}
    logger.info("TIPS: %s", response)
    return create_response(data=response)


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
