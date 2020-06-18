import React, { Component } from "react";
import "./View.css";

var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class DisplayPost extends Component {
  getDate() {
    var dateLocal = new Date(parseInt(this.props.date));
    return `${weekday[dateLocal.getDay()]}, ${
      months[dateLocal.getMonth()]
    } ${dateLocal.getDate()}, ${dateLocal.getFullYear()}, ${dateLocal.getHours()}:${(
      "0" + dateLocal.getMinutes()
    ).slice(-2)} `;
  }
  
  render() {
    var s = "Posted by " + this.props.user + " on " + this.getDate();
    var h = (
      <>
        <div className="column">{this.props.head}</div>
      </>
    );
    var b = (
      <>
        <div className="row">
          <div className="column">{s}</div>
        </div>
      </>
    );
    return (
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
          <div className="CardBodyText">{b}</div>
        </div>
      </div>
    );
  }
}
