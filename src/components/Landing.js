import React from 'react';
import LandingButtons from './LandingButtons';
import './Landing.css';
import logoBlue from './STAMPSAFE.svg';
import logoWhite from './STAMPSAFE-white.svg';

const Landing = () => {
  return (
    <div className="landing">
      <div className="logoWrapper">
        <img src={logoWhite} className="logo-white" alt="logo" />
        <img src={logoBlue} className="logo-blue" alt="logo" />
      </div>
      <div className="buttonWrapper">
        <LandingButtons />
      </div>
    </div>
  );
};

export default Landing;
