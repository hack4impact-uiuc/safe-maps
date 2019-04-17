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
import Geocoder from "react-native-geocoding";
import API from "./API";

class TipOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "Grainger",
      username: ""
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
    let username = user.username;
    if (user.anon) {
      username = "Anonymous";
    }

    this.setState({
      username
    });
  }

  render() {
    const screenType = this.props.screenType;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("TipDetail", {
            tip: this.props.tip,
            screenType: this.props.screenType
          })
        }
        style={styles.card}
      >
        <View style={styles.cardTitle}>
          <View style={styles.tags}>
            <Tag
              key={this.props.tip.category}
              category={this.props.tip.category}
            />
          </View>
          <Text style={styles.tipTitle}>{this.props.tip.title}</Text>
        </View>
        <View style={styles.cardActions}>
          <View style={styles.leftActions}>
            <Text style={styles.actionText}>
              <FontAwesome name="map-marker" size={17} /> {this.state.address}{" "}
            </Text>
            <Text style={styles.actionText}>
              <FontAwesome name="user" size={17} /> {this.state.username}
            </Text>
          </View>
          {screenType === "verification" && (
            <View style={styles.rightActions}>
              <TouchableOpacity>
                <Text color="red">Review</Text>
              </TouchableOpacity>
            </View>
          )}
          {screenType === "view" && (
            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="caret-up" size={30} color="#9A9A9A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="caret-down" size={30} color="#9A9A9A" />
              </TouchableOpacity>
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
    borderColor: "black",
    borderWidth: 1
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5
  },
  cardTitle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    backgroundColor: "white"
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  cardActions: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 20,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  leftActions: {
    width: Dimensions.get("window").width - 195
  },
  rightActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 95
  },
  actionText: {
    fontSize: 17
  },
  button: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "white"
  }
});

export default TipOverview;
