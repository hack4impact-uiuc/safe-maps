# Emergency Phone Endpoint Documentation
### Endpoint

    GET /emergencyPhones

**Description**

GET function for retrieving EmergencyPhone objects

**Response**

    {
        "message": "",
        "result": {
            "emergencyPhones": [
                {
                    "_id": "5bd634afed396d1a9001053c",
                    "emergencyPhone_id": 0,
                    "latitude": 40.0957696644812,
                    "longitude": -88.2405983758263
                }
            ]
        },
        "success": true
    }

### Endpoint

    POST /emergencyPhones

**Description**

POST function for posting a hard-coded EmergencyPhone object for testing purposes

**Response**

### Endpoint

    POST /scrape_phones

**Description**

POST function which calls get_phones() from the emergency_phones.py scraper and stores phone data to the database. This data is hardcoded and will probably never change, so this endpoint only needs to be called if the db is reset or the collection is lost.

**Response**