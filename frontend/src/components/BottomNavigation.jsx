import React from 'react';
import './BottomNavigation.css';

function BottomNavigation() {
  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav-bg"></div>
      <div className="bottom-nav-curve">
        <img src="/assets/imgGroup29.svg" alt="Curve" className="curve-svg" />
        <div className="home-fab">
          <img src="/assets/imgVector14.svg" alt="Home" className="home-icon" />
        </div>
        <span className="home-label">Home</span>
      </div>
      
      <div className="nav-items">
        <div className="nav-item">
          <div className="robot-icon">
            <img src="/assets/imgVector16.svg" alt="Robot Base" className="icon-part-1" />
            <img src="/assets/imgVector15.svg" alt="Robot Eyes" className="icon-part-2" />
          </div>
        </div>
        <div className="nav-item">
          <img src="/assets/imgVector13.svg" alt="Search" className="nav-icon" />
        </div>
        <div className="nav-item space-for-fab"></div>
        <div className="nav-item">
          <img src="/assets/imgVector12.svg" alt="Care" className="nav-icon" />
        </div>
        <div className="nav-item">
          <img src="/assets/imgVector11.svg" alt="Profile" className="nav-icon profile-icon" />
        </div>
      </div>
    </div>
  );
}

export default BottomNavigation;
