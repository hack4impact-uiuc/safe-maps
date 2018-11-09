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
    var buttonColor = "purple";
    return (
      <TouchableOpacity onPress={this.updateLayer} style={styles.button}>
        <Text style={styles.text}>{this.props.type}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#9b59b6",
    borderRadius: 8,
    width: 166,
    height: 52,
    paddingVertical: 15,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  text: {
    fontSize: 20,
    color: "white"
  }
});
