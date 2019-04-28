import React from "react";
import API from "../components/API";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  Modal,
  AsyncStorage
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Appbar, TextInput } from "react-native-paper";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.navigation.getParam("user", "no user").username,
      password: this.props.navigation.getParam("user", "no user").password,
      user: this.props.navigation.getParam("user", "no user"),
      url: this.props.navigation.getParam("user", "no user").pro_pic,
      modalVisible: false,
      token: ""
    };
  }

  async onChangePassword(password) {
    this.setState({ password });
    let data = {
      password
    };
    await API.updateUser(this.state.token, data);
    let currentUser = this.state.user;
    currentUser.password = password;
    this.setState({
      user: currentUser
    });
  }
  async onChangeUserName(username) {
    this.setState({ username });
    let data = {
      username
    };
    await API.updateUser(this.state.token, data);
    let currentUser = this.state.user;
    currentUser.username = username;
    this.setState({ user: currentUser });
  }

  async onChangePicture(picture) {
    this.setState({
      url: picture
    });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = async () => {
    let data = {
      pro_pic: this.state.url
    };
    await API.updateUser(this.state.token, data);
    let currentUser = this.state.user;
    this.setState({ user: currentUser });
    this.setState({ modalVisible: false });
  };

  async componentDidMount() {
    let token = await AsyncStorage.getItem("token");
    this.setState({ token });
  }

  render() {
    return (
      <View style={styles.editProfile} behavior="padding" enabled>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View>
            <Text style={styles.modalText}>
              Enter Image URL for New Profile Picture:
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={e => this.onChangePicture(e)}
              value={this.state.url}
            />
            <Text onPress={this.closeModal} style={styles.modalSave}>
              Save
            </Text>
          </View>
        </Modal>
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
        <TouchableOpacity onPress={this.openModal} style={styles.profile}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            source={{
              uri: this.state.user.pro_pic
            }}
          />
          <View>
            <Text style={styles.changePicture}>Change Picture</Text>
          </View>
        </TouchableOpacity>
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
  editProfile: {
    backgroundColor: "white",
    height: Dimensions.get("window").height
  },
  profile: {
    flexDirection: "row",
    padding: 22
  },
  changePicture: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 19,
    fontWeight: "400"
  },
  textInput: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 22
  },
  modalText: {
    fontSize: 20,
    fontWeight: "500",
    padding: 30,
    marginTop: 20,
    alignSelf: "center"
  },
  modalSave: {
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
    color: "white",
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#9042AF"
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
  }
});
