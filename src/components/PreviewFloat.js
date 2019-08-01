/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './PreviewFloat.css';

const baseStyle = {
  cursor: 'pointer',
  position: 'fixed',
  height: '5rem',
  width: '5rem',
  borderRadius: '25px',
  border: '3px solid rgb(255, 255, 255)',
  transform: 'translateX(-16rem)'
};

const dimmerStyle = {
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  background: '#000000b8',
  position: 'fixed',
  zIndex: 1,
  transition: 'background-color .2s linear',
  WebkitTransition: 'background-color .2s linear',
  alignItems: 'center',
  verticalAlign: 'middle',
  justifyContent: 'center'
};

const PreviewFloat = props => {
  const [expand, setExpand] = useState(false);
  const previewStyle = {
    ...baseStyle,
    ...{ left: props.position.left, top: props.position.top }
  };
  const expandStyle = {
    ...baseStyle,
    ...{
      width: '25rem',
      zIndex: 1,
      cursor: 'default',
      maxWidth: '100%',
      height: 'auto',
      margin: 'auto',
      position: '',
      display: 'block',
      transform: 'translateY(16vh)',
      border: 'none'
    }
  };

  const style = expand ? expandStyle : previewStyle;
  const display = expand ? { display: 'none' } : null;
  const dimmer = expand ? dimmerStyle : null;

  return (
    <div onClick={() => setExpand(!expand)} style={dimmer}>
      <img
        className="Preview"
        src={props.url}
        style={{
          ...style,
          ...{ boxShadow: '3px 5px 10px 2px rgba(52, 51, 51, 0.3)' }
        }}
        alt=""
      />
      <div
        className="PreviewOverlay"
        id="whiteOverlay"
        style={{
          ...style,
          ...{ border: '0px solid rgb(255, 255, 255)', ...display }
        }}
      ></div>
      <div
        className="PreviewOverlay"
        id="blueOverlay"
        style={{ ...style, ...display }}
      ></div>
    </div>
  );
};

export default PreviewFloat;
