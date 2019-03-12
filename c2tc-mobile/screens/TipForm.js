import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Dimensions,
  TouchableOpacity,
  Picker
} from "react-native";
import { TextInput, withTheme } from "react-native-paper";
import Tag from "../components/Tag.js";
import API from "../components/API";
import { Location } from "expo";
import Color from "../constants/Colors";

class TipForm extends React.Component {
  state = {
    title: "",
    body: "",
    category: "",
    author: "Megha Mallya",
    userId: "5c86c850f875c618f8557f40",
    location: null
  };

  async componentWillMount() {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location
    });
  }
  setCategory = category => {
    this.setState({ category });
  };
  categoryStyle = function(buttonCategory) {
    if (buttonCategory === this.state.category) {
      return {
        backgroundColor: Color[this.state.category]
      };
    }
  };
  handSubmitTip = async () => {
    tip = {
      title: this.state.title,
      content: this.state.body,
      user_id: this.state.userId,
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
      category: this.state.category
    };
    await API.createTip(tip);
    this.props.navigation.navigate("TipOverview");
  };

  render() {
    const {
      theme: {
        colors: { background }
      }
    } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: background }]}
          keyboardShouldPersistTaps={"always"}
          removeClippedSubviews={false}
        >
          <Text style={[styles.header, { marginTop: 25 }]}>Tip Title</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Tip Title"
            placeholder="Title of your tip"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <Text style={styles.header}>Tip Content</Text>
          <TextInput
            mode="outlined"
            style={styles.inputBodyContainerStyle}
            label="Tip Content"
            placeholder="Content of your tip"
            value={this.state.body}
            onChangeText={body => this.setState({ body })}
          />
          <Text style={styles.header}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.category}
              style={styles.picker}
              onValueChange={this.setCategory}
            >
              <Picker.Item color={Color.campus} label="Campus" value="campus" />
              <Picker.Item color={Color.safety} label="Safety" value="safety" />
              <Picker.Item color={Color.food} label="Food" value="food" />
              <Picker.Item
                color={Color.traffic}
                label="Traffic"
                value="traffic"
              />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.submit_tip}
            onPress={this.handSubmitTip}
          >
            <Text style={styles.button_text}>Submit Tip</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    borderRadius: 5,
    marginLeft: 20
  },
  picker: {
    height: 50,
    width: 200
  },
  wrapper: {
    flex: 1
  },
  inputContainerStyle: {
    margin: 20,
    marginTop: 0
  },
  inputBodyContainerStyle: {
    paddingBottom: 100,
    margin: 20,
    marginTop: 0
  },
  header: {
    fontWeight: "500",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  button_text: {
    color: "white",
    fontSize: 19,
    fontWeight: "600"
  },
  submit_tip: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    paddingVertical: 17,
    marginTop: 30,
    marginLeft: 20
  }
});

export default withTheme(TipForm);
