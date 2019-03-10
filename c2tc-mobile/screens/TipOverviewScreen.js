import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import TipOverview from "../components/TipOverview";

class TipOverviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "title",
      content: "content",
      author: "author",
      date: "date posted",
      location: "location",
      user: "Philip",
      currentdate: "Thursday Feb 28"
    };
  }

  handleAddTipPress = e => {
    console.log("Add a Tip");
  };

  render() {
    return (
      <ScrollView style={styles.tipOverview}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {this.state.currentdate.toUpperCase()}
          </Text>
          <Text style={styles.headertext}>Good Evening,</Text>
          <Text style={styles.headertext}>{this.state.user}!</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={this.handleAddTipPress}>
            <Text style={styles.button}> Submit A Tip ></Text>
          </TouchableOpacity>
          <TipOverview
            navigation={this.props.navigation}
            tip=""
            tags={["safety", "food"]}
            title="Two Theft Incidents at Grainger"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus cursus massa nunc, vitae porttitor felis pulvinar at."
            category="safety"
            location="location"
            author="author"
          />
          <TipOverview
            navigation={this.props.navigation}
            tip=""
            tags={["safety", "traffic"]}
            title="Car Accident on 1st St"
            category="safety"
            location="location"
            author="author"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tipOverview: {
    backgroundColor: "#81573D"
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

export default TipOverviewScreen;
