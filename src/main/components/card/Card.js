import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  render() {
    if (this.props.displayBody) {
      return (
        <>
          <div
            className="CardHead"
            style={{ background: this.props.color, width: this.props.width }}
          >
            <div className="CardHeadText">{this.props.headText}</div>
          </div>
          <div
            className="CardBody"
            style={{ width: this.props.width, background: this.props.bgcolor }}
          >
            <div className="CardBodyText">{this.props.bodyText}</div>
          </div>
        </>
      );
    } else {
      const boxShadow = "0 9px " + this.props.dropColor;
      return (
        <>
          <div
            className="CardHead"
            style={{
              background: this.props.color,
              width: this.props.width,
              boxShadow: boxShadow,
            }}
          >
            <div className="CardHeadText">{this.props.headText}</div>
          </div>
        </>
      );
    }
  }
}
