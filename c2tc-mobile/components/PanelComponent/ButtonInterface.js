import React from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ButtonInterace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type
    };
  }

  componentDidMount() {}

  getType() {
    return this.state.type;
  }

  updateLayer = () => {
    this.props.parentPanel.updateLayerList(this.getType());
    this.props.parentPanel.props.toggleLayers();
  };

  render() {
    var buttonColor = "purple";
    return (
      <Button
        onPress={this.updateLayer}
        title={this.props.type}
        color={buttonColor}
      />
    );
  }
}

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
