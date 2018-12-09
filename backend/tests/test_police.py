import pytest
from api.models.PoliceStation import PoliceStation
from tests.police_test_data import get_stations
from api.views.policeStations import save_station

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client


def test_delete(client):
    """
    Tests delete endpoint.
    """
    rs = client.delete("/police-stations")
    collection = PoliceStation.objects()
    assert len(collection) == 0
    assert rs.status_code == 200


def test_update(client):
    """
    Tests update endpoint.
    """
    rs = client.post("/police-stations")
    collection = PoliceStation.objects()
    assert len(collection) > 0
    assert rs.status_code == 200


def insert_test_data(client):
    """
    Puts test data in the db
    """
    stations = get_stations()
    for station_dict in stations:
        save_station(station_dict)

    collection = PoliceStation.objects()
    assert len(collection) == 4


def test_get_basic(client):
    """
    Tests get endpoint (all stations)
    """
    client.delete("/police-stations")
    insert_test_data(client)
    rs = client.get("/police-stations")
    collection = rs.json["result"]["policeStations"]
    assert len(collection) == 4
