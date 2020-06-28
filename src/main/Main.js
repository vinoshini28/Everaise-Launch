import React, { Component } from "react";
import "./Main.css";
import Subject from "./class/Subject";
import Card from "./components/card/Card.js";
import Popup from "./components/popup/Popup.js";

import axios from "axios";

import * as firebase from "firebase/app";
import "firebase/database";
import * as firebaseui from "firebaseui";

import "./firebaseui-styling.global.css";

import { ReactComponent as Chart } from "../img/icons/chart-line-solid.svg";
import { ReactComponent as Dice } from "../img/icons/dice-d20-solid.svg";
import { ReactComponent as Rocket } from "../img/icons/rocket-solid.svg";
import { ReactComponent as Meteor } from "../img/icons/meteor-solid.svg";
import { ReactComponent as Microscope } from "../img/icons/microscope-solid.svg";
import { ReactComponent as Sitemap } from "../img/icons/sitemap-solid.svg";

var config = {
  apiKey: "AIzaSyD9A7ncLDqbdgowx76nPr0VzDDeIhSqg2c",
  authDomain: "launch.everaise.org",
  databaseURL: "https://launch-8f860.firebaseio.com",
  projectId: "launch-8f860",
  storageBucket: "launch-8f860.appspot.com",
  messagingSenderId: "219142134330",
  appId: "1:219142134330:web:ac698c00a674f795987303",
  measurementId: "G-MTDHW1R8D3",
};
firebase.initializeApp(config);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

