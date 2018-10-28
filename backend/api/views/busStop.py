from flask import Blueprint
from api.models.BusStop import BusStop
from api.core import create_response, serialize_list, logger
from api.scrapers.bus_stops import scrape

busStop = Blueprint("busStop", __name__)


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
    stop_data = scrape()
    for stop_id in stop_data.keys():
        save_stop_to_db(stop_data[stop_id])
    return create_response(message="success!")


def save_stop_to_db(stop_dict):
    busStop = BusStop.objects.create(
        stop_id=stop_dict["stop_id"],
        stop_name=stop_dict["stop_name"],
        latitude=stop_dict["stop_lat"],
        longitude=stop_dict["stop_lon"],
        routes=stop_dict.get("routes"),
    )
    busStop.save()
