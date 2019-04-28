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
      token: null
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
      <View style={styles.alert}>
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
            <View style={styles.reason}>
              <Text style={styles.reason_text}>
                Sorry, in order to access this feature you must login!
              </Text>
            </View>
            {!this.state.token && (
              <View>
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
              </View>
            )}
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
  alert:{
    backgroundColor:"white",
    height:Dimensions.get("window").height,
  },
  reason:{
    marginHorizontal: 22,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  reason_text: {
    fontSize: 20,
    fontWeight:"500"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: "50%",
    fontSize: 17,
    paddingVertical: 5,

  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15,
    marginBottom: 10
  },
  backButton: {
    paddingLeft: 20,
    marginRight: Dimensions.get("window").width - 220
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  alert: {
    position: "absolute"
  }
});
