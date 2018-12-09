import csv
import os
from flask import Blueprint
from api.models.Crime import Crime
from api.core import create_response, serialize_list, logger
from api.scrapers.crimes import crime_scrape
import datetime
import dateutil.parser

crime = Blueprint("crime", __name__)
important_crime = {}


@crime.route("/crimes", methods=["GET"])
def get_crime():
    """
    GET function for retrieving Crime objects
    """
    response = [crime.to_mongo() for crime in Crime.objects]
    response = {"crimes": response}
    logger.info("CRIMES: %s", response)
    return create_response(data=response)


@crime.route("/crimes", methods=["POST"])
def scrape_crimes():
    """
    POST function which scrapes data from crime_scrape() method in crimes.py
    scraper and stores them in the crimes db collection.
    This should probably be run every day, or every hour at night.
    """
    try:
        crime_data = crime_scrape()
        delete_crime_collection()
        for crime_id in crime_data.keys():
            save_crime_to_db(crime_data[crime_id])
        return create_response(status=200, message="success!")
    except requests.exceptions.HTTPError:
        return create_response(status=500, message="HTTPError")
    except requests.exceptions.Timeout:
        return create_response(status=500, message="Connection timed out")
    except Exception as e:
        return create_response(status=500, message="Exception raised: " + repr(e))


def save_crime_to_db(crime_dict):
    """
    Helper function to save python dict object representing a crime db entry to
    an actual mongoDB object.
    """
    date = dateutil.parser.parse(crime_dict.get("incident_datetime"))
    formatted_date = date.strftime("%b %d, %Y at %I:%M %p")
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
        incident_datetime=formatted_date,
    )
    crime.save()


@crime.route("/crimes", methods=["DELETE"])
def clear_crimes():
    """
    DELETE method which wraps the clear crimes collection function as
    an API endpoint.
    """
    try:
        count = delete_crime_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_crime_collection():
    """
    Helper function to delete crime collection in db.
    """
    count = len(Crime.objects())
    check_crime_duration()
    for crime in Crime.objects():
        duration = check_filter(crime.incident_type_primary)
        if (crime.duration == None or crime.duration == 30) and duration == 30:
            crime.delete()
        else:
            crime.duration = duration - 30
    return count


def check_crime_duration():
    """
    Helper function to get important crimes
    """
    with open("./api/views/crime_duration.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        for row in csv_reader:
            if row[0] not in important_crime:
                important_crime["[UIPD] " + row[0].upper()] = row[1]


def check_filter(id):
    """
    Helper function to determine if the current crime is in the dictionary
    """
    if id not in important_crime:
        return 30
    else:
        return important_crime[id] * 30
