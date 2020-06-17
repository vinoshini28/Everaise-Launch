import React, { Component } from "react";
import "./Classroom.css";
import { ReactComponent as Back } from "../../../img/icons/chevron-left-solid.svg";
import { Formik } from "formik";
import * as firebase from "firebase";
import Card from "../../components/card/Card.js";

import { ReactComponent as Chart } from "../../../img/icons/chart-line-solid.svg";
import { ReactComponent as Dice } from "../../../img/icons/dice-d20-solid.svg";
import { ReactComponent as Rocket } from "../../../img/icons/rocket-solid.svg";
import { ReactComponent as Meteor } from "../../../img/icons/meteor-solid.svg";
import { ReactComponent as Microscope } from "../../../img/icons/microscope-solid.svg";
import { ReactComponent as Sitemap } from "../../../img/icons/sitemap-solid.svg";
import { ReactComponent as Gavel } from "../../../img/icons/gavel-solid.svg";
import { ReactComponent as Times } from "../../../img/icons/times-solid.svg";

const convert = require("../../components/classes.json");

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      messages: "",
      subject: "MathII",
      showAdmin: true,
    };
    this.toggleAdminView = this.toggleAdminView.bind(this);
    this.getAdminView = this.getAdminView.bind(this);
  }
  getHead() {
    var icon;
    switch (this.state.subject) {
      case "MathI":
        icon = <Chart />;
        break;
      case "MathII":
        icon = <Dice />;
        break;
      case "PhysicsMechanics":
        icon = <Rocket />;
        break;
      case "Astronomy":
        icon = <Meteor />;
        break;
      case "Linguistics":
        icon = <Sitemap />;
        break;
      case "Biology":
        icon = <Microscope />;
        break;
      default:
        icon = null;
        break;
    }
    return (
      <div className="row rowprime">
        <div className="column">
          <h2>{convert[this.state.subject].display}</h2>
          <h3>Classroom</h3>
        </div>
        <div className="column">
          <p className="Forum-icon">{icon}</p>
        </div>
      </div>
    );
  }
  toggleAdminView() {
    this.setState({
      showAdmin: !this.state.showAdmin,
    });
  }
  getAdminView() {
    if (this.state.showAdmin) {
      return (
        <>
          <a className="gavel-button" onClick={this.toggleAdminView}>
            <Gavel></Gavel>
          </a>
        </>
      );
    } else {
      return (
        <>
          <a className="gavel-button" onClick={this.toggleAdminView}>
            <Gavel></Gavel>
          </a>
          <div className="adminpanel">
            <ul className="classroom-messages-admin">
              <li className="message-admin">
                {" "}
                <div className="column message-display">
                  {" "}
                  <button className="remove">
                    <Times></Times>
                  </button>
                  <span className="name">모든 국민은:</span> 신체의 자유를
                  가진다, 명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가
                  재판의 전제가 된 경우에는 대법원은 이를 최종적으로 심사할
                  권한을 가진다. 어떠한 형태로도 이를 창설할 수 없다. 사영기업을
                  국유 또는 공유로 이전하거나 그 경영을 통제 또는 관리할 수
                  없다.
                </div>
              </li>
            </ul>
          </div>
        </>
      );
    }
  }

  getBody() {
    return (
      <div className="classroom-content">
        <ul className="classroom-messages">
          <li className="message">
            {" "}
            <span className="name">모든 국민은:</span> 신체의 자유를 가진다,
            명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가
            된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 어떠한
            형태로도 이를 창설할 수 없다. 사영기업을 국유 또는 공유로 이전하거나
            그 경영을 통제 또는 관리할 수 없다.
          </li>
          <li className="message">
            <span className="name">국무총리:</span> 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
            존중함을 기본으로 한다. 대한민국의 경제질서는 개인과 기업의 경제상의
            자유와 창의를 존중함을 기본으로 한다. 대통령은 국회에 출석하여
            발언하거나 서한으로 의견을 표시할 수 있다.
          </li>
          <li className="message">
            {" "}
            <span className="name">사면감 형및:</span> 복권에 관한 사항은 법률로
            정한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원
            과반수의 출석과 출석의원 과반수의 찬성으로 의결한다,
            국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
            그러나.
          </li>
          <li className="message">
            <span className="name">사면 감형:</span> 및사면·감형 및 복권에 관한
            사항은 법률로 정한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
            재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다,
            국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
            그러나.
          </li>
          <li className="message">
            <span className="name">감사위 원은:</span> 원장의 제청으로 대통령이
            임명하고. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나
            불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는
            바에 의하여 인정된다. 평화통일정책의 수립에 관한 대통령의 자문에
            응하기 위하여 민주평화통일자문회의를 둘 수 있다, 정부나 법원의
            권한에 관하여 특별한 조치를 할 수 있다.
          </li>
          <li className="message">
            <span className="name">주권의 제약에</span> 관한 조약. 대한민국은
            민주공화국이다. 헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은
            확정되며. 다만.
          </li>
          <li className="message">
            <span className="name">모든 국민은:</span> 신체의 자유를 가진다,
            명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가
            된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 어떠한
            형태로도 이를 창설할 수 없다. 사영기업을 국유 또는 공유로 이전하거나
            그 경영을 통제 또는 관리할 수 없다.
          </li>
          <li className="message">
            <span className="name">국무총리:</span> 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
            존중함을 기본으로 한다. 대한민국의 경제질서는 개인과 기업의 경제상의
            자유와 창의를 존중함을 기본으로 한다. 대통령은 국회에 출석하여
            발언하거나 서한으로 의견을 표시할 수 있다.
          </li>
          <li className="message">
            {" "}
            <span className="name">모든 국민은:</span> 신체의 자유를 가진다,
            명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가
            된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 어떠한
            형태로도 이를 창설할 수 없다. 사영기업을 국유 또는 공유로 이전하거나
            그 경영을 통제 또는 관리할 수 없다.
          </li>
          <li className="message">
            <span className="name">국무총리:</span> 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
            존중함을 기본으로 한다. 대한민국의 경제질서는 개인과 기업의 경제상의
            자유와 창의를 존중함을 기본으로 한다. 대통령은 국회에 출석하여
            발언하거나 서한으로 의견을 표시할 수 있다.
          </li>
          <li className="message">
            {" "}
            <span className="name">사면감 형및:</span> 복권에 관한 사항은 법률로
            정한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원
            과반수의 출석과 출석의원 과반수의 찬성으로 의결한다,
            국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
            그러나.
          </li>
          <li className="message">
            <span className="name">사면 감형:</span> 및사면·감형 및 복권에 관한
            사항은 법률로 정한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
            재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다,
            국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
            그러나.
          </li>
          <li className="message">
            <span className="name">감사위 원은:</span> 원장의 제청으로 대통령이
            임명하고. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나
            불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는
            바에 의하여 인정된다. 평화통일정책의 수립에 관한 대통령의 자문에
            응하기 위하여 민주평화통일자문회의를 둘 수 있다, 정부나 법원의
            권한에 관하여 특별한 조치를 할 수 있다.
          </li>
          <li className="message">
            <span className="name">주권의 제약에</span> 관한 조약. 대한민국은
            민주공화국이다. 헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은
            확정되며. 다만.
          </li>
          <li className="message">
            <span className="name">모든 국민은:</span> 신체의 자유를 가진다,
            명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가
            된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 어떠한
            형태로도 이를 창설할 수 없다. 사영기업을 국유 또는 공유로 이전하거나
            그 경영을 통제 또는 관리할 수 없다.
          </li>
          <li className="message">
            <span className="name">국무총리:</span> 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
            존중함을 기본으로 한다. 대한민국의 경제질서는 개인과 기업의 경제상의
            자유와 창의를 존중함을 기본으로 한다. 대통령은 국회에 출석하여
            발언하거나 서한으로 의견을 표시할 수 있다.
          </li>
          <li className="message">
            {" "}
            <span className="name">모든 국민은:</span> 신체의 자유를 가진다,
            명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가
            된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 어떠한
            형태로도 이를 창설할 수 없다. 사영기업을 국유 또는 공유로 이전하거나
            그 경영을 통제 또는 관리할 수 없다.
          </li>
          <li className="message">
            <span className="name">국무총리:</span> 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
            존중함을 기본으로 한다. 대한민국의 경제질서는 개인과 기업의 경제상의
            자유와 창의를 존중함을 기본으로 한다. 대통령은 국회에 출석하여
            발언하거나 서한으로 의견을 표시할 수 있다.
          </li>
          <li className="message">
            {" "}
            <span className="name">사면감 형및:</span> 복권에 관한 사항은 법률로
            정한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원
            과반수의 출석과 출석의원 과반수의 찬성으로 의결한다,
            국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
            그러나.
          </li>
          <li className="message">
            <span className="name">사면 감형:</span> 및사면·감형 및 복권에 관한
            사항은 법률로 정한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
            재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다,
            국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
            그러나.
          </li>
          <li className="message">
            <span className="name">감사위 원은:</span> 원장의 제청으로 대통령이
            임명하고. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나
            불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는
            바에 의하여 인정된다. 평화통일정책의 수립에 관한 대통령의 자문에
            응하기 위하여 민주평화통일자문회의를 둘 수 있다, 정부나 법원의
            권한에 관하여 특별한 조치를 할 수 있다.
          </li>
          <li className="message">
            <span className="name">주권의 제약에</span> 관한 조약. 대한민국은
            민주공화국이다. 헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은
            확정되며. 다만.
          </li>
          <li className="message">
            <span className="name">모든 국민은:</span> 신체의 자유를 가진다,
            명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가
            된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 어떠한
            형태로도 이를 창설할 수 없다. 사영기업을 국유 또는 공유로 이전하거나
            그 경영을 통제 또는 관리할 수 없다.
          </li>
          <li className="message">
            <span className="name">국무총리:</span> 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
            존중함을 기본으로 한다. 대한민국의 경제질서는 개인과 기업의 경제상의
            자유와 창의를 존중함을 기본으로 한다. 대통령은 국회에 출석하여
            발언하거나 서한으로 의견을 표시할 수 있다.
          </li>
        </ul>
      </div>
    );
  }
  render() {
    return (
      <>
        <div
          className="CardHead classroom"
          style={{
            background: getComputedStyle(
              document.documentElement
            ).getPropertyValue(
              "--" + this.props.subject.toLowerCase() + "-primary"
            ),
          }}
        >
          <div className="CardHeadText">{this.getHead()}</div>
        </div>
        <div className="CardBody classroom">
          <div className="CardBodyText">{this.getBody()}</div>
        </div>
        {this.getAdminView()}
      </>
    );
  }
}
