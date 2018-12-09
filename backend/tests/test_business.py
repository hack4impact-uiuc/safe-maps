# from api.models import  Person
import pytest
from api.models.Business import Business
from tests.business_test_data import get_businesses
from api.views.business import save_business_to_db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client


def test_delete(client):
    """
    Tests delete endpoint.
    """
    rs = client.delete("/businesses")
    collection = Business.objects()
    assert len(collection) == 0
    assert rs.status_code == 200


def test_update(client):
    """
    Tests update endpoint.
    """
    # rs = client.post("/businesses")
    # collection = Business.objects()
    # assert len(collection) > 0
    # assert rs.status_code == 200


def insert_test_data(client):
    """
    Puts test data in the db
    """
    businesses = get_businesses()
    for business_dict in businesses:
        save_business_to_db(business_dict)

    collection = Business.objects()
    assert len(collection) == 12


def test_get_basic(client):
    """
    Tests get endpoint (all businesses)
    """
    client.delete("/businesses")
    insert_test_data(client)
    rs = client.get("/businesses")
    collection = rs.json["result"]["businesses"]
    assert len(collection) == 12


def test_get_weekday_afternoon(client):
    """
    Tests get endpoint (Tuesday 3:43pm)
    """
    client.delete("/businesses")
    insert_test_data(client)
    params = {"day": "1", "time": "1543"}
    rs = client.get("/businesses", query_string=params)
    # print(rs)
    print(rs.json)
    collection = rs.json["result"]["businesses"]
    print(collection)
    assert len(collection) == 9


def test_get_weekday_morning(client):
    """
    Tests get endpoint (Wednesday 10:00am)
    """
    client.delete("/businesses")
    insert_test_data(client)
    rs = client.get("/businesses?day=2&time=1000")
    collection = rs.json["result"]["businesses"]
    assert len(collection) == 4


def test_get_weekend_earlymorning(client):
    """
    Tests get endpoint (Saturday 12:30am)
    """
    client.delete("/businesses")
    insert_test_data(client)
    rs = client.get("/businesses?day=5&time=0030")
    collection = rs.json["result"]["businesses"]
    assert len(collection) == 2


def test_get_weekday_earlymorning(client):
    """
    Tests get endpoint (Thursday 3:12am)
    """
    client.delete("/businesses")
    insert_test_data(client)
    rs = client.get("/businesses?day=3&time=0312")
    collection = rs.json["result"]["businesses"]
    # print(rs.json)
    assert len(collection) == 1
