import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Appbar, TextInput, withTheme } from "react-native-paper";
import API from "../components/API";
import { Location } from "expo";
import Color from "../constants/Colors";
import { addressToLatLong } from "../components/Geocoding";

class TipForm extends React.Component {
  state = {
    title: "",
    body: "",
    category: this.props.navigation.getParam("category", ""),
    author: "Megha Mallya",
    userId: "5c86c850f875c618f8557f40",
    location: null,
    address: "",
    lat: "0",
    lng: "0",
    errors: [],
    touched: {
      title: false,
      body: false,
      category: false,
      author: false,
      userId: false,
      location: false,
      address: false
    }
  };

  async componentWillMount() {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location
    });
  }

  componentDidMount() {
    let editable = this.props.navigation.getParam("edit", false);
    let title = this.props.navigation.getParam("title", "")
    let body = this.props.navigation.getParam("body", "")
    let address = this.props.navigation.getParam("address", "")

    if (editable) {
      this.setState({ title, body, address })
    }
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
    const errors = this.validate();
    if (this.state.address.length !== 0) {
      const latlng = await addressToLatLong(this.state.address);
      this.state.lat = latlng[0];
      this.state.lng = latlng[1];
    }

    if (errors.length === 0) {
      tip = {
        title: this.state.title,
        content: this.state.body,
        user_id: this.state.userId,
        latitude: this.state.lat,
        longitude: this.state.lng,
        category: this.state.category,
        status: "pending"
      };
      if (this.props.navigation.getParam("edit", false)) {
        console.log("Edit Tip")
        await API.editTip(this.props.navigation.getParam("tip_id", 0), tip);
        this.props.navigation.navigate("Profile", {
          user: true
        });
      } else {
        console.log("Submitting Tip")
        console.log(tip)
        await API.createTip(tip);
        this.props.navigation.navigate("TipOverview");
      }
    } else {
      this.setState({ errors });
    }
  };

  validate() {
    const errors = [];

    if (this.state.title.length === 0) {
      errors.push("Name cannot be empty");
    }

    if (this.state.body.length === 0) {
      errors.push("Body cannot be empty");
    }

    if (this.state.address.length === 0) {
      errors.push("Address cannot be empty");
    }

    if (this.state.category.length === 0) {
      errors.push("Please select a category");
    }
    return errors;
  }

  shouldMarkError = field => {
    const hasError = this.validate(this.state.title, this.state.content)[field];
    const shouldShow = this.state.touched[field];
    return hasError ? shouldShow : false;
  };

  validate() {
    const errors = [];

    if (this.state.title.length === 0) {
      errors.push("Name cannot be empty");
    }

    if (this.state.body.length === 0) {
      errors.push("Body cannot be empty");
    }

    if (this.state.address.length === 0) {
      errors.push("Address cannot be empty");
    }

    if (this.state.category.length === 0) {
      errors.push("Please select a category");
    }
    return errors;
  }

  backPress = () => {
    if (this.props.navigation.getParam("edit", false)) {
      this.props.navigation.navigate("Profile") 
    } else {
      this.props.navigation.navigate("TipCategories")
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={this.backPress}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />{" "}
              {this.props.navigation.getParam("edit", false) ? "Back" : "Categories"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handSubmitTip}
            style={styles.submitButton}
          >
            <Text style={styles.headerText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"always"}
          removeClippedSubviews={false}
        >
          <View style={styles.errors}>
            {errors.map(error => (
              <Text key={error}>Error: {error}</Text>
            ))}
          </View>
          <Text style={styles.header}>Tip Title</Text>
          <TextInput
            className={this.shouldMarkError("title") ? "error" : ""}
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
            blurOnSubmit={false}
            multiline={true}
            numberOfLines={5}
            maxHeight={150}
            onChangeText={body => this.setState({ body })}
          />
          <Text style={styles.header}>Tip Address</Text>
          <TextInput
            mode="outlined"
            style={styles.inputBodyContainerStyle}
            label="Tip Address"
            placeholder="Address of your tip"
            value={this.state.address}
            multiline={true}
            numberOfLines={5}
            maxHeight={150}
            onChangeText={address => this.setState({ address })}
          />
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
    flex: 1,
    backgroundColor: "white"
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    marginTop: 0
  },
  inputBodyContainerStyle: {
    marginHorizontal: 20,
    marginTop: 0
  },
  header: {
    fontWeight: "500",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
  },
  errors: {
    borderRadius: 1,
    alignItems: "center",
    borderColor: "red",
    marginBottom: 10
  },
  error: {
    borderRadius: 1,
    borderColor: "red"
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
    marginRight: Dimensions.get("window").width - 235
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  submitHeader: {
    color: "white",
    marginRight: 20
  }
});

export default withTheme(TipForm);
