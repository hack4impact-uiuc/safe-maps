# Open Business Endpoint Documentation

### Endpoint

    GET /open_businesses

**Description**

Gets a list of businesses that are open at the time specified in the querystring.

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| time  | int | **Required** | #### (time as 4 digit 24hr time, eg. 1430 = 2:30pm)
| day  | int | **Required** | # (integer 0-6, where 0 is Monday)

**Response**

    {
        "message": "Success",
        "result": {
            "businesses": [
                {
                    "_id": "5bd63a71ed396d1d5b198f8b",
                    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/5tn-zU6PGPvbZoXnPi4Ahw/o.jpg",
                    "location": {
                        "address1": "1209 W Oregon St",
                        "city": "Urbana",
                        "country": "US",
                        "state": "IL",
                        "zip_code": "61801"
                    },
                    "name": "The Red Herring Vegetarian Restaurant",
                    "open_hours": [
                        {
                            "day": 0,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        }
                    ],
                    "yelp_id": "kKCwp86xU9XKRnAALQDhrw"
                }
            ]
        },
        "success": true
    }

### Endpoint

    GET /businesses

**Description**

GET function for retrieving Business objects

**Response**

    {
        "message": "Success",
        "result": {
            "businesses": [
                {
                    "_id": "5bd63a71ed396d1d5b198f8b",
                    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/5tn-zU6PGPvbZoXnPi4Ahw/o.jpg",
                    "location": {
                        "address1": "1209 W Oregon St",
                        "city": "Urbana",
                        "country": "US",
                        "state": "IL",
                        "zip_code": "61801"
                    },
                    "name": "The Red Herring Vegetarian Restaurant",
                    "open_hours": [
                        {
                            "day": 0,
                            "end": "1430",
                            "is_overnight": false,
                            "start": "1100"
                        }
                    ],
                    "yelp_id": "kKCwp86xU9XKRnAALQDhrw"
                }
            ]
        },
        "success": true
    }

### Endpoint

    POST /businesses

**Description**

POST function for posting a hard-coded Business object for testing purposes

**Response**

### Endpoint

    POST /scrape_businesses

**Description**

POST function which scrapes data from business_scrape() method in
open_businesses.py scraper and stores them in the businesses db collection. Should be run maybe once a month.

**Response**