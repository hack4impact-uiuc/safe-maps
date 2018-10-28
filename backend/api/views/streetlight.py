from flask import Blueprint
from api.models.Streetlight import Streetlight
from api.core import create_response, serialize_list, logger

streetlight = Blueprint("streetlight", __name__)


@streetlight.route("/streetlights", methods=["GET"])
def get_streetlight():
    """
    GET function for retrieving Streetlight objects
    """
    response = [streetlight.to_mongo() for streetlight in Streetlight.objects]
    response = {"streetlights": response}
    logger.info("STREETLIGHTS: %s", response)
    return create_response(data=response)


@streetlight.route("/streetlights", methods=["POST"])
def create_streetlight():
    """
    POST function for posting a hard-coded Streetlight object for testing purposes
    """
    streetlight = Streetlight.objects.create(
        streetlight_id=0, latitude=200.2, longitude=300.3
    )
    streetlight.save()

    return create_response(message="success!")