const convert = require("./components/classes.json");

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Login",
      subject: "",
      switch: props.switch,
      user: "",
      response: "",
      authorized: true,
    };
    this.setSubject = this.setSubject.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayButton = this.displayButton.bind(this);
  }

  componentDidMount() {
    var t = this;
    t.setState({
      user: "Bob",
      authorized: true,
    });
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL) //TODO: fix persistence
            .then(function () {
              firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(function (idToken) {
                  axios
                    .post(
                      "https://everaise-launch-api-ree.uc.r.appspot.com/roles",
                      {
                        uid: authResult.user.uid,
                      }
                    )
                    .then(function (response) {
                      t.setState({
                        response: response.data,
                      });
                      switch (
                        Object.values(response.data).filter(function (value) {
                          return value === true;
                        }).length
                      ) {
                        default:
                          t.setState({
                            user: authResult["user"]["displayName"],
                            authorized: true,
                          });
                          t.setSubject("Home", "");
                          break;
                        case 6:
                          t.setState({
                            user: authResult["user"]["displayName"],
                            authorized: true,
                          });
                          t.setSubject("Home", "");
                          break;
                        case 0:
                          t.setState({
                            authorized: false,
                          });
                          break;
                      }
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                })
                .catch(function (err) {
                  console.log(err);
                });

              return false;
            })
            .catch(function (err) {
              console.log(`${err.code} ${err.message}`);
            });
        },
        uiShown: function () {
          document.getElementById("loader").style.display = "none";
        },
      },
      signInFlow: "popup",
      signInSuccessUrl: "",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl:
        "https://github.com/Everaise-Academy/Everaise-Launch/blob/master/TERMS_AND_CONDITIONS.md",
      privacyPolicyUrl:
        "https://github.com/Everaise-Academy/Everaise-Launch/blob/master/PRIVACY_POLICY.md",
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  displayButton(icon, subject) {
    if (this.state.response[convert[subject]["claim"]]) {
      const shadow =
        "0 9px " +
        getComputedStyle(document.documentElement).getPropertyValue(
          "--" + subject.toLowerCase() + "-secondary"
        );
      return (
        <button
          type="button"
          className="OpenForum"
          onClick={this.setSubject.bind(this, "Class", convert[subject].name)}
          key={convert[subject].name}
          style={{
            backgroundColor: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--" + subject.toLowerCase() + "-primary"),
            boxShadow: shadow,
            borderRadius: "8px",
          }}
        >
          <div className="row">
            <div className="column">
              <p
                className="Open-Forum-label"
                style={{
                  fontSize: "20px",
                }}
              >
                {" "}
                {convert[subject].display}{" "}
              </p>{" "}
            </div>{" "}
            <div className="column">
              <p style={{ textAlign: "right" }}> {icon} </p>{" "}
            </div>{" "}
          </div>{" "}
        </button>
      );
    } else {
      return (
        <div>
          <button
            type="button"
            className="OpenForumno"
            style={{
              backgroundColor: "#666666",
              borderRadius: "8px",
              boxShadow: "0 9px #333333",
            }}
          >
            <div className="row">
              <div className="column">
                <p
                  className="Open-Forum-label"
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {convert[subject].display}{" "}
                </p>{" "}
              </div>{" "}
              <div className="column">
                <p style={{ textAlign: "right" }}>{icon}</p>
              </div>{" "}
            </div>{" "}
          </button>
        </div>
      );
    }
  }

  setSubject(view, subject) {
    this.setState({
      view: view,
      subject: subject,
    });
  }

  render() {
    if (this.state.view === "Login") {
      var head = (
        <h3
          className="signinhead"
          style={{
            color: getComputedStyle(document.documentElement).getPropertyValue(
              "--brownlogo"
            ),
            fontWeight: "900",
          }}
        >
          Sign in to Everaise Launch
          <img alt="loading" src="loading.gif" style={{ width: "60%" }}></img>
        </h3>
      );
      var wrapper = (
        <>
          <div id="firebaseui-auth-container"> </div>{" "}
          <div id="loader"> Loading... </div>{" "}
        </>
      );

      if (this.state.authorized) {
        return (
          <>
            <Card
              headText={head}
              bodyText={wrapper}
              color={getComputedStyle(
                document.documentElement
              ).getPropertyValue("--yellowlogo")}
              displayBody={true}
              width={"400px"}
            />{" "}
          </>
        );
      } else {
        var message = (
          <>
            <h2 className="warning-text-header">
              {" "}
              Your account has not been activated yet.
            </h2>
            <p className="warning-text">Please try again in two days.</p>
            <p className="warning-text">
              Email{" "}
              <a href="mailto:admin@everaise.org" className="mail">
                admin@everaise.org
              </a>{" "}
              if your account has not been activated in two days.
            </p>
            <div style={{ display: "none" }} id="firebaseui-auth-container">
              {" "}
            </div>{" "}
            <div style={{ display: "none" }} id="loader">
              {" "}
              Loading...{" "}
            </div>{" "}
          </>
        );
        return <Popup message={message}></Popup>;
      }
    }
    if (this.state.view === "Logout") {
      window.location.reload(false);
    }
    if (this.state.view === "Home") {
      return (
        <>
          {" "}
          <h3 className="headerlabel"> All Classes </h3>{" "}
          <div className="row">
            <div>
              {" "}
              {this.displayButton(
                <Chart style={{ height: "35px", width: "35px" }} />,
                "MathI"
              )}{" "}
            </div>{" "}
            <div>
              {" "}
              {this.displayButton(
                <Dice style={{ height: "35px", width: "35px" }} />,
                "MathII"
              )}{" "}
            </div>{" "}
          </div>{" "}
          <div className="row">
            <div>
              {" "}
              {this.displayButton(
                <Rocket style={{ height: "35px", width: "35px" }} />,
                "PhysicsMechanics"
              )}{" "}
            </div>{" "}
            <div>
              {" "}
              {this.displayButton(
                <Sitemap style={{ height: "35px", width: "35px" }} />,
                "Linguistics"
              )}{" "}
            </div>{" "}
          </div>{" "}
          <div className="row">
            <div>
              {" "}
              {this.displayButton(
                <Meteor style={{ height: "35px", width: "35px" }} />,
                "Astronomy"
              )}{" "}
            </div>{" "}
            <div>
              {" "}
              {this.displayButton(
                <Microscope style={{ height: "35px", width: "35px" }} />,
                "Biology"
              )}{" "}
            </div>{" "}
          </div>{" "}
        </>
      );
    }

    if (this.state.view === "Class") {
      return (
        <div>
          <br></br>
          <br></br>
          <br></br>{" "}
          <Subject
            switch={this.setSubject.bind(this)}
            subject={this.state.subject}
            user={this.state.user}
            isAdmin={this.state.response.isAdmin}
          />{" "}
        </div>
      );
    } else {
      return;
    }
  }
}
