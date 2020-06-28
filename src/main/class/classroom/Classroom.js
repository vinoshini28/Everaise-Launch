import React, { Component } from "react";
import "./Classroom.css";

import { ReactComponent as Chart } from "../../../img/icons/chart-line-solid.svg";
import { ReactComponent as Dice } from "../../../img/icons/dice-d20-solid.svg";
import { ReactComponent as Rocket } from "../../../img/icons/rocket-solid.svg";
import { ReactComponent as Meteor } from "../../../img/icons/meteor-solid.svg";
import { ReactComponent as Microscope } from "../../../img/icons/microscope-solid.svg";
import { ReactComponent as Sitemap } from "../../../img/icons/sitemap-solid.svg";
import { ReactComponent as Gavel } from "../../../img/icons/gavel-solid.svg";
import { ReactComponent as Times } from "../../../img/icons/times-solid.svg";

import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

import * as firebase from "firebase";

import AdminPost from "./AdminPost.js";

const convert = require("../../components/classes.json");

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      messages: "",
      subject: this.props.subject,
      showAdmin: true,
      preview: "Preview",
      editorContent: "",
      queue: "",
    };
    this.toggleAdminView = this.toggleAdminView.bind(this);
    this.getAdminView = this.getAdminView.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }
  getHead() {
    var icon;
    switch (this.state.subject) {
      case "MathI":
        icon = <Chart />;
        break;
      case "MathII":
        icon = <Dice />;
        break;
      case "PhysicsMechanics":
        icon = <Rocket />;
        break;
      case "Astronomy":
        icon = <Meteor />;
        break;
      case "Linguistics":
        icon = <Sitemap />;
        break;
      case "Biology":
        icon = <Microscope />;
        break;
      default:
        icon = null;
        break;
    }
    return (
      <div className="row rowprime">
        <div className="column">
          <h2>{convert[this.state.subject].display}</h2>
          <h3>Classroom</h3>
        </div>
        <div className="column">
          <p className="Forum-icon">{icon}</p>
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    window.MathJax.typeset();
  }
  deleteAll() {
    firebase
      .database()
      .ref()
      .child(this.props.subject.toLowerCase() + "_classroom")
      .set(null);
    firebase
      .database()
      .ref()
      .child(this.props.subject.toLowerCase() + "_classroom_queue")
      .set(null);
  }
  toggleAdminView() {
    this.setState({
      showAdmin: !this.state.showAdmin,
    });
  }
  handleEditorChange(e) {
    if (e.target.getContent() === "") {
      this.setState({
        editorContent: "",
        preview: "Preview",
      });
    } else {
      this.setState({
        editorContent: e.target.getContent(),
        preview: e.target.getContent(),
      });
    }
  }

  getAdminView() {
    if (this.state.queue !== undefined) {
      var queue_messages = [];
      for (var i in this.state.queue) {
        queue_messages.push(
          <li className="message-admin">
            <AdminPost
              username={
                this.state.queue[i].isAdmin
                  ? this.state.queue[i].name + " (Instructor)"
                  : this.state.queue[i].name
              }
              object={this.state.queue[i]}
              key_id={i}
              subject={this.props.subject}
            ></AdminPost>
          </li>
        );
      }
    }
    if (this.state.showAdmin) {
      return (
        <>
          <a className="gavel-button" onClick={this.toggleAdminView}>
            <Gavel></Gavel>
          </a>
          <a className="times-button" onClick={this.deleteAll}>
            <Times></Times>
          </a>
        </>
      );
    } else {
      return (
        <>
          <a className="gavel-button" onClick={this.toggleAdminView}>
            <Gavel></Gavel>
          </a>
          <a className="times-button" onClick={this.deleteAll}>
            <Times></Times>
          </a>
          <div className="adminpanel">
            <ul className="classroom-messages-admin">{queue_messages}</ul>
          </div>
        </>
      );
    }
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child(this.props.subject.toLowerCase() + "_classroom")
      .on("value", (snap) => {
        this.setState({
          messages: snap.val(),
        });
      });

    firebase
      .database()
      .ref()
      .child(this.props.subject.toLowerCase() + "_classroom_queue")
      .on("value", (snap) => {
        this.setState({
          queue: snap.val(),
        });
      });
  }
  getBody() {
    if (this.state.messages !== undefined) {
      var classroom_messages = [];
      for (var i in this.state.messages) {
        classroom_messages.push(
          <li className="message" id={"classroom_message_" + i}>
            {" "}
            <span className="name">
              {this.state.messages[i].isAdmin
                ? this.state.messages[i].name + " (Instructor)"
                : this.state.messages[i].name}
            </span>{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.messages[i].message,
              }}
            ></div>
          </li>
        );
      }
    }
    return (
      <div className="classroom-content">
        <ul className="classroom-messages">{classroom_messages}</ul>
        <Formik
          initialValues={{
            username: this.props.user,
            subject: this.props.subject,
            date: "",
            parent: this.props.parent,
          }}
          onSubmit={(values, actions) => {
            values.post = this.state.editorContent;
            try {
              firebase
                .database()
                .ref()
                .child(this.props.subject.toLowerCase() + "_classroom_queue")
                .push({
                  isAdmin: this.props.isAdmin,
                  name: this.props.user,
                  message: values.post,
                });
              actions.setSubmitting(false);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row classroom-editor">
                <Editor
                  className="math-editor"
                  id="post"
                  apiKey="bkx81e9h5xh9bosf6gn8f93ua74txdsu1fneaai2ihdtfg7f"
                  init={{
                    height: 200,
                    menubar: false,

                    branding: false,
                    // selector:"#postinputtext",

                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste  ",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic forecolor backcolor | \
                       alignleft aligncenter alignright alignjustify | \
                       bullist numlist outdent indent | removeformat | link image | mathSymbols",
                  }}
                  onChange={this.handleEditorChange}
                  name="post"
                  onBlur={handleBlur}
                  value={values.post}
                />
              </div>
              <div
                className="row classroom-editor preview"
                style={{
                  border: "1px solid lightgray",
                  background: "white",
                  marginTop: "1rem",
                }}
              >
                {" "}
                <div
                  className="preview"
                  dangerouslySetInnerHTML={{ __html: this.state.preview }}
                />
              </div>
              <button type="submit" className="Submit">
                <p className="Post-buttons">Submit</p>
              </button>

              {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
            </form>
          )}
        </Formik>
      </div>
    );
  }
  render() {
    return (
      <>
        <div
          className="CardHead classroom"
          style={{
            background: getComputedStyle(
              document.documentElement
            ).getPropertyValue(
              "--" + this.props.subject.toLowerCase() + "-primary"
            ),
          }}
        >
          <div className="CardHeadText">{this.getHead()}</div>
        </div>
        <div className="CardBody classroom">
          <div className="CardBodyText">{this.getBody()}</div>
        </div>
        {this.props.isAdmin ? this.getAdminView() : <></>}
      </>
    );
  }
}
