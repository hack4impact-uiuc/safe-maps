import React from "react";
import {
  Animated,
  View,
  Image,
  Text,
  ImageBackground,
  Button,
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
          <Button
            title="Get Started"
            color="white"
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Welcome")}
          />
        </ImageBackground>
      </FadeInView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%"
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e5e5ea",
    margin: "auto",
    position: "absolute",
    justifyContent: "flex-end",
    width: "100%"
  }
});
