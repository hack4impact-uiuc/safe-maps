import React from "react";

import TabBar from "../components/NavigationComponents/Tabs";
import { NavigationEvents } from "react-navigation";
import { Provider } from "react-redux";
import { store } from "../Redux";
import TipOverviewScreen from "./TipOverviewScreen";

export default class TipScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TipOverviewScreen navigation={this.props.navigation} />
        <TabBar navigation={this.props.navigation} />
      </Provider>
    );
  }
}
