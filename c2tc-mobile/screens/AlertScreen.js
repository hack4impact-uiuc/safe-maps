import React from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { Appbar, Button } from "react-native-paper";
import API from "../components/API";

const { width, height } = Dimensions.get("window");

export default class AlertScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: ""
    }
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem("token");
    this.setState({
      token: token
    });
  }

  handleBackPress = e => {
    this.props.navigation.navigate("TipOverview");
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
          <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TipOverview")
            }
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />{" "}
              Tip Overview
            </Text>
          </TouchableOpacity>
        </View>
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
                onPress ={() => this.props.navigation.navigate("Login")}
              >
                Login
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Registration")}
              >
                Register
              </Button>
            </View>
            {this.state.token ? <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Verify")}
              >
                Verify
              </Button>
            </View> : null}
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
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  },
  alert: {
    position: "absolute"
  }
});
