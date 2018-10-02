import os


class Config:
    SECRET_KEY = "testkey"
    LOG_FILE = "api.log"


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = {"dev": DevelopmentConfig, "prod": ProductionConfig}
