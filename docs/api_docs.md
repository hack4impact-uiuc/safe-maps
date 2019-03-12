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

|   title  |   content  |   author  |   posted_time  |   latitude  |   longitude  |  category  |  upvotes  |  downvotes  |  verified  |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|


## Endpoints Documentation

### Map Filters
* [Bus Stop Endpoints](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/endpoints/bus_stop.md)

* [Business Endpoints](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/endpoints/business.md)

* [Crime Endpoints](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/endpoints/crime.md)

* [Emergency Phone Endpoints](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/endpoints/emergency_phone.md)

* [Streetlight Endpoints](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/endpoints/streetlight.md)

### Location Based Tips
* [Tip Endpoints](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/endpoints/tip.md)
