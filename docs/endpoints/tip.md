# Tip Endpoint Documentation
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

    GET /tips/verified

**Description**

GET function for retrieving all tips objects that are verified

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

    PUT /tips/<id>/verify

**Description**

PUT function for changing the tip's verified status

Takes in a query parameter "verified" which must be either "True" or "False"

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
