import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
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
  };

  render() {
    var isSelected = this.props.parentPanel.props.layers[this.props.type];
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
    height: 50,
    padding: 3
  },
  icon: {
    position: "relative",
    width: 35
  },
  selectedText: {
    textAlign: "center",
    fontWeight: "400",
    width: 100,
    height: 40,
    fontSize: 20,
    color: "white"
  },
  unselectedText: {
    textAlign: "center",
    fontWeight: "400",
    width: 100,
    height: 40,
    fontSize: 20,
    color: "#8e8e93"
  }
});
