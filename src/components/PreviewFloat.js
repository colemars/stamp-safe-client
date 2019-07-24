import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { v4 } from 'uuid'
import "./PreviewFloat.css";

const basestyle = {
  cursor: "pointer",
  position: "fixed",
  left: "35vw",
  top: "8rem",
  height: "5rem",
  width: "5rem",
  borderRadius: "25px",
  border: "3px solid rgb(255, 255, 255)"
}

const imgstyle = {
  ...basestyle, boxShadow: "3px 5px 10px 2px rgba(52, 51, 51, 0.3)"
}

const divstyle = {
  ...basestyle, border: "0px solid rgb(255, 255, 255)",
}

const otherdivstyle = {
  ...basestyle
}

const PreviewFloat = (props) => {

  let leftPosition = 35;

  let topPosition = 8;

  let preview = props.images.images.map((imageFile, index) => {
    let objectURL = URL.createObjectURL(imageFile);
    const newPos = { 
      left: `${leftPosition}vw`,
      top: `${topPosition}rem`
    }

    leftPosition = leftPosition === 35 ? 34 : 35;

    topPosition += 5;

    return (
      <Fragment key={v4()}>
        <img className="Preview" src={objectURL} style={{...imgstyle, ...newPos}} key={imageFile.name} alt="" />
        <div className="PreviewOverlay" id="whiteOverlay" style={{...divstyle, ...newPos}} key={v4()}></div>
        <div className="PreviewOverlay" id="blueOverlay" style={{...otherdivstyle, ...newPos}} key={v4()}></div>
      </Fragment>
    )
  });

  return(
    preview
  )
}

const mapStateToProps = state => ({
  images: state.images
})

export default connect(mapStateToProps)(PreviewFloat)

