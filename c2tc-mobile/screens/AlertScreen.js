import React, { Component } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Modal,
  TouchableHighlight,
  Text,
  Container,
  Button,
  TouchableOpacity
} from "react-native";

import { NavigationEvents } from "react-navigation";
import { Appbar } from "react-native-paper";

class AlertScreen extends React.Component {
  state = {
    modalVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      // modalVisible: props.shouldDisplayAlert,
      // attemptedAction: props.attemptedAction
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Appbar.Header>
            <Appbar.Action
              icon="arrow-back"
              // onPress={() => this.setModalVisible(!this.props.modalVisible)}
            />
            <Appbar.Content title="Back" />
          </Appbar.Header>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text style={styles.reason_text}>
                Sorry, in order to access this feature you must login!
              </Text>
            </View>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Map")}
          >
            <Text>Continue</Text>
          </TouchableOpacity>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Button
                title="login"
                mode="contained"
                style={styles.button}
                onPress ={() => this.props.navigation.navigate("Welcome")}
              >
                Login
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                title="login"
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Map")}
              >
                Register
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                title="login"
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Map")}
              >
                Verify
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