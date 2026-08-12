import React from 'react';
import HospitalCard from './HospitalCard';
import './HospitalList.css';

function HospitalList() {
  const hospitals = [
    { id: 1, name: 'Ranaghat Sub Division Hospital', distance: '1.5km', time: '5min', rating: '3.5', generalBeds: 45, icuBeds: 5 },
    { id: 2, name: 'Ranaghat Sub Division Hospital', distance: '1.5km', time: '5min', rating: '3.5', generalBeds: 45, icuBeds: 5 },
    { id: 3, name: 'Ranaghat Sub Division Hospital', distance: '1.5km', time: '5min', rating: '3.5', generalBeds: 45, icuBeds: 5 }
  ];

  return (
    <div className="hospital-list-section">
      <div className="hospital-list-header">
        <div className="header-left">
          <img src="/assets/imgGroup.svg" alt="Hospital" className="hospital-icon" />
          <h3>5 NEARBY HOSPITALS</h3>
        </div>
        <div className="header-right">
          <span className="view-all">View all</span>
          <img src="/assets/imgVector5.svg" alt="Arrow Right" className="arrow-icon" />
        </div>
      </div>
      
      <div className="hospital-cards-container">
        {hospitals.map(hospital => (
          <HospitalCard key={hospital.id} data={hospital} />
        ))}
      </div>
    </div>
  );
}

export default HospitalList;
