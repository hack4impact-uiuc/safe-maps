import React, { Component } from "react";
import { Button } from "react-native";

export default class CurrentLocationButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        onPress={this.props.changeLocation}
        title="User Location!"
        color="red"
      />
    );
  }
}
