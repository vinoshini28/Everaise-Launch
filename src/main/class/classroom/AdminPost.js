import "./Classroom.css";

import React, { Component } from "react";
import { ReactComponent as Right } from "../../../img/icons/arrow-right-solid.svg";
import { ReactComponent as Trash } from "../../../img/icons/trash-solid.svg";
import * as firebase from "firebase/app";
import "firebase/database";

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
  componentDidUpdate() {
    window.MathJax.typeset();
  }
  changeAbility() {
    this.setState({
      isDisabled: !this.state.isDisabled,
    });
    if (this.state.level === 1) {
      firebase
        .database()
        .ref()
        .child(this.props.subject.toLowerCase() + "_classroom_queue")
        .child(this.props.key_id)
        .set(null);

      firebase
        .database()
        .ref()
        .child(this.props.subject.toLowerCase() + "_classroom")
        .push({
          isAdmin: this.props.object.isAdmin,
          name: this.props.object.name,
          message: this.props.object.message,
        });
    }
    if (this.state.level === 2) {
      firebase
        .database()
        .ref()
        .child(this.props.subject.toLowerCase() + "_classroom_queue")
        .child(this.props.key_id)
        .set(null);
    }
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
            __html: this.props.object.message,
          }}
        ></div>
        <div className={"columns " + this.state.isDisabled + this.state.level}>
          <button
            className={"sendpost " + this.state.isDisabled + this.state.level}
            onClick={this.changeAbility}
          >
            {this.state.level === 0 ? (
              <></>
            ) : this.state.level === 1 ? (
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
