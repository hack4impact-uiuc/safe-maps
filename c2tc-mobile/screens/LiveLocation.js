import React, { Component } from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";

import MapView, { Marker, ProviderPropType } from "react-native-maps";
import Navigation from "../components/NavigationComponents/Navigation";
import Colors from "../constants/Colors";

import API from "../components/API";
import Loader from "../components/Loader";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;

const icons = {
  busStop: require("../assets/images/bus.png"),
  crime: require("../assets/images/crime.png"),
  business: require("../assets/images/business.png"),
  emergency: require("../assets/images/phone.png")
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
      colorData: {}
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

      await AsyncStorage.setItem("busStop", JSON.stringify(busStopData));
      await AsyncStorage.setItem("crimeData", JSON.stringify(crimeData));
      await AsyncStorage.setItem("businessData", JSON.stringify(businessData));
      await AsyncStorage.setItem(
        "emergencyData",
        JSON.stringify(emergencyData)
      );
    }

    this.setState({
      layerData: {
        busStop: JSON.parse(await AsyncStorage.getItem("busStop")),
        crime: JSON.parse(await AsyncStorage.getItem("crimeData")),
        business: JSON.parse(await AsyncStorage.getItem("businessData")),
        emergency: JSON.parse(await AsyncStorage.getItem("emergencyData"))
      },
      colorData: {
        busStop: Colors.busStop,
        crime: Colors.crime,
        business: Colors.business,
        emergency: Colors.emergency
      },
      loading: false
    });
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

  renderMarkers(layer, data, markerColor) {
    data = this.state.layerData[layer];
    var list = this.state.markers;
    for (i = 0; i < data.length; i++) {
      list.push({
        coordinate: {
          latitude: data[i].latitude,
          longitude: data[i].longitude
        },
        key: id++,
        color: markerColor,
        image: icons[layer]
      });
    }
    this.setState({
      markers: list
    });
  }

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
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
              image={marker.image}
              title={"asdf"}
              description={"bdsf"}
            />
          ))}
        </MapView>
        <Navigation
          ref="panel"
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
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
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
