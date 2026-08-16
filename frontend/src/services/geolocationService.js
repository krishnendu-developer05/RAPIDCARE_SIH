/**
 * RapidCare Geolocation Service
 * Primary Geocoding Engine: OpenStreetMap Nominatim (100% Free & Keyless)
 * Strict Usage Policy Compliance: Maximum 1 request per second with throttling & caching.
 * Fallback: Passive IP-based Geolocation & coordinate metadata.
 */

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/reverse';
const NOMINATIM_MIN_INTERVAL_MS = 1000; // Strict limit: max 1 request / second

// In-Memory Geocoding Cache to avoid redundant API hits
const geocodeCache = new Map();

// Throttle queue tracking
let lastRequestTime = 0;
let pendingRequestPromise = Promise.resolve();

/**
 * Throttles execution ensuring at least 1000ms between calls to Nominatim
 */
function throttleNominatim(fn) {
  const result = pendingRequestPromise.then(async () => {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    if (elapsed < NOMINATIM_MIN_INTERVAL_MS) {
      const waitTime = NOMINATIM_MIN_INTERVAL_MS - elapsed;
      await new Promise((res) => setTimeout(res, waitTime));
    }
    lastRequestTime = Date.now();
    return fn();
  });

  // Keep queue alive even if one request fails
  pendingRequestPromise = result.catch(() => {});
  return result;
}

/**
 * 1. Browser Geolocation (GPS / High Accuracy)
 */
export function getBrowserCoordinates(options = {}) {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      const error = new Error('Geolocation is not supported by your browser.');
      error.code = 0;
      return reject(error);
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 10000,
      ...options,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          source: 'gps',
        });
      },
      (error) => {
        reject(error);
      },
      defaultOptions
    );
  });
}

/**
 * 2. Passive IP-Based Geolocation Fallback
 */
export async function getIpCoordinates() {
  // Primary IP Provider: ipwho.is (CORS friendly, keyless)
  try {
    const response = await fetch('https://ipwho.is/');
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();

    if (data.success) {
      return {
        lat: data.latitude,
        lng: data.longitude,
        city: data.city,
        region: data.region,
        country: data.country,
        postalCode: data.postal,
        source: 'ip',
        formattedAddress: `${data.city}, ${data.region}`,
      };
    }
  } catch (err) {
    console.warn('Primary IP Geolocation failed, trying backup...', err);
  }

  // Backup IP Provider: ipapi.co
  try {
    const backupResponse = await fetch('https://ipapi.co/json/');
    if (!backupResponse.ok) throw new Error(`HTTP error ${backupResponse.status}`);
    const backupData = await backupResponse.json();

    return {
      lat: backupData.latitude,
      lng: backupData.longitude,
      city: backupData.city,
      region: backupData.region,
      country: backupData.country_name,
      postalCode: backupData.postal,
      source: 'ip',
      formattedAddress: `${backupData.city}, ${backupData.region}`,
    };
  } catch (backupErr) {
    console.error('All IP Geolocation providers failed:', backupErr);
    throw new Error('Unable to detect approximate location via IP.');
  }
}

/**
 * 3. Primary Reverse Geocoding Engine: OpenStreetMap Nominatim
 * Features:
 * - 100% Free & Keyless
 * - Strict 1 req/sec rate throttling
 * - Coordinate cache lookup (~11m resolution)
 */
export async function reverseGeocode(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return {
      formattedAddress: 'Location unavailable',
      shortAddress: 'Unavailable',
      city: '',
      area: '',
      postalCode: '',
      provider: 'error',
    };
  }

  // 1. Cache Check (rounded to 4 decimal places ≈ 11 meters)
  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  // 2. Throttled Request to Nominatim
  try {
    const result = await throttleNominatim(async () => {
      const url = `${NOMINATIM_BASE_URL}?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'en',
        },
      });

      if (!response.ok) {
        throw new Error(`Nominatim HTTP ${response.status}`);
      }

      const data = await response.json();
      const addr = data.address || {};

      // Parse granular local components
      const area =
        addr.suburb ||
        addr.neighbourhood ||
        addr.residential ||
        addr.quarter ||
        addr.road ||
        addr.village ||
        '';

      const city =
        addr.city ||
        addr.town ||
        addr.municipality ||
        addr.state_district ||
        addr.county ||
        addr.state ||
        '';

      const postalCode = addr.postcode || '';
      
      let shortAddress = '';
      if (area && city && area !== city) {
        shortAddress = `${area}, ${city}`;
      } else if (city) {
        shortAddress = city;
      } else if (area) {
        shortAddress = area;
      } else {
        shortAddress = data.display_name ? data.display_name.split(',')[0] : 'Detected Location';
      }

      const parsedResult = {
        formattedAddress: data.display_name || shortAddress,
        shortAddress,
        city,
        area,
        postalCode,
        provider: 'nominatim_osm',
      };

      // Save to memory cache
      geocodeCache.set(cacheKey, parsedResult);
      return parsedResult;
    });

    return result;
  } catch (error) {
    console.warn('Nominatim reverse geocode encountered an issue:', error);

    // Fallback: coordinates representation
    const fallback = {
      formattedAddress: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      shortAddress: `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`,
      city: '',
      area: '',
      postalCode: '',
      provider: 'coordinates_fallback',
    };
    return fallback;
  }
}
