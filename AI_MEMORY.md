# 🧠 RapidCare AI Memory Ledger

> **IMPORTANT FOR ALL AI AGENTS**: Read this file before starting any work to establish context. Update this file before wrapping up any major session so the next agent (Cursor, Claude Code, Windsurf, or Antigravity) knows exactly where to pick up.

## 📍 Current State
- **Active Feature**: Live Geolocation Detection, Reverse Geocoding (Nominatim OpenStreetMap) & Permission Fallback.
- **Completed**: 
  - **Home Page** (`/`): Implemented Hospital List and generic layout wrapper.
  - **Ambulance Selection** (`/ambulance/:hospitalName`): Multi-select UI for different ambulance types (Basic, Advanced, Transport) with dynamic images pulled from Figma.
  - **Payment Page** (`/payment`): Added custom grid layout for UPI apps, Netbanking (with bank logos), Cards, and Cash. Order summary included.
  - **Success / En Route** (`/success`): Implemented map UI with "Arriving in 9 mins" overlay, Driver Details card, Emergency Info timeline, and Payment breakdown.
  - **Geolocation & Address Resolution**:
    - High-accuracy Browser Geolocation API (`navigator.geolocation`) with real-time GPS indicator.
    - **OpenStreetMap Nominatim API**: Primary 100% free & keyless reverse geocoder with strict **max 1 request per second** queue rate-limiter and ~11m precision cache.
    - Custom Permission Warning Modal (*"Your Location Must be Visible to Get Service"*) triggered when access is denied.
    - Passive IP Geolocation fallback (`ipwho.is` / `ipapi.co`) when GPS access is blocked or unavailable.
    - Dynamic Header location badge with real-time status (GPS active, IP approximate, permission denied) and retry click handlers.
- **Next Up**: Connect frontend UI to backend services, implement dynamic hospital list queries filtered by user location / distance.

## 🏗️ Key Architectural Decisions
- **Geocoding Engine**: Switched to OpenStreetMap Nominatim (`geolocationService.js`), fully keyless and zero-cost, compliant with Nominatim Usage Policy through sequential throttling (>=1000ms delay between calls) and in-memory coordinates caching.
- **Location Architecture**: Managed via `LocationContext` and `useLocation` hook in `frontend/src/context/LocationContext.jsx` and `frontend/src/hooks/useLocation.js`.
- **Routing**: Migrated from simple state-based view switching to a robust `react-router-dom` architecture to handle the 4-page flow seamlessly.
- **Bottom Navigation Bar Visibility**: Hidden completely on desktop screens (>1024px) via `BottomNavigation.css` media query (`display: none !important`). Displays strictly on mobile and tablet devices (<1024px).
- **Layout & Width**: `#root` container width uses `max-width: 1280px` centered with `margin: 0 auto`. Side paddings and artificial width constraints removed.
- **Hospital List Layout**: Configured as vertical stacked cards (`flex-direction: column`) stretching 100% across the container width gracefully.
- **Booking Toggle & Search Bar**: Spans 100% container width aligned with main content grid.
- **Star Rating Icons**: Scaled to standard 14px-16px inline badge size in `HospitalCard.css`.
- **Branding & Typography**: SF Pro font family (`'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Removed logo emblem next to "RapidCare" title for a minimal, clean, typography-focused header.

## 🐛 Known Quirks & Gotchas
- **Browser Geolocation in Insecure/Restricted Contexts**: `navigator.geolocation` requires HTTPS or `localhost`.
- **Nominatim Usage Policy**: Strict limit of max 1 request/sec. All calls must go through `throttleNominatim` in `geolocationService.js`.
- **Bottom Navigation**: Hidden on desktop screens (>1024px). On mobile/tablet (<1024px), page container padding-bottom ensures no overlap with fixed nav.
- **Scrollbars**: Hidden globally using `::-webkit-scrollbar { display: none; }` and `-ms-overflow-style: none` on main container classes.

---
*Last updated by: Antigravity Agent (Google Deepmind) on August 16, 2026.*
