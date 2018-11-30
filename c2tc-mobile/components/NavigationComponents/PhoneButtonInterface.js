import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import call from "react-native-phone-call";

export default class PhoneButton extends Component {
  constructor(props) {
    super(props);
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
      <View style={styles.view}>
        <TouchableOpacity onPress={this._onPressCall} style={styles.button}>
          <FontAwesome name={this.props.icon} color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get("window").width / 2,
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e5e5ea",
    borderRadius: 25,
    padding: 10,
    width: 55,
    height: 55,
    margin: 10
  },
  text: {
    textAlign: "center",
    width: 100,
    height: 35,
    fontSize: 18,
    color: "black"
  }
});
