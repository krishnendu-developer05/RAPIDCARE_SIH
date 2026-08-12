import React from 'react';
import './BookingOptions.css';

function BookingOptions({ activeTab, setActiveTab }) {
  return (
    <div className="booking-options-container">
      <div className="booking-toggle-bg">
        <div 
          className={`booking-option ${activeTab === 'myself' ? 'active' : ''}`}
          onClick={() => setActiveTab('myself')}
        >
          <img src="/assets/imgVector3.svg" alt="Person" className="option-icon" />
          Book for myself
        </div>
        <div 
          className={`booking-option ${activeTab === 'someone_else' ? 'active' : ''}`}
          onClick={() => setActiveTab('someone_else')}
        >
          <img src="/assets/imgVector4.svg" alt="Person" className="option-icon" />
          Book for someone else
        </div>
      </div>
    </div>
  );
}

export default BookingOptions;
