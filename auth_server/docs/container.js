import * as React from "react";

export default class Container extends React.Component {
  render() {
    return (
      <div
        style={{
          flexDirection: this.props.orientation === "column" ? "column" : "row",
          justifyContent: !!this.props.jC ? this.props.jC : "space-around",
          display: "flex"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
