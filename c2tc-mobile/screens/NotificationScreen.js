import React from "react";
import { AsyncStorage } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { NavigationEvents } from "react-navigation";
import { View, Dimensions, Text, StyleSheet } from "react-native";

import { Appbar } from "react-native-paper";

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
    let otherTips = await AsyncStorage.getItem("other_tips");
    if (otherTips === "false") {
      this.setState({
        otherTips: false
      });
    }
    let productUpdates = await AsyncStorage.getItem("product_updates");
    if (productUpdates === "false") {
      this.setState({
        productUpdates: false
      });
    }
  };

  handleBackPress = e => {
    this.props.navigation.goBack();
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
    if (stateVar === "otherTips") {
      if (!this.state.otherTips) {
        await AsyncStorage.setItem("other_tips", "true");
        this.setState({ otherTips: !this.state.otherTips });
      } else {
        await AsyncStorage.setItem("other_tips", "false");
        this.setState({ otherTips: !this.state.otherTips });
      }
    }
    if (stateVar === "productUpdates") {
      if (!this.state.productUpdates) {
        await AsyncStorage.setItem("product_updates", "true");
        this.setState({ productUpdates: !this.state.productUpdates });
      } else {
        await AsyncStorage.setItem("product_updates", "false");
        this.setState({ productUpdates: !this.state.productUpdates });
      }
    }
  };

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View>
          <Appbar.Header>
            <Appbar.BackAction onPress={this.handleBackPress} />
            <Appbar.Content title="Notifications" />
          </Appbar.Header>
        </View>

        <Text>{"\n"}</Text>

        <View style={styles.listItem}>
          <Text style={styles.text}>Crime Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              style={styles.switch}
              isOn={this.state.crimeTips}
              onColor="green"
              offColor="gray"
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
              onColor="green"
              offColor="gray"
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
              onColor="green"
              offColor="gray"
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
              onColor="green"
              offColor="gray"
              size="small"
              onToggle={() => this.setAndStoreState("financialTips")}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Text style={styles.text}>Other Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              style={styles.switch}
              isOn={this.state.otherTips}
              onColor="green"
              offColor="gray"
              size="small"
              onToggle={() => this.setAndStoreState("otherTips")}
            />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Text style={styles.text}>Product Updates</Text>
          <View style={styles.switch}>
            <ToggleSwitch
              isOn={this.state.productUpdates}
              onColor="green"
              offColor="gray"
              size="small"
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
    borderBottomColor: "gray",
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
