import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

import Tabs from "react-native-tabs";

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "filter" };
  }

  getPage() {
    return this.state.page;
  }

  _onSelect = tab => {
    this.setState({ page: tab.props.name });
  };

  render() {
    return (
      <Tabs
        selected={this.state.page}
        style={styles.background}
        selectedStyle={{ color: "purple" }}
        onSelect={tab => this._onSelect(tab)}
      >
        <Text name="filter" selectedIconStyle={styles.tab}>
          Filters
        </Text>
        <Text name="contact" selectedIconStyle={styles.tab}>
          Contacts
        </Text>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    opacity: 0.5
  },
  tab: {
    borderTopWidth: 2,
    borderTopColor: "purple"
  }
});
