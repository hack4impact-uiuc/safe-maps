import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class CurrentLocationButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.changeLocation}
      >
        <FontAwesome name="crosshairs" size={32} color={"black"} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexWrap: "wrap",
    borderColor: "rgba(142,142,147,0.70)",
    borderWidth: 1.5,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 5,
    margin: 10
  }
});
