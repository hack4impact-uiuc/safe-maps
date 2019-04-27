import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Appbar } from "react-native-paper";

class TipCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.categories}>
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipOverview")}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" /> Tip
              Overview
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TipForm", {
                category: "crime"
              })
            }
            style={[
              styles.category,
              { marginRight: 10, backgroundColor: Colors.crime }
            ]}
          >
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>
                <FontAwesome name="shield" size={40} color="white" />
                {"\n"}
                Crimes
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TipForm", {
                category: "health"
              })
            }
            style={[styles.category, { backgroundColor: Colors.health }]}
          >
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>
                <FontAwesome name="child" size={40} color="white" />
                {"\n"}
                Health
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TipForm", {
                category: "transportation"
              })
            }
            style={[
              styles.category,
              { marginRight: 10, backgroundColor: Colors.transportation }
            ]}
          >
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>
                <FontAwesome name="bus" size={40} color="white" />
                {"\n"}
                Transportation
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TipForm", {
                category: "financial"
              })
            }
            style={[styles.category, { backgroundColor: Colors.financial }]}
          >
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>
                <FontAwesome
                  style={styles.categoryIcon}
                  name="credit-card"
                  size={40}
                  color="white"
                />
                {"\n"}
                Financial
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  category: {
    width: (Dimensions.get("window").width - 30) / 2,
    height: (Dimensions.get("window").width - 100) / 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  categoryText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center"
  },
  categoryView: {
    flexDirection: "column",
    justifyContent: "center"
  },
  header: {
    marginBottom: 20
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
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

export default TipCategories;
