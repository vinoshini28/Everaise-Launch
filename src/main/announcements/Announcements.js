import React, { Component } from "react";
import "./Announcements.css";
import Card from "../components/card/Card.js";
import * as firebase from "firebase/app";
import 'firebase/database';


export default class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("announcements")
      .once("value")
      .then((snap) => {
        this.setState({
          announcements: snap.val(),
        });
      });
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
    var l = [];
    for (var a in this.state.announcements) {
      l.push(
        <li>
          <div className="OverviewContent">
            <div
              className="CardHeadinner inner"
              style={{ backgroundColor: "#434343" }}
            >
              <div className="CardHeadText left">
                {this.state.announcements[a].title}
              </div>
              <div className="CardHeadText right">
                Posted {this.state.announcements[a].date}
              </div>
            </div>
            <div
              className="CardBodyinner"
              style={{
                background: getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--cardbg2"),
              }}
            >
              {this.state.announcements[a].message}
            </div>
          </div>
        </li>
      );
    }
    return <ul>{l}</ul>;
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
