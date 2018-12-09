import pytest
from api.models.BusStop import BusStop
from tests.bus_test_data import get_buses
from api.views.busStop import save_stop_to_db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client


def test_delete(client):
    """
    Tests delete endpoint.
    """
    rs = client.delete("/bus-stops")
    collection = BusStop.objects()
    assert len(collection) == 0
    assert rs.status_code == 200


def test_update(client):
    """
    Tests update endpoint.
    """
    # rs = client.post("/bus-stops")
    # collection = BusStop.objects()
    # assert len(collection) > 0
    # assert rs.status_code == 200


def insert_test_data(client):
    """
    Puts test data in the db
    """
    bus = get_buses()
    for bus_dict in bus:
        save_stop_to_db(bus_dict)

    collection = BusStop.objects()
    assert len(collection) == 2


def test_get_basic(client):
    """
    Tests get endpoint (all stops)
    """
    client.delete("/bus-stops")
    insert_test_data(client)
    rs = client.get("/bus-stops")
    collection = rs.json["result"]["busStops"]
    assert len(collection) == 2
