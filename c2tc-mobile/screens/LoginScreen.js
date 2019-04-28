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
import { AsyncStorage } from "react-native";
import API from "../components/API";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    pswd: "",
    errors: []
  };

  handleLogin = async () => {
    let errors = this.validate();

    if (errors.length == 0){
      const response = await API.login(this.state.email, this.state.pswd);
      if (!response.success) {
        errors = [response.message]
      } else {
        await AsyncStorage.setItem("token", response.result.token);
        await API.setVerifiedPin()
        this.setState({ successfulSubmit: true });
      }
    }

    this.setState({ errors });
  };
  validate() {
    let errors = [];

    if (this.state.email.length === 0) {
      errors.push("Email cannot be empty");
    }

    if (this.state.pswd.length === 0) {
      errors.push("Password cannot be empty");
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
          <Text style={styles.full_header}>Login</Text>
          <View style={styles.errors}>
            {errors.map(error => (
              <Text key={error}>Error: {error}</Text>
            ))}
          </View>
          <Text style={styles.header}>Email</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Email"
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Text style={styles.header}>Password</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            secureTextEntry={true}
            label="Password"
            placeholder="Password"
            value={this.state.pswd}
            onChangeText={pswd => this.setState({ pswd })}
          />
          <TouchableOpacity style={styles.login_btn} onPress={this.handleLogin}>
            <Text style={styles.button_text}>Login</Text>
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
