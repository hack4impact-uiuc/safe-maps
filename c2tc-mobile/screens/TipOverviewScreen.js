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
      user: "",
      currentdate: "",
      greeting: "",
      bgImg: DAY_BACKGROUND_IMG,
      screenType: "view",
      tips: [],
      hasLoaded: false
    };
  }

  async componentWillMount() {
    this.setDate();
    this.setGreeting();
    if (this.state.screenType === "view") {
      let tipsResponse = await API.getVerifiedTips();
      this.setState({ tips: tipsResponse, hasLoaded: true });
    } else if (this.state.screenType === "verification") {
      let tipsResponse = await API.getPendingTips();
      this.setState({ tips: tipsResponse, hasLoaded: true });
    } else {
      let tipsResponse = await API.getTips();
      this.setState({ tips: tipsResponse, hasLoaded: true });
    }
  }

  onComponentFocused = async () => {
    if (this.state.hasLoaded) {
      if (this.state.screenType === "view") {
        let tipsResponse = await API.getVerifiedTips();
        this.setState({ tips: tipsResponse });
      } else if (this.state.screenType === "verification") {
        let tipsResponse = await API.getPendingTips();
        this.setState({ tips: tipsResponse });
      } else {
        let tipsResponse = await API.getTips();
        this.setState({ tips: tipsResponse });
      }
    }
  };

  onChangeScreenType = async () => {
    if (this.state.screenType === "view") {
      this.state.screenType = "verification";
    } else {
      this.state.screenType = "view";
    }
    if (this.state.screenType === "view") {
      let tipsResponse = await API.getVerifiedTips();
      this.setState({ tips: tipsResponse });
    } else if (this.state.screenType === "verification") {
      let tipsResponse = await API.getPendingTips();
      this.setState({ tips: tipsResponse });
    } else {
      let tipsResponse = await API.getTips();
      this.setState({ tips: tipsResponse });
    }
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
      "Thrusday",
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
    const screenStyle = this.state.screenType;
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
          {screenStyle === "view" && (
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
                  Good Evening,{"\n"}
                  {this.state.user}
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
                      uri:
                        "https://facebook.github.io/react-native/docs/assets/favicon.png"
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {screenStyle === "verification" && (
            <View style={styles.header}>
              <Text>All Pending Tips</Text>
            </View>
          )}
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TipCategories")}
            >
              <Text style={styles.button}> Submit A Tip ></Text>
            </TouchableOpacity>
            {screenStyle === "view" && (
              <TouchableOpacity onPress={this.onChangeScreenType}>
                <Text style={styles.button}> Review Pending Tips </Text>
              </TouchableOpacity>
            )}
            {screenStyle === "verification" && (
              <TouchableOpacity onPress={this.onChangeScreenType}>
                <Text style={styles.button}> View Verified Tips </Text>
              </TouchableOpacity>
            )}
            {this.state.tips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                navigation={this.props.navigation}
                screenType={this.state.screenType}
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
    paddingHorizontal: 35
  },
  date: {
    color: "white"
  },
  header: {
    padding: 35,
    paddingTop: 60,
    paddingBottom: 100
  },
  headertext: {
    fontSize: 27,
    fontWeight: "400",
    color: "white",
    borderTopColor: "#c7c7cc"
  },
  button: {
    padding: 10,
    fontSize: 18,
    color: "white"
  }
});

export default connect(
  mapStateToProps,
  null
)(TipOverviewScreen);
