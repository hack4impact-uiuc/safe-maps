import * as React from "react";

export default class Box extends React.Component {
  render() {
    return (
      <div
        style={{
          border: `2px solid ${this.props.borderColor}`,
          display: "flex",
          padding: ".25rem",
          maxWidth: "15rem",
          minWidth: `10rem`,
          minHeight: "7.5rem",
          borderRadius: ".5rem",
          color: "black"
        }}
        className="nithin"
      >
        <div style={{ margin: "auto" }} className="text">
          {this.props.text}
        </div>
        {this.props.children}
      </div>
    );
  }
}
