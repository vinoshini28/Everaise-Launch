import React, { Component } from "react";
import "./Settings.css";
import { ReactComponent as Cog } from "../../img/icons/cog.svg";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                    <label class="switch">
                      <input type="checkbox"></input>
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
                <div className="row row-full">
                  <div className="column">
                    <h3 className="settings-text">Color theme</h3>
                  </div>
                  <div className="column">
                    <label class="switch">
                      <input type="checkbox"></input>
                      <span class="slider"></span>
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
