import React, { Component } from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import { Location, Permissions } from "expo";

import MapView, { Marker, ProviderPropType } from "react-native-maps";
import Navigation from "../components/NavigationComponents/Navigation";
import Colors from "../constants/Colors";

import API from "../components/API";
import Loader from "../components/Loader";

import CurrentLocationButton from "../components/NavigationComponents/CurrentLocationButton";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.017;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;
let newLine = "\n\n";

const icons = {
  busStop: require("../assets/images/bus.png"),
  crime: require("../assets/images/crime.png"),
  business: require("../assets/images/business.png"),
  emergency: require("../assets/images/phone.png"),
  policeStations: require("../assets/images/police.png"),
  streetLights: require("../assets/images/streetlights.png")
};

class LiveLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      markers: [],
      renderData: {
        busStop: false,
        crime: false,
        business: false,
        emergency: false
      },
      layerData: {},
      loading: true,
      colorData: {},
      markerClicked: false,
      markerTitle: "",
      markerDescrption: "",
      locationResult: null
    };
  }

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
  }

  async componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      error => console.log({ error: error.message })
    );

    this.watchID = await navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      error => console.log({ error: error.message })
    );

    for (var layer in this.state.layerData) {
      this.renderMarkers(
        layer,
        this.state.layerData[layer],
        this.state.colorData[layer]
      );
    }

    if (AsyncStorage.getAllKeys().length != 4) {
      let busStopData = await API.getBusStops();
      let crimeData = await API.getCrimes();
      let businessData = await API.getBusinesses();
      let emergencyData = await API.getEmergencyPhones();
      let policeStations = await API.getPoliceStations();
      let streetLights = await API.getStreetLight();

      await AsyncStorage.setItem("busStop", JSON.stringify(busStopData));
      await AsyncStorage.setItem("crimeData", JSON.stringify(crimeData));
      await AsyncStorage.setItem("businessData", JSON.stringify(businessData));
      await AsyncStorage.setItem(
        "emergencyData",
        JSON.stringify(emergencyData)
      );
      await AsyncStorage.setItem(
        "policeStations",
        JSON.stringify(policeStations)
      );
      await AsyncStorage.setItem("streetLights", JSON.stringify(streetLights));
    }

    this.setState({
      layerData: {
        busStop: JSON.parse(await AsyncStorage.getItem("busStop")),
        crime: JSON.parse(await AsyncStorage.getItem("crimeData")),
        business: JSON.parse(await AsyncStorage.getItem("businessData")),
        emergency: JSON.parse(await AsyncStorage.getItem("emergencyData")),
        policeStations: JSON.parse(
          await AsyncStorage.getItem("policeStations")
        ),
        streetLights: JSON.parse(await AsyncStorage.getItem("streetLights"))
      },
      colorData: {
        busStop: Colors.busStop,
        crime: Colors.crime,
        business: Colors.business,
        emergency: Colors.emergency,
        policeStations: Colors.police,
        streetLights: Colors.streetlights
      },
      loading: false
    });

    this.getLocationAsync();
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getDistance(lat1, lon1, lat2, lon2) {
    let earthRadius = 6371;
    let deltaLat = this.toRad(lat2 - lat1);
    let deltaLong = this.toRad(lon2 - lon1);
    let currentLat = this.toRad(lat1);
    let finalLat = this.toRad(lat2);

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

  toRad(value) {
    return (value * Math.PI) / 180;
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ statusBarHeight: 5 });
    }, 500);
  }

  renderMarkers(layer, data, markerColor) {
    data = this.state.layerData[layer];
    let list = this.state.markers;
    for (i = 0; i < data.length; i++) {
      if (markerColor === this.state.colorData.busStop) {
        buses = "";
        for (let key in data[i].routes) {
          if (key == data[i].routes[data[i].routes.length - 1]) {
            buses = buses + key + ".";
          } else {
            buses = buses + key + ", ";
          }
        }
        title = data[i].stop_name;
        description = "Buses come to this stop: " + buses;
      } else if (markerColor === this.state.colorData.emergency) {
        distance = this.getDistance(
          data[i].latitude,
          data[i].longitude,
          this.state.mapRegion.latitude,
          this.state.mapRegion.longitude
        );
        title = distance + " miles away";
        description = "Emergency Phone #" + data[i].emergencyPhone_id;
      } else if (markerColor === this.state.colorData.crime) {
        distance = this.getDistance(
          data[i].latitude,
          data[i].longitude,
          this.state.mapRegion.latitude,
          this.state.mapRegion.longitude
        );
        title = data[i].incident_type_primary;
        description =
          data[i].incident_datetime +
          "\n" +
          distance +
          " miles away \n" +
          data[i].incident_description;
      } else if (markerColor === this.state.colorData.business) {
        address = "";
        for (let key in data[i].location) {
          if (
            data[i].location[key] ==
            data[i].location[data[i].location.length - 1]
          ) {
            address = address + data[i].location[key] + ".";
          } else {
            address = address + data[i].location[key] + ", ";
          }
        }
        title = data[i].name;
        description = "Address: " + address;
      } else if (markerColor === this.state.colorData.policeStations) {
        title = data[i].name;
        description = data[i].name + " is located here";
      } else if (markerColor === this.state.colorData.streetLights) {
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
    this.setState({
      markers: list
    });
  }

  markerClick = (title, description) => {
    this.setState({
      markerClicked: true,
      markerTitle: title,
      markerDescrption: description
    });
  };

  changeMarkerToFalse = () => {
    this.setState({
      markerClicked: false
    });
  };

  _onPressToggleLayers = layer => {
    if (this.state.renderData[layer]) {
      this.setState({
        markers: this.state.markers.filter(
          marker => marker["color"] !== this.state.colorData[layer]
        )
      });
      this.state.renderData[layer] = false;
    } else {
      this.renderMarkers(
        layer,
        this.state.layerData[layer],
        this.state.colorData[layer]
      );
      this.state.renderData[layer] = true;
    }
  };

  backToUser = () => {
    this.setState({
      mapRegion: this.state.locationResult
    });
  };

  onRegionChangeRender = region => {
    this.state.mapRegion = region;
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let locationTwo = {
      latitude: location.coords.latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitude: location.coords.longitude,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.setState({ locationResult: locationTwo });
  };

  render() {
    if (this.state.loading) {
      return <Loader loading={this.state.loading} />;
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          showsMyLocationButton={true}
          onRegionChange={this.onRegionChangeRender}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
              image={marker.image}
              title={marker.title}
              description={marker.description}
              onPress={() => {
                this.markerClick(marker.title, marker.description);
              }}
            >
              <MapView.Callout tooltip={true} />
            </Marker>
          ))}
        </MapView>
        <View style={styles.zoom}>
          <CurrentLocationButton changeLocation={this.backToUser} />
        </View>

        <Navigation
          ref="panel"
          description={this.state.markerClicked}
          descriptionTitle={this.state.markerTitle}
          descriptionContent={this.state.markerDescrption}
          onDescExit={this.changeMarkerToFalse}
          toggleLayers={this._onPressToggleLayers}
          layers={this.state.renderData}
        />
      </View>
    );
  }
}

LiveLocation.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  zoom: {
    position: "absolute",
    top: "5%",
    alignSelf: "flex-end"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default LiveLocation;
