import React, { Component, Fragment } from "react";
import StageItem from "./StageItem"
import "./Seller.css";

class Seller extends Component {
  render() {
    return (
      <div className="seller">
        <StageItem/>
      </div>
    );
  }
}

export default Seller;
