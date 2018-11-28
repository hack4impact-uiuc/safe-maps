import os
import logging

from flask import Flask, request
from flask_cors import CORS

from api.config import config
from api.core import get_mongo_credentials
from mongoengine import connect
from api.core import all_exception_handler
import api.models


class RequestFormatter(logging.Formatter):
    def format(self, record):
        record.url = request.url
        record.remote_addr = request.remote_addr
        return super().format(record)


def create_app(test_config=None):
    app = Flask(__name__)

    CORS(app)  # add CORS

    (db_name, mongo_url) = get_mongo_credentials()
    if test_config:
        if test_config.get("MONGO_TEST_URI"):
            mongo_url = test_config["MONGO_TEST_URI"]
            db_name = test_config["MONGO_TEST_DB"]
    connect(db_name, host=mongo_url)

    # check environment variables to see which config to load
    env = os.environ.get("FLASK_ENV", "dev")
    if test_config:
        # ignore environment variable config if config was given
        app.config.from_mapping(**test_config)
    else:
        app.config.from_object(config[env])

    # logging
    formatter = RequestFormatter(
        "%(asctime)s %(remote_addr)s: requested %(url)s: %(levelname)s in [%(module)s: %(lineno)d]: %(message)s"
    )
    if app.config.get("LOG_FILE"):
        fh = logging.FileHandler(app.config.get("LOG_FILE"))
        fh.setLevel(logging.DEBUG)
        fh.setFormatter(formatter)
        app.logger.addHandler(fh)

    strm = logging.StreamHandler()
    strm.setLevel(logging.DEBUG)
    strm.setFormatter(formatter)

    app.logger.addHandler(strm)
    app.logger.setLevel(logging.DEBUG)

    # import and register blueprints
    from api.views import (
        main,
        business,
        crime,
        streetlight,
        emergencyPhone,
        busStop,
        policeStations,
    )

    app.register_blueprint(main.main)
    app.register_blueprint(business.business)
    app.register_blueprint(crime.crime)
    app.register_blueprint(streetlight.streetlight)
    app.register_blueprint(emergencyPhone.emergencyPhone)
    app.register_blueprint(busStop.busStop)
    app.register_blueprint(policeStations.policeStation)
    # register error Handler
    app.register_error_handler(Exception, all_exception_handler)

    return app
