import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { createStackNavigator, addNavigationHelpers } from "react-navigation";

import LiveLocation from "./LiveLocation";

import { Provider, connect } from "react-redux";
import { store } from "../Redux";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <LiveLocation />
      </Provider>
    );
  }
}
