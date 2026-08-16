import React from 'react';
import { useLocation } from '../hooks/useLocation';
import './LocationWarningModal.css';

function LocationWarningModal() {
  const {
    showWarningModal,
    requestGpsLocation,
    handleUseIpFallback,
    handleDismissModal,
    loading,
  } = useLocation();

  if (!showWarningModal) return null;

  return (
    <div className="location-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="location-modal-card animate-scale-up">
        <button
          type="button"
          className="location-modal-close"
          onClick={handleDismissModal}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="location-modal-icon-wrapper">
          <div className="location-pulse-ring"></div>
          <div className="location-icon-container">
            <svg
              className="location-alert-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
              <line x1="12" y1="7" x2="12" y2="7.01" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <h2 id="modal-title" className="location-modal-title">
          Your Location Must be Visible to Get Service
        </h2>

        <p className="location-modal-desc">
          RapidCare needs your exact location to dispatch the nearest emergency ambulance and provide accurate ETA tracking.
        </p>

        <div className="location-modal-instructions">
          <span>💡 <strong>Tip:</strong> If prompted by your browser or device, click <strong>&quot;Allow&quot;</strong> for precise GPS location.</span>
        </div>

        <div className="location-modal-actions">
          <button
            type="button"
            className="btn-enable-gps"
            onClick={requestGpsLocation}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-spinner-text">
                <span className="mini-spinner"></span> Checking GPS...
              </span>
            ) : (
              'Allow / Retry GPS Location'
            )}
          </button>

          <button
            type="button"
            className="btn-fallback-ip"
            onClick={handleUseIpFallback}
            disabled={loading}
          >
            Proceed with Approximate Location (IP)
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationWarningModal;
