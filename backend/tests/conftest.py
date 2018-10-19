# conftest.py is used by pytest to share fixtures
# https://docs.pytest.org/en/latest/fixture.html#conftest-py-sharing-fixture-functions
import pytest
from api import create_app


@pytest.fixture(scope="session")
def client():
    config_dict = {"DEBUG": True}
    app = create_app(config_dict)
    app.app_context().push()

    # for test client api reference
    # http://flask.pocoo.org/docs/1.0/api/#test-client
    client = app.test_client()
    yield client

    # remove the file
