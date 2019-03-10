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

class TipDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "title",
      content: "content",
      author: "author",
      date: "date posted",
      location: "location",
      tags: ["safety", "traffic"],
      upvotes: 87
    };
  }

  render() {
    return (
      <View style={styles.detail}>
        <View>
          <Text style={styles.title}>{this.state.title}</Text>
          <View style={styles.tags}>
            {this.state.tags.map(tag => (
              <Tag key={tag} category={tag} />
            ))}
          </View>
          <Text style={styles.content}>{this.state.content}</Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="map-marker" size={17} /> {this.state.location}
          </Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="user" size={17} /> {this.state.author}
          </Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="clock-o" size={17} /> {this.state.date}
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
  title: {
    paddingHorizontal: 10,
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
    marginHorizontal: 10,
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
    padding: 10,
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 17
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
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
    paddingHorizontal: 10,
    fontSize: 17
    // padding:10,
  }
});

export default TipDetailsScreen;
