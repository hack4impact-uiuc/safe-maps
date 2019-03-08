import React, { Component } from "react";
import { Provider } from "react-redux";
import LiveLocation from "./LiveLocation";
import { store } from "../Redux";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <LiveLocation />
      </Provider>
    );
  }
}
