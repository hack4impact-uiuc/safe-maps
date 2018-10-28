import React from "react";

import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  Image,
  Animated
} from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";
import ButtonInterface from "./ButtonInterface";

const { height } = Dimensions.get("window");

export default class Panel extends React.Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.75,
      bottom: 120
    }
  };

  draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);
    this.state = {
      toggleLayerList: []
    };
  }

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

  render() {
    return (
      <SlidingUpPanel
        visible
        startCollapsed
        showBackdrop={false}
        ref={this.setRef}
        draggableRange={this.props.draggableRange}
        onDrag={this.setDrag}
      >
        <View style={styles.panel}>
          <ButtonInterface type="Police" ref="button" parentPanel={this} />
          <ButtonInterface type="Lights" ref="button" parentPanel={this} />
        </View>
      </SlidingUpPanel>
    );
  }
}

const styles = {
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    opacity: 0.7
  }
};
