import "./Classroom.css";

import React, { Component } from "react";
import { ReactComponent as Right } from "../../../img/icons/arrow-right-solid.svg";
import { ReactComponent as Trash } from "../../../img/icons/trash-solid.svg";

export default class AdminPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      isDisabled: false,
    };
    this.changeAbility = this.changeAbility.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel() {
    this.setState({
      level: (this.state.level + 1) % 3,
    });
  }
  changeAbility() {
    this.setState({
      isDisabled: !this.state.isDisabled,
    });
  }

  render() {
    return (
      <>
        {" "}
        <div
          className={
            "columns message-display " +
            this.state.isDisabled +
            this.state.level
          }
          onClick={this.changeLevel}
          dangerouslySetInnerHTML={{
            __html: this.props.message,
          }}
        ></div>
        <div className={"columns " + this.state.isDisabled + this.state.level}>
          <button
            className={"sendpost " + this.state.isDisabled + this.state.level}
            onClick={this.changeAbility}
          >
            {this.state.level == 0 ? (
              <></>
            ) : this.state.level == 1 ? (
              <Right />
            ) : (
              <Trash />
            )}
          </button>
        </div>
      </>
    );
  }
}
