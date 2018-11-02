from flask import Blueprint
from api.models.BusStop import BusStop
from api.core import create_response, serialize_list, logger
from api.scrapers.bus_stops import scrape
import requests

busStop = Blueprint("busStop", __name__)

# TODO: change busStop to bus-stop in urls


@busStop.route("/busStops", methods=["GET"])
def get_busStop():
    """
    GET function for retrieving BusStop objects
    """
    response = [busStop.to_mongo() for busStop in BusStop.objects]
    response = {"busStops": response}
    logger.info("BUSSTOPS: %s", response)
    return create_response(data=response)


@busStop.route("/busStops", methods=["POST"])
def create_busStop():
    """
    POST function for posting a hard-coded BusStop object for testing purposes
    """
    busStop = BusStop.objects.create(
        stop_id="0", stop_name="Shreyas", latitude=200.2, longitude=300.3
    )
    busStop.routes["Route 1"] = "ffffffff"
    busStop.routes["Route 2"] = "00000000"
    busStop.save()

    return create_response(message="success!")


@busStop.route("/scrape_stops", methods=["POST"])
def scrape_stops():
    """
    POST function which scrapes data from scrape() method in bus_stops.py
    scraper and stores them in the busStops db collection.
    Should be run probably once a month or so, because bus routes only change
    once or twice a year.
    """
    try:
        stop_data = scrape()
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
