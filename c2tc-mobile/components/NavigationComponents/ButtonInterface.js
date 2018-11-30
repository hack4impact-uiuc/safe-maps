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
    console.log(this.props.type);
  };

  render() {
    console.log(this.props.color);
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
    borderRadius: 8,
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10
  },
  view: {
    width: Dimensions.get("window").width / 2,
    height: 60,
    padding: 10
  },
  unselectedButton: {
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10
  },
  icon: {
    position: "relative",
    width: 35
  },
  selectedText: {
    textAlign: "center",
    width: 100,
    height: 50,
    fontSize: 20,
    color: "white"
  },
  unselectedText: {
    textAlign: "center",
    width: 100,
    height: 50,
    fontSize: 20,
    color: "grey"
  }
});
