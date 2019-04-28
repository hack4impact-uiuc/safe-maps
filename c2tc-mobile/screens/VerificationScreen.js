import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import API from "../components/API";
import { Appbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

class VerificationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pin: "0",
      errors: []
    }
  }

  handleVerification = async () => {
    const response = await API.verifyPin(this.state.pin);
    if (!response.success) {
      errors = ["Error: " + response.message]
      this.setState({ errors });
    } else {
      await AsyncStorage.setItem("verifiedPin", "yes");
      errors = ["Congrats, you're verified!"]
      this.setState({ errors });
      this.setState({ successfulSubmit: true });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <View style={styles.verify} >
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
          <View style={styles.content}>
            <View style={styles.errors}>
              {errors.map(error => (
                <Text key={error}>{error}</Text>
              ))}
            </View>
            <Text style={styles.header}>Enter Verification Pin</Text>
            <TextInput
                style={styles.verificationText}
                keyboardType="numeric"
                textContentType = "oneTimeCode"
                value={this.state.pin}
                maxLength={6}
                onChangeText={(pin) => this.setState({ pin })}
            />
            <TouchableOpacity style={styles.submit} onPress={this.handleVerification} >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verify:{
    backgroundColor:"white",
    height:Dimensions.get("window").height,
  },
  header: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 50
  },
  submit: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    width: 150,
    borderRadius: 7,
    padding: 10,
    marginTop: 20
  },
  submitText: {
    color: "white",
    fontSize: 20
  },
  verificationText: {
    fontSize: 25,
    padding: 10,
    width: 110,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1
  },
  content: {
    height: Dimensions.get("window").height - 275,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
});

export default VerificationScreen;
