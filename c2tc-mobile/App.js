import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import API from "./components/API";

import MapScreen from "./screens/MapScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroScreen from "./screens/IntroScreen";
import TipForm from "./screens/TipForm";
import TipScreen from "./screens/TipScreen";
import TipDetailsScreen from "./screens/TipDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    let is_loaded = await AsyncStorage.getItem("loaded");
    if (is_loaded) {
      this._mounted = true;
    } else {
      await AsyncStorage.setItem("loaded", JSON.stringify(1));
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
    screen: TipScreen,
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
  },
  TipForm: {
    screen: TipForm,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  }
});
