import React, { Component } from "react";
import "./Create.css";
import Card from "../../../components/card/Card.js";
const MathJax = window.MathJax;

export default class IndividualPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject,
      post: props.post,
      switch: props.switch,
      editorContent: "",
      n: 0,
      preview: "Preview",
    };
  }
  componentDidUpdate(){
    MathJax.typeset();
  }
  render() {
    const Wrapper = (
      <>
        <div className="row">
          <div className="column"></div>
          <div className="column">
            <h2>{convert[this.state.subject].display}</h2>
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
    if (this.state.data != undefined) {
      var bl = [];

      for (var k = this.state.n; k > 0; k--) {
        bl.push(
          <li>
            <DisplayPost
              user={this.state.data[k]["username"]}
              date={this.state.data[k]["date"]}
              subject={this.props.subject}
              head={this.state.data[k]["title"]}
            />
          </li>
        );
        var w = (
          <>
            {" "}
            <ul>{bl}</ul>
          </>
        );
      }
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
