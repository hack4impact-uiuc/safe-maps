import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

export default class Registration extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    usr: "",
    pswd: "",
    repswd: "",
    errors: []
  };

  handleRegistration = async () => {
    const errors = this.validate();
    if (errors.length === 0) {
      //Login
    } else {
      this.setState({ errors });
    }
  };

  validate() {
    const errors = [];

    if (this.state.usr.length === 0) {
      errors.push("Username cannot be empty");
    }

    if (this.state.pswd.length === 0) {
      errors.push("Password cannot be empty");
    }

    if (this.state.repswd.length === 0) {
      errors.push("Re-enter password cannot be empty");
    }

    if (this.state.pswd !== this.state.repswd) {
      errors.push("Passwords do not match!");
    }

    return errors;
  }

  render() {
    const { errors } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View style={styles.backHeader}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipOverview")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              <FontAwesome name="chevron-left" size={20} color="#027BFF" /> Back
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"always"}
          removeClippedSubviews={false}
        >
          <Text style={styles.full_header}>Create Account</Text>
          <View style={styles.errors}>
            {errors.map(error => (
              <Text key={error}>Error: {error}</Text>
            ))}
          </View>
          <Text style={styles.header}>Username</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Username"
            placeholder="Username"
            value={this.state.usr}
            onChangeText={usr => this.setState({ usr })}
          />
          <Text style={styles.header}>Password</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Password"
            placeholder="Password"
            value={this.state.pswd}
            onChangeText={pswd => this.setState({ pswd })}
          />
          <Text style={styles.header}>Re-enter Password</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Re-Password"
            placeholder="Re-Password"
            value={this.state.repswd}
            onChangeText={repswd => this.setState({ repswd })}
          />
          <TouchableOpacity
            style={styles.login_btn}
            onPress={this.handleRegistration}
          >
            <Text style={styles.button_text}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backButton: {
    paddingLeft: 20,
    width: Dimensions.get("window").width
  },
  backText: {
    color: "#027BFF",
    fontSize: 20
  },
  backHeader: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  wrapper: {
    flex: 1,
    backgroundColor: "white"
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    marginTop: 0
  },
  inputBodyContainerStyle: {
    paddingBottom: 100,
    marginHorizontal: 20,
    marginTop: 0
  },
  full_header: {
    fontWeight: "500",
    fontSize: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  header: {
    fontWeight: "500",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  button_text: {
    color: "white",
    fontSize: 19,
    fontWeight: "600"
  },
  login_btn: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    paddingVertical: 17,
    marginTop: 30,
    marginLeft: 20
  }
});
