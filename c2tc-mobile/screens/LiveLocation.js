import React from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";

import MapView, { Marker, ProviderPropType } from "react-native-maps";
import Panel from "../components/PanelComponent/Panel";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const policeLocations = require("../assets/data/police_locations.json");
const layer2Data = require("../assets/data/layer2_loc.json");
const layerData = [policeLocations, layer2Data];
const layerKey = ["police", "light", "construction"];
const policeColor = "#841584";

let id = 0;
let renderLayers = true;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class LiveLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      markers: []
    };
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });

    for (var index in layerData) {
      this.renderMarkers(layerData[index], randomColor());
    }
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

  renderMarkers(data, markerColor) {
    var list = this.state.markers;
    for (i = 0; i < data.length; i++) {
      list.push({
        coordinate: {
          latitude: data[i].lat,
          longitude: data[i].long
        },
        key: id++,
        color: markerColor,
        title: data[i].place_name
      });
    }
    this.setState({
      markers: list
    });
  }

  _onPressToggleLayers = () => {
    if (renderLayers) {
      this.setState({
        markers: []
      });
      renderLayers = false;
    } else {
      for (var index in layerData) {
        this.renderMarkers(layerData[index], randomColor());
      }
      renderLayers = true;
    }
  };

  render() {
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
              title={marker.title}
            />
          ))}
        </MapView>
        <Panel ref="panel" toggleLayers={this._onPressToggleLayers} />
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
