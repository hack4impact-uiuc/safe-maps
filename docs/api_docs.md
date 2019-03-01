# C2TC Fall 2018 Backend Design

## Schema Design

**BUSINESS**

|   name  |   yelp_id  |   location  |   image_url  |   display_phone  |   open_hours  |
|:-:|:-:|:-:|:-:|:-:|:-:|

**BUSSTOP**

|   stop_id  |   stop_name  |   latitude  |   longitude  |   routes  |
|:-:|:-:|:-:|:-:|:-:|

**CRIME**

|   incident_id  |   incident_datetime  |   incident_type_primary  |   incident_description  |   address_1  |   city  |   state  |   latitude  |   longitude  |   hour_of_day  |   day_of_week  |   parent_incident_type    |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|

**EMERGENCY PHONE**

|   emergencyPhone_id  |   latitude  |   longitude  |
|:-:|:-:|:-:|

**STREETLIGHT**

|   streetlight_id  |   latitude  |   longitude  |
|:-:|:-:|:-:|

**TIP**

|   title  |   content  |   author  |   posted_time  |   latitude  |   longitude  |  category  |  upvotes  |  downvotes  |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|


## Endpoints Documentation

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

### Endpoint

    GET /tips

**Description**

GET function for retrieving all tips objects

**Response**

### Endpoint

    GET /tips/<user_id>

**Description**

GET function for retrieving all tips objects posted by a certain user

**Response**

### Endpoint

    GET /tips_category/<category>

**Description**

GET function for retrieving all tips objects in a certain category

**Response**


### Endpoint

    GET /tips_upvotes/<user_id>

**Description**

GET function for retrieving all tips objects upvoted by a certain user

**Response**

### Endpoint

    GET /tips_downvotes/<user_id>

**Description**

GET function for retrieving all tips objects downvoted by a certain user

**Response**

### Endpoint

    POST /tips

**Description**

POST function for a user to create a new tip  

The parameters are passed in as a JSON:  
```
{
	"title": "be there or be squared 2",
	"content": "make sure to be there",
	"user_id": "5c6cd199fa676f00aec97ff2",
	"latitude": 0,
	"longitude": 0,
	"category": "test"
}
```

**Response**

### Endpoint

    PUT /tips/<tips_id>

**Description**

PUT function for a user to edit a tip that they already posted  

The parameters are passed in as a JSON:
```
{
	"title": "be there or be squared 2",
	"content": "make sure to be there",
	"latitude": 0,
	"longitude": 0,
	"category": "test"
}
```

**Response**

### Endpoint

    PUT /tips_upvotes

**Description**

PUT function for a user to change their upvote or downvote on a post  

The parameter are passed in as a JSON:
```
{
    "tips_id": "5c6f6cc7fa676f0336bb4a8b"
    "user_id": "5c6cd199fa676f00aec97ff2"
    "vote_type": "UPVOTE"
}
```  
"vote_type" can be either UPVOTE or DOWNVOTE

**Response**


### Endpoint

    DELETE /tips/<tips_id>

**Description**

DELETE function to delete a specific tip object

**Response**

### Endpoint

    DELETE /tips

**Description**

DELETE function to delete all tips objects

**Response**
