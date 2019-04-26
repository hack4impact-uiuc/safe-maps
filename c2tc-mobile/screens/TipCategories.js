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
        <View style={styles.header}>
          <Appbar.Header>
            <Appbar.BackAction
              style={styles.backButton}
              onPress={() => this.props.navigation.navigate("TipOverview")}
              style={styles.backButton}
            />
            <Appbar.Content
              titleStyle={styles.backHeader}
              title="Tip Overview"
              onPress={() => this.props.navigation.navigate("TipOverview")}
              style={styles.backButton}
            />
          </Appbar.Header>
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
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  },
  nextHeader: {
    alignSelf: "flex-end"
  }
});

export default TipCategories;
