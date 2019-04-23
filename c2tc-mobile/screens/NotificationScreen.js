import React from "react";
import { AsyncStorage } from "react-native";
import API from "../components/API";
import ToggleSwitch from 'toggle-switch-react-native'
import { NavigationEvents } from "react-navigation";
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
  Image
} from "react-native";

import {
  Paragraph,
  Appbar,
  List,
  Divider,
  withTheme,
  type Theme
} from "react-native-paper";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTips: false,
      illiniAlerts: false,
      productUpdates: false
    };
  }

  onComponentFocused = async() => {
    this._mounted = true;
    let locationTips = await AsyncStorage.getItem("location_tips");
    if (locationTips === "true") {
      this.setState({
        locationTips: true
      });
    }
    let illiniAlerts = await AsyncStorage.getItem("illini_alerts");
    if (illiniAlerts === "true") {
      this.setState({
        illiniAlerts: true
      });
    }
    let productUpdates = await AsyncStorage.getItem("product_updates");
    if (productUpdates === "true") {
      this.setState({
        productUpdates: true
      });
    }
  }

  handleBackPress = e => {
    this.props.navigation.goBack();
  };

  setAndStoreState = async (stateVar) => {
    if (stateVar === "locationTips") {
      if (!this.state.locationTips) {
        await AsyncStorage.setItem("location_tips", "true");
        this.setState({locationTips: !this.state.locationTips});
      } else {
        await AsyncStorage.setItem("location_tips", "false");
        this.setState({locationTips: !this.state.locationTips});
      }

    }
    if (stateVar === "illiniAlerts") { 
      if (!this.state.illiniAlerts) {
        await AsyncStorage.setItem("illini_alerts", "true");
        this.setState({illiniAlerts: !this.state.illiniAlerts});
      } else {
        await AsyncStorage.setItem("illini_alerts", "false");
        this.setState({illiniAlerts: !this.state.illiniAlerts});
      }
    } 
    if (stateVar === "productUpdates") {
      if (!this.state.productUpdates) {
        await AsyncStorage.setItem("product_updates", "true");
        this.setState({productUpdates: !this.state.productUpdates});
      } else {
        await AsyncStorage.setItem("product_updates", "false");
        this.setState({productUpdates: !this.state.productUpdates});
      }
    }
  }

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View>
          <Appbar.Header>
          <Appbar.BackAction onPress={this.handleBackPress} />
          <Appbar.Content title="Notifications"/>
          </Appbar.Header>
        </View>

        <Text>{"\n"}</Text>

        <View style={styles.listItem}>
          <Text style={styles.text}>Location Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
            style={styles.switch}
            isOn={this.state.locationTips}
            onColor='green'
            offColor='gray'
            size='small'
            onToggle={() => this.setAndStoreState("locationTips")}
            />
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.listItem}>
          <Text style={styles.text}>Illini Alerts</Text>
            <View style={styles.switch}>
              <ToggleSwitch
              isOn={this.state.illiniAlerts}
              onColor='green'
              offColor='gray'
              size='small'
              onToggle={() => this.setAndStoreState("illiniAlerts")}
              />
            </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.listItem}>
          <Text style={styles.text}>Product Updates</Text>
            <View style={styles.switch}>
              <ToggleSwitch
              isOn={this.state.productUpdates}
              onColor='green'
              offColor='gray'
              size='small'
              onToggle={() => this.setAndStoreState("productUpdates")}
              />
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    paddingTop: 15
  },
  divider: {
    borderBottomColor: 'gray',
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
    fontSize: 15,
    width: Dimensions.get("window").width - 80
  }
});