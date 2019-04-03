import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Tag from "../components/Tag";
import { FontAwesome } from "@expo/vector-icons";
import API from "../components/API";

class TipDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 87,
      username: ""
    };
  }

  async componentDidMount() {
    let author = await API.getUser(
      this.props.navigation.state.params.tip.author
    );
    let username = author.username;
    if (author.anon) {
      username = "Anonymous";
    }

    this.setState({
      username
    });
  }

  render() {
    let tip = this.props.navigation.state.params.tip;

    return (
      <View style={styles.detail}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipOverview")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              <FontAwesome name="chevron-left" size={20} color="#027BFF" /> Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipForm")}
            style={styles.uploadButton}
          >
            <FontAwesome name="upload" size={20} color="#027BFF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>{tip.title}</Text>
          <View style={styles.tags}>
            <Tag key={tip.category} category={tip.category} />
          </View>
          <Text style={styles.content}>{tip.content}</Text>
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
        <View style={styles.action}>
          <View style={styles.leftActions}>
            <Text style={styles.upvotes}>{this.state.upvotes}% Upvoted</Text>
          </View>
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.button}>
              <FontAwesome name="caret-up" size={30} color="#9A9A9A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome name="caret-down" size={30} color="#9A9A9A" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 20,
    width: Dimensions.get("window").width - 45
  },
  backText: {
    color: "#027BFF",
    fontSize: 20
  },
  uploadButton: {
    marginRight: 20
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
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
  action: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#E6E6EB",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  leftActions: {
    width: Dimensions.get("window").width - 145
  },
  rightActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 95
  },
  button: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "white"
  },

  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 17
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 2
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
    // padding:10,
  }
});

export default TipDetailsScreen;
