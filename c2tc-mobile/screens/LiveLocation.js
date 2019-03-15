import React, { Component } from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import { Location, Permissions } from "expo";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import Navigation from "../components/NavigationComponents/Navigation";
import Colors from "../constants/Colors";
import API from "../components/API";
import Loader from "../components/Loader";
import CurrentLocationButton from "../components/NavigationComponents/CurrentLocationButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateMapRegion,
  updateColorData,
  updateLayerData,
  updateDetailView
} from "../Redux";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.017;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateColorData,
      updateLayerData,
      updateMapRegion,
      updateDetailView
    },
    dispatch
  );
};
const mapStateToProps = state => {
  return {
    markerClicked: state.markerClicked,
    layerData: state.layerData,
    colorData: state.colorData,
    renderData: state.renderData,
    markers: state.markers,
    mapRegion: state.mapRegion,
    page: state.page
  };
};

class LiveLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastLat: null,
      lastLong: null,
      locationResult: null
    };
  }

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
  }

  async componentDidMount() {
    this._mounted = true;

    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.onRegionChange(region);
      },
      error => {
        console.log({ error: error.message });
      },
      {
        enableHighAccuracy: true
      }
    );

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.onRegionChange(region);
      },
      error => console.log({ error: error.message })
    );

    let busStop = await AsyncStorage.getItem("busStop");
    let crimeData = await AsyncStorage.getItem("crimeData");
    let businessData = await AsyncStorage.getItem("businessData");
    let emergencyData = await AsyncStorage.getItem("emergencyData");
    let policeStations = await AsyncStorage.getItem("policeStations");
    let streetLights = await AsyncStorage.getItem("streetLights");

    if (!busStop) {
      busStopData = await API.getBusStops();
      await AsyncStorage.setItem("busStop", JSON.stringify(busStopData));
    }

    if (!crimeData) {
      crimeData = await API.getCrimes();
      await AsyncStorage.setItem("crimeData", JSON.stringify(crimeData));
    }

    if (!businessData) {
      businessData = await API.getBusinesses();
      await AsyncStorage.setItem("businessData", JSON.stringify(businessData));
    }

    if (!emergencyData) {
      emergencyData = await API.getEmergencyPhones();
      await AsyncStorage.setItem(
        "emergencyData",
        JSON.stringify(emergencyData)
      );
    }

    if (!policeStations) {
      policeStations = await API.getPoliceStations();
      await AsyncStorage.setItem(
        "policeStations",
        JSON.stringify(policeStations)
      );
    }

    if (!streetLights) {
      streetLights = await API.getStreetLight();
      await AsyncStorage.setItem("streetLights", JSON.stringify(streetLights));
    }

    await this.props.updateLayerData({
      busStop: JSON.parse(await AsyncStorage.getItem("busStop")),
      crime: JSON.parse(await AsyncStorage.getItem("crimeData")),
      business: JSON.parse(await AsyncStorage.getItem("businessData")),
      emergency: JSON.parse(await AsyncStorage.getItem("emergencyData")),
      policeStations: JSON.parse(await AsyncStorage.getItem("policeStations")),
      streetLights: JSON.parse(await AsyncStorage.getItem("streetLights"))
    });

    await this.props.updateColorData({
      busStop: Colors.busStop,
      crime: Colors.crime,
      business: Colors.business,
      emergency: Colors.emergency,
      policeStations: Colors.police,
      streetLights: Colors.streetlights
    });

    this._mounted = false;
    this.getLocationAsync();
  }

  onRegionChange = region => {
    this.props.updateMapRegion(region);
    this.setState({
      lastLat: region.latitude || this.state.lastLat,
      lastLong: region.longitude || this.state.lastLong
    });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ statusBarHeight: 5 });
    }, 500);
  }

  markerClick = (title, description) => {
    this.props.updateDetailView(true, title, description);
  };

  backToUser = () => {
    this.props.updateMapRegion(this.state.locationResult);
  };

  onRegionChangeRender = region => {
    this.props.updateMapRegion = region;
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.setState({ locationResult: region });
    this.props.updateMapRegion(this.state.locationResult);
  };

  render() {
    if (this._mounted) {
      return <Loader loading={this._mounted} />;
    } else if (this.props.page == "tips") {
      return this.props.navigation.navigate("TipOverview");
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.props.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          showsMyLocationButton={true}
          onRegionChange={this.onRegionChangeRender}
        >
          {this.props.markers.map(marker => (
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

        <Navigation ref="panel" layers={this.props.renderData} />
      </View>
    );
  }
}

LiveLocation.propTypes = {
  provider: ProviderPropType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveLocation);

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
