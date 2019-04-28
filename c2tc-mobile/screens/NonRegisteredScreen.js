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

import { Appbar } from "react-native-paper";

export default class NonRegisteredScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleBackPress = e => {
    this.props.navigation.navigate("TipOverview");
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
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
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Notifications")}
        >
          <View style={styles.list}>
            <Text style={styles.text}>Notifications</Text>
            <FontAwesome name="chevron-right" size={15} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <View style={styles.list}>
            <Text style={styles.text}>Login</Text>
            <FontAwesome name="chevron-right" size={15} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Registration")}
        >
          <View style={styles.list}>
            <Text style={styles.text}>Register</Text>
            <FontAwesome name="chevron-right" size={15} style={styles.arrow} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  profile: {
    flexDirection: "row",
    padding: 25
  },
  name: {
    flexDirection: "row",
    paddingLeft: 30,
    fontSize: 20
  },
  editProfile: {
    paddingLeft: 30,
    fontSize: 15,
    color: "gray"
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
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  profileArrow: {
    paddingTop: 20,
    paddingLeft: 100
  },
  backHeader: {
    marginLeft: -10
  },
  arrow: {
    paddingTop: 15
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  }
});
