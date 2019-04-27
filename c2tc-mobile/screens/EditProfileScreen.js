import React from "react";
import API from "../components/API";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Appbar, TextInput } from "react-native-paper";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.navigation.getParam("user", "no user").username,
      password: this.props.navigation.getParam("user", "no user").password,
      user: this.props.navigation.getParam("user", "no user")
    };
  }

  async onChangePassword(password) {
    this.setState({ password });
    let data = {
      password
    };
    await API.updateUser(this.state.user._id, data);
    let currentUser = this.state.user;
    currentUser.password = password;
    this.setState({ user: currentUser });
  }
  async onChangeUserName(username) {
    this.setState({ username });
    let data = {
      username
    };
    await API.updateUser(this.state.user._id, data);
    let currentUser = this.state.user;
    currentUser.username = username;
    this.setState({ user: currentUser });
  }

  render() {
    return (
      <View behavior="padding" enabled>
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Settings", {
                user: this.state.user
              })
            }
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" /> Save
              Changes
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
          <View>
            <Text style={styles.changePicture}>Change Picture</Text>
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={e => this.onChangeUserName(e)}
          value={this.state.username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={e => this.onChangePassword(e)}
          value={this.state.password}
        />
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
    padding: 35
  },
  changePicture: {
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 10,
    fontSize: 17
  },
  textInput: {
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 35
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15,
    marginBottom: 30
  },
  backButton: {
    paddingLeft: 20,
    marginRight: Dimensions.get("window").width - 220
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  }
});
