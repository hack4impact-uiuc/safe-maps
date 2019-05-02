import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";

import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

export default class NonRegisteredScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.nonRegistered}>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipOverview")}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" /> Tip
              Overview
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Notifications")}
        >
          <View style={styles.list}>
            <Text style={styles.text}>Notifications</Text>
            <FontAwesome
              name="chevron-right"
              color="#D2D2D7"
              size={15}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <View style={styles.list}>
            <Text style={styles.text}>Login</Text>
            <FontAwesome
              name="chevron-right"
              color="#D2D2D7"
              size={15}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Registration")}
        >
          <View style={styles.list}>
            <Text style={styles.text}>Register</Text>
            <FontAwesome
              name="chevron-right"
              color="#D2D2D7"
              size={15}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nonRegistered: {
    height: Dimensions.get("window").height,
    backgroundColor: "white"
  },
  name: {
    flexDirection: "row",
    paddingLeft: 30,
    fontSize: 20
  },
  list: {
    height: 45,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  text: {
    paddingHorizontal: 30,
    paddingTop: 10,
    fontSize: 15,
    width: Dimensions.get("window").width - 40
  },
  divider: {
    borderBottomColor: "#D2D2D7",
    borderBottomWidth: 1
  },
  profileArrow: {
    paddingTop: 20,
    paddingLeft: 100
  },
  arrow: {
    paddingTop: 15
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
  arrow: {
    paddingTop: 15
  }
});
