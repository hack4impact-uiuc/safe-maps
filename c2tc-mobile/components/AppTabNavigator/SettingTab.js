import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Icon } from "native-base";

class SettingTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-settings" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
      </View>
    );
  }
}

export default SettingTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
