import requests
import json
import time

api_key = "dD6vL4WCEnKquFTLsUWpWm2RaUCTiQlSgr-lw0m4DrDkbzmycTXIcOyPZUDttVeWkaRY1lr9WFD87ebLoy4sS6raIcPED-jiChg8KPLa9mGL3JAILiNtUZqnHOW3W3Yx"
search_url = "https://api.yelp.com/v3/businesses/search"
details_url = "https://api.yelp.com/v3/businesses/"  # {id} after last backslash

payload = {
    "latitude": 40.106689,  # center of campus
    "longitude": -88.227326,
    "radius": 3000,  # meters
    "limit": 50,  # limit per page
    "sort_by": "distance",  # closest first
    "offset": 0,  # page offset
}
headers = {"content-type": "application/json", "Authorization": "Bearer " + api_key}


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


def business_scrape():
    """
    This method produces a dictionary containing business data from the Yelp
    API.
    """
    mined_data = {}
    num_results = 1

    t0 = time.time()
    while num_results > 0:
        print("\n\nRequesting more data, offset = " + str(payload["offset"]) + "\n")
        data = requests.get(get_qs_url(search_url, payload), headers=headers)
        for k, v in data.json().items():
            print("Retrieved " + k + " data.")
            if k == "businesses":
                num_results = len(v)
                print("Retrieving data for " + str(len(v)) + " businesses.")
                for biz in v:
                    print("Retrieving " + biz["name"] + " data...")
                    # get detailed info about each business, extract hours
                    info_dict = {}
                    info_dict["name"] = biz.get("name")
                    info_dict["yelp_id"] = biz.get("id")
                    info_dict["location"] = biz.get("location")
                    info_dict["latitude"] = biz.get("coordinates").get("latitude")
                    info_dict["longitude"] = biz.get("coordinates").get("longitude")
                    info_dict["image_url"] = biz.get("image_url")
                    info_dict["display_phone"] = biz.get("display_phone")
                    biz_url = details_url + biz.get("id")
                    biz_details = requests.get(biz_url, headers=headers)
                    if "hours" in biz_details.json().keys():
                        info_dict["hours"] = biz_details.json()["hours"]
                    mined_data[biz["id"]] = info_dict
            else:
                print(v)
        payload["offset"] += 50

    # with open("mined_raw_data.txt", "w") as file:
    # file.write(json.dumps(mined_data))

    # Following lines are for timing the scrape
    t1 = time.time()
    total_time = t1 - t0
    print("\n\n")
    print(str(len(mined_data.keys())) + " businesses identified.")
    print("Data written to mined_raw_data.txt.")
    print(
        "Scraping took "
        + str(int(total_time / 60))
        + "m"
        + str(int(total_time % 60))
        + "s."
    )
    print("\n\n")
    # End timing code
    return mined_data
