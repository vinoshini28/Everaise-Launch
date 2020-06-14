import React, { Component } from "react";
import "./Popup.css";
import { ReactComponent as Warning } from "../../../img/icons/exclamation-triangle-solid.svg";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: true,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      shown: !this.state.shown,
    });
  }
  render() {
    if (this.state.shown) {
      return (
        <>
          <div className="warningbody">
            <div className="col">
              <Warning className="warning" />
              {this.props.message}
              {/* <button onClick={this.toggle.bind} className="button"> */}
                {/* Dismiss */}
              {/* </button> */}
            </div>
          </div>
        </>
      );
    } else {
      return;
    }
  }
}
