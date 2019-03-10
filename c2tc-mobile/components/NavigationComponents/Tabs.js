import React, { Component } from "react";
import Tabs from "react-native-tabs";
import { StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDetailView, updatePage } from "../../Redux.js";

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updatePage,
      updateDetailView
    },
    dispatch
  );
};
const mapStateToProps = state => {
  return { page: state.page };
};

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  _onSelect = tab => {
    this.props.updatePage(tab.props.name);
    this.props.updateDetailView(false, "", "");
  };

  render() {
    let filter = this.props.page;
    return (
      <Tabs
        selected={this.props.page}
        style={styles.tabbg}
        selectedStyle={{ color: "purple" }}
        onSelect={tab => this._onSelect(tab)}
      >
        <Text name="tips" selectedIconStyle={styles.tab}>
          <FontAwesome
            name="users"
            size={32}
            color={
              filter === "tips" ? Colors.tabSelected : Colors.tabUnselected
            }
          />
        </Text>
        <Text name="filter" selectedIconStyle={styles.tab}>
          <FontAwesome
            name="map"
            size={32}
            color={
              filter === "filter" ? Colors.tabSelected : Colors.tabUnselected
            }
          />
        </Text>
        <Text name="contact" selectedIconStyle={styles.tab}>
          <FontAwesome
            name="phone"
            size={38}
            color={
              filter === "contact" ? Colors.tabUnselected : Colors.tabSelected
            }
          />
        </Text>
      </Tabs>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBar);

const styles = StyleSheet.create({
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
