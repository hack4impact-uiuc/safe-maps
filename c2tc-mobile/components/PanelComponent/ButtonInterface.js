import React from "react";
import { Button } from "react-native";

export default class ButtonInterace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type
    };
  }

  getType() {
    return this.state.type;
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
