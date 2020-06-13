import React, { Component } from "react";
import "./Handouts.css";
import Card from "../../components/card/Card.js";
import { Editor } from "@tinymce/tinymce-react";

export default class GradeStudent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const postWrap = (
      <Formik
        initialValues={{
          username: this.props.user,
          userid: 35149,
          subject: this.props.subject,
          date: new Date(),
          parent: this.props.parent,
        }}
        onSubmit={(values, actions) => {
          values["post"] = this.state.editorContent;
          setTimeout(() => {
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

            firebase
              .database()
              .ref()
              .child(values["subject"].toLowerCase() + "forumpostsmeta")
              .child(this.state.n + 1)
              .set({
                username: values["username"],
                subject: values["subject"].toLowerCase(),
                title: values["title"],
                date: values["date"],
              });
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
                date: values["date"],
              });

            firebase
              .database()
              .ref()
              .child("metadata")
              .child(values["subject"].toLowerCase() + "posts")
              .set({
                posts: this.state.n + 1,
              });

            console.log(values);
            actions.setSubmitting(false);
            document.getElementById("cancel").click(); //Brendan Eich rolls in his grave
          }, 1000);
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
              className="row"
              style={{
                border: "1px solid lightgray",
                background: "white",
                marginTop: "1rem",
              }}
            ></div>{" "}
            <button type="submit" className="Submit">
              <p className="Post-buttons">Submit</p>
            </button>
            <button type="cancel" id="cancel" className="Cancel">
              <p className="Post-buttons">Cancel</p>
            </button>
            {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
          </form>
        )}
      </Formik>
    );
    return (
      <>
        <div className="row">
          <div className="column"></div>
          <div className="column">postWrap</div>
        </div>
      </>
    );
  }
}
