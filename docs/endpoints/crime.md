# Crime Endpoint Documentation

### Endpoint

    GET /crimes

**Description**

GET function for retrieving Crime objects

**Response**

    {
        "message": "",
        "result": {
            "crimes": [
                {
                    "_id": "5bc916d53d336f0592ef45fa",
                    "address_1": "Outside Shreyas's apartment",
                    "city": "Champaign",
                    "day_of_week": "Monday",
                    "hour_of_day": 23,
                    "incident_datetime": "10/18/2018, 18:27:09",
                    "incident_description": "Self explanatory",
                    "incident_id": "1",
                    "incident_type_primary": "Peeing in public",
                    "latitude": 100.1,
                    "longitude": 200.2,
                    "parent_incident_type": "Disturbing the peace",
                    "state": "IL"
                }
            ]
        },
        "success": true
    }

### Endpoint

    POST /crimes

**Description**

POST function for posting a hard-coded Crime object for testing purposes

**Response**

### Endpoint

    POST /scrape_crimes

**Description**

POST function which scrapes data from crime_scrape() method in crimes.py scraper and stores them in the crimes db collection. This should probably be run every day, or every hour at night.

**Response**