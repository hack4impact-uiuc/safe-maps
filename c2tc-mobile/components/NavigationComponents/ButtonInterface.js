import React, { Component } from "react";
import { Button } from "react-native";

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
