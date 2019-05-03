import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import Tag from "../components/Tag";
import { FontAwesome } from "@expo/vector-icons";
import API from "../components/API";
import { Appbar } from "react-native-paper";

class TipDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      tip: this.props.navigation.state.params.tip,
      screenStyle: this.props.navigation.state.params.screenType,
      tips: this.props.navigation.state.params.tips,
      user: null,
      token: "",
      verifiedPin: false,
      upvotePercentage: "0% Upvoted",
      isDownvoted: this.props.navigation.getParam("downvoted", false),
      isUpvoted: this.props.navigation.getParam("upvoted", false)
    };
  }

  setVoteStatus = async () => {
    if (!this.state.user) {
      return;
    }
    let upVotedUsers = await API.getUserUpvotes(
      this.props.navigation.state.params.tip._id
    );

    if (
      upVotedUsers.filter(user => user._id === this.state.user._id).length > 0
    ) {
      let isUpvoted = true;
      let isDownvoted = false;
      this.setState({
        isUpvoted,
        isDownvoted
      });
    } else {
      let downVotedUsers = await API.getUserDownvotes(
        this.props.navigation.state.params.tip._id
      );
      if (
        downVotedUsers.filter(user => user._id === this.state.user._id).length >
        0
      ) {
        let isUpvoted = false;
        let isDownvoted = true;
        this.setState({
          isUpvoted,
          isDownvoted
        });
      } else {
        let isUpvoted = false;
        let isDownvoted = false;
        this.setState({
          isUpvoted,
          isDownvoted
        });
      }
    }
  };

  async componentDidMount() {
    let author = this.props.navigation.getParam("author", false);
    let user = API.getUser(token);
    let verifiedPin = AsyncStorage.getItem("verifiedPin");
    let token = AsyncStorage.getItem("token");

    await Promise.all([user, verifiedPin, token]).then(result => {
      this.setState({
        username: author.anon ? "Anonymous" : author.username,
        user: result[0],
        verifiedPin: result[1],
        token: result[2]
      });
    });

    let upvoteNumb = this.props.navigation.getParam("upvoteList", []).length;
    let downvoteNumb = this.props.navigation.getParam("downvoteList", [])
      .length;
    let upvotePercentage = "";
    if (upvoteNumb === 0 && downvoteNumb === 0) {
      upvotePercentage = "0% Upvoted";
    } else if (upvoteNumb >= downvoteNumb) {
      upvotePercentage =
        (upvoteNumb / (downvoteNumb + upvoteNumb)) * 100 + "% Upvoted";
    } else {
      upvotePercentage =
        (downvoteNumb / (downvoteNumb + upvoteNumb)) * 100 + "% Downvoted";
    }
    this.setState({ upvotePercentage });
  }

  onComponentFocused = async () => {
    let verifiedPin = await AsyncStorage.getItem("verifiedPin");
    let token = await AsyncStorage.getItem("token");
    this.setState({
      token: token,
      verifiedPin: verifiedPin
    });

    let upvoteNumb = this.props.navigation.getParam("upvoteList", []).length;
    let downvoteNumb = this.props.navigation.getParam("downvoteList", [])
      .length;
    let upvotePercentage = "";
    if (upvoteNumb === 0 && downvoteNumb === 0) {
      upvotePercentage = " 0% Upvoted";
    } else if (upvoteNumb >= downvoteNumb) {
      upvotePercentage =
        (upvoteNumb / (downvoteNumb + upvoteNumb)) * 100 + "% Upvoted";
    } else {
      upvotePercentage =
        (downvoteNumb / (downvoteNumb + upvoteNumb)) * 100 + "% Downvoted";
    }
    this.setState({ upvotePercentage });
    let author = this.props.navigation.getParam("author", false);

    this.setState({
      username: author.anon ? "Anonymous" : author.username
    });
  };

  approvePress = async () => {
    let data = {
      status: "verified"
    };
    await API.updateStatus(this.props.navigation.state.params.tip._id, data);
    this.props.navigation.navigate("TipOverview");
  };

  discardPress = async () => {
    let data = {
      status: "denied"
    };
    await API.updateStatus(this.props.navigation.state.params.tip._id, data);
    this.props.navigation.navigate("TipOverview");
  };

  upvotePress = async () => {
    if (!this.state.verifiedPin) {
      this.props.navigation.navigate("Alert");
    } else {
      this.setState({ isUpvoted: !this.state.isUpvoted, isDownvoted: false });
      let data = {
        tips_id: this.props.navigation.state.params.tip._id,
        vote_type: "UPVOTE"
      };

      await API.voteTip(data, this.state.token);
    }
  };

  downvotePress = async () => {
    if (!this.state.verifiedPin) {
      this.props.navigation.navigate("Alert");
    } else {
      this.setState({ isDownvoted: !this.state.isDownvoted, isUpvoted: false });
      let data = {
        tips_id: this.props.navigation.state.params.tip._id,
        vote_type: "DOWNVOTE"
      };
      await API.voteTip(data, this.state.token);
    }
  };

  render() {
    let tip = this.props.navigation.state.params.tip;
    const screenStyle = this.props.navigation.state.params.screenType;

    return (
      <ScrollView style={styles.detail}>
        {screenStyle === "verified" && (
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TipOverview")}
              style={styles.backButton}
            >
              <Text style={styles.headerText}>
                <FontAwesome name="chevron-left" size={20} color="white" />{" "}
                TipOverview
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {screenStyle === "pending" && (
          <View style={styles.navBarPending}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("PendingTips", {
                  tips: this.state.tips
                })
              }
              style={styles.backButton}
            >
              <Text style={styles.headerText}>
                <FontAwesome name="chevron-left" size={20} color="white" />{" "}
                Pending Tips
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text style={styles.title}>{this.state.tip.title}</Text>
          <View style={styles.tags}>
            <Tag
              key={this.state.tip.category}
              category={this.state.tip.category}
            />
          </View>
          <Text style={styles.content}>{this.state.tip.content}</Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="map-marker" size={17} /> Grainger
          </Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="user" size={17} /> {this.state.username}
          </Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="clock-o" size={17} /> {tip.posted_time}
          </Text>
        </View>

        {screenStyle === "pending" && (
          <View style={styles.verification}>
            <View style={styles.leftActionsVerif}>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={this.discardPress}
              >
                <Text style={styles.verifButtonText}>Discard</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightActionsVerif}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={this.approvePress}
              >
                <Text style={styles.verifButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screenStyle === "verified" && (
          <View style={styles.action}>
            <View style={styles.leftActions}>
              <Text style={styles.upvotes}>{this.state.upvotePercentage}</Text>
            </View>
            <View style={styles.rightActions}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.upvotePress}
              >
                <FontAwesome
                  name="caret-up"
                  size={30}
                  color={this.state.isUpvoted ? "green" : "#8E8E93"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={this.downvotePress}
              >
                <FontAwesome
                  name="caret-down"
                  size={30}
                  color={this.state.isDownvoted ? "red" : "#8E8E93"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    marginTop: 30,
    fontWeight: "500",
    fontSize: 25
  },
  upvotes: {
    margin: 8,
    fontSize: 17
  },
  detail: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  header: {
    marginBottom: 20
  },
  verifButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white"
  },
  action: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#E6E6EB",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verification: {
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftActions: {
    width: Dimensions.get("window").width - 145
  },
  rightActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 95
  },
  leftActionsVerif: {
    width: Dimensions.get("window").width / 3
  },
  rightActionsVerif: {
    width: Dimensions.get("window").width / 3
  },
  button: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "white"
  },
  upvotedButton: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "green"
  },
  downvotedButton: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "red"
  },

  content: {
    paddingVertical: 10,
    marginHorizontal: 22,
    borderBottomColor: "#D4D4D8",
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 17
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
    marginHorizontal: 22,
    borderBottomColor: "#D4D4D8",
    borderBottomWidth: 1
  },
  tip: {
    width: 50,
    height: 25,
    borderTopWidth: 0,
    color: "white",
    borderTopColor: "#c7c7cc"
  },
  postDetails: {
    paddingHorizontal: 20,
    fontSize: 17
  },
  discardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#C03303",
    flexDirection: "row",
    justifyContent: "center"
  },
  approveButton: {
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#358F39",
    justifyContent: "center",
    flexDirection: "row"
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15,
    marginBottom: 0
  },
  navBarPending: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#C03303",
    paddingBottom: 15,
    marginBottom: 30
  },
  backButton: {
    paddingLeft: 20,
    marginRight: Dimensions.get("window").width - 220
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  }
});

export default TipDetailsScreen;
