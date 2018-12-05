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
          <FontAwesome name={this.props.icon} color="#8e8e93" size={25} />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get("window").width / 2 - 50,
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e5e5ea",
    borderRadius: 900,
    paddingTop: 17,
    width: 60,
    height: 60,
    margin: 13
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    width: 150,
    height: 32,
    fontSize: 17,
    color: "black"
  }
});
