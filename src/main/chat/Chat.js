import React, { Component } from "react";
import { ReactComponent as I } from "../../img/icons/i.svg";
import { ReactComponent as Back } from "../../img/icons/chevron-left-solid.svg";
import { Formik } from "formik";
import * as firebase from "firebase";

// import { CSSTransition } from "react-transition-group";
import "./Chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewShown: false,
      view: "users",
      user: "",
      uid: firebase.auth().currentUser.uid,
      chats: "",
      message: "",
      notify: false,
    };
    this.toggleView = this.toggleView.bind(this);
    this.setUser = this.setUser.bind(this);
    this.displayStudent = this.displayStudent.bind(this);
    this.displayView = this.displayView.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    this.setTextInputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.viewShown) {
      if (this.state.view === "chat") {
        var chats = document.getElementById("chats");
        chats.scrollTop = chats.scrollHeight;
      }
    }
  }
  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("students")
      .on("value", (snap) => {
        this.setState({
          users: snap.val(),
        });
      });
    firebase
      .database()
      .ref()
      .child("notify")
      .on("value", (snap) => {
        this.setState({
          notify: snap.val(),
        });
      });

    if (!this.props.isAdmin) {
      firebase
        .database()
        .ref()
        .child("chat")
        .child(this.state.uid)
        .on("value", (snap) => {
          this.setState({
            chats: snap.val(),
          });
        });
    }
  }

  setUser(uid) {
    firebase
      .database()
      .ref()
      .child("notify")
      .update({
        [uid]: false,
      });
    firebase
      .database()
      .ref()
      .child("chat")
      .child(uid)
      .on("value", (snap) => {
        this.setState({
          chats: snap.val(),
        });
      });
    this.setState({
      uid: uid,
      view: "chat",
    });
  }

  toggleView() {
    this.setState({
      viewShown: !this.state.viewShown,
    });
  }
  goBack() {
    this.setState({
      user: "",
      view: "users",
    });
  }
  displayStudent() {
    var cl = [];
    for (var i in this.state.chats) {
      if (this.state.chats[i].sentBy === "student") {
        cl.push(
          <li className="sent" key={"message" + i}>
            {this.state.chats[i].message}
          </li>
        );
      } else {
        cl.push(
          <li className="received" key={"message" + i}>
            {this.state.chats[i].message}
          </li>
        );
      }
    }
    return (
      <>
        <div className="chat-open" id="chat-open">
          <div className="chat-container">
            <ul className="chats" id="chats">
              {cl}
            </ul>
          </div>
        </div>
        {/*  */}
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, actions) => {
            try {
              firebase
                .database()
                .ref()
                .child("chat")
                .child(this.state.uid)
                .push({
                  sentBy: "student",
                  uid: this.state.uid,
                  message: values.message,
                });
              firebase
                .database()
                .ref()
                .child("notify")
                .update({
                  [this.state.uid]: true,
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
        {/*  */}
      </>
    );
  }
  displayView() {
    if (this.state.viewShown) {
      if (this.props.isAdmin) {
        switch (this.state.view) {
          default:
            break;
          case "users":
            var users_list = [];
            for (var user in this.state.users) {
              var inner =
                this.state.users[user].class +
                " " +
                this.state.users[user].ID +
                " " +
                this.state.users[user].studentName;
              users_list.push(
                <li
                  className={
                    this.state.notify[user] ? "user user-notify" : "user"
                  }
                  onClick={this.setUser.bind(this, user)}
                >
                  {inner}
                </li>
              );
            }
            return (
              <>
                <div className="chat-open" id="chat-open">
                  <ul className="users-container">{users_list}</ul>
                </div>
              </>
            );

          case "chat":
            var cl = [];

            for (var i in this.state.chats) {
              if (this.state.chats[i].sentBy === "admin") {
                cl.push(
                  <li className="sent" key={"message" + i}>
                    {this.state.chats[i].message}
                  </li>
                );
              } else {
                cl.push(
                  <li className="received" key={"message" + i}>
                    {this.state.chats[i].message}
                  </li>
                );
              }
            }
            return (
              <>
                <div className="chat-open" id="chat-open">
                  <a className="back-button" onClick={this.goBack.bind(this)}>
                    <Back className="back-svg"></Back>
                  </a>
                  <div className="chat-container">
                    <ul className="chats" id="chats">
                      {cl}
                    </ul>
                  </div>
                </div>
                {/*  */}
                <Formik
                  initialValues={{ message: "" }}
                  onSubmit={(values, actions) => {
                    try {
                      firebase
                        .database()
                        .ref()
                        .child("chat")
                        .child(this.state.uid)
                        .push({
                          sentBy: "admin",
                          uid: this.state.uid,
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
                {/*  */}
              </>
            );
        }
      } else {
        return this.displayStudent();
      }
    } else {
      return false;
    }
  }

  render() {
    return (
      <>
        <a className="chat-button" onClick={this.toggleView}>
          <I></I>
        </a>
        {this.displayView()}
      </>
    );
  }
}
