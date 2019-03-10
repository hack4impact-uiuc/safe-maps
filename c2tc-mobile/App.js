import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";

import MapScreen from "./screens/MapScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroScreen from "./screens/IntroScreen";
import TipOverviewScreen from "./screens/TipOverviewScreen";
import TipDetailsScreen from "./screens/TipDetailsScreen";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    if (AsyncStorage.getAllKeys().length != 1) {
      await AsyncStorage.setItem("loaded", JSON.stringify(1));
    } else {
      this._mounted = true;
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <Navigator />;
  }
}

Navigator = createStackNavigator({
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  TipOverview: {
    screen: TipOverviewScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  TipDetail: {
    screen: TipDetailsScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
