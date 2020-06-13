import React, { useState, Component } from "react";
import "./App.css";
import Main from "./main/Main";
import * as firebase from "firebase";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Main />
            {this.state.apiResponse}
          </header>
        </div>
      </>
    );
  }
}
