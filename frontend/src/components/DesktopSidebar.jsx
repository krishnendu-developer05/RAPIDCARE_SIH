import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DesktopSidebar.css';

function DesktopSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      id: 'hospitals',
      label: 'Search Hospitals',
      path: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    },
    {
      id: 'assistant',
      label: 'AI Health Assistant',
      path: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
          <line x1="8" y1="16" x2="8.01" y2="16"/>
          <line x1="16" y1="16" x2="16.01" y2="16"/>
        </svg>
      )
    },
    {
      id: 'emergency',
      label: 'Emergency Booking',
      path: '/ambulance/Emergency',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>
          <path d="M12 8v6M9 11h6"/>
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'My Account / Profile',
      path: '/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebar-backdrop" onClick={onClose}>
      <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">RapidCare</h2>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
            &times;
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span className="sidebar-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">Emergency Helpline: <strong>108 / 112</strong></p>
          <p className="sidebar-footer-sub">RapidCare 24/7 Response Platform</p>
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
