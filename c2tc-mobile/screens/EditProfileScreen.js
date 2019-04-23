import React from "react";
import { AsyncStorage } from "react-native";
import API from "../components/API";
import { FontAwesome } from "@expo/vector-icons";

import {
  Animated,
  View,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Image,
  ScrollView,
  Alert
} from "react-native";

import {
  Paragraph,
  Appbar,
  List,
  Divider,
  withTheme,
  type Theme
} from "react-native-paper";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user_id: "",
        edited: false,
        username: "",
        pw: ""
    }
  }
  
  async componentDidMount() {
    this._mounted = true;
    await AsyncStorage.setItem("user_id", "5c86c850f875c618f8557f40");
    let user_id = await AsyncStorage.getItem("user_id");
    this.setState({
      user_id
    });
  }

  handleBackPress = e => {
    this.props.navigation.navigate("Settings");
  };

  handleSave = async () => {
    if (this.state.edited) {
      let data = {
        username: this.state.username,
        pw: this.state.pw,
      }
      let response = await API.updateUser(this.state.user_id, data);
      Alert.alert("Successfully updated profile!");
      this.setState({
        username: this.state.username,
        pw: this.state.pw
      });
    }
  };

  render() {
    return (
        <View behavior="padding" enabled>
            <View>
                <Appbar.Header>
                <Appbar.BackAction onPress={this.handleBackPress} />
                <Appbar.Content title = "Edit Profile"/>
                <Appbar.Content title = "Save" onPress={this.handleSave}/>
                </Appbar.Header>
            </View>
            <Text style = {styles.sectionHeader}>Personal Information</Text>
            <View style={styles.profile}>
              <Image
              style={{ width: 50, height: 50, borderRadius: 50 / 2}}
              source={{
              uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
              />
              <View>
                  <Text style={styles.changePicture}>Change Picture</Text>
              </View>
            </View>
            <View style = {styles.textInput}>
                <TextInput
                    placeholder = "Username"
                    onChangeText={(text) => this.setState({
                      username: text,
                      edited: true
                    })}
                    value={this.state.username}
                />
            </View>
            <View style = {styles.textInput}>
                <TextInput
                    placeholder = "Password"
                    onChangeText={(text) => this.setState({
                      pw: text,
                      edited: true
                    })}
                    value={this.state.pw}
                />
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
  sectionHeader: {
      paddingTop: 20,
      paddingLeft: 20,
      fontWeight: "bold",
      fontSize: 20
  },
  profile: {
    flexDirection: "row",
    padding: 25,
  },
  changePicture: {
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 10,
    fontSize: 15
  },
  textInput: {
      padding: 10
  }
});