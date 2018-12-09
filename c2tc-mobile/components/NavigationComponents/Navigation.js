import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import ButtonInterface from "./ButtonInterface";
import PhoneButton from "./PhoneButtonInterface";
import { FontAwesome } from "@expo/vector-icons";
import Tabs from "react-native-tabs";
import Colors from "../../constants/Colors";

const { height, width } = Dimensions.get("window");
const draggableRange = {
  top: height / 1.75,
  bottom: 160
};

export default class Navigation extends Component {
  draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);
    this.state = {
      toggleLayerList: [],
      page: "filter"
    };
  }

  async componentDidMount() {}

  getLayerTypes() {
    var list = this.state.toggleLayerList;
    return list;
  }

  updateLayerList = type => {
    var list = this.state.toggleLayerList;
    var listLength = list.length;

    var isContaining = false;
    for (i = 0; i < listLength; i++) {
      if (list[i] == type) {
        isContaining = true;
        break;
      }
    }

    if (!isContaining) {
      this.state.toggleLayerList.push(type);
    }
  };

  setRef = reference => {
    this._panel = reference;
  };

  setDrag = velocity => {
    this.draggedValue.setValue(velocity);
  };

  getPage() {
    return this.state.page;
  }

  _onSelect = tab => {
    this.props.onDescExit();
    this.setState({ page: tab.props.name });
  };

  render() {
    let filter = this.state.page === "filter";
    return (
      <React.Fragment>
        <SlidingUpPanel
          visible
          startCollapsed
          showBackdrop={false}
          ref={this.setRef}
          draggableRange={draggableRange}
          onDrag={this.setDrag}
        >
          {this.props.description ? (
            <View style={styles.title}>
              <View style={styles.panel}>
                <Text style={styles.filter}>{this.props.descriptionTitle}</Text>
                <Text style={styles.text}>
                  {this.props.descriptionContent[2]}
                </Text>
                <Text style={styles.subtitle}>Crime Type:</Text>
                <Text style={styles.text}>
                  {this.props.descriptionContent[0]}
                </Text>
                <Text style={styles.subtitle}>Crime Description:</Text>
                <Text style={styles.text}>
                  {this.props.descriptionContent[1]}
                </Text>
              </View>
            </View>
          ) : (
            [
              filter ? (
                <View style={styles.title} key="title">
                  <View style={styles.panel}>
                    <Text style={styles.filter}>Filters</Text>
                    <View style={styles.row}>
                      <ButtonInterface
                        icon="bus"
                        name="Bus Stops"
                        type="busStop"
                        ref="button"
                        color={Colors.busStop}
                        parentPanel={this}
                      />
                      <ButtonInterface
                        icon="exclamation-triangle"
                        name="Crimes"
                        type="crime"
                        ref="button"
                        color={Colors.crime}
                        parentPanel={this}
                      />
                    </View>
                    <View style={styles.row}>
                      <ButtonInterface
                        icon="shopping-cart"
                        name="Open Businesses"
                        type="business"
                        ref="button"
                        color={Colors.business}
                        parentPanel={this}
                      />
                      <ButtonInterface
                        icon="phone"
                        name="Emergency Phones"
                        type="emergency"
                        ref="button"
                        color={Colors.emergency}
                        parentPanel={this}
                      />
                    </View>
                    <View style={styles.row}>
                      <ButtonInterface
                        icon="shield"
                        name="Police Stations"
                        type="policeStations"
                        ref="button"
                        color={Colors.police}
                        parentPanel={this}
                      />
                      <ButtonInterface
                        icon="lightbulb-o"
                        name="Street lights"
                        type="streetLights"
                        ref="button"
                        color={Colors.streetlights}
                        parentPanel={this}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.panel}>
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
        </SlidingUpPanel>
        <Tabs
          selected={this.state.page}
          style={styles.tabbg}
          selectedStyle={{ color: "purple" }}
          onSelect={tab => this._onSelect(tab)}
        >
          <Text name="filter" selectedIconStyle={styles.tab}>
            <FontAwesome
              name="map"
              size={32}
              color={filter ? Colors.tabSelected : Colors.tabUnselected}
            />
          </Text>
          <Text name="contact" selectedIconStyle={styles.tab}>
            <FontAwesome
              name="phone"
              size={38}
              color={filter ? Colors.tabUnselected : Colors.tabSelected}
            />
          </Text>
        </Tabs>
      </React.Fragment>
    );
  }
}

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
    // fontFamily: "SFProText-Semibold",
    fontSize: 15,
    color: "#000000",
    letterSpacing: 0.01,
    lineHeight: 20,
    textAlign: "left"
  },
  text: {
    height: 5,
    width: width,
    flex: 1,
    justifyContent: "center"
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
    // height: re,
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
    // height: 15,
    textAlign: "left",
    position: "relative"
  },
  text: {
    borderRadius: 10,
    width: width,
    fontWeight: "300",
    fontSize: 10,
    padding: 15,
    color: "black",
    // height: 15,
    textAlign: "left",
    position: "relative"
  },
  tabbg: {
    borderTopWidth: 0.5,
    borderTopColor: "rgba(142,142,147,0.70)",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    backgroundColor: "white",
    opacity: 1,
    padding: 38
  },
  tab: {
    borderTopWidth: 0,
    borderTopColor: "#c7c7cc"
  }
});
