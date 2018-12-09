from flask import Blueprint, request
from api.models.Streetlight import Streetlight
from api.core import create_response, serialize_list, logger
from api.scrapers.streetlights import streetlight_scrape
import requests

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
def scrape_streetlights():
    """
    POST function which scrapes data from streetlight_scrape() method in
    streetlights.py scraper and stores them in the streetlight db collection.
    """
    try:
        data = streetlight_scrape()
        delete_streetlight_collection()
        for streetlight_id in data.keys():
            save_streetlight_to_db(data[streetlight_id])
        return create_response(status=200, message="success!")
    except requests.exceptions.HTTPError:
        return create_response(status=500, message="HTTPError")
    except requests.exceptions.Timeout:
        return create_response(status=500, message="Connection timed out")
    except Exception as e:
        return create_response(status=500, message="Exception raised: " + repr(e))


def save_streetlight_to_db(streetlight_dict):
    """
    Helper function to save python dict object representing a streetlight db entry
    to an actual mongoDB object.
    """
    latitude = streetlight_dict.get("latitude")
    longitude = streetlight_dict.get("longitude")
    if latitude and longitude:
        streetlight = Streetlight.objects.create(
            latitude=streetlight_dict.get("latitude"),
            longitude=streetlight_dict.get("longitude"),
        )
        streetlight.save()


@streetlight.route("/streetlights", methods=["DELETE"])
def clear_streetlights():
    """
    DELETE method which wraps the delete streetlight collection function as
    an API endpoint.
    """
    try:
        count = delete_streetlight_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_streetlight_collection():
    """
    Helper function to delete streetlight collection in db.
    """
    result = len(Streetlight.objects())
    count = 0
    for streetlight in Streetlight.objects():
        streetlight.delete()
        count = count + 1
    return result
