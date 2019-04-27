import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Tag from "../components/Tag";
import API from "./API";
import Loader from "../components/Loader";
import { NavigationEvents } from "react-navigation";
import { latlongToAddress } from "../components/Geocoding";

class TipOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "Loading...",
      username: "",
      userid: "",
      isUpvoted: null,
      isDownvoted: null
    };
  }

  categoryStyle = function(buttonCategory) {
    if (buttonCategory === this.state.category) {
      return {
        backgroundColor: Color[this.state.category]
      };
    }
  };

  async componentDidMount() {
    let user = await API.getUser(this.props.tip.author);
    let userid = user._id;
    let username = user.username;
    let address = await latlongToAddress(
      this.props.tip.latitude,
      this.props.tip.longitude
    );
    if (user.anon) {
      username = "Anonymous";
    }

    this.setState({
      userid: userid,
      username: username,
      address: address
    });
  }

  onComponentFocused = async () => {
    let user = await API.getUser(this.props.tip.author);

    this.setState({
      username: user.username
    });
  };

  setVoteStatus = async () => {
    let upVotedUsers = await API.getUserUpvotes(this.props.tip._id);

    if (
      upVotedUsers.filter(user => user._id === this.state.userid).length > 0
    ) {
      let isUpvoted = true;
      let isDownvoted = false;
      this.setState({
        isUpvoted,
        isDownvoted
      });
    } else {
      let downVotedUsers = await API.getUserDownvotes(this.props.tip._id);
      if (
        downVotedUsers.filter(user => user._id === this.state.userid).length > 0
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

  upvotePress = async () => {
    let data = {
      tips_id: this.props.tip._id,
      user_id: this.state.userid,
      vote_type: "UPVOTE"
    };

    let response = await API.voteTip(data);

    this.setVoteStatus();
  };

  downvotePress = async () => {
    let data = {
      tips_id: this.props.tip._id,
      user_id: this.state.userid,
      vote_type: "DOWNVOTE"
    };

    let response = await API.voteTip(data);

    this.setVoteStatus();
  };

  render() {
    const screenType = this.props.screenType;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("TipDetail", {
            tip: this.props.tip,
            screenType: this.props.screenType,
            tips: this.props.tips
          })
        }
        style={styles.card}
      >
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View style={styles.cardTitle}>
          <View style={styles.tags}>
            <Tag
              key={this.props.tip.category}
              category={this.props.tip.category}
            />
          </View>
          <Text style={styles.tipTitle}>{this.props.tip.title}</Text>
        </View>
        <View style={styles.cardActionsBorder} />
        <View style={styles.cardActions}>
          <View style={styles.leftActions}>
            <Text style={styles.actionText}>
              <FontAwesome name="map-marker" size={16} color="#8E8E93" />{" "}
              {this.state.address}{" "}
            </Text>
            <Text style={styles.actionText}>
              <FontAwesome name="user" size={16} color="#8E8E93" />{" "}
              {this.state.username}
            </Text>
          </View>
          {screenType === "pending" && (
            <View style={styles.rightActionsPending}>
              <Text style={styles.rightActionText}>Review</Text>
            </View>
          )}
          {screenType === "verified" && (
            <View style={styles.rightActions}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.upvotePress}
              >
                <FontAwesome
                  name="chevron-up"
                  size={24}
                  color={this.state.isUpvoted ? "green" : "#8E8E93"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={this.downvotePress}
              >
                <FontAwesome
                  name="chevron-down"
                  size={24}
                  color={this.state.isDownvoted ? "red" : "#8E8E93"}
                />
              </TouchableOpacity>
            </View>
          )}
          {screenType === "denied" && (
            <View>
              <Text>DENIED :(</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginVertical: 10,
    elevation: 7,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 7
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  cardTitle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    backgroundColor: "white"
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 1
  },
  cardActionsBorder: {
    alignItems: "center",
    height: 1.5,
    marginTop: -1.5,
    backgroundColor: "#C7C7CC",
    marginHorizontal: 15
  },
  cardActions: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  leftActions: {
    width: Dimensions.get("window").width - 160
  },
  rightActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 95
  },
  rightActionsPending: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: 95,
    paddingLeft: 30
  },
  rightActionText: {
    color: "#C03303",
    fontSize: 16,
    fontWeight: "500"
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 2
  },
  button: {
    marginLeft: 16
  }
});

export default TipOverview;
