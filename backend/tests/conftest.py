# conftest.py is used by pytest to share fixtures
# https://docs.pytest.org/en/latest/fixture.html#conftest-py-sharing-fixture-functions
import pytest
from api import create_app


@pytest.fixture(scope="session")
def client():
    config_dict = {
        "DEBUG": True,
        "MONGO_TEST_URI": "mongodb://megha:megha9000@ds217864.mlab.com:17864/meghalab",
        "MONGO_TEST_DB": "meghalab",
    }
    app = create_app(config_dict)
    app.app_context().push()
    client = app.test_client()

    yield client
