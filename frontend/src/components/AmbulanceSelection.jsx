import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AmbulanceCard from './AmbulanceCard';
import './AmbulanceSelection.css';

const AMBULANCES = [
  {
    id: 1,
    title: 'Normal Ambulance',
    image: 'imgRectangle74.png',
    features: ['Basic Life Support', 'Oxygen Cylinder', 'Stretcher'],
    price: '800',
    eta: '7 mins',
    etaColorClass: 'eta-green'
  },
  {
    id: 2,
    title: 'Normal Ambulance',
    image: 'imgRectangle76.png',
    features: ['Mobile ICU', 'Doctor On Board', 'ECG & Defibrillator'],
    price: '1800',
    eta: '10 mins',
    etaColorClass: 'eta-green'
  },
  {
    id: 3,
    title: 'Ventilator Ambulance',
    image: 'imgRectangle78.png',
    features: ['Mechanical Ventilator', 'Advanced Airway Care', 'Respiratory Sp.'],
    price: '2200',
    eta: '15 mins',
    etaColorClass: 'eta-yellow'
  },
  {
    id: 4,
    title: 'Burn Patient Ambulance',
    image: 'imgRectangle80.png',
    features: ['Sterile Sanitized Cabin', 'Burn Care Dressings', 'Climate Control'],
    price: '1500',
    eta: '12 mins',
    etaColorClass: 'eta-green'
  }
];

function AmbulanceSelection() {
  const { hospitalName } = useParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="amb-page">
      <div className="amb-top-bar">
        <div className="back-btn" onClick={() => navigate(-1)}>
          <img src="/assets/imgEllipse57.svg" alt="Back bg" className="back-bg" />
          <img src="/assets/imgVector9.svg" alt="Back arrow" className="back-arrow" />
        </div>
        <h2 className="amb-brand">RapidCare</h2>
      </div>

      <div className="amb-header-text">
        <p className="booking-at">BOOKING AT {decodeURIComponent(hospitalName || 'HOSPITAL').toUpperCase()}</p>
        <h1 className="choose-type">Choose Ambulance Type</h1>
      </div>

      <div className="amb-list">
        {AMBULANCES.map(amb => (
          <AmbulanceCard 
            key={amb.id} 
            data={amb} 
            selected={selectedId === amb.id}
            onClick={() => setSelectedId(amb.id)}
          />
        ))}
      </div>

      <div className="amb-fixed-bottom">
        <button className="continue-btn" onClick={() => navigate('/payment')}>
          Continue to payment
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AmbulanceSelection;
