import React, { Component } from "react";
import "./Overview.css";
import Card from "../../components/card/Card.js";

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
    };
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
    const calendar = [
      <>
        <tr>
          <td>Day</td>
          <td>Date</td>

          <td>Topic</td>
        </tr>
      </>,
    ];
    for (var i = 0; i < 26; i++) {
      calendar.push(
        <>
          <tr>
            <td>{i}</td>
            <td>{convert[this.props.subject]["calendar"][i]["Date"]}</td>
            <td>{convert[this.props.subject]["calendar"][i]["Topic"]}</td>
          </tr>
        </>
      );
    }
    return (
      <table>
        {" "}
        <tbody>{calendar}</tbody>
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
