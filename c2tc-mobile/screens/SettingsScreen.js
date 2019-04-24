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

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam("user", "no user"),
      username: this.props.navigation.getParam("user", "no user").username
    };
  }

  handleBackPress = e => {
    this.props.navigation.navigate("Profile");
  };

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View>
          <Appbar.Header>
            <Appbar.BackAction
              style={styles.backButton}
              onPress={() =>
                this.props.navigation.navigate("Profile", {
                  user: this.state.user
                })
              }
            />
            <Appbar.Content
              titleStyle={styles.backHeader}
              title="Settings"
              onPress={() =>
                this.props.navigation.navigate("Profile", {
                  user: this.state.user
                })
              }
            />
          </Appbar.Header>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("EditProfile", {
              user: this.state.user
            })
          }
        >
          <View style={styles.profile}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
              source={{
                uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
            />
            <View>
              <Text style={styles.name}>{this.state.user.username}</Text>
              <Text style={styles.editProfile}>Edit Your Profile</Text>
            </View>
            <FontAwesome
              name="chevron-right"
              size={15}
              style={styles.profileArrow}
            />
          </View>
        </TouchableOpacity>
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
          onPress={() =>
            this.props.navigation.navigate("Welcome", { backPage: "Settings" })
          }
        >
          <View style={styles.list}>
            <Text style={styles.text}>Show App Tutorials</Text>
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
  }
});
