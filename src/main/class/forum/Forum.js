import React, { Component } from "react";
import Create from "./create/Create";
import View from "./view/View";
import "./Forum.css";

const MathJax = window.MathJax;


export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "View",
      subject: props.subject,
      switch: props.switch,
    };
    this.types = ["Create", "View"];
  }
  componentDidUpdate(){
    MathJax.typeset();
  }
  setType(type) {
    let typeSetter = () => {
      this.setState({
        type: type,
      });
    };
    typeSetter = typeSetter.bind(this);
    return typeSetter;
  }

  renderSubCategory() {
    switch (this.state.type) {

      case "Create":
        return (
          <Create
            subject={this.props.subject}
            switch={this.setType.bind(this)}
            user={this.props.user}
            role={this.props.role}
          />
        );
      case "View":
        return (
          <View
            subject={this.props.subject}
            switch={this.setType.bind(this)}
            user={this.props.user}
            role={this.props.role}
          />
        );

      default:
        break;
    }
  }

  render() {
    return (
      <>
        <div>{this.renderSubCategory()}</div>
      </>
    );
  }
}
