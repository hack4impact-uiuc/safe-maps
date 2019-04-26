export async function addressToLatLong(address) {
  api_latlong =
    "http://www.mapquestapi.com/geocoding/v1/address?key=6lJsB5kKwRsYYkkjhk4AXkPFn2DhGCiy&maxResults=5&outFormat=json&location=" +
    address +
    "&boundingBox=40.121581,-88.253981,40.098315,-88.205082";

  const response = await fetch(api_latlong, {});
  const responseJson = await response.json();

  lat = responseJson["results"][0]["locations"][0]["latLng"]["lat"];
  lng = responseJson["results"][0]["locations"][0]["latLng"]["lng"];
  return [lat, lng];
}

export async function latlongToAddress(lat, long) {
  api_address =
    "http://www.mapquestapi.com/geocoding/v1/reverse?key=6lJsB5kKwRsYYkkjhk4AXkPFn2DhGCiy&location=" +
    lat +
    "," +
    long +
    "&includeRoadMetadata=false&includeNearestIntersection=false" +
    "&boundingBox=40.121581,-88.253981,40.098315,-88.205082";

  const response = await fetch(api_address, {});
  const responseJson = await response.json();

  street_address = responseJson["results"][0]["locations"][0]["street"];
  city = responseJson["results"][0]["locations"][0]["adminArea5"];
  state = responseJson["results"][0]["locations"][0]["adminArea3"];
  country = responseJson["results"][0]["locations"][0]["adminArea1"];
  postal_code = responseJson["results"][0]["locations"][0][
    "postalCode"
  ].substring(0, 5);
  full_address =
    street_address +
    " " +
    city +
    " " +
    state +
    " " +
    country +
    " " +
    postal_code;
  return full_address;
}
