# 🛰️ RapidCare Full-Stack API & Backend Documentation

This document lists all external APIs, authentication requirements, and the custom Node.js Express + Supabase PostgreSQL backend setup.

---

## 1. Geocoding: OpenStreetMap Nominatim (100% Free & Keyless)

- **Provider**: OpenStreetMap Official API (`Nominatim`)
- **Endpoint**: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lon}&zoom=18&addressdetails=1`
- **Rate Limiting**: Strictly throttled in `geolocationService.js` to **max 1 request per second** with ~11m precision coordinate caching.
- **Cost**: 100% Free & Keyless

---

## 2. RapidCare Custom Backend API (Node.js / Express on Render)

### Base URL:
- Local Development: `http://localhost:5000`
- Render Production: `https://rapidcare-api.onrender.com`

### Endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Render Liveness & Readiness health probe (`200 OK`) |
| `GET` | `/api/hospitals/nearby?lat=...&lng=...&radius=50` | Returns nearby hospitals sorted by real-time distance (PostGIS / Haversine) |
| `GET` | `/api/hospitals/:id` | Returns hospital details and available ambulances |
| `GET` | `/api/ambulances?hospital_id=...&type=...` | Lists available ambulances and driver info |
| `POST` | `/api/bookings` | Creates an emergency dispatch booking and assigns an ambulance |
| `GET` | `/api/bookings/:id` | Returns live booking details and status tracking |
| `PATCH` | `/api/bookings/:id/status` | Updates booking dispatch status (`assigned`, `en_route`, `arrived`, `completed`) |

---

## 3. Database: Supabase PostgreSQL + PostGIS

- **SQL Schema & Migration**: [`supabase/migrations/20260816_initial_schema.sql`](file:///c:/Users/upal5/OneDrive/Documents/GitHub/RAPIDCARE_SIH/supabase/migrations/20260816_initial_schema.sql)
- **Tables**: `hospitals`, `ambulances`, `bookings`
- **Spatial Procedure**: `get_nearby_hospitals(user_lat, user_lng, max_dist_km)` using `ST_DistanceSphere`
- **Realtime**: `supabase_realtime` publication enabled on `bookings` and `ambulances` for live WebSocket GPS updates.

---

## 4. Deployment on Render (`render.yaml`)

Infrastructure-as-Code is configured in [`render.yaml`](file:///c:/Users/upal5/OneDrive/Documents/GitHub/RAPIDCARE_SIH/render.yaml):
1. **Web Service (`rapidcare-api`)**: Node.js backend (`cd backend && npm install && npm start`).
2. **Static Site (`rapidcare-frontend`)**: React Vite SPA (`cd frontend && npm install && npm run build`).