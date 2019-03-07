let id = 0;

const icons = {
  busStop: require("../assets/images/bus.png"),
  crime: require("../assets/images/crime.png"),
  business: require("../assets/images/business.png"),
  emergency: require("../assets/images/phone.png"),
  policeStations: require("../assets/images/police.png"),
  streetLights: require("../assets/images/streetlights.png")
};

export default (renderLayerMarkers = (
  layer,
  data,
  markerColor,
  layerData,
  colorData,
  markers,
  mapRegion
) => {
  data = layerData[layer];
  let list = markers === undefined ? [] : markers;
  for (let i = 0; i < data.length; i++) {
    if (markerColor === colorData.busStop) {
      buses = "";
      for (let key in data[i].routes) {
        if (key === data[i].routes[data[i].routes.length - 1]) {
          buses = buses + key + ".";
        } else {
          buses = buses + key + ", ";
        }
      }
      title = data[i].stop_name;
      description = "Buses come to this stop: " + buses;
    } else if (markerColor === colorData.emergency) {
      distance = getDistance(
        data[i].latitude,
        data[i].longitude,
        mapRegion.latitude,
        mapRegion.longitude
      );
      title = distance + " miles away";
      description = "Emergency Phone #" + data[i].emergencyPhone_id;
    } else if (markerColor === colorData.crime) {
      distance = getDistance(
        data[i].latitude,
        data[i].longitude,
        mapRegion.latitude,
        mapRegion.longitude
      );
      title = data[i].incident_type_primary;
      description =
        data[i].incident_datetime +
        "\n" +
        distance +
        " miles away \n" +
        data[i].incident_description;
    } else if (markerColor === colorData.business) {
      address = "";
      for (let key in data[i].location) {
        if (
          data[i].location[key] == data[i].location[data[i].location.length - 1]
        ) {
          address = address + data[i].location[key] + ".";
        } else {
          address = address + data[i].location[key] + ", ";
        }
      }
      title = data[i].name;
      description = "Address: " + address;
    } else if (markerColor === colorData.policeStations) {
      title = data[i].name;
      description = data[i].name + " is located here";
    } else if (markerColor === colorData.streetLights) {
      title = "Streetlight";
      description = "";
    } else {
      title = "Title";
      description = "Description";
    }
    list.push({
      coordinate: {
        latitude: data[i].latitude,
        longitude: data[i].longitude
      },
      key: id++,
      color: markerColor,
      image: icons[layer],
      title: title,
      description: description
    });
  }
  // (console.log("here is list",list))
  return list;
});

function getDistance(lat1, lon1, lat2, lon2) {
  let earthRadius = 6371;
  let deltaLat = toRad(lat2 - lat1);
  let deltaLong = toRad(lon2 - lon1);
  let currentLat = toRad(lat1);
  let finalLat = toRad(lat2);

  let pythag =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.sin(deltaLong / 2) *
      Math.sin(deltaLong / 2) *
      Math.cos(currentLat) *
      Math.cos(finalLat);
  let deriv = 2 * Math.atan2(Math.sqrt(pythag), Math.sqrt(1 - pythag));
  let mult = earthRadius * deriv;
  kmToMiles = mult / 1.6;
  return Math.round(kmToMiles * 100) / 100;
}
function toRad(value) {
  return (value * Math.PI) / 180;
}
