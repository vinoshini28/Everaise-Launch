import React, { Component } from "react";
import "./Settings.css";
import { ReactComponent as Cog } from "../../img/icons/cog.svg";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: localStorage.getItem("isDark") === "true",
    };
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === "isDark" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  componentDidUpdate() {
    let root = document.documentElement;

    if (this.state.isDark) {
      localStorage.setItem("isDark", true);
      root.style.setProperty("--bg", "#242526");
      root.style.setProperty("--bg-accent", "#484a4d");
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--text-dark", "#484a4d");

      root.style.setProperty("--nav-color", "#484a4d");
      root.style.setProperty("--nav-inner", "white");
      root.style.setProperty("--bg-chat-color", "#484a4d");
      root.style.setProperty("--input-chat-color", "white");
    } else {
      localStorage.setItem("isDark", false);

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
        <div className="settingsbody">
          <div className="col">
            <Cog className="cog" />
            <>
              <h2 className="settings-text-header">Settings</h2>

              <div className="container">
                <div className="row row-full">
                  <div className="column">
                    <h3 className="settings-text">Notifications</h3>
                  </div>
                  <div className="column">
                    <label className="switch">
                      <input type="checkbox"></input>
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="row row-full">
                  <div className="column">
                    <h3 className="settings-text">
                      Color theme: {this.state.isDark ? "dark" : "light"}
                    </h3>
                  </div>
                  <div className="column">
                    <label className="switch">
                      <input
                        name="isDark"
                        type="checkbox"
                        checked={this.state.isDark}
                        onChange={this.handleInputChange}
                      ></input>
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </>
    );
  }
}
