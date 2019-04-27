import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import API from "../components/API";
import TipOverview from "../components/TipOverview";
import ToggleSwitch from "toggle-switch-react-native";
import { NavigationEvents } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Appbar, Divider } from "react-native-paper";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      displayName: "",
      anonymousToOthers: true,
      karmaScore: 0,
      verified: false,
      netId: "",
      user: null,
      verifiedTips: [],
      pendingTips: [],
      deniedTips: [],
      hasLoaded: false
    };
  }

  async componentWillMount() {
    await AsyncStorage.setItem("user_id", "5c9d72724497dd272aa31e11");
    let user_id = await AsyncStorage.getItem("user_id");
    if (user_id) {
      let user = await API.getUser(user_id);
      this.setState({
        user_id,
        displayName: user.username,
        user,
        karmaScore: user.karma,
        verified: user.verified,
        anonymousToOthers: user.anon,
        netId: user.net_id
      });
      let verifiedTips = await API.getVerifiedTipsByUser(user_id);
      this.setState({
        verifiedTips
      });
      let pendingTips = await API.getPendingTipsByUser(user_id);
      let deniedTips = await API.getDeniedTipsByUser(user_id);
      this.setState({
        pendingTips,
        deniedTips,
        hasLoaded: true
      });
    }
  }

  onComponentFocused = async () => {
    if (this.state.hasLoaded) {
      let user = this.props.navigation.getParam("user", null);
      if (user) {
        this.setState({
          user_id: user._id,
          user,
          displayName: user.username
        });
        let verifiedTips = await API.getVerifiedTipsByUser(user_id);
        this.setState({
          verifiedTips
        });
        let pendingTips = await API.getPendingTipsByUser(user_id);
        let deniedTips = await API.getDeniedTipsByUser(user_id);
        this.setState({
          pendingTips,
          deniedTips
        });
      }
    }
  };

  async onChangeVisibility(anonymousToOthers) {
    this.setState({ anonymousToOthers });
    let data = {
      anon: anonymousToOthers
    };
    await API.updateUser(this.state.user_id, data);
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.tipOverview}>
          <NavigationEvents onDidFocus={this.onComponentFocused} />
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TipOverview")}
              style={styles.backButton}
            >
              <Text style={styles.headerText}>
                <FontAwesome name="chevron-left" size={20} color="white" /> Tip
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Settings", {
                  user: this.state.user
                })
              }
              style={styles.settingsButton}
            >
              <Text style={styles.headerText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <Image
              style={{
                width: 70,
                height: 70,
                marginVertical: 10,
                borderRadius: 70 / 2
              }}
              source={{
                uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
            />
            <Text style={styles.header}>{this.state.displayName} </Text>
            <Text style={styles.subheader}>
              {this.state.karmaScore} Points{" "}
            </Text>
          </View>
          {this.state.verified && (
            <View>
              <Divider style={styles.divider} />
              <Text style={styles.dividedText}>Moderator (Verified)</Text>
            </View>
          )}
          <Divider style={styles.divider} />
          <View style={styles.anonView}>
            <Text style={[styles.dividedText, styles.anonText]}>
              Anonymous To Other Users
            </Text>
            <ToggleSwitch
              style={styles.anonToggle}
              isOn={this.state.anonymousToOthers}
              onColor="green"
              offColor="gray"
              size="small"
              onToggle={e => this.onChangeVisibility(e)}
            />
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.dividedText}>
            {this.state.netId}@illinois.edu
          </Text>
          <Divider style={styles.divider} />
          <View style={styles.content}>
            <Text style={styles.subheader}> Posted Tips </Text>
            {this.state.verifiedTips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                navigation={this.props.navigation}
                screenType={"view"}
              />
            ))}
            <Text style={styles.subheader}> Pending Tips </Text>
            {this.state.pendingTips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                navigation={this.props.navigation}
                screenType={"approved"}
              />
            ))}
            <Text style={styles.subheader}> Denied Tips </Text>
            {this.state.deniedTips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                navigation={this.props.navigation}
                screenType={"denied"}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15
  },
  backButton: {
    paddingLeft: 20,
    marginRight: Dimensions.get("window").width - 270
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  settingsHeader: {
    color: "white",
    marginRight: 20
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  subheader: {
    fontWeight: "500",
    fontSize: 18
  },
  dividedText: {
    paddingVertical: 15,
    fontSize: 16,
    alignSelf: "flex-start",
    paddingLeft: 35,
    fontWeight: "400"
  },
  anonView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width
  },
  anonToggle: {
    width: 50
  },
  anonText: {
    width: Dimensions.get("window").width - 100
  },
  header: {
    fontSize: 27,
    fontWeight: "500"
  },
  profile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 0
  },
  // backButton: {
  //   marginRight: 0,
  //   paddingRight: 0
  // },
  // backHeader: {
  //   marginLeft: -10
  // },
  // settingsButton: {
  //   alignSelf: "flex-end"
  // },
  divider: {
    backgroundColor: "black"
  },

  tipOverview: {
    backgroundColor: "white"
  },
  content: {
    marginTop: 15,
    paddingHorizontal: 35
  }
});
