import React, { Component } from "react";
import Card from "../components/card/Card.js";
import "./Grading.css";
import * as firebase from "firebase";

import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

export default class Grading extends Component {
  constructor(props) {
    super(props);
    this.setState({
      studentRequest: "bob",
      dayRequest: "0",
      grader1: "",
      grader2: "",
      studentWork: "<p>I am terrible at maths</p>",
      graderFeedback: "",
    });
    this.getStudentResponse = this.getStudentResponse.bind(this);
  }

  //props.subject, props.user, props.role

  // componentDidUpdate() {
  //   console.log("update");
  // }

  getStudentResponse() {
    firebase
      .database()
      .ref()
      .child("hw")
      .child(document.getElementById("name").value)
      .child(document.getElementById("day").value)
      .on("value", (snap) => {
        this.setState({
          studentWork: snap.val(),
        });
      });
  }
  render() {
    var bodyWrap = (
      <>
        <div className="row">
          <div className="col" style={{ width: "50%" }}>
            <Card
              headText={
                <>
                  <div className="row" style={{ columnGap: "0px" }}>
                    <div
                      className="column"
                      style={{ width: "90%", paddingTop: "15px" }}
                    >
                      Day <input id="day" style={{ width: "10%" }}></input> ID{" "}
                      <input id="name" style={{ width: "25%" }}></input>
                    </div>
                    <div className="column" style={{ width: "10%" }}>
                      <button
                        style={{ backgroundColor: "#354B56", float: "right" }}
                        onClick={this.getStudentResponse}
                      >
                        Load
                      </button>
                    </div>
                  </div>
                </>
              }
              color={"#666666"}
              bgcolor={"white"}
              displayBody={true}
              width={"80%"}
              link={true}
              linkColor={true}
            />
          </div>

          <div className="col" style={{ width: "50%" }}>
            <Card
              bgcolor={"white"}
              headText={
                <>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col" style={{ width: "70%" }}>
                      Score out of 8:
                    </div>
                    <div className="col" style={{ width: "15%" }}>
                      <input id="grade1"></input>
                    </div>
                    <div className="col" style={{ width: "15%" }}>
                      <input id="grade2"></input>
                    </div>
                  </div>
                  <br></br>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col" style={{ width: "40%" }}>
                      Grader
                    </div>
                    <div className="col" style={{ width: "30%" }}>
                      <input id="grader1"></input>
                    </div>
                    <div className="col" style={{ width: "30%" }}>
                      <input id="grader2"></input>
                    </div>
                  </div>
                </>
              }
              bodyText={
                <div className="row">
                  <Formik
                    initialValues={{
                      username: this.props.user,
                      userid: 35149,
                      subject: this.props.subject,
                      date: "",
                      parent: this.props.parent,
                    }}
                    onSubmit={(values, actions) => {
                      values["post"] = this.state.editorContent;
                      try {
                        var date = new Date().getTime(); //in seconds
                        return false;
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
                        <div className="row">
                          <Editor
                            className="math-editor"
                            id="post"
                            apiKey="bkx81e9h5xh9bosf6gn8f93ua74txdsu1fneaai2ihdtfg7f"
                            init={{
                              height: 300,
                              width: "100%",
                              menubar: false,
                              external_plugins: {
                                mathSymbols:
                                  "/your-path-to-plugin/mathsymbols-tinymce-plugin/plugin.min.js",
                              }, // Add plugin to Tinymce

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
                            name="post"
                            onBlur={handleBlur}
                            value={values.post}
                          />
                        </div>
                        <div
                          className="row"
                          style={{
                            border: "1px solid lightgray",
                            background: "white",
                            marginTop: "1rem",
                          }}
                        >
                          {" "}
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              }
              color={"#666666"}
              displayBody={true}
              width={"80%"}
              link={true}
              linkColor={true}
            />

            <br></br>

            <div className="row" style={{ width: "100%" }}></div>
            <br></br>
          </div>
        </div>
        <div className="row">
          {" "}
          <div className="col" style={{ width: "100%" }}>
            <button style={{ backgroundColor: "#CD2F2A" }}>Cancel</button>{" "}
            <button style={{ backgroundColor: "#354B56" }}>Save changes</button>
            <button style={{ backgroundColor: "#38761D", float: "right" }}>
              Mark done (only if graders agree)
            </button>
          </div>
        </div>
      </>
    );
    return (
      <Card
        headText={<h1>Grading</h1>}
        bodyText={bodyWrap}
        color={"#434343"}
        displayBody={true}
        width={"80vw"}
        link={true}
        linkColor={true}
      />
    );
  }
}
