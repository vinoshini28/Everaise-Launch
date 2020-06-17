import React, { Component } from "react";
import "./App.css";
import Main from "./main/Main";

export default class App extends Component {
  componentDidMount() {
    let root = document.documentElement;
    if (localStorage.getItem("isDark") === undefined) {
      localStorage.setItem("isDark", true);
    }
    if (localStorage.getItem("isDark") === "true") {
      root.style.setProperty("--bg", "#242526");
      root.style.setProperty("--bg-accent", "#484a4d");
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--text-dark", "#484a4d");

      root.style.setProperty("--nav-color", "#484a4d");
      root.style.setProperty("--nav-inner", "white");
      root.style.setProperty("--bg-chat-color", "#484a4d");
      root.style.setProperty("--input-chat-color", "white");
    } else {
      console.log(localStorage.getItem("isDark"));
      console.log("setting light");
      root.style.setProperty("--bg", "#e8e6e6");
      root.style.setProperty("--bg-accent", "#ebebeb");
      root.style.setProperty("--text-color", "#434343");
      root.style.setProperty("--text-dark", "#434343");

      root.style.setProperty("--nav-color", "#d1cdcd");
      root.style.setProperty("--nav-inner", "black");
      root.style.setProperty("--bg-chat-color", "white");
      root.style.setProperty("--input-chat-color", "#edebeb");
    }
  }
  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Main />
          </header>
        </div>
      </>
    );
  }
}
