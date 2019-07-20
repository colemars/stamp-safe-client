import React, { Component } from "react";
import LandingButtons from "./LandingButtons.js";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="logo-wrapper">
          <div id="logo">
            STAMPSAFE
          </div>
        </div>
        <div className="button-wrapper">
          <LandingButtons />
        </div>
      </div>
    );
  }
}

export default Landing;
