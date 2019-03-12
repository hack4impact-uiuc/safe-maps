# Streetlight Endpoint Documentation

### Endpoint

    GET /streetlights

**Description**

GET function for retrieving Streetlight objects

**Response**

    {
        "message": "",
        "result": {
            "streetlights": [
                {
                    "_id": "5bd280ab3d336f02d2b06a18",
                    "latitude": 200.2,
                    "longitude": 300.3,
                    "streetlight_id": 0
                }
            ]
        },
        "success": true
    }

### Endpoint

    POST /streetlights

**Description**

POST function for posting a hard-coded Streetlight object for testing purposes

**Response**