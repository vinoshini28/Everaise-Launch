import React, { Component } from "react";
import "./View.css";
import Card from "../../../components/card/Card.js";

import { ReactComponent as Caret } from "../../../../img/icons/caret.svg";

import DisplayPost from "./DisplayPost.js";

import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

import * as firebase from "firebase";

const convert = require("../../../components/classes.json");

const MathJax = window.MathJax;

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject,
      width: "60vw",
      switch: props.switch,
      n: 0,
      data: [],
      zoom: 0,
      user: this.props.user,
      editorContent: "",
      preview: "Preview",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.zoomPost = this.zoomPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.subjects = [
      "MathI",
      "MathII",
      "PhysicsMechanics",
      "Linguistics",
      "Astronomy",
      "Biology",
    ];
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleEditorChange(e) {
    this.setState({
      editorContent: e.target.getContent(),
      preview: e.target.getContent(),
    });
  }
  deletePost(i) {
    firebase
      .database()
      .ref()
      .child(this.state.subject.toLowerCase() + "forumpostsmeta")
      .child(i)
      .set(null);
    firebase
      .database()
      .ref()
      .child(this.state.subject.toLowerCase() + "forumpostsfull")
      .child(i)
      .set(null);
  }
  deleteSubPost(keyPost, keyAuth) {
    firebase
      .database()
      .ref()
      .child(this.state.subject.toLowerCase() + "forumpostsfull")
      .child(this.state.zoom)
      .child("replies")
      .child(keyPost)
      .set(null);
    firebase
      .database()
      .ref()
      .child(this.state.subject.toLowerCase() + "forumpostsfull")
      .child(this.state.zoom)
      .child("replies_authors")
      .child(keyAuth)
      .set(null);
  }

  zoomPost(k) {
    try {
      if (this.state.zoom === 0) {
        var dbRef = firebase
          .database()
          .ref()
          .child(this.props.subject.toLowerCase() + "forumpostsfull");
        dbRef.on("value", (snap) => {
          this.setState({
            data: snap.val(),
          });
        });
        this.setState({
          zoom: k,
        });
      } else {
        this.setState({
          zoom: 0,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  syncData() {
    var dbRef = firebase
      .database()
      .ref()
      .child(this.props.subject.toLowerCase() + "forumpostsmeta");
    dbRef.on("value", (snap) => {
      this.setState({
        data: snap.val(),
      });
    });
  }

  componentDidMount() {
    this.syncData();
    firebase
      .database()
      .ref()
      .child("metadata")
      .child(this.props.subject.toLowerCase() + "posts")
      .child("posts")
      .on("value", (snap) => {
        this.setState({
          n: snap.val(),
        });
      });
  }

  render() {
    const Wrapper = (
      <>
        <div className="row">
          <div className="column">
            <h2 style={{ textAlign: "left", paddingLeft: "10px" }}>
              {convert[this.state.subject].display}
            </h2>
          </div>
          <div className="row">
            {" "}
            <div className="column"></div>
            <div className="column"></div>
            <div className="column">
              <button
                type="submit"
                className="Post"
                onClick={this.state.switch("Create")}
              >
                <p className="Post-buttons">Post</p>
              </button>
            </div>
          </div>
        </div>
      </>
    );
    var w;
    if (this.state.data !== undefined) {
      var bl = [];
      if (this.state.zoom === 0) {
        for (var k = this.state.n; k > 0; k--) {
          try {
            if (this.props.role == "mod") {
              var headWrap = (
                <>
                  <div className="row">
                    <div className="column" style={{ paddingTop: "10px" }}>
                      {this.state.data[k]["title"]}
                    </div>
                    <ul>
                      <li className="nav-item list-thing">
                        <a
                          className="icon-button"
                          onClick={this.zoomPost.bind(this, k)}
                        >
                          {<Caret />}
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              );
            } else {
              var headWrap = (
                <>
                  <div className="row">
                    <div className="column" style={{ paddingTop: "10px" }}>
                      {this.state.data[k]["title"]}
                    </div>
                    <ul>
                      <li
                        className="nav-item list-thing"
                        style={{ float: "right" }}
                      >
                        <a
                          className="icon-button"
                          onClick={this.zoomPost.bind(this, k)}
                        >
                          {<Caret />}
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              );
            }
            bl.push(
              <li>
                <DisplayPost
                  user={this.state.data[k]["username"]}
                  date={this.state.data[k]["date"]}
                  subject={this.props.subject}
                  head={headWrap}
                />
              </li>
            );
          } catch (err) {}
        }
      } else {
        if (this.props.role == "mod") {
          var headWrap = (
            <>
              <div className="row">
                <div className="column" style={{ paddingTop: "10px" }}>
                  {this.state.data[this.state.zoom]["title"]}{" "}
                </div>

                <ul>
                  <li className="nav-item list-thing">
                    <a
                      className="icon-button"
                      onClick={this.zoomPost.bind(this, k)}
                    >
                      {<Caret />}
                    </a>
                  </li>
                </ul>
              </div>
            </>
          );
        } else {
          var headWrap = (
            <>
              <div className="row">
                <div className="column" style={{ paddingTop: "10px" }}>
                  {this.state.data[this.state.zoom]["title"]}{" "}
                </div>

                <li className="nav-item">
                  <a
                    className="icon-button"
                    onClick={this.zoomPost.bind(this, k)}
                  >
                    {<Caret />}
                  </a>
                </li>
              </div>
            </>
          );
        }

        bl.push(
          <li>
            <div>
              <div
                className="CardHead metapost"
                style={{
                  background: getComputedStyle(
                    document.documentElement
                  ).getPropertyValue(
                    "--" + this.props.subject.toLowerCase() + "-primary"
                  ),
                }}
              >
                <div className="CardHeadText metapost">{headWrap}</div>
              </div>
              <div
                className="CardBody metapost"
                style={{
                  background: getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--cardbg2"),
                }}
              >
                <div
                  className="CardBodyText"
                  dangerouslySetInnerHTML={{
                    __html: this.state.data[this.state.zoom]["post"],
                  }}
                ></div>
              </div>
            </div>
          </li>
        );
        try {
          if (
            this.state.data[this.state.zoom]["replies"] !== undefined &&
            Object.keys(this.state.data[this.state.zoom]["replies_authors"]) !==
              undefined &&
            Object.keys(this.state.data[this.state.zoom]["replies"]) !==
              undefined
          ) {
            var replies = this.state.data[this.state.zoom]["replies"];
            var authors = this.state.data[this.state.zoom]["replies_authors"];
            var replyKeys = Object.keys(
              this.state.data[this.state.zoom]["replies"]
            );
            var authorKeys = Object.keys(
              this.state.data[this.state.zoom]["replies_authors"]
            );

            for (var i = 0; i < replyKeys.length; i++) {
              if (this.props.role == "mod") {
                var h = (
                  <>
                    <div className="row">
                      <div className="column" style={{ paddingTop: "10px" }}>
                        Reply by {authors[authorKeys[i]]}{" "}
                      </div>

                      <ul></ul>
                    </div>
                  </>
                );
              } else {
                var h = "Reply by " + authors[authorKeys[i]];
              }
              bl.push(
                <li>
                  <div>
                    <div
                      className="CardHead metapost"
                      style={{
                        background: getComputedStyle(
                          document.documentElement
                        ).getPropertyValue(
                          "--" + this.props.subject.toLowerCase() + "-primary"
                        ),
                      }}
                    >
                      <div className="CardHeadText metapost">{h}</div>
                    </div>
                    <div
                      className="CardBody metapost"
                      style={{
                        background: getComputedStyle(
                          document.documentElement
                        ).getPropertyValue("--cardbg2"),
                      }}
                    >
                      <div
                        className="CardBodyText innertext"
                        dangerouslySetInnerHTML={{
                          __html: replies[replyKeys[i]],
                        }}
                      ></div>
                    </div>
                  </div>
                </li>
              );
            }
          }
          bl.push(
            <li>
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
                    //post reply

                    firebase
                      .database()
                      .ref()
                      .child(
                        this.state.subject.toLowerCase() + "forumpostsfull"
                      )
                      .child(this.state.zoom)
                      .child("replies")
                      .push(values["post"]);

                    firebase
                      .database()
                      .ref()
                      .child(
                        this.state.subject.toLowerCase() + "forumpostsfull"
                      )
                      .child(this.state.zoom)
                      .child("replies_authors")
                      .push(this.state.user);

                    actions.setSubmitting(false);
                    document.getElementById("cancel").click();
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
                    <div className="row editor">
                      <Editor
                        className="math-editor"
                        id="post"
                        apiKey="bkx81e9h5xh9bosf6gn8f93ua74txdsu1fneaai2ihdtfg7f"
                        init={{
                          height: 200,
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
                        onChange={this.handleEditorChange}
                        name="post"
                        onBlur={handleBlur}
                        value={values.post}
                      />
                    </div>
                    <div
                      className="row editor"
                      style={{
                        border: "1px solid lightgray",
                        background: "white",
                        marginTop: "1rem",
                      }}
                    >
                      {" "}
                      <div
                        style={{ padding: "20px" }}
                        rows="5"
                        dangerouslySetInnerHTML={{ __html: this.state.preview }}
                      />
                    </div>
                    <br></br> <br></br>
                    <button type="submit" className="Submit">
                      <p className="Post-buttons">Submit</p>
                    </button>
                    <button
                      type="cancel"
                      id="cancel"
                      className="Cancel"
                      onClick={this.zoomPost.bind(this, k)}
                    >
                      <p className="Post-buttons cancel">Cancel</p>
                    </button>
                    {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
                  </form>
                )}
              </Formik>
            </li>
          );
        } catch (e) {
          console.log(e);
        }
      }
      var w = (
        <>
          {" "}
          <ul>{bl}</ul>
        </>
      );
    } else {
      w = <></>;
    }

    return (
      <>
        <Card
          headText={Wrapper}
          bodyText={w}
          color={getComputedStyle(document.documentElement).getPropertyValue(
            "--" + this.props.subject.toLowerCase() + "-primary"
          )}
          bgcolor={getComputedStyle(document.documentElement).getPropertyValue(
            "--cardbg1"
          )}
          displayBody={true}
          width={this.state.width}
          link={true}
          linkColor={true}
        />
      </>
    );
  }
}
