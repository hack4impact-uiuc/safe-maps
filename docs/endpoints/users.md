### Endpoint

    GET /users

**Description**

GET function for retrieving all user objects

**Response**

{
    "message": "",
		"result": {
			"users": [
				{
          "_id": "5bd280ab3d336f02d2b06a18",
          "net_id": "alicesf2",
          "username": "alslice",
          "verified": false,
    			"anon": true,
    			"karma": 0,
    			"posted_tips" : [
        			"5c85688964804c00031c4e21",
        			"5c85688964804c00031c4e21",
        			"5c85688964804c00031c4e21"
    			],
    			"date_created": 2019-02-24 14:04:57.156
        },
				{
            		"_id": "5bd280ab3d336f02d2b06a19",
            		"net_id": "alicesf3",
            		"username": "alslice2",
            		"verified": false,
	    			"anon": true,
	    			"karma": 0,
	    			"posted_tips" : [
	        			"5c85688964804c00031c4e21",
	        			"5c85688964804c00031c4e21",
	        			"5c85688964804c00031c4e21"
	    			],
	    			"date_created": "2019-02-24 14:04:57.156"
				}
			]
    },
    "success": true
}

### Endpoint

    GET /users/<id>

**Description**

GET function for retrieving a single user object

**Response**

    {
        "message": "",
		"result": {
			"user": {
            	"_id": "5bd280ab3d336f02d2b06a18",
            	"net_id": "alicesf2",
            	"username": "alslice",
            	"verified": false,
	    		"anon": true,
	    		"karma": 0,
	    		"posted_tips" : [
	        		"5c85688964804c00031c4e21",
	        		"5c85688964804c00031c4e21",
	        		"5c85688964804c00031c4e21"
	    		],
	    		"date_created": "2019-02-24 14:04:57.156"
        	}
		},
        "success": true
    }

### Endpoint

    POST /users

**Description**

POST function for creating a new user object

**Response**

    {
      "message": "success!",
      "result": null,
      "success": true
    }

### Endpoint

    PUT /users/<id>

**Description**

PUT function for updating an existing user object

**Response**

    {
      "message": "success!",
      "result": null,
      "success": true
    }

### Endpoint

    DELETE /users/<id>

**Description**

DELETE function for deleting an existing user object

**Response**

    {
      "message": "success!",
      "result": null,
      "success": true
    }
