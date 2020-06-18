import React, { Component } from "react";
import "./Create.css";
import Card from "../../../components/card/Card.js";
import * as firebase from "firebase";

import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

const convert = require("../../../components/classes.json");
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: props.switch,
      editorContent: "",
      n: 0,
      preview: "Preview",
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  renderForm() {}
  handleEditorChange(e) {
    this.setState({
      editorContent: e.target.getContent(),
      preview: e.target.getContent(),
    });
  }
  componentDidUpdate() {
    window.MathJax.typeset();
  }

  render() {
    this.state.switch("View");
    const postWrap = (
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

            //get the number of posts so far in the forum
            firebase
              .database()
              .ref()
              .child("metadata")
              .child(values["subject"].toLowerCase() + "posts")
              .child("posts")
              .on("value", (snap) => {
                this.setState({
                  n: snap.val(),
                });
              });

            //post to meta
            firebase
              .database()
              .ref()
              .child(values["subject"].toLowerCase() + "forumpostsmeta")
              .child(this.state.n + 1)
              .set({
                username: values["username"],
                subject: values["subject"].toLowerCase(),
                title: values["title"],
                date: date,
              });

            //post full
            firebase
              .database()
              .ref()
              .child(values["subject"].toLowerCase() + "forumpostsfull")
              .child(this.state.n + 1)
              .set({
                username: values["username"],
                userid: values["userid"],
                post: values["post"],
                subject: values["subject"].toLowerCase(),
                title: values["title"],
                date: date,
              });

            //update the count
            firebase
              .database()
              .ref()
              .child("metadata")
              .child(values["subject"].toLowerCase() + "posts")
              .set({
                posts: this.state.n + 1,
              });

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
            <div className="row">
              <input
                type="text"
                id="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                name="title"
                className="Text-Box-Form"
                placeholder="Post title"
              />
            </div>{" "}
            <div className="row" style={{ zIndex: -10 }}>
              <Editor
                className="math-editor"
                id="post"
                apiKey="bkx81e9h5xh9bosf6gn8f93ua74txdsu1fneaai2ihdtfg7f"
                init={{
                  height: 500,
                  menubar: false,
                  width: "120vw",

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
              className="row"
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
              onClick={this.state.switch("View")}
            >
              <p className="Post-buttons">Cancel</p>
            </button>
            {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
          </form>
        )}
      </Formik>
    );

    const head = "Create a new post in " + convert[this.props.subject].display;

    return (
      <Card
        headText={<h3>{head}</h3>}
        bodyText={postWrap}
        color={getComputedStyle(document.documentElement).getPropertyValue(
          "--" + this.props.subject.toLowerCase() + "-primary"
        )}
        displayBody={true}
      />
    );
  }
}
