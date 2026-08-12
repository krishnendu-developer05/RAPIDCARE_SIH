import React from 'react';
import './AmbulanceCard.css';

function AmbulanceCard({ data, selected, onClick }) {
  return (
    <div className={`ambulance-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="amb-image-container">
        <img src={`/assets/${data.image}`} alt={data.title} className="amb-image" />
      </div>
      
      <div className="amb-content">
        <div className="amb-header">
          <h3 className="amb-title">{data.title}</h3>
          <div className={`radio-circle ${selected ? 'selected' : ''}`}>
            {selected && <div className="radio-inner" />}
          </div>
        </div>
        
        <p className="amb-features">
          {data.features.map((feature, idx) => (
            <React.Fragment key={idx}>
              {feature}
              {idx < data.features.length - 1 && <span className="amb-dot">•</span>}
            </React.Fragment>
          ))}
        </p>
        
        <div className="amb-footer">
          <div className="amb-price">
            <span className="price-symbol">₹</span>
            <span className="price-value">{data.price}</span>
            <span className="price-base">base</span>
          </div>
          <div className={`amb-eta ${data.etaColorClass}`}>
            ETA: {data.eta}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmbulanceCard;
