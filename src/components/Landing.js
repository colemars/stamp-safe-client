import React, { Component, Fragment } from "react";
import LandingButtons from "./LandingButtons.js";
import "./Landing.css";
import logoBlue from './STAMPSAFE.svg';
import logoWhite from './STAMPSAFE-white.svg';

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <div className="logoWrapper">
          <img src={logoWhite} className="logo-white" alt="logo" />
          <img src={logoBlue} className="logo-blue" alt="logo" />  
        </div>
        <div className="buttonWrapper">
        <LandingButtons />
        </div>
      </Fragment>
    );
  }
}

export default Landing;
