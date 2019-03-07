import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRenderData, updateMarkers } from "../../Redux";
import renderLayerMarkers from "../MapRendering";

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateMarkers,
      updateRenderData
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    renderData: state.renderData,
    layerData: state.layerData,
    colorData: state.colorData,
    markers: state.markers,
    mapRegion: state.mapRegion
  };
};

class ButtonInterface extends Component {
  constructor(props) {
    super(props);
  }

  _onPressToggleLayers = layer => {
    if (this.props.renderData[layer]) {
      this.props.updateRenderData(layer, false);
      let markers = this.props.markers.filter(
        marker => marker["color"] !== this.props.colorData[layer]
      );
      this.props.updateMarkers(markers);
    } else {
      this.renderMarkers(
        layer,
        this.props.layerData[layer],
        this.props.colorData[layer]
      );
      this.props.updateRenderData(layer, true);
    }
  };

  async renderMarkers(layer, data, markerColor) {
    const { layerData, colorData, markers, mapRegion } = this.props;
    let markerList = await renderLayerMarkers(
      layer,
      data,
      markerColor,
      layerData,
      colorData,
      markers,
      mapRegion
    );
    this.props.updateMarkers(markerList);
  }

  updateLayer = () => {
    this._onPressToggleLayers(this.props.type);
  };

  render() {
    var isSelected = this.props.renderData[this.props.type];
    return (
      <View style={styles.view}>
        <TouchableOpacity
          onPress={this.updateLayer}
          style={
            isSelected
              ? [styles.selectedButton, { backgroundColor: this.props.color }]
              : styles.unselectedButton
          }
        >
          <FontAwesome
            name={this.props.icon}
            size={32}
            color={isSelected ? "white" : this.props.color}
          />
          <Text
            style={isSelected ? styles.selectedText : styles.unselectedText}
          >
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonInterface);

const styles = StyleSheet.create({
  selectedButton: {
    borderRadius: 9,
    alignContent: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "rgba(142,142,147,0)",
    flexWrap: "wrap",
    padding: 10
  },
  unselectedButton: {
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    borderColor: "rgba(142,142,147,0.70)",
    borderWidth: 1.5,
    backgroundColor: "white",
    borderRadius: 9,
    padding: 10
  },
  view: {
    width: Dimensions.get("window").width / 2 - 10,
    height: 60,
    padding: 3
  },
  icon: {
    position: "relative",
    width: 35
  },
  selectedText: {
    paddingLeft: 10,
    textAlign: "left",
    fontWeight: "400",
    width: Dimensions.get("window").width / 2 - 75,
    flexWrap: "wrap",
    height: 50,
    fontSize: 18,
    color: "white"
  },
  unselectedText: {
    paddingLeft: 10,
    textAlign: "left",
    fontWeight: "400",
    flexWrap: "wrap",
    width: Dimensions.get("window").width / 2 - 75,
    height: 50,
    fontSize: 18,
    color: "#8e8e93"
  }
});
