import React, { Component, useState } from "react";
import Overview from "./overview/Overview";
import Handouts from "./handouts/Handouts";
import Forum from "./forum/Forum";
import Grading from "../grader/Grading.js";
import Chat from "../chat/Chat.js";

import "./Subject.css";

import { ReactComponent as Cog } from "../../img/icons/cog.svg";
import { ReactComponent as Signout } from "../../img/icons/sign-out.svg";

import { ReactComponent as Caret } from "../../img/icons/caret.svg";

import { ReactComponent as Binoculars } from "../../img/icons/binoculars.svg";
import { ReactComponent as Comment } from "../../img/icons/comments.svg";

import { ReactComponent as Book } from "../../img/icons/book.svg";
import { ReactComponent as School } from "../../img/icons/school.svg";
import { ReactComponent as Home } from "../../img/icons/home-solid.svg";
import { ReactComponent as Marker } from "../../img/icons/marker-solid.svg";

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a
        className="icon-button"
        onClick={() => {
          if (props.logout === true) {
            setOpen(!open);
            props.toggle("Login", "");
          } else {
            setOpen(!open);
          }
        }}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function DropdownMenu(propsm) {
  function DropdownItem(props) {
    return (
      <a className="menu-item" onClick={propsm.toggle(props.classSub)}>
        <span className="icon-button">{props.icon}</span>

        {props.children}
      </a>
    );
  }
  return (
    <div className="dropdown">
      <DropdownItem icon={<Binoculars />} classSub={"Overview"}>
        <p>&nbsp; Class Overview</p>
      </DropdownItem>

      <DropdownItem icon={<Comment />} classSub={"Forum"}>
        <p>&nbsp; Forum</p>
      </DropdownItem>
    </div>
  );
}

export default class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Overview",
      switch: props.switch,
      subject: props.subject,
      user: "Jet Chung",
      mod: this.props.role,
    };
    this.types = ["Overview", "Handouts", "Forum", "Classroom", "Grading"];
    this.setType = this.setType.bind(this);
    this.DropdownMenu = DropdownMenu.bind(this);
    this.renderSubCategory = this.renderSubCategory.bind(this);
  }

  setType(type) {
    let typeSetter = () => {
      this.setState({
        type: type,
      });
    };
    typeSetter = typeSetter.bind(this);
    return typeSetter;
  }

  renderButtons() {
    return this.types.map((type) => {
      return (
        <div>
          <button
            className="Nav-Button"
            onClick={this.setType(type)}
            key={type}
          >
            <p className="Nav-Button-label">{type}</p>
          </button>
        </div>
      );
    });
  }

  renderSubCategory() {
    switch (this.state.type) {
      case "Home":
        // this.state.switch("Home", this.state.subject);
        break;
      case "Settings":
        this.state.switch("Settings", "");
        break;
      case "Overview":
        return (
          <Overview
            subject={this.props.subject}
            user={this.props.user}
            role={this.props.role}
          />
        );
      case "Handouts":
        return (
          <Handouts
            subject={this.props.subject}
            day={1}
            user={this.props.user}
            role={this.props.role}
          />
        );
      case "Forum":
        return (
          <Forum
            subject={this.props.subject}
            user={this.props.user}
            role={this.props.role}
          />
        );
      case "Grading":
        return <Grading />;
      default:
        return;
    }
  }

  render() {
    return (
      <>
        <Navbar>
          <NavItem icon={<Caret />}>
            <DropdownMenu
              toggle={this.setType.bind(this)}
              mod={this.props.role}
            />
          </NavItem>
          <NavItem
            logout={true}
            toggle={this.props.switch.bind(
              this,
              "Home",
              this.state.subject.toLowerCase()
            )}
            icon={<Home />}
          ></NavItem>
          <NavItem
            logout={true}
            toggle={this.props.switch.bind(this, "Logout", "")}
            icon={<Signout />}
          ></NavItem>
        </Navbar>{" "}
        <Chat></Chat>
        <br></br>
        <br></br>
        <div className="container">{this.renderSubCategory()}</div>
      </>
    );
  }
}
