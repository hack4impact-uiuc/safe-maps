import requests
import json
import time
import datetime
import re

app_token = "3vAi4grxLm8Lql1sffmqGNo2o"  # Effectively the api key
api_url = "https://moto.data.socrata.com/resource/3h5f-6xbh.json"

days_of_crime = 30  # How many days of crime data to pull from API

# Columns to select from db
req_fields = [
    "incident_id",
    "incident_datetime",
    "incident_type_primary",
    "incident_description",
    "address_1",
    "city",
    "state",
    "latitude",
    "longitude",
    "hour_of_day",
    "day_of_week",
    "parent_incident_type",
]


def get_qs_url(url, args):
    """
    Accepts url string and dictionary of querystring parameters, returns properly
    formatted url.
    """
    qs_url = url
    i = 0
    for k, v in args.items():
        if i == 0:
            qs_url += "?"
        else:
            qs_url += "&"
        qs_url += str(k) + "=" + str(v)
        i += 1
    return qs_url


def get_datetime(days_ago):
    """
    Returns datetime as formatted floating datetime string from days_ago days
    ago.
    E.g.: 2015-01-10T14:00:00.000
    """
    today = datetime.date.today()
    offset = datetime.timedelta(days=days_ago)
    bound = today - offset
    bound_str = str(bound) + "T06:00:00.000"
    return bound_str


def pull_data(headers, payload, api_url):
    """
    Pulls data from Socrata API, returns dict of all data. Could probably write a
    generic scraper class and this would take only a little tweaking to work for
    every scraper.
    """
    return_data = {}
    data = requests.get(get_qs_url(api_url, payload), headers=headers)
    for raw_record in data.json():
        record = {}
        for field in req_fields:
            if field == "incident_description":
                record[field] = format_string(raw_record.get(field))
            elif field == "incident_type_primary":
                record[field] = raw_record.get(field).title()
            else:
                record[field] = raw_record.get(field)
        return_data[record["incident_id"]] = record
    return return_data


def format_string(text):
    TAG_RE = re.compile(r"<[^>]+>")
    stripped = TAG_RE.sub("", text)
    return stripped.capitalize()


def crime_scrape():
    """
    Wrapper function that calls all methods in this script in order to return
    a mined dictionary of the past ${days_of_crime} days of crime data.
    """
    payload = {"$where": "incident_datetime > '" + get_datetime(days_of_crime) + "'"}
    headers = {"content-type": "application/json", "X-App-Token": app_token}
    mined_data = pull_data(headers, payload, api_url)
    return mined_data
