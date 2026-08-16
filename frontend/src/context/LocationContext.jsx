import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getBrowserCoordinates,
  getIpCoordinates,
  reverseGeocode,
} from '../services/geolocationService';

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    formattedAddress: 'Detecting location...',
    shortAddress: 'Detecting...',
    city: '',
    area: '',
    postalCode: '',
    source: null, // 'gps' | 'ip'
    loaded: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Helper to resolve coordinates to reverse geocoded address
  const resolveLocationData = async (coords, fallbackShortAddress = '') => {
    try {
      const geoResult = await reverseGeocode(coords.lat, coords.lng);
      setLocation({
        lat: coords.lat,
        lng: coords.lng,
        formattedAddress: geoResult.formattedAddress || coords.formattedAddress || 'Location found',
        shortAddress: geoResult.shortAddress || fallbackShortAddress || coords.city || 'My Location',
        city: geoResult.city || coords.city || '',
        area: geoResult.area || coords.region || '',
        postalCode: geoResult.postalCode || coords.postalCode || '',
        source: coords.source,
        loaded: true,
      });
      setError(null);
    } catch (err) {
      console.warn('Reverse geocode failed, using raw coordinates:', err);
      setLocation({
        lat: coords.lat,
        lng: coords.lng,
        formattedAddress: `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
        shortAddress: fallbackShortAddress || `${coords.lat.toFixed(2)}°, ${coords.lng.toFixed(2)}°`,
        city: coords.city || '',
        area: coords.region || '',
        postalCode: coords.postalCode || '',
        source: coords.source,
        loaded: true,
      });
    }
  };

  // Passive IP Fallback logic
  const triggerIpFallback = useCallback(async () => {
    setLoading(true);
    try {
      const ipData = await getIpCoordinates();
      await resolveLocationData(ipData, `${ipData.city || 'Detected'}, ${ipData.region || 'Region'}`);
    } catch (ipErr) {
      console.error('IP Fallback also failed:', ipErr);
      setError({
        code: -1,
        message: 'Could not detect location via GPS or IP. Please check connection.',
      });
      setLocation((prev) => ({
        ...prev,
        formattedAddress: 'Location unavailable',
        shortAddress: 'Unavailable',
        loaded: true,
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  // Primary GPS Request logic
  const requestGpsLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await getBrowserCoordinates();
      setPermissionDenied(false);
      setShowWarningModal(false);
      await resolveLocationData(coords);
    } catch (err) {
      console.warn('GPS Geolocation error:', err);
      setError({
        code: err.code,
        message: err.message,
      });

      // Error code 1 = PERMISSION_DENIED
      if (err.code === 1 || err.code === err.PERMISSION_DENIED) {
        setPermissionDenied(true);
        setShowWarningModal(true);
      } else {
        // Timeout / Position unavailable -> proceed automatically to passive IP fallback
        await triggerIpFallback();
      }
    } finally {
      setLoading(false);
    }
  }, [triggerIpFallback]);

  // Initial detection on mount
  useEffect(() => {
    requestGpsLocation();
  }, [requestGpsLocation]);

  // User accepts fallback from modal
  const handleUseIpFallback = () => {
    setShowWarningModal(false);
    triggerIpFallback();
  };

  const handleDismissModal = () => {
    setShowWarningModal(false);
    // If not loaded yet, fetch IP fallback passively
    if (!location.loaded || !location.lat) {
      triggerIpFallback();
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        permissionDenied,
        showWarningModal,
        requestGpsLocation,
        handleUseIpFallback,
        handleDismissModal,
        setShowWarningModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
