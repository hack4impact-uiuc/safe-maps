import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import TipOverview from "../components/TipOverview";

class PendingTipScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: this.props.navigation.getParam("tips", [])
    };
  }

  render() {
    return (
      <ScrollView style={styles.pendingTips}>
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
        <View style={styles.content}>
          <Text style={styles.title}>All Pending Tips</Text>
          {this.state.tips.map(tip => (
            <TipOverview
              key={tip._id}
              tip={tip}
              tips={this.state.tip}
              navigation={this.props.navigation}
              screenType="pending"
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  pendingTips: {
    backgroundColor: "white"
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 10
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#C03303",
    paddingBottom: 15,
    marginBottom: 20
  },
  backButton: {
    paddingLeft: 20,
    marginRight: 20
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  }
});

export default PendingTipScreen;
