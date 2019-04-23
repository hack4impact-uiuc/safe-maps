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
    this.state = {
      selectedCategory: this.props.navigation.getParam("category", "")
    };
  }

  onCategorySelected(selectedCategory) {
    this.setState({ selectedCategory });
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
            {this.state.selectedCategory !== "" && (
              <Appbar.Content
                title="Next"
                titleStyle={styles.nextHeader}
                onPress={() =>
                  this.props.navigation.navigate("TipForm", {
                    category: this.state.selectedCategory
                  })
                }
              />
            )}
          </Appbar.Header>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.onCategorySelected("crime")}
            style={[
              this.state.selectedCategory !== "crime"
                ? styles.category
                : styles.categorySelected,
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
            onPress={() => this.onCategorySelected("health")}
            style={[
              this.state.selectedCategory !== "health"
                ? styles.category
                : styles.categorySelected,
              { backgroundColor: Colors.health }
            ]}
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
            onPress={() => this.onCategorySelected("transportation")}
            style={[
              this.state.selectedCategory !== "transportation"
                ? styles.category
                : styles.categorySelected,
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
            onPress={() => this.onCategorySelected("financial")}
            style={[
              this.state.selectedCategory !== "financial"
                ? styles.category
                : styles.categorySelected,
              { backgroundColor: Colors.financial }
            ]}
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
  categorySelected: {
    width: (Dimensions.get("window").width - 30) / 2,
    height: (Dimensions.get("window").width - 100) / 2,
    borderWidth: 2,
    borderColor: "black",
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
