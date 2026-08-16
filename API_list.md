# 🛰️ RapidCare API List & Configuration Guide

This document lists all external APIs, authentication requirements, and rate limit policies used in RapidCare.

---

## 1. Geocoding: OpenStreetMap Nominatim (100% Free & Keyless)

### Overview
- **Provider**: OpenStreetMap Official API (`Nominatim`)
- **Purpose**: Converts geographic coordinates (`latitude`, `longitude`) obtained from browser GPS or IP into street addresses, neighborhoods, and cities.
- **Endpoint**: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lon}&zoom=18&addressdetails=1`
- **Cost**: 100% Free & Open Source
- **API Key Required**: **No**
- **Credit Card Required**: **No**

### ⚠️ Strict Usage Policy & Built-in Protections in RapidCare
Nominatim enforces a strict usage policy:
- **Maximum 1 request per second** per client.

### 🛡️ How RapidCare Complies Automatically
1. **Throttled Request Queue**: The `geolocationService.js` module wraps all Nominatim calls in a sequential promise queue that guarantees at least **1,000ms (1 second)** delay between requests.
2. **In-Memory & Precision Caching**: Coordinates are rounded to 4 decimal places (~11 meters) and cached. Duplicate lookups for the same area make **0 network requests**.
3. **Graceful Fallback**: If Nominatim fails or returns HTTP 429, RapidCare automatically falls back to passive IP location metadata without disrupting the user.

---

## 2. Geolocation Multi-Tier Strategy

RapidCare uses a resilient multi-tier location detection strategy for emergency dispatch:

| Tier | Provider / API | Purpose | Auth / Rate Limit |
| :--- | :--- | :--- | :--- |
| **Tier 1 (GPS)** | `navigator.geolocation` (HTML5 Browser API) | Real-time high-accuracy GPS coordinates (`enableHighAccuracy: true`) | Built-in browser (Requires user permission) |
| **Tier 2 (Geocoding)** | OpenStreetMap Nominatim API | Reverse geocodes GPS coordinates to human-readable address & neighborhood | 100% Free & Keyless (Throttled: max 1 req/sec) |
| **Tier 3 (IP Fallback)** | `ipwho.is` & `ipapi.co` | Passive approximate city / region detection if user blocks GPS | Free / Keyless |

---

## 3. Supabase Backend Services

| Service | Environment Variable | Description |
| :--- | :--- | :--- |
| **Supabase URL** | `VITE_SUPABASE_URL` | RapidCare backend project URL |
| **Supabase Anon Key** | `VITE_SUPABASE_ANON_KEY` | Public client access key for database & real-time subscriptions |