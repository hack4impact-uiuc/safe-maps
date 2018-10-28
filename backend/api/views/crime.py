from flask import Blueprint
from api.models.Crime import Crime
from api.core import create_response, serialize_list, logger
from api.scrapers.crimes import crime_scrape

crime = Blueprint("crime", __name__)


@crime.route("/crimes", methods=["GET"])
def get_crime():
    """
    GET function for retrieving Crime objects
    """
    response = [crime.to_mongo() for crime in Crime.objects]
    response = {"crimes": response}
    logger.info("CRIMES: %s", response)
    print(response)
    return create_response(data=response)


@crime.route("/crimes", methods=["POST"])
def create_crime():
    """
    POST function for posting a hard-coded Crime object for testing purposes
    """
    crime = Crime.objects.create(
        incident_id="1",
        incident_type_primary="Peeing in public",
        incident_description="Self explanatory",
        address_1="Outside Shreyas's apartment",
        city="Champaign",
        state="IL",
        latitude=100.1,
        longitude=200.2,
        hour_of_day=23,
        day_of_week="Monday",
        parent_incident_type="Disturbing the peace",
    )
    crime.save()

    return create_response(message="success!")


@crime.route("/scrape_crimes", methods=["POST"])
def scrape_crimes():
    crime_data = crime_scrape()
    for crime_id in crime_data.keys():
        save_crime_to_db(crime_data[crime_id])
    return create_response(message="success!")


def save_crime_to_db(crime_dict):
    crime = Crime.objects.create(
        incident_id=crime_dict.get("incident_id"),
        incident_type_primary=crime_dict.get("incident_type_primary"),
        incident_description=crime_dict.get("incident_description"),
        address_1=crime_dict.get("address_1"),
        city=crime_dict.get("city"),
        state=crime_dict.get("state"),
        latitude=float(crime_dict.get("latitude")),
        longitude=float(crime_dict.get("longitude")),
        hour_of_day=crime_dict.get("hour_of_day"),
        day_of_week=crime_dict.get("day_of_week"),
        parent_incident_type=crime_dict.get("parent_incident_type"),
    )
    crime.save()
