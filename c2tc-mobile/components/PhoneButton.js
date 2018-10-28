import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import call from "react-native-phone-call";

const buttonColor = "#424242";

export default class PhoneButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      number: this.props.number
    };
  }

  getType() {
    return this.state.type;
  }

  _onPressCall = () => {
    const args = {
      number: this.state.number,
      prompt: false
    };
    call(args).catch(console.error);
  };

  render() {
    return (
      <Icon.Button
        name="phone"
        backgroundColor={buttonColor}
        onPress={this._onPressCall()}
      >
        {this.getType()}
      </Icon.Button>
    );
  }
}
