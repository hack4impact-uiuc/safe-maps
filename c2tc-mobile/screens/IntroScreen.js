import React from "react";
import {
  Animated,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500
    }).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class IntroScreen extends React.Component {
  render() {
    return (
      <FadeInView>
        <ImageBackground
          source={require("../assets/images/welcome/0.png")}
          style={styles.view}
        >
          <ImageBackground
            style={styles.image}
            source={require("../assets/images/welcome/0-1.png")}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Welcome")}
          >
            <Text style={styles.text}>Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </FadeInView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 19,
    fontWeight: "600"
  },
  view: {
    width: "100%",
    height: "100%"
  },
  image: {
    alignSelf: "center",
    width: "90%",
    height: "70%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    justifyContent: "flex-end",
    marginHorizontal: 20,
    paddingVertical: 17,
    marginTop: 120
  }
});
