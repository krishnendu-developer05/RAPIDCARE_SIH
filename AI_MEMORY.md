# 🧠 RapidCare AI Memory Ledger

> **IMPORTANT FOR ALL AI AGENTS**: Read this file before starting any work to establish context. Update this file before wrapping up any major session so the next agent (Cursor, Claude Code, Windsurf, or Antigravity) knows exactly where to pick up.

## 📍 Current State
- **Active Feature**: Option 1 Full-Stack Architecture: Supabase (PostgreSQL + PostGIS + Realtime) + Render (Node.js/Express Backend & Static Frontend).
- **Completed**: 
  - **Custom Express Backend** (`/backend`):
    - Server entry point `backend/src/server.js` with CORS, Helmet, Morgan, and `/health` probe.
    - `hospitalController.js` & `hospitalRoutes.js`: Geospatial hospital queries using PostGIS RPC (`get_nearby_hospitals`) with fallback Haversine distance calculations.
    - `bookingController.js` & `bookingRoutes.js`: Emergency ambulance booking creation, driver assignment, and status updates.
    - `ambulanceController.js` & `ambulanceRoutes.js`: Query available ambulances by hospital/type.
    - Backend dependencies installed and verified locally.
  - **Database & PostGIS Schema** (`supabase/migrations/20260816_initial_schema.sql`):
    - Tables: `hospitals`, `ambulances`, `bookings`.
    - PostGIS spatial function `get_nearby_hospitals` for distance-based sorting.
    - RLS policies and Realtime replication configured.
    - Seed data for Nadia (Chakdaha, Kalyani, Ranaghat) and Kolkata emergency centers.
  - **Render Deployment** (`render.yaml`):
    - Blueprint for Web Service `rapidcare-api` and Static Site `rapidcare-frontend`.
  - **Frontend Geolocation & UI**:
    - High-accuracy Browser Geolocation + OpenStreetMap Nominatim reverse geocoding (throttled <= 1 req/s).
    - Permission warning modal (*"Your Location Must be Visible to Get Service"*) and passive IP fallback.
- **Next Up**: Connect frontend `HospitalList.jsx` and booking checkout to consume `/api/hospitals/nearby` and `/api/bookings` live endpoints.

## 🏗️ Key Architectural Decisions
- **Option 1 Full Stack**: Decoupled Node.js Express server on Render with Supabase PostgreSQL (PostGIS for geospatial proximity queries + Realtime WebSockets for driver tracking).
- **Graceful Offline/Mock Resilience**: All backend controllers feature automatic mock fallbacks so the server responds instantly even during early development or offline database states.
- **Geocoding Engine**: OpenStreetMap Nominatim with strict 1 req/sec throttle queue and ~11m precision coordinate cache.
- **Routing**: `react-router-dom` with 4 primary routes: Home (`/`), Ambulance Selection (`/ambulance/:hospitalName`), Payment (`/payment`), and En Route Live Tracking (`/success`).
- **Responsive Layout**: Desktop max-width 1280px, mobile bottom navigation automatically hidden on desktop (>1024px).

## 🐛 Known Quirks & Gotchas
- **Render Health Check**: `/health` endpoint configured to return `status: 200` for zero-downtime health probes.
- **PostGIS Extension**: In Supabase, ensure the `postgis` extension is active by running `20260816_initial_schema.sql` in the Supabase SQL editor.
- **Nominatim Usage Policy**: Strictly throttled to max 1 req/sec in `geolocationService.js`.

---
*Last updated by: Antigravity Agent (Google Deepmind) on August 16, 2026.*
