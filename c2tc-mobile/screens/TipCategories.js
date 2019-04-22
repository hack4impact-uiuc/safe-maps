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

class TipCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: "" 
        }
      }
    
    onCategorySelected(selectedCategory){
        this.setState({selectedCategory})
    }
    
  render() {
    return (
        <View style={styles.categories}>
            <View style={styles.backHeader}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("TipOverview")}
                    style={styles.backButton}
                >
                    <Text style={styles.backText}>
                        <FontAwesome name="chevron-left" size={20} color="white" /> Back
                    </Text>
                </TouchableOpacity>
                {this.state.selectedCategory != "" &&
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TipForm', {
                            category: this.state.selectedCategory
                        })}
                        style={styles.nextButton}
                    >
                        <Text style={styles.nextText}>
                            Next
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => this.onCategorySelected("crime")} style={[this.state.selectedCategory !== "crime" ? styles.category : styles.categorySelected, {marginRight: 10, backgroundColor: Colors.crime}]}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>
                            <FontAwesome name="shield" size={40} color="white"/>
                            {"\n"}
                            Crimes
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onCategorySelected("health")} style={[this.state.selectedCategory !== "health" ? styles.category : styles.categorySelected, {backgroundColor: Colors.health}]}>
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
                <TouchableOpacity onPress={() => this.onCategorySelected("transportation")} style={[this.state.selectedCategory !== "transportation" ? styles.category : styles.categorySelected, {marginRight: 10, backgroundColor: Colors.transportation}]}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>
                            <FontAwesome name="bus" size={40} color="white" />
                            {"\n"}
                            Transportation
                        </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onCategorySelected("financial")} style={[this.state.selectedCategory !== "financial" ? styles.category : styles.categorySelected, {backgroundColor: Colors.financial}]}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>
                            <FontAwesome style={styles.categoryIcon} name="credit-card" size={40} color="white" />
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
    backButton: {
        paddingLeft: 20,
        width: Dimensions.get("window").width-60
    },
    nextText: {
        marginTop: 15,
        color: "white",
        fontSize: 17,
        fontWeight: "500"
    },
    backText: {
        marginTop: 15,
        color: "white",
        fontSize: 17
    },
    backHeader: {
        paddingTop:20,
        height:70,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#9042AF",
        marginBottom:10,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    category:{
        width: (Dimensions.get("window").width - 30)/2,
        height: (Dimensions.get("window").width - 100)/2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    categorySelected:{
        width: (Dimensions.get("window").width - 30)/2,
        height: (Dimensions.get("window").width - 100)/2,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    categoryText:{
        color: "white",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    },
    categoryView:{
        flexDirection: "column",
        justifyContent: "center"
    }
});

export default TipCategories;