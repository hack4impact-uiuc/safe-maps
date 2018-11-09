from flask import Blueprint
from api.models.PoliceStation import PoliceStation
from api.core import create_response, serialize_list, logger
from api.scrapers.police_stations import get_stations

policeStation = Blueprint("policeStations", __name__)


@policeStation.route("/police-stations", methods=["GET"])
def get_police_stations():
    """
    GET function for retrieving Police Station objects
    """
    response = [policeStation.to_mongo() for policeStation in PoliceStation.objects]
    response = {"police-stations": response}
    logger.info("POLICESTATIONS: %s", response)
    return create_response(data=response)


@policeStation.route("/police-stations", methods=["POST"])
def scrape_station():
    """
    POST function which calls get_stations() from the police_station.py scraper
    and stores station data to the database.
    This data is hardcoded and will probably never change, so this endpoint
    only needs to be called if the db is reset or the collection is lost.
    """
    try:
        stations = get_stations()
        delete_police_station_collection()
        for station in stations:
            save_station(station)
        return create_response(status=200, message="success!")
    except Exception as e:
        return create_response(status=500, message="Exception raised: " + repr(e))


def save_station(station_dict):
    """
    Helper function to save python dict object representing an emergency phone
    db entry to an actual mongoDB object.
    """
    police_station = PoliceStation.objects.create(
        name=station_dict.get("place_name"),
        latitude=station_dict.get("lat"),
        longitude=station_dict.get("long"),
    )
    police_station.save()


@policeStation.route("/police-stations", methods=["DELETE"])
def clear_stations():
    """
    DELETE method which wraps the clear station collection function as
    an API endpoint.
    """
    try:
        count = delete_police_station_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_police_station_collection():
    """
    Helper function to delete station collection in db.
    """
    count = len(PoliceStation.objects())
    for station in PoliceStation.objects():
        station.delete()
    return count
