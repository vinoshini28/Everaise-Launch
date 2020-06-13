import React, { Component } from "react";
import "../Main.css";
import Card from "../components/card/Card.js";
import "./SettingsPage.css";

var head = (
  <h1
    style={{
      color: getComputedStyle(document.documentElement).getPropertyValue(
        "--brownlogo"
      ),
      fontWeight: "900",
      textAlign: "center",
    }}
  >
    Settings
  </h1>
);
var body = (
  <div className="row rowcenter">
    <div className="column">
      {" "}
      <h2
        style={{
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--text-dark"
          ),
          fontWeight: "900",
        }}
      >
        Dark Theme
      </h2>
    </div>

    <div className="column" style={{ paddingTop: "15px", float: "center" }}>
      <label class="switch" style={{ float: "center" }}>
        <input type="checkbox"></input>
        <span class="slider round"></span>
      </label>
    </div>
  </div>
);
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dark: true,
    };
  }

  getBody() {}

  render() {
    return (
      <Card
        headText={head}
        bodyText={body}
        color={getComputedStyle(document.documentElement).getPropertyValue(
          "--yellowlogo"
        )}
        displayBody={true}
        width={"80vw"}
        link={true}
        linkColor={true}
      />
    );
  }
}
