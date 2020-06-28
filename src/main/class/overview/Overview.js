import React, { Component } from "react";
import "./Overview.css";
import Card from "../../components/card/Card.js";
import * as firebase from "firebase/app";
import 'firebase/database';

import { ReactComponent as Chart } from "../../../img/icons/chart-line-solid.svg";
import { ReactComponent as Dice } from "../../../img/icons/dice-d20-solid.svg";
import { ReactComponent as Rocket } from "../../../img/icons/rocket-solid.svg";
import { ReactComponent as Meteor } from "../../../img/icons/meteor-solid.svg";
import { ReactComponent as Microscope } from "../../../img/icons/microscope-solid.svg";
import { ReactComponent as Sitemap } from "../../../img/icons/sitemap-solid.svg";

const convert = require("../../components/classes.json");

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject,
      calendar: "",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getBody = this.getBody.bind(this);
    this.getHead = this.getHead.bind(this);
  }
  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("overview")
      .child(this.props.subject)
      .child("calendar")
      .once("value")
      .then((snap) => {
        this.setState({
          calendar: snap.val(),
        });
      });
  }

  getHead() {
    var icon;
    switch (this.state.subject) {
      case "MathI":
        icon = <Chart />;
        break;
      case "MathII":
        icon = <Dice />;
        break;
      case "PhysicsMechanics":
        icon = <Rocket />;
        break;
      case "Astronomy":
        icon = <Meteor />;
        break;
      case "Linguistics":
        icon = <Sitemap />;
        break;
      case "Biology":
        icon = <Microscope />;
        break;
      default:
        icon = null;
        break;
    }
    return (
      <div className="row rowprime">
        <div className="column">
          <h2>{convert[this.props.subject].display}</h2>
          <h3>Class Overview</h3>
        </div>
        <div className="column">
          <p className="Forum-icon">{icon}</p>
        </div>
      </div>
    );
  }

  getTable() {
    var cal = [
      <>
        <tr>
          <td>Day</td>
          <td>Date</td>
          <td>Topic and Handout Link</td>
        </tr>
      </>,
    ];
    for (var i in this.state.calendar) {
      cal.push(
        <>
          <tr>
            <td>{i}</td>
            <td>{this.state.calendar[i].Date}</td>
            <td>
              <a href={this.state.calendar[i].Link}>
                {this.state.calendar[i].Topic}
              </a>
            </td>
            <td></td>
          </tr>
        </>
      );
    }
    return (
      <table>
        {" "}
        <tbody>{cal}</tbody>
      </table>
    );
  }
  getBody() {
    return (
      <div className="OverviewContent">
        <div
          className="CardHeadinner"
          style={{
            background: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--single-button"),
          }}
        >
          <div className="CardHeadText">Schedule</div>
        </div>
        <div
          className="CardBodyinner"
          style={{
            background: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--cardbg2"),
          }}
        >
          <div className="CardBodyText">{this.getTable()}</div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <>
        <Card
          headText={this.getHead()}
          bodyText={this.getBody()}
          color={getComputedStyle(document.documentElement).getPropertyValue(
            "--" + this.props.subject.toLowerCase() + "-primary"
          )}
          displayBody={true}
          link={true}
          linkColor={true}
        />
      </>
    );
  }
}
