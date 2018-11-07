from flask import Blueprint
from api.models.BusStop import BusStop
from api.core import create_response, serialize_list, logger
from api.scrapers.bus_stops import scrape
import requests

busStop = Blueprint("busStop", __name__)

# TODO: change busStop to bus-stop in urls


@busStop.route("/bus-stops", methods=["GET"])
def get_busStop():
    """
    GET function for retrieving BusStop objects
    """
    response = [busStop.to_mongo() for busStop in BusStop.objects]
    response = {"bus-stops": response}
    logger.info("BUSSTOPS: %s", response)
    return create_response(data=response)


@busStop.route("/bus-stops", methods=["POST"])
def scrape_stops():
    """
    POST function which scrapes data from scrape() method in bus_stops.py
    scraper and stores them in the busStops db collection.
    Should be run probably once a month or so, because bus routes only change
    once or twice a year.
    """
    try:
        stop_data = scrape()
        delete_stop_collection()
        for stop_id in stop_data.keys():
            save_stop_to_db(stop_data[stop_id])
        return create_response(status=200, message="success!")
    except requests.exceptions.HTTPError:
        return create_response(status=500, message="HTTPError")
    except requests.exceptions.Timeout:
        return create_response(status=500, message="Connection timed out")
    except Exception as e:
        return create_response(status=500, message="Exception raised: " + repr(e))


def save_stop_to_db(stop_dict):
    """
    Helper function to save python dict object representing a bus stop db entry
    to an actual mongoDB object.
    """
    busStop = BusStop.objects.create(
        stop_id=stop_dict["stop_id"],
        stop_name=stop_dict["stop_name"],
        latitude=stop_dict["stop_lat"],
        longitude=stop_dict["stop_lon"],
        routes=stop_dict.get("routes"),
    )
    busStop.save()


@busStop.route("/bus-stops", methods=["DELETE"])
def clear_stops():
    """
    DELETE method which wraps the delete stops collection function as
    an API endpoint.
    """
    try:
        count = delete_stop_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_stop_collection():
    """
    Helper function to delete stop collection in db.
    """
    count = len(BusStop.objects())
    for stop in BusStop.objects():
        stop.delete()
    return count
