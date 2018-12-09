import React from "react";
import {
  Animated,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";

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
        >
          <Image
            style={styles.back}
            source={require("../assets/images/back.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
        <Button
          title="Continue"
          color="black"
          style={styles.button}
          onPress={() => this.props.navigation.navigate("MapScreen")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: width / 10,
    height: height / 10,
    left: 10
  },
  welcome_1: {
    alignSelf: "center",
    width: width / 1.5,
    height: height / 8
  },
  welcome_2: {
    alignSelf: "center",
    width: width * 1.5,
    height: height / 5
  },
  welcome_3: {
    alignSelf: "center",
    width: width / 1.5,
    height: height / 6
  },
  welcome_4: {
    alignSelf: "center",
    width: width / 12,
    height: height / 12,
    margin: 10
  },
  welcome_5: {
    alignSelf: "center",
    width: width / 12,
    height: height / 12,
    margin: 10
  },
  welcome_6: {
    alignSelf: "center",
    width: width / 12,
    height: height / 12,
    margin: 10
  },
  welcome_7: {
    alignSelf: "center",
    width: width * 1.5,
    height: height / 2,
    margin: 10
  },
  welcome_8: {
    alignSelf: "center",
    width: "100%",
    height: 430,
    margin: -300
  },
  button: {
    backgroundColor: "#e5e5ea",
    bottom: 0,
    margin: "auto"
  }
});
