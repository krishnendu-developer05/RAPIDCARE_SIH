import React from 'react';
import { useLocation } from '../hooks/useLocation';
import './Header.css';

function Header() {
  const { location, loading, permissionDenied, requestGpsLocation, setShowWarningModal } = useLocation();

  const handleLocationClick = () => {
    if (permissionDenied) {
      setShowWarningModal(true);
    } else {
      requestGpsLocation();
    }
  };

  const getLocationLabel = () => {
    if (loading && !location.loaded) return 'Locating...';
    if (location.shortAddress) return location.shortAddress;
    if (location.city) return `${location.city}${location.area ? `, ${location.area}` : ''}`;
    return 'Location Unavailable';
  };

  return (
    <header className="header animate-fade-in">
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
          
          <button 
            type="button" 
            className={`location-badge ${location.source === 'gps' ? 'source-gps' : location.source === 'ip' ? 'source-ip' : ''} ${permissionDenied ? 'status-denied' : ''}`}
            onClick={handleLocationClick}
            title={
              location.source === 'gps'
                ? `GPS Active: ${location.formattedAddress || 'High Accuracy'}`
                : location.source === 'ip'
                ? `Approximate IP Location (${location.formattedAddress}). Click to enable GPS.`
                : 'Click to detect location'
            }
          >
            <span className="location-dot"></span>
            <img src="/assets/imgVector3.svg" alt="Location" className="location-icon" />
            <span className="location-text">{getLocationLabel()}</span>
            {location.source === 'ip' && <span className="badge-approx">Approx</span>}
            {permissionDenied && <span className="badge-warning">!</span>}
          </button>
        </div>
        
        <div className="brand">
          <h2 className="brand-title">RapidCare</h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
