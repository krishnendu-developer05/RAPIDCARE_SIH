# 🧠 RapidCare AI Memory Ledger

> **IMPORTANT FOR ALL AI AGENTS**: Read this file before starting any work to establish context. Update this file before wrapping up any major session so the next agent (Cursor, Claude Code, Windsurf, or Antigravity) knows exactly where to pick up.

## 📍 Current State
- **Active Feature**: Ambulance Booking Flow (Frontend UI).
- **Completed**: 
  - **Home Page** (`/`): Implemented Hospital List and generic layout wrapper.
  - **Ambulance Selection** (`/ambulance/:hospitalName`): Multi-select UI for different ambulance types (Basic, Advanced, Transport) with dynamic images pulled from Figma.
  - **Payment Page** (`/payment`): Added custom grid layout for UPI apps, Netbanking (with bank logos), Cards, and Cash. Order summary included.
  - **Success / En Route** (`/success`): Implemented map UI with "Arriving in 9 mins" overlay, Driver Details card, Emergency Info timeline, and Payment breakdown.
- **Next Up**: Connect frontend UI to backend services, implement dynamic data rendering (e.g. dynamic hospital names, dynamic pricing) to replace hardcoded Figma placeholders.

## 🏗️ Key Architectural Decisions
- **Routing**: Migrated from simple state-based view switching to a robust `react-router-dom` architecture to handle the 4-page flow seamlessly.
- **Bottom Navigation Bar Visibility**: Hidden completely on desktop screens (>1024px) via `BottomNavigation.css` media query (`display: none !important`). Displays strictly on mobile and tablet devices (<1024px).
- **Layout & Width**: `#root` container width uses `max-width: 1280px` centered with `margin: 0 auto`. Side paddings and artificial width constraints removed.
- **Hospital List Layout**: Configured as vertical stacked cards (`flex-direction: column`) stretching 100% across the container width gracefully.
- **Booking Toggle & Search Bar**: Spans 100% container width aligned with main content grid.
- **Star Rating Icons**: Scaled to standard 14px-16px inline badge size in `HospitalCard.css`.
- **Branding & Typography**: SF Pro font family (`'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Removed logo emblem next to "RapidCare" title for a minimal, clean, typography-focused header.

## 🐛 Known Quirks & Gotchas
- **Bottom Navigation**: Hidden on desktop screens (>1024px). On mobile/tablet (<1024px), page container padding-bottom ensures no overlap with fixed nav.
- **Scrollbars**: Hidden globally using `::-webkit-scrollbar { display: none; }` and `-ms-overflow-style: none` on main container classes.

---
*Last updated by: Antigravity Agent (Google Deepmind) on August 12, 2026.*
