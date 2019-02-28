import React from "react";
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import ButtonInterface from "../components/NavigationComponents/ButtonInterface";

const { width, height } = Dimensions.get("window");

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1500 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Intro")}
          style={styles.top_view}
        >
          <Image
            style={styles.back}
            source={require("../assets/images/back.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.view}>
          <FadeInView>
            <Image
              style={styles.welcome_1}
              source={require("../assets/images/welcome/1.png")}
              resizeMode="contain"
            />
            <Image
              style={styles.welcome_2}
              source={require("../assets/images/welcome/2.png")}
              resizeMode="contain"
            />
            <Image
              style={styles.welcome_3}
              source={require("../assets/images/welcome/3.png")}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: -40
              }}
            >
              <Image
                style={styles.welcome_4}
                source={require("../assets/images/welcome/4-1.png")}
                resizeMode="contain"
              />
              <Image
                style={styles.welcome_5}
                source={require("../assets/images/welcome/4-2.png")}
                resizeMode="contain"
              />
              <Image
                style={styles.welcome_6}
                source={require("../assets/images/welcome/4-3.png")}
                resizeMode="contain"
              />
            </View>
            <Image
              style={styles.welcome_7}
              source={require("../assets/images/welcome/5.png")}
              resizeMode="contain"
            />
          </FadeInView>
          <ImageBackground
            style={styles.welcome_8}
            source={require("../assets/images/welcome/6.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.selectedButton}
            onPress={() => this.props.navigation.navigate("MapScreen")}
          >
            <Text style={styles.selectedText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top_view: {
    backgroundColor: "#FFFFFF"
  },
  back: {
    width: 56,
    height: height / 10,
    left: 15,
    marginTop: 20
  },
  welcome_1: {
    alignSelf: "center",
    width: 236,
    marginTop: -10
  },
  welcome_2: {
    alignSelf: "center",
    width: 310,
    marginTop: -150
  },
  welcome_3: {
    alignSelf: "center",
    width: 244,
    marginTop: -110
  },
  welcome_4: {
    alignSelf: "center",
    width: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  welcome_5: {
    alignSelf: "center",
    width: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  welcome_6: {
    alignSelf: "center",
    width: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  welcome_7: {
    alignSelf: "center",
    width: 310,
    marginTop: -270
  },
  welcome_8: {
    position: "absolute",
    top: 0,
    bottom: -550,
    left: 0,
    right: 0
  },
  selectedButton: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    justifyContent: "flex-end",
    marginHorizontal: 20,
    paddingVertical: 17,
    marginTop: -75
  },
  view: {
    height: Dimensions.get("window").height - (110 + width / 10),
    backgroundColor: "#FFFFFF"
  },
  viewButton: {
    height: 150,
    backgroundColor: "white"
  },
  selectedText: {
    color: "white",
    fontSize: 19,
    fontWeight: "600"
  }
});
