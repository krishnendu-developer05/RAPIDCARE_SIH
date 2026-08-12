import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="status-bar">
        <span className="time">11:11</span>
        <div className="dynamic-island"></div>
        <div className="status-icons">
          <img src="/assets/imgVector.svg" alt="Signal" className="icon-signal" />
          <img src="/assets/imgVector1.svg" alt="Wifi" className="icon-wifi" />
          <img src="/assets/imgVector2.svg" alt="Battery" className="icon-battery" />
        </div>
      </div>
      
      <div className="greeting-container">
        <div className="user-info">
          <h1 className="greeting">Hi, Krishnendu</h1>
          <p className="subtitle">Stay safe today</p>
          <div className="location">
            <img src="/assets/imgVector3.svg" alt="Location" className="location-icon" />
            <span>Chakdaha, Nadia</span>
          </div>
        </div>
        <div className="brand">
          <h2>RapidCare</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
