# Bus Stop Endpoint Documentation
### Endpoint

    GET /busStops

**Description**

GET function for retrieving BusStop objects

**Response**

    {
        "message": "Success",
        "result": {
            "busStops": [
                {
                    "_id": "5bd64156ed396d1ee50955c3",
                    "latitude": 40.114512,
                    "longitude": -88.180673,
                    "routes": {
                        "6": "000000"
                    },
                    "stop_id": "150DALE:1",
                    "stop_name": "U.S. 150 & Dale (NE Corner)"
                }
            ]
        },
        "success": true
    }

### Endpoint

    POST /busStops

**Description**

POST function for posting a hard-coded BusStop object for testing purposes

**Response**

### Endpoint

    POST /scrape_stops

**Description**

POST function which scrapes data from scrape() method in bus_stops.py scraper and stores them in the busStops db collection. Should be run probably once a month or so, because bus routes only change once or twice a year.

**Response**
