phones = [
    {"id": 6, "latitude": 40.1011685523957, "longitude": -88.2200390954902},
    {"id": 7, "latitude": 40.0963186128832, "longitude": -88.2255865263258},
    {"id": 8, "latitude": 40.1153308841568, "longitude": -88.223901994968},
]


def get_phones():
    return phones


bad_data = [
    {"id": 6, "longitude": -88.2200390954902},
    {"id": 7, "latitude": 40.0963186128832, "longitude": -88.2255865263258},
    {"id": 8, "latitude": 40.1153308841568, "longitude": -88.223901994968},
]


def get_bad_data():
    return bad_data
