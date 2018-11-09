import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import call from "react-native-phone-call";

export default class PhoneButton extends Component {
  constructor(props) {
    super(props);
  }

  getType() {
    return this.props.type;
  }

  _onPressCall = () => {
    const args = {
      number: this.props.number,
      prompt: false
    };
    call(args).catch(console.error);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPressCall} style={styles.button}>
        <Text style={styles.text}>{this.props.type}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#e5e5ea",
    borderRadius: 8,
    width: 166,
    height: 52,
    paddingVertical: 15,
    margin: 20
  },
  text: {
    fontSize: 20,
    color: "white"
  }
});
