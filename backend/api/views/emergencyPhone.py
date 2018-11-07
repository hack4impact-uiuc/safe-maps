from flask import Blueprint
from api.models.EmergencyPhone import EmergencyPhone
from api.core import create_response, serialize_list, logger
from api.scrapers.emergency_phones import get_phones

emergencyPhone = Blueprint("emergencyPhone", __name__)


@emergencyPhone.route("/emergency-phones", methods=["GET"])
def get_emergencyPhone():
    """
    GET function for retrieving EmergencyPhone objects
    """
    response = [emergencyPhone.to_mongo() for emergencyPhone in EmergencyPhone.objects]
    response = {"emergency-phones": response}
    logger.info("EMERGENCYPHONES: %s", response)
    return create_response(data=response)


@emergencyPhone.route("/emergency-phones", methods=["POST"])
def scrape_phones():
    """
    POST function which calls get_phones() from the emergency_phones.py scraper
    and stores phone data to the database.
    This data is hardcoded and will probably never change, so this endpoint
    only needs to be called if the db is reset or the collection is lost.
    """
    try:
        data = get_phones()
        delete_phone_collection()
        for phone in data:
            save_phone_to_db(phone)
        return create_response(status=200, message="success!")
    except Exception as e:
        return create_response(status=500, message="Exception raised: " + repr(e))


def save_phone_to_db(phone_dict):
    """
    Helper function to save python dict object representing an emergency phone
    db entry to an actual mongoDB object.
    """
    emergencyPhone = EmergencyPhone.objects.create(
        emergencyPhone_id=phone_dict.get("id"),
        latitude=phone_dict.get("latitude"),
        longitude=phone_dict.get("longitude"),
    )
    emergencyPhone.save()


@emergencyPhone.route("/emergency-phones", methods=["DELETE"])
def clear_phones():
    """
    DELETE method which wraps the clear emergency phones collection function as
    an API endpoint.
    """
    try:
        count = delete_phone_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_phone_collection():
    """
    Helper function to delete phone collection in db.
    """
    count = len(EmergencyPhone.objects())
    for phone in EmergencyPhone.objects():
        phone.delete()
    return count
