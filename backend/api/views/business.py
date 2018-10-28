from flask import Blueprint, request
from api.models.Business import Business
from api.models.Location import Location
from api.models.OpenHours import OpenHours
from api.core import create_response, serialize_list, logger
from api.scrapers.open_businesses import business_scrape

business = Blueprint("business", __name__)


@business.route("/open_businesses", methods=["GET"])
def open_businesses():
    """
    Querystring args:   time= #### (time as 4 digit 24hr time, eg. 1430 = 2:30pm)
                        day = # (integer 0-6, where 0 is Monday)
    """
    data = Business.objects()
    time = int(request.args.get("time"))
    day = int(request.args.get("day"))
    open_businesses = []
    for b in data:
        curr_day = get_open_business_day(b, day)
        if curr_day == None:
            continue
        if int(curr_day.start) <= time and int(curr_day.end) >= time:
            # open
            open_businesses.append(b.to_mongo())
    ret_data = {"businesses": open_businesses}
    return create_response(data=ret_data, message="Success", status=201)


def get_open_business_day(business, day):
    if len(business.open_hours) == 0:
        return None
    for open_day in business.open_hours:
        if open_day.day == day:
            return open_day
    return None


@business.route("/businesses", methods=["GET"])
def get_business():
    """
    GET function for retrieving Business objects
    """
    response = [business.to_mongo() for business in Business.objects]
    response = {"businesses": response}
    logger.info("BUSINESSES: %s", response)
    return create_response(data=response)


@business.route("/businesses", methods=["POST"])
def create_business():
    """
    POST function for posting a hard-coded Business object for testing purposes
    """
    location = Location(
        city="Champaign", country="USA", address1="addy1", state="IL", zip_code="12345"
    )

    open_hours = OpenHours(start="0000", end="1111", is_overnight=True, day=3)

    business = Business.objects.create(
        name="McDonalds",
        yelp_id="asdasd",
        image_url="asdasd.com",
        display_phone="12345555",
    )
    business.location = location
    business.open_hours = [open_hours]
    business.save()

    return create_response(message="success!")


@business.route("/scrape_businesses", methods=["POST"])
def scrape_businesses():
    data = business_scrape()
    for business_id in data.keys():
        save_business_to_db(data[business_id])
    return create_response(message="success!")


def save_business_to_db(business_dict):
    location = Location(
        city=business_dict["location"].get("city"),
        country=business_dict["location"].get("country"),
        address1=business_dict["location"].get("address1"),
        state=business_dict["location"].get("state"),
        zip_code=business_dict["location"].get("zip_code"),
    )
    open_hours = []
    hours_struct = business_dict.get("hours")
    if hours_struct != None:
        hours_data = hours_struct[0].get("open")
        if hours_data != None:
            for hours in hours_data:
                new_hours = OpenHours(
                    start=hours["start"],
                    end=hours["end"],
                    is_overnight=hours["is_overnight"],
                    day=hours["day"],
                )
                open_hours.append(new_hours)

    business = Business.objects.create(
        name=business_dict.get("name"),
        yelp_id=business_dict.get("yelp_id"),
        image_url=business_dict.get("image_url"),
        display_phone=business_dict.get("display_hours"),
        location=location,
        open_hours=open_hours,
    )
    business.save()
