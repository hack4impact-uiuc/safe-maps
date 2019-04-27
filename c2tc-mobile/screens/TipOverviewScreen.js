import React from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { AsyncStorage } from "react-native";
import TipOverview from "../components/TipOverview";
import API from "../components/API";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    page: state.page
  };
};

const DAY_BACKGROUND_IMG = require("../assets/images/bg-day.png");
const NIGHT_BACKGROUND_IMG = require("../assets/images/bg.png");

class TipOverviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "title",
      content: "content",
      author: "author",
      date: "date posted",
      location: "location",
      proPic:
        "https://pngimage.net/wp-content/uploads/2018/05/default-profile-image-png-5.png",
      username: "",
      user: null,
      currentdate: "",
      greeting: "",
      bgImg: DAY_BACKGROUND_IMG,
      tips: [],
      pendingTips: [],
      hasLoaded: false
    };
  }

  async componentWillMount() {
    await AsyncStorage.setItem("user_id", "5c9d72724497dd272aa31e11");
    let user_id = await AsyncStorage.getItem("user_id");
    if (user_id) {
      let user = await API.getUser(user_id);
      this.setState({
        proPic: user.pro_pic,
        username: user.username,
        user: user
      });
    }
    this.setDate();
    this.setGreeting();
    let tipsResponse = await API.getVerifiedTips();
    this.setState({ tips: tipsResponse, hasLoaded: true });
  }

  onComponentFocused = async () => {
    if (this.state.hasLoaded) {
      let user_id = await AsyncStorage.getItem("user_id");
      if (user_id) {
        let user = await API.getUser(user_id);
        this.setState({
          proPic: user.pro_pic,
          username: user.username,
          user: user
        });
      }
      let tipsResponse = await API.getVerifiedTips();
      this.setState({ tips: tipsResponse });
    }
    let pendingTips = await API.getPendingTips();
    this.setState({ pendingTips });
  };

  profilePicPressed = () => {
    this.props.navigation.navigate("Profile");
  };

  setGreeting = () => {
    let curr_greeting = "";
    let hour = new Date().getUTCHours();

    if (hour <= 4) {
      curr_greeting = "Good Night";
    } else if (hour <= 12) {
      curr_greeting = "Good Morning";
    } else if (hour <= 15) {
      curr_greeting = "Good Afternoon";
    } else if (hour <= 19) {
      curr_greeting = "Good Evening";
    } else {
      curr_greeting = "Good Night";
    }

    this.setState({
      greeting: curr_greeting
    });
  };

  isNight = () => {
    const hour = new Date().getUTCHours();
    return hour <= 4 || hour >= 19;
  };
  setDate = () => {
    date = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const day = date.getDay();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const date_str =
      dayNames[day - 1] +
      " " +
      monthNames[monthIndex] +
      " " +
      year.toString().slice(2);
    this.setState({
      currentdate: date_str
    });
  };

  render() {
    if (this.props.page !== "tips") {
      return this.props.navigation.navigate("Map");
    }
    return (
      <View>
        <Image
          style={styles.backgroundImg}
          source={this.isNight() ? NIGHT_BACKGROUND_IMG : DAY_BACKGROUND_IMG}
        />
        <ScrollView style={styles.tipOverview}>
          <NavigationEvents onDidFocus={this.onComponentFocused} />
          <View style={styles.header}>
            <Text style={styles.date}>
              {this.state.currentdate.toUpperCase()}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.headertext,
                  {
                    alignSelf: "flex-start",
                    width: Dimensions.get("window").width - 104
                  }
                ]}
              >
                {this.state.greeting},{"\n"}
                {this.state.username}
              </Text>
              <TouchableOpacity onPress={this.profilePicPressed}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    alignSelf: "flex-end"
                  }}
                  source={{
                    uri: this.state.proPic
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.contentNav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("TipCategories")}
              >
                <Text style={styles.button}> Submit A Tip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PendingTips", {
                    tips: this.state.pendingTips
                  })
                }
              >
                <Text style={styles.button}> Review Pending Tips </Text>
              </TouchableOpacity>
            </View>
            {this.state.tips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                user={this.state.user}
                tips={this.state.tip}
                navigation={this.props.navigation}
                screenType="verified"
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  tipOverview: {
    marginBottom: 76
  },
  content: {
    paddingHorizontal: 22
  },
  date: {
    color: "white",
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,.75)",
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 7,
    paddingTop: 6
  },
  header: {
    padding: 30,
    paddingTop: 60,
    paddingBottom: 100
  },
  headertext: {
    fontSize: 30,
    paddingTop: 4,
    fontWeight: "600",
    color: "white",
    borderTopColor: "#c7c7cc",
    textShadowColor: "rgba(0,0,0,.75)",
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 7
  },
  button: {
    paddingBottom: 16,
    paddingLeft: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    shadowColor: "rgba(0,0,0,1)",
    textShadowColor: "rgba(0,0,0,.75)",
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 7
  },
  contentNav: {
    flexDirection: "row",
    justifyContent: "flex-start"
  }
});

export default connect(
  mapStateToProps,
  null
)(TipOverviewScreen);
