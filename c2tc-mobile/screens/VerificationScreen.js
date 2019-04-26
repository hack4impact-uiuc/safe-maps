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

class VerificationScreen extends React.Component {
  state = {
    pin: "0"
  };

  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            style={styles.backButton}
            onPress={() => this.props.navigation.navigate("TipOverview")}
          />
          <Appbar.Content
            titleStyle={styles.backHeader}
            title="Tip Overview"
            onPress={() => this.props.navigation.navigate("TipOverview")}
          />
        </Appbar.Header>
        <View style={styles.content}>
          <Text style={styles.header}>Enter Verification Pin</Text>
          <TextInput
            style={styles.verificationText}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            value={this.state.pin}
            maxLength={6}
            onChange={e => this.setState({ pin: e })}
          />
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: Dimensions.get("window").height - 75,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  }
});

export default VerificationScreen;
