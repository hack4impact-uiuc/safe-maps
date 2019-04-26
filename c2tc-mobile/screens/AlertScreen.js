import React from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Dimensions,
} from "react-native";

import { Button } from "react-navigation";
import { Appbar } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default class AlertScreen extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 22 }}>
          {/* <Appbar.Header>
            <Appbar.Action
              icon="arrow-back"
            />
            <Appbar.Content title="Back" />
          </Appbar.Header> */}
          <View style={{ marginTop: 22 }}>
            <View>
              <Text style={styles.reason_text}>
                Sorry, in order to access this feature you must login!
              </Text>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress ={() => this.props.navigation.navigate("Welcome")}
              >
                Login
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Map")}
              >
                Register
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Map")}
              >
                Verify
              </Button>
            </View>
          </View>
      </View>
    );
  }
}

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