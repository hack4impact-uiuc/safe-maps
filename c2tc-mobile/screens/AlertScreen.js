import React, { Component } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Modal,
  TouchableHighlight,
  Text,
  Container
} from "react-native";

import { Appbar, Button } from "react-native-paper";

class AlertScreen extends React.Component {
  state = {
    modalVisible: false
  };

  constructor(props) {
    super(props);
    // this.state = {
    //   modalVisible: props.shouldDisplayAlert,
    //   attemptedAction: props.attemptedAction
    // }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  attemptLogin = () => {
    console.log("ATTEMPTING TO LOGIN");
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Appbar.Header>
            <Appbar.Action
              icon="arrow-back"
              onPress={() => this.setModalVisible(!this.props.modalVisible)}
            />
            {/* <Appbar.Action icon="navigate-back" onPress={() => console.log("Hello, world!")} /> */}
            <Appbar.Content title="Back" />
          </Appbar.Header>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text style={styles.reason_text}>
                Sorry, in order to {this.props.attemptedAction}, you must login!
              </Text>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={this.attemptLogin}
              >
                Login
              </Button>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AlertScreen;
const styles = StyleSheet.create({
  reason_text: {
    margin: 10
  },

  button: {
    width: "40%"
    // flex: 0.3
  },

  alert: {
    position: "absolute"
  }
});
