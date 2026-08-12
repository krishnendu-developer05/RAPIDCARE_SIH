import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalCard.css';

function HospitalCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="hospital-card">
      <div className="card-image-container">
        <img src="/assets/imgRectangle65.png" alt={data.name} className="card-image" />
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h4 className="hospital-name">{data.name}</h4>
          <div className="call-btn">
            <img src="/assets/imgEllipse56.svg" alt="Call bg" className="call-bg" />
            <svg className="phone-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.21 17.32C10.38 15.93 8.06 13.62 6.67 10.79L8.94 8.53C9.21 8.26 9.3 7.87 9.18 7.52C8.82 6.41 8.62 5.22 8.62 3.99C8.62 3.45 8.19 3 7.65 3H4.15C3.6 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.35C21 15.8 20.55 15.38 20.01 15.38Z" fill="var(--primary-purple)"/>
            </svg>
          </div>
        </div>
        
        <div className="hospital-meta">
          <div className="meta-item">
            <img src="/assets/imgVector7.svg" alt="Location" className="meta-icon" />
            <span className="meta-text">{data.distance}</span>
          </div>
          <div className="meta-item">
            <img src="/assets/imgGroup1.svg" alt="Clock" className="meta-icon" />
            <span className="meta-text">{data.time}</span>
          </div>
        </div>
        
        <div className="beds-info">
          <span className="beds-label">Available Beds: </span>
          <span className="beds-value">General ({data.generalBeds})</span>
          <span className="dot">•</span>
          <span className="beds-value">ICU({data.icuBeds})</span>
        </div>
        
        <div className="rating-row">
          <div className="stars">
            <img src="/assets/imgVector9.svg" alt="Star" className="star-icon active" />
            <img src="/assets/imgVector9.svg" alt="Star" className="star-icon active" />
            <img src="/assets/imgVector9.svg" alt="Star" className="star-icon active" />
            <img src="/assets/imgVector6.svg" alt="Star half" className="star-icon half" />
            <img src="/assets/imgVector6.svg" alt="Star empty" className="star-icon empty" />
          </div>
          <span className="rating-value">{data.rating}</span>
        </div>
        
        <div className="card-footer">
          <div className="tags">
            Primary Care <span className="tag-dot"></span> Basic ICU
          </div>
          <button 
            className="book-btn" 
            onClick={() => navigate(`/ambulance/${encodeURIComponent(data.name)}`)}
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HospitalCard;
