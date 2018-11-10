import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Row } from "native-base";

export default class ButtonInterace extends Component {
  constructor(props) {
    super(props);
  }

  getType() {
    return this.props.type;
  }

  updateLayer = () => {
    this.props.parentPanel.updateLayerList(this.getType());
    this.props.parentPanel.props.toggleLayers(this.props.type);
    console.log(this.props.type);
  };

  render() {
    var buttonColor = this.props.parentPanel.props.layers[this.props.type];
    return (
      <TouchableOpacity
        onPress={this.updateLayer}
        style={buttonColor ? styles.buttonOn : styles.buttonOff}
      >
        <Text style={styles.text}>{this.props.type}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonOn: {
    alignItems: "center",
    backgroundColor: "purple",
    borderRadius: 8,
    width: 150,
    height: 52,
    paddingVertical: 15,
    margin: 20
    // flexDirection: "row",
    // flex: 1,
    // justifyContent: "space-around"
  },
  buttonOff: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 8,
    width: 150,
    height: 52,
    paddingVertical: 15,
    margin: 20
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-around"
  },
  text: {
    fontSize: 20,
    color: "white"
  }
});
