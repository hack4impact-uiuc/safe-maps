import requests
import json
import sys

sys.path.append("../../")
from api.models.BusStop import BusStop

##TODO: Changes - Only get route number and the hex color

api_keys = [
    "95b24e883247444095625960a8bbee98",
    "901d92ed96ae44c280f3e3c7c48fc300",
    "80678f088271417aa6d0cdb898aa5624",
]
stops_url = "https://developer.cumtd.com/api/v2.2/json/getstops"
routes_url = "https://developer.cumtd.com/api/v2.2/json/getroutesbystop"

stops_payload = {"key": api_keys[0]}

routes_payload = {"key": api_keys[0], "stop_id": ""}  # change stop_id to id of stop

stops_req_fields = ["stop_id", "stop_lat", "stop_lon", "stop_name"]


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


def get_stops(payload, url, req_fields):
    """
    Given the querystring payload, URL we are querying from, and list of fields
    to scrape, returns a list of all stops including stop points, stop name,
    stop ID.
    """
    data = requests.get(get_qs_url(url, payload))
    return_data = {}
    for stop in data.json()["stops"]:
        for stop_point in stop.get("stop_points"):
            stop_point_data = {}
            for field in req_fields:
                stop_point_data[field] = stop_point.get(field)
            return_data[stop_point["stop_id"]] = stop_point_data
    return return_data


def save_stop_to_db(stop_dict):
    """
    busStop = BusStop.objects.create(
        stop_id=stop_dict["stop_id"],
        stop_name=stop_dict["stop_name"],
        latitude=stop_dict["latitude"],
        longitude=stop_dict["longitude"],
        routes=stop_dict["routes"]
    )
    """
    busStop = BusStop.objects.create(
        stop_id="stop1",
        stop_name="transit plaza",
        latitude=100.0,
        longitude=200.0,
        routes={},
    )
    busStop.save()


def get_full_stop_info(stop_data, payload, url):
    """
    Given a json structure containing all stops from get_stops(), the
    querystring payload and URL we are querying from, returns a modified
    dictionary of all stops including stop points, stop name, stop ID, AND
    routes that run through that stop.
    """
    stop_counter = 0  # for debugging
    api_key_counter = 0
    total_stops = len(stop_data.keys())  # debugging
    print(total_stops, "stops to process.")  # debugging
    for stop_id in list(stop_data.keys()):
        if stop_counter % 800 == 0:
            payload["key"] = api_keys[api_key_counter]
            if api_key_counter < len(api_keys) - 1:
                api_key_counter += 1
        payload["stop_id"] = stop_id
        single_stop_routes_raw = requests.get(get_qs_url(url, payload)).json()
        route_list = {}
        for stop_route in single_stop_routes_raw["routes"]:
            route_list[stop_route["route_short_name"]] = stop_route["route_text_color"]
        stop_data[stop_id]["routes"] = route_list
        # print(stop_data[stop_id])
        # save_stop_to_db(stop_data[stop_id])
        stop_counter += 1  # debugging
        perc_complete = float(stop_counter) / total_stops * 100  # debugging
        print(
            stop_id,
            "finished.",
            stop_counter,
            "stops processed.",
            str(perc_complete)[:4] + "% complete.",
        )  # debugging
    return stop_data


def scrape():
    stop_data = get_stops(stops_payload, stops_url, stops_req_fields)
    stop_data = get_full_stop_info(stop_data, routes_payload, routes_url)
    return stop_data
    # with open("scrapers/bus_data.txt", "w") as file:
    # file.write(json.dumps(stop_data))
