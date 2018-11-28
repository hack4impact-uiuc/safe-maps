# from api.models import  Person
import pytest
from api.models.EmergencyPhone import EmergencyPhone

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_phone(client):
    rs = client.get("/emergency-phones")
    print(rs.json)
    assert rs.status_code == 200


def test_basic():
    assert True
