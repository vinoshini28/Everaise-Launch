import React, { Component } from "react";
import "./Settings.css";
import { ReactComponent as Cog } from "../../img/icons/cog.svg";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    let root = document.documentElement;

    if (localStorage.getItem("colorScheme") === null) {
      this.setState({
        theme: "dark",
      });
    } else {
      if (this.state.theme === "dark") {
        root.style.setProperty("--bg", "#242526");
        root.style.setProperty("--bg-accent", "#484a4d");
        root.style.setProperty("--text-color", "white");
        root.style.setProperty("--text-dark", "#484a4d");

        root.style.setProperty("--nav-color", "#484a4d");
        root.style.setProperty("--nav-inner", "white");
        root.style.setProperty("--bg-chat-color", "#484a4d");
        root.style.setProperty("--input-chat-color", "white");
      } else {
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
  }
  handleChange() {
    if (this.state.theme === "dark") {
      this.setState({
        theme: "light",
      });
    } else {
      this.setState({
        theme: "dark",
      });
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
                      Color theme: {this.state.theme}
                    </h3>
                  </div>
                  <div className="column">
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={this.handleChange}
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
