import requests
import json

url = "https://gisweb.champaignil.gov/cb/rest/services/Open_Data/Open_Data/MapServer/34/query?where=1%3D1&outFields=*&outSR=4326&f=json"


def streetlight_scrape():
    """
    This method produces a dictionary containing streetlight data from the City of Champaign Streetlights API.
    """
    mined_data = {}
    data = requests.get(url)

    for s in data.json()["features"]:
        insertion = {}
        insertion["id"] = s["attributes"]["OBJECTID"]
        insertion["latitude"] = s.get("geometry").get("y")
        insertion["longitude"] = s.get("geometry").get("x")
        mined_data[insertion["id"]] = insertion

    return mined_data
