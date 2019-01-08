import pytest
from api.models.Streetlight import Streetlight
from tests.streetlight_test_data import get_streetlights
from api.views.streetlight import save_streetlight_to_db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client


def test_delete(client):
    """
    Tests delete endpoint.
    """
    rs = client.delete("/streetlights")
    collection = Streetlight.objects()
    assert len(collection) == 0
    assert rs.status_code == 200


def test_update(client):
    """
    Tests update endpoint.
    """
    rs = client.post("/streetlights")
    collection = Streetlight.objects()
    assert len(collection) > 0
    assert rs.status_code == 200


def insert_test_data(client):
    """
    Puts test data in the db
    """
    streetlights = get_streetlights()
    for streetlight_dict in streetlights:
        save_streetlight_to_db(streetlight_dict)
    collection = Streetlight.objects()
    assert len(collection) == 5


def test_get_basic(client):
    """
    Tests get endpoint (all crimes)
    """
    client.delete("/streetlights")
    insert_test_data(client)
    rs = client.get("/streetlights")
    collection = rs.json["result"]["streetlights"]
    assert len(collection) == 5
