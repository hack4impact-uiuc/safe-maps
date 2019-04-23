import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import API from "../components/API";
import TipOverview from "../components/TipOverview";
import { NavigationEvents } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  Image,
  ScrollView
} from "react-native";

import {
  Paragraph,
  Appbar,
  Divider,
} from "react-native-paper";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      displayName: "",
      visibleToOthers: true,
      karmaScore: 0,
      verified: false,
      email: "user@illinois.edu",
      verifiedTips: [],
      pendingTips: [],
      deniedTips: []
    };
  }

  async componentDidMount() {
    this._mounted = true;
    await AsyncStorage.setItem("user_id", "5c9d72724497dd272aa31e11");
    let user_id = await AsyncStorage.getItem("user_id");
    let user = await API.getUser(user_id);
    let verifiedTips = await API.getVerifiedTipsByUser(user_id);
    let pendingTips = await API.getPendingTipsByUser(user_id);
    let deniedTips = await API.getDeniedTipsByUser(user_id);

    this.setState({
      user_id,
      displayName: user.username,
      karmaScore: user.karma,
      verified: user.verified,
      verifiedTips,
      pendingTips,
      deniedTips,
      visibleToOthers: !user.anon
    });
  }

  onComponentFocused = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    let user = await API.getUser(user_id);
    let tips = await API.getTipsFromUser(user_id);
    let email = user.net_id + "@illinois.edu";
    
    this.setState({
      displayName: user.username,
      email,
      tips
    });
  };

  handleBackPress = e => {
    this.props.navigation.goBack();
  };

  render() {
    const isEditingName = this.state.isEditingName;
    return (
      <View>
        <ScrollView style={styles.tipOverview}>
          <NavigationEvents onDidFocus={this.onComponentFocused} />
          <View>
              <Appbar.Header>
              <Appbar.BackAction onPress={this.handleBackPress} />
              <Appbar.Content title="Profile" titleStyle = {styles.profileHeader}/>
              <Appbar.Content title = "Settings" titleStyle = {styles.settingsHeader} onPress = {() => this.props.navigation.navigate("Settings")}/>
              </Appbar.Header>
          </View>
          <View style={styles.profile}>
            <Image
              style={{ width: 70, height: 70, marginVertical: 10, borderRadius: 70 / 2 }}
              source={{
                uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
            />
            {isEditingName ? (
              <TextInput
                onChangeText={text => this.setState({ displayName: text })}
                placeholder={this.state.displayName}
              />
            ) : (
              <Text style={styles.header}>{this.state.displayName} </Text>
            )}
            <Text style={styles.subheader}>{this.state.karmaScore} Points </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.profile}>
            <Text>
              Visible to other users?{" "}
              {this.state.visibleToOthers ? "Yes" : "No"}
            </Text>
            {isEditingName ? (
              <Switch
                value={this.state.visibleToOthers}
                onValueChage={this.handleSwitchVisiblity}
              />
            ) : null}
          </View>
          <Divider style={styles.divider} />
          <View style={styles.profile}>
            <Paragraph>
              <FontAwesome name="envelope" size={15} />
              {this.state.email}
            </Paragraph>
          </View>
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
  subheader: {
    fontWeight: "500",
    fontSize: 18
  },
  header: {
    fontSize: 27,
    fontWeight: "500",
  },
  profile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 0
  },
  profileHeader: {
    alignSelf: "center"
  },
  settingsHeader: {
    alignSelf: "flex-end"
  },
  divider: {
    backgroundColor: "black"
  },

  tipOverview: {
    backgroundColor: "white"
  },
  content: {
    marginTop:10,
    paddingHorizontal: 35
  }
});
