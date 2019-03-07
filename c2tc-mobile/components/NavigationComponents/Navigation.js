import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import Panel from "./Panel";
import TabBar from "./Tabs";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "filter"
    };
  }

  render() {
    return (
      <React.Fragment>
        <Panel />
        <TabBar />
      </React.Fragment>
    );
  }
}
