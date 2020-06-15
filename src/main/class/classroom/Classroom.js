import React, { Component } from "react";
import "./Classroom.css";
import { ReactComponent as Back } from "../../../img/icons/chevron-left-solid.svg";
import { Formik } from "formik";
import * as firebase from "firebase";
import Card from "../../components/card/Card.js";

const convert = require("../../components/classes.json");

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      messages: "",
      subject: this.props.subject,
    };
  }

  componentDidUpdate() {
    if (this.state.viewShown) {
      var chats = document.getElementById("chats");
      chats.scrollTop = chats.scrollHeight;
    }
  }
  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("classroom")
      .child(this.state.subject)
      .on("value", (snap) => {
        this.setState({
          messages: snap.val(),
        });
      });
  }

  getHead() {}
  getBody() {
    var cl = [];
    for (var i = 0; i < 10; i++) {
        cl.push(
            <li className="sent" key={"message" + i}>
            {this.state.messages[i].message}
          </li>
        )
     
    }
    return (
      <>
        <div className="messsages-open" id="messages-open">
          <ul className="messages" id="messages">
            {cl}
          </ul>
        </div>
        <Formik
          initialValues={{
            username: "",
            sentBy: "student",
            message: "",
          }}
          onSubmit={(values, actions) => {
            try {
              var uid = firebase.auth().currentUser.uid;
              firebase.database().ref().child("chat").child(uid).push({
                sentBy: values.sentBy,
                uid: uid,
                username: "",
                message: values.message,
              });
              actions.setSubmitting(false);
              this.setTextInputRef.current.value = "";
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
              <input
                id="message"
                ref={this.setTextInputRef}
                type="text"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ display: this.state.chatShown }}
                className="chat-input"
                placeholder="Type a message..."
              ></input>
            </form>
          )}
        </Formik>
      </>
    );
  }
  render() {
    if (this.props.isAdmin) {
      return;
    } else {
      return (
        <Card
          headText={this.getHead()}
          bodyText={this.getBody()}
          color={getComputedStyle(document.documentElement).getPropertyValue(
            "--" + this.props.subject.toLowerCase() + "-primary"
          )}
          displayBody={true}
          link={true}
          linkColor={true}
        />
      );
    }
  }
}
