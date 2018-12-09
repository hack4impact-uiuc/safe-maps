import pytest
from api.models.EmergencyPhone import EmergencyPhone
from tests.phone_test_data import get_phones, get_bad_data
from api.views.emergencyPhone import save_phone_to_db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client


def test_delete(client):
    """
    Tests delete endpoint.
    """
    rs = client.delete("/emergency-phones")
    collection = EmergencyPhone.objects()
    assert len(collection) == 0
    assert rs.status_code == 200


def test_update(client):
    """
    Tests update endpoint.
    """
    rs = client.post("/emergency-phones")
    collection = EmergencyPhone.objects()
    assert len(collection) > 0
    assert rs.status_code == 200


def insert_test_data(client):
    """
    Puts test data in the db
    """
    phones = get_phones()
    for phone_dict in phones:
        save_phone_to_db(phone_dict)

    collection = EmergencyPhone.objects()
    assert len(collection) == 3


def test_get_basic(client):
    """
    Tests get endpoint (all phones)
    """
    client.delete("/emergency-phones")
    insert_test_data(client)
    rs = client.get("/emergency-phones")
    collection = rs.json["result"]["emergencyPhones"]
    assert len(collection) == 3
