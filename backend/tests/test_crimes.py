import pytest
from api.models.Crime import Crime
from tests.crime_test_data import get_crimes
from api.views.crime import save_crime_to_db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client


def test_delete(client):
    """
    Tests delete endpoint.
    """
    rs = client.delete("/crimes")
    collection = Crime.objects()
    assert len(collection) == 0
    assert rs.status_code == 200


def test_update(client):
    """
    Tests update endpoint.
    """
    rs = client.post("/crimes")
    collection = Crime.objects()
    assert len(collection) > 0
    assert rs.status_code == 200


def insert_test_data(client):
    """
    Puts test data in the db
    """
    crimes = get_crimes()
    for crime_dict in crimes:
        save_crime_to_db(crime_dict)

    collection = Crime.objects()
    assert len(collection) == 3


def test_get_basic(client):
    """
    Tests get endpoint (all crimes)
    """
    client.delete("/crimes")
    insert_test_data(client)
    rs = client.get("/crimes")
    collection = rs.json["result"]["crimes"]
    assert len(collection) == 3
