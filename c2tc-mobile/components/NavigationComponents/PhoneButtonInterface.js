import React, { Component } from "react";
import { Button } from "react-native";

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
      <Button
        onPress={this._onPressCall}
        title={this.props.type}
        color={"purple"}
      />
    );
  }
}
