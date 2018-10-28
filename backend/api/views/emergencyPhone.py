from flask import Blueprint
from api.models.EmergencyPhone import EmergencyPhone
from api.core import create_response, serialize_list, logger
from api.scrapers.emergency_phones import get_phones

emergencyPhone = Blueprint("emergencyPhone", __name__)


@emergencyPhone.route("/emergencyPhones", methods=["GET"])
def get_emergencyPhone():
    """
    GET function for retrieving EmergencyPhone objects
    """
    response = [emergencyPhone.to_mongo() for emergencyPhone in EmergencyPhone.objects]
    response = {"emergencyPhones": response}
    logger.info("EMERGENCYPHONES: %s", response)
    return create_response(data=response)


@emergencyPhone.route("/emergencyPhones", methods=["POST"])
def create_emergencyPhone():
    """
    POST function for posting a hard-coded EmergencyPhone object for testing purposes
    """
    emergencyPhone = EmergencyPhone.objects.create(
        emergencyPhone_id=4, latitude=2030.2, longitude=300.3
    )
    emergencyPhone.save()

    return create_response(message="success!")


@emergencyPhone.route("/scrape_phones", methods=["POST"])
def scrape_phones():
    data = get_phones()
    for phone in data:
        save_phone_to_db(phone)
    return create_response(message="success!")


def save_phone_to_db(phone_dict):
    emergencyPhone = EmergencyPhone.objects.create(
        emergencyPhone_id=phone_dict.get("id"),
        latitude=phone_dict.get("latitude"),
        longitude=phone_dict.get("longitude"),
    )
    emergencyPhone.save()
