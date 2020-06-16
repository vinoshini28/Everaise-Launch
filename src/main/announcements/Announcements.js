import React, { Component } from "react";
import "./Announcements.css";
import Card from "../components/card/Card.js";

export default class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getHead() {
    return (
      <div className="row rowprime">
        <div className="column">
          <h1 className="header">Everaise Academy</h1>
          <h2 className="header">Announcements</h2>
          
        </div>
        <div className="column">
        <p className="Forum-icon">
            <img className="evlogo" alt="circlogo" src="evcirc.png"></img>
          </p>
        </div>
      </div>
    );
  }
  getBody() {
    return (
      <div className="OverviewContent">
        <div
          className="CardHeadinner inner"
          style={{backgroundColor:"#434343"}}
        >
          <div className="CardHeadText left">Estimathon</div>
          <div className="CardHeadText right">Posted June 15</div>
        </div>
        <div
          className="CardBodyinner"
          style={{
            background: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--cardbg2"),
          }}
        >
          We will be hosting an estimathon with Jane Street! Stay tuned for more
          details.
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
          color={"#434343"}
          displayBody={true}
          link={true}
          linkColor={true}
        />
      </>
    );
  }
}
