import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import ButtonInterface from "../components/NavigationComponents/ButtonInterface";
import Colors from "../constants/Colors";
class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.tag, { backgroundColor: Colors[this.props.category] }]}
      >
        <Text style={styles.text}>{this.props.category.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    minWidth: 50,
    maxWidth: 100,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    marginRight: 10
  },
  text: {
    color: "white",
    fontSize: 13
  }
});

export default Tag;
