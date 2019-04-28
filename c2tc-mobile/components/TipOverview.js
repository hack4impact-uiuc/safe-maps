import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Tag from "../components/Tag";
import API from "./API";
import Loader from "../components/Loader";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from "react-navigation";
import { latlongToAddress } from "../components/Geocoding";

class TipOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "Loading...",
      username: "",
      isUpvoted: false,
      isDownvoted: false,
      verifiedPin: false,
      token: ""
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
    let token = await AsyncStorage.getItem("token");
    let user = await API.getUser(token);
    let verifiedPin = await AsyncStorage.getItem("verifiedPin");
    let address = await latlongToAddress(
      this.props.tip.latitude,
      this.props.tip.longitude
    );

    this.setState({
      user: user,
      username: user.anon ? "Anonymous" : user.username,
      address: address,
      verifiedPin: verifiedPin,
      token: token
    });
    if (this.props.screenType === "verified") {
      this.setVoteStatus();
    }
  }

  onComponentFocused = async () => {
    let token = await AsyncStorage.getItem("token");
    let verifiedPin = await AsyncStorage.getItem("verifiedPin");
    let user = await API.getUser(token);
    let address = await latlongToAddress(
      this.props.tip.latitude,
      this.props.tip.longitude
    );

    this.setState({
      user: user,
      username: user.anon ? "Anonymous" : user.username,
      address: address,
      verifiedPin: verifiedPin,
      token: token
    });
    if (this.props.screenType === "verified") {
      this.setVoteStatus();
    }
  };

  setVoteStatus = async () => {
    if (!this.props.user) {
      return;
    }
    let upVotedUsers = await API.getUserUpvotes(this.props.tip._id);

    if (
      upVotedUsers &&
      upVotedUsers.filter(user => user._id === this.props.user._id).length > 0
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
        downVotedUsers &&
        downVotedUsers.filter(user => user._id === this.props.user._id).length >
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

  upvotePress = async () => {
    if (!this.state.verifiedPin) {
      this.props.navigation.navigate("Alert");
    }
    else {
      this.setState({ isUpvoted: !this.state.isUpvoted, isDownvoted: false });
      let data = {
        tips_id: this.props.tip._id,
        vote_type: "UPVOTE"
      };
      await API.voteTip(data);
    }
  };

  downvotePress = async () => {
    if (!this.state.verifiedPin) {
      this.props.navigation.navigate("Alert");
    }
    else {
      this.setState({ isDownvoted: !this.state.isDownvoted, isUpvoted: false });
      let data = {
        tips_id: this.props.tip._id,
        vote_type: "DOWNVOTE"
      };
      await API.voteTip(data);
    }
  };

  editPress = () => {
    this.props.navigation.navigate("TipForm", {
      category: this.props.tip.category,
      edit: true,
      tip_id: this.props.tip._id,
      body: this.props.tip.content,
      title: this.props.tip.title,
    })
  }

  deletePress = () => {
    Alert.alert(
      'Are you sure you want to Delete?',
      'Deletions are permanent',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => API.deleteTip(this.props.tip._id)},
      ],
      {cancelable: false},
    );
  }

  render() {
    const screenType = this.props.screenType;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("TipDetail", {
            tip: this.props.tip,
            screenType: this.props.screenType,
            tips: this.props.tips,
            upvoted: this.state.isUpvoted,
            downvoted: this.state.isDownvoted,
            author: this.state.user
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
          {this.props.editable === true && (
            <View>
              <Button
                title="Edit"
                onPress={this.editPress}
              />
              <Button
                title="Delete"
                onPress={this.deletePress}
              />
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
    backgroundColor: "#E8E8EA",
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
