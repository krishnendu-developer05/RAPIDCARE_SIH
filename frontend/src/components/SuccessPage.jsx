import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="amb-top-bar">
        <div className="back-btn" onClick={() => navigate('/')}>
          <img src="/assets/imgEllipse57.svg" alt="Back bg" className="back-bg" />
          <img src="/assets/imgVector9.svg" alt="Back arrow" className="back-arrow" />
        </div>
        <h2 className="amb-brand">RapidCare</h2>
      </div>

      <h1 className="success-title">YOUR AMBULANCE IS EN ROUTE!</h1>

      {/* Map Block */}
      <div className="map-container">
        <img src="/assets/map_enroute.png" alt="Map Route" className="map-img" />
        <div className="map-overlay">
          <div className="overlay-left">
            <span className="overlay-label">ARRIVING IN</span>
            <span className="overlay-val">9 mins</span>
          </div>
          <div className="overlay-right">
            <span className="overlay-label right">STATUS</span>
            <span className="overlay-val right">Enroute</span>
          </div>
        </div>
      </div>

      {/* Driver Details Block */}
      <div className="info-card driver-card">
        <h3 className="section-subtitle mb-3">DRIVER DETAILS</h3>
        <div className="driver-info">
          <img src="/assets/driver_rajesh.png" alt="Rajesh Kumar" className="driver-photo" />
          <div className="driver-details">
            <p className="driver-text"><span className="fw-500">Driver:</span> Rajesh Kumar</p>
            <p className="driver-text fw-500">Force Traveller (ICU Unit)</p>
            <p className="driver-text mt-1"><span className="fw-400">Ambulance ID:</span> RC_WB_169</p>
          </div>
        </div>
        <div className="driver-actions">
          <button className="driver-btn call-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call Driver
          </button>
          <button className="driver-btn msg-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#311d87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Message
          </button>
        </div>
      </div>

      {/* Emergency Info Block */}
      <div className="info-card emergency-card">
        <h3 className="section-subtitle mb-3">EMERGENCY INFO</h3>
        <p className="em-text"><span className="fw-500">Patient Name:</span> Krishnendu Roy</p>
        <p className="em-text"><span className="fw-500">Service Type:</span> ICU Ambulance</p>
        
        <div className="pills-container">
          <div className="pill">Doctor on Board</div>
          <div className="pill">ECG & Defribbilator</div>
          <div className="pill">ICU Setup</div>
        </div>

        <div className="timeline-container">
          <div className="timeline-dot top"></div>
          <div className="timeline-line"></div>
          <div className="timeline-dot bottom"></div>
          
          <div className="timeline-content">
            <div className="timeline-item">
              <p className="timeline-title">Chakdaha, Nadia</p>
              <p className="timeline-sub">pickup</p>
            </div>
            <div className="timeline-item mt-4">
              <p className="timeline-title">Ranaghat sub Division Hospital</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Breakdown Block */}
      <div className="info-card payment-breakdown">
        <h3 className="section-subtitle mb-3">PAYMENT BREAKDOWN</h3>
        <div className="pb-row">
          <span className="pb-label">Base ICU Fare:</span>
          <span className="pb-val">₹1800</span>
        </div>
        <div className="pb-row mt-1">
          <span className="pb-label">Doctor & Emergency Crew Fee:</span>
          <span className="pb-val">₹1500</span>
        </div>
        <div className="pb-row total mt-4">
          <span className="pb-label fw-700 text-black">Total paid:</span>
          <span className="pb-val fw-700 text-black">₹3300</span>
        </div>
        <div className="paid-badge">Paid via UPI</div>
      </div>

    </div>
  );
}

export default SuccessPage;
