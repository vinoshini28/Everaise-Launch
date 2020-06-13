import React, { Component } from "react";
import "./Handouts.css";
import Card from "../../components/card/Card.js";
import { Formik } from "formik";

import { Editor } from "@tinymce/tinymce-react";

import { ReactComponent as Lock } from "../../../img/icons/lock-solid.svg";

import * as firebase from "firebase";

const convert = require("../../components/classes.json");

export default class Handouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject,
      day: 2,
      pdf:
        "https://everaise.org/wp-content/uploads/2020/04/Everaise_MathI_a2.pdf",
      pixelheight: "800px",
      preview: "<p>Preview</p>",
      buttonColor: "#38761D",
      done: false,
    };
    this.subjects = [
      "MathI",
      "MathII",
      "PhysicsMechanics",
      "Linguistics",
      "Astronomy",
      "Biology",
    ];
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.setDay = this.setDay.bind(this);
  }

  componentDidMount() {
    firebase.database().ref().child("biologypdf").set({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",

      11: "",
      12: "",
      13: "",
      14: "",
      15: "",
      16: "",
      17: "",
      18: "",
      19: "",
      20: "",
    });
  }
  handleEditorChange(e) {
    this.setState({
      preview: e.target.getContent(),
    });
    firebase
      .database()
      .ref()
      .child("homework" + 123)
      .child(this.props.subject + this.state.day)
      .set({
        submission: this.state.preview,
      });
  }

  setDay(i) {
    console.log(i);
    this.setState({
      day: i,
    });
    firebase
      .database()
      .ref()
      .child("homework" + 123)
      .child(this.props.subject + i)
      .on("value", (snap) => {
        this.setState({
          post: snap.val()["submission"],
          done: snap.val()["done"],
        });
      });

    firebase
      .database()
      .ref()
      .child(this.props.subject + "pdf")
      .child(i)
      .on("value", (snap) => {
        this.setState({
          post: snap.val()["submission"],
          done: snap.val()["done"],
        });
      });
  }

  getHead() {
    return (
      <section className="basic-grid">
        <button
          type="button"
          className="daycard unlocked"
          onClick={this.setDay.bind(this, 1)}
        >
          1
        </button>
        <button
          className="daycard unlocked"
          onClick={this.setDay.bind(this, 2)}
        >
          2
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>

        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>

        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>

        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
        <button className="daycard locked">
          <Lock className="lock" />
        </button>
      </section>
    );
  }

  markSubmit() {
    firebase
      .database()
      .ref()
      .child("homework" + 123)
      .child(this.props.subject + this.props.day)
      .set({
        done: true,
      });
  }

  savePost() {
    firebase
      .database()
      .ref()
      .child("homework" + 123)
      .child(this.props.subject)
      .child(this.props.day)
      .set({
        submission: document.getElementById("tinymce").innerHTML,
      });
  }

  handleClick(e) {
    alert("Ree");
    e.preventDefault();

    return true;
  }

  getBody() {
    return (
      <>
        <div>
          <div className="pdfcontainer" onContextMenu={this.handleClick}></div>
          <div className="pdfcontent" style={{ height: "100vw" }}>
            <iframe
              className="pdf"
              title="pdf"
              src={this.state.pdf + "#toolbar=0"}
            ></iframe>
          </div>
        </div>
      </>
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
          dropColor={convert[this.state.subject].secondary}
          displayBody={true}
          width={"80vw"}
          link={true}
          linkColor={true}
        />
      </>
    );
  }
}
