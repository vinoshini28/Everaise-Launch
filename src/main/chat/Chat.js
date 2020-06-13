import React, { Component, useState } from "react";
import { ReactComponent as I } from "../../img/icons/i.svg";
import { ReactComponent as Back } from "../../img/icons/chevron-left-solid.svg";
import { Formik } from "formik";
// import { CSSTransition } from "react-transition-group";
import "./Chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewShown: false,
      view: "users",
      user: "",
      role: "admin",
    };
    this.toggleView = this.toggleView.bind(this);
    this.setUser = this.setUser.bind(this);
    this.displayStudent = this.displayStudent.bind(this);
    this.displayView = this.displayView.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
    this.displayChat = this.displayChat.bind(this);
  }

  componentDidUpdate(){
    //student
    //check if view === true, if so set read true
    //if new message and view === false, set read false

    //admin
    

  }
  setUser(i) {
    //pass as uid
    this.setState({
      user: i,
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
    return (
      <>
        <div className="chat-open" id="chat-open">
          <div className="chat-container">
            <ul className="chats">
              {" "}
              <li className="sent">Message 1</li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and standard
                dummy text ever since the 1500s when an unknown typesetting
                industry Lorem Ipsum has been the industry's printer took a
                galley of type and scrambled it to make a type specimen book it
                has?
              </li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="sent">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="received">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book it has?
              </li>
              <li className="sent">Message 3</li>
              <li className="received">Message 4</li>
            </ul>
          </div>
        </div>
        {/*  */}
        <Formik
          initialValues={{
            username: this.state.user,
            uid: this.state.uid,
            sentBy: "student",
            message: "",
            read: false,
          }}
          onSubmit={(values, actions) => {
            try {
              alert(JSON.stringify(values, 2));
              // firebase
              //   .database()
              //   .ref()
              //   .child(
              //     this.state.subject.toLowerCase() + "forumpostsfull"
              //   )
              //   .child(this.state.zoom)
              //   .child("replies")
              //   .push(values["post"]);

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
              <input
                id="message"
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
  displayView() {
    if (this.state.viewShown) {
      if (this.state.role === "student") {
        return this.displayStudent();
      }
      if (this.state.role === "admin") {
        switch (this.state.view) {
          default:
            break;
          case "users":
            return (
              <>
                <div className="chat-open" id="chat-open">
                  <ul className="users-container">
                    <li className="user" onClick={this.setUser.bind(this, 1)}>
                      User 1
                    </li>
                    <li className="user" onClick={this.setUser.bind(this, 2)}>
                      User 2
                    </li>
                    <li className="user" onClick={this.setUser.bind(this, 3)}>
                      User 3
                    </li>
                    <li className="user" onClick={this.setUser.bind(this, 4)}>
                      User 4
                    </li>
                  </ul>
                </div>
              </>
            );

          case "chat":
            return (
              <>
                <div className="chat-open" id="chat-open">
                  <a className="back-button" onClick={this.goBack.bind(this)}>
                    <Back></Back>
                  </a>
                  <div className="chat-container">
                    <ul className="chats">
                      {" "}
                      <li className="sent">Message 1</li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        standard dummy text ever since the 1500s when an unknown
                        typesetting industry Lorem Ipsum has been the industry's
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="sent">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="received">
                        {" "}
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s when an unknown
                        printer took a galley of type and scrambled it to make a
                        type specimen book it has?
                      </li>
                      <li className="sent">Message 3</li>
                      <li className="received">Message 4</li>
                    </ul>
                  </div>
                </div>
                {/*  */}
                <Formik
                  initialValues={{
                    username: this.props.user,
                    uid: 35149,
                    sentBy: "admin",
                    message: "",
                    read: false,
                  }}
                  onSubmit={(values, actions) => {
                    try {
                      alert(JSON.stringify(values, 2));
                      // firebase
                      //   .database()
                      //   .ref()
                      //   .child(
                      //     this.state.subject.toLowerCase() + "forumpostsfull"
                      //   )
                      //   .child(this.state.zoom)
                      //   .child("replies")
                      //   .push(values["post"]);

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
                      <input
                        id="message"
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
        return false;
      }
    } else {
      return false;
    }
  }
  displayUsers() {
    if (this.state.view === "users") {
      return (
        <>
          <div className="chat-open" id="chat-open">
            <ul className="users-container">
              <li className="user" onClick={this.setUser.bind(this, 1)}>
                User 1
              </li>
              <li className="user" onClick={this.setUser.bind(this, 2)}>
                User 2
              </li>
              <li className="user" onClick={this.setUser.bind(this, 3)}>
                User 3
              </li>
              <li className="user" onClick={this.setUser.bind(this, 4)}>
                User 4
              </li>
            </ul>
          </div>
        </>
      );
    }
  }
  displayChat() {
    if (this.state.view === "chat") {
      return (
        <>
          <div className="chat-open" id="chat-open">
            <div className="chat-container">
              <ul className="chats">
                {" "}
                <li className="sent">Message 1</li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="sent">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="received">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book it has?
                </li>
                <li className="sent">Message 3</li>
                <li className="received">Message 4</li>
              </ul>
            </div>
          </div>
          <input
            style={{ display: this.state.chatShown }}
            className="chat-input"
            placeholder="Type a message..."
          ></input>
        </>
      );
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
