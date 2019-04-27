import React from "react";
import { AsyncStorage } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { NavigationEvents } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimeTips: true,
      healthTips: true,
      transpoTips: true,
      financialTips: true,
      otherTips: true,
      productUpdates: true
    };
  }

  onComponentFocused = async () => {
    this._mounted = true;
    let crimeTips = await AsyncStorage.getItem("crime_tips");
    if (crimeTips === "false") {
      this.setState({
        crimeTips: false
      });
    }
    let healthTips = await AsyncStorage.getItem("health_tips");
    if (healthTips === "false") {
      this.setState({
        healthTips: false
      });
    }
    let transpoTips = await AsyncStorage.getItem("transpo_tips");
    if (transpoTips === "false") {
      this.setState({
        transpoTips: false
      });
    }
    let financialTips = await AsyncStorage.getItem("financial_tips");
    if (financialTips === "false") {
      this.setState({
        financialTips: false
      });
    }
  };

  setAndStoreState = async stateVar => {
    if (stateVar === "crimeTips") {
      if (!this.state.crimeTips) {
        await AsyncStorage.setItem("crime_tips", "true");
        this.setState({ crimeTips: !this.state.crimeTips });
      } else {
        await AsyncStorage.setItem("crime_tips", "false");
        this.setState({ crimeTips: !this.state.crimeTips });
      }
    }
    if (stateVar === "healthTips") {
      if (!this.state.healthTips) {
        await AsyncStorage.setItem("health_tips", "true");
        this.setState({ healthTips: !this.state.healthTips });
      } else {
        await AsyncStorage.setItem("health_tips", "false");
        this.setState({ healthTips: !this.state.healthTips });
      }
    }
    if (stateVar === "transpoTips") {
      if (!this.state.transpoTips) {
        await AsyncStorage.setItem("transpo_tips", "true");
        this.setState({ transpoTips: !this.state.transpoTips });
      } else {
        await AsyncStorage.setItem("transpo_tips", "false");
        this.setState({ transpoTips: !this.state.transpoTips });
      }
    }
    if (stateVar === "financialTips") {
      if (!this.state.financialTips) {
        await AsyncStorage.setItem("financial_tips", "true");
        this.setState({ financialTips: !this.state.financialTips });
      } else {
        await AsyncStorage.setItem("financial_tips", "false");
        this.setState({ financialTips: !this.state.financialTips });
      }
    }
  };

  render() {
    return (
      <View style={styles.notifications}>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />{" "}
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>Crime Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              style={styles.switch}
              isOn={this.state.crimeTips}
              onColor="#4ADA64"
              offColor="#C8C8CD"
              size="small"
              onToggle={() => this.setAndStoreState("crimeTips")}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Text style={styles.text}>Health Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              style={styles.switch}
              isOn={this.state.healthTips}
              onColor="#4ADA64"
              offColor="#C8C8CD"
              size="small"
              onToggle={() => this.setAndStoreState("healthTips")}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Text style={styles.text}>Transportation Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              style={styles.switch}
              isOn={this.state.transpoTips}
              onColor="#4ADA64"
              offColor="#C8C8CD"
              size="small"
              onToggle={() => this.setAndStoreState("transpoTips")}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Text style={styles.text}>Financial Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              style={styles.switch}
              isOn={this.state.financialTips}
              onColor="#4ADA64"
              offColor="#C8C8CD"
              size="small"
              onToggle={() => this.setAndStoreState("financialTips")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notifications: {
    backgroundColor: "white",
    height: Dimensions.get("window").height
  },
  switch: {
    paddingTop: 15
  },
  divider: {
    borderBottomColor: "#D2D2D7",
    borderBottomWidth: 1
  },
  listItem: {
    height: 45,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  text: {
    paddingHorizontal: 30,
    paddingTop: 10,
    fontSize: 17,
    fontWeight: "400",
    width: Dimensions.get("window").width - 80
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15
    // marginBottom: 20
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
