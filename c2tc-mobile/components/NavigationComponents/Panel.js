import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import ButtonInterface from "./ButtonInterface";
import PhoneButton from "./PhoneButtonInterface";
import Colors from "../../constants/Colors";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    page: state.page,
    markerClicked: state.markerClicked,
    markerTitle: state.markerTitle,
    markerDescription: state.markerDescription
  };
};

const { height, width } = Dimensions.get("window");
const draggableRange = {
  top: height / 1.75,
  bottom: 160
};

class Panel extends Component {
  draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);
  }

  setRef = reference => {
    this._panel = reference;
  };

  setDrag = velocity => {
    this.draggedValue.setValue(velocity);
  };

  render() {
    let filter = this.props.page === "filter";
    return (
      <SlidingUpPanel
        visible
        startCollapsed
        showBackdrop={false}
        ref={this.setRef}
        draggableRange={draggableRange}
        onDrag={this.setDrag}
      >
        <View style={styles.title} key="title">
          {this.props.markerClicked ? (
            <View style={styles.title}>
              <View style={styles.panel}>
                <Text style={styles.filter}>{this.props.markerTitle}</Text>
                <Text>{this.props.markerDescription}</Text>
              </View>
            </View>
          ) : (
            [
              filter ? (
                <View style={styles.panel} key={"filter"}>
                  <Text style={styles.filter}>Filters</Text>
                  <View style={styles.row}>
                    <ButtonInterface
                      icon="bus"
                      name="Bus Stops"
                      type="busStop"
                      ref="button"
                      color={Colors.busStop}
                    />
                    <ButtonInterface
                      icon="exclamation-triangle"
                      name="Crimes"
                      type="crime"
                      ref="button"
                      color={Colors.crime}
                    />
                  </View>
                  <View style={styles.row}>
                    <ButtonInterface
                      icon="shopping-cart"
                      name="Open Businesses"
                      type="business"
                      ref="button"
                      color={Colors.business}
                    />
                    <ButtonInterface
                      icon="phone"
                      name="Emergency Phones"
                      type="emergency"
                      ref="button"
                      color={Colors.emergency}
                    />
                  </View>
                  <View style={styles.row}>
                    <ButtonInterface
                      icon="shield"
                      name="Police Stations"
                      type="policeStations"
                      ref="button"
                      color={Colors.police}
                    />
                    <ButtonInterface
                      icon="lightbulb-o"
                      name="Street lights"
                      type="streetLights"
                      ref="button"
                      color={Colors.streetlights}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.panel} key={"phone"}>
                  <Text style={styles.filter}>Contacts</Text>
                  <View style={styles.row}>
                    <PhoneButton
                      icon="car"
                      name="SafeRide"
                      ref="button"
                      number="2172657433"
                    />
                    <PhoneButton
                      icon="male"
                      name="SafeWalk"
                      ref="button"
                      number="2173331216"
                    />
                  </View>
                </View>
              )
            ]
          )}
        </View>
      </SlidingUpPanel>
    );
  }
}

export default connect(mapStateToProps)(Panel);

const styles = StyleSheet.create({
  panel: {
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    flexDirection: "column",
    opacity: 1,
    borderRadius: 10,
    flexWrap: "wrap"
  },
  title: {
    height: 20,
    width: width,
    flex: 1,
    justifyContent: "center"
  },
  subtitle: {
    fontSize: 15,
    color: "#000000",
    letterSpacing: 0.01,
    lineHeight: 20,
    textAlign: "left"
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  filter: {
    borderRadius: 10,
    width: width,
    fontWeight: "700",
    fontSize: 25,
    padding: 15,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  subtitle: {
    borderRadius: 10,
    width: width,
    fontWeight: "700",
    fontSize: 15,
    padding: 15,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  text: {
    height: 5,
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    width: width,
    fontWeight: "300",
    fontSize: 10,
    padding: 15,
    color: "black",
    textAlign: "left",
    position: "relative"
  }
});
