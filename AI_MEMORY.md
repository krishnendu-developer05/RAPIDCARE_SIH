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
- **Styling constraints**: Strictly **NO Tailwind CSS**. All components use vanilla CSS scoped to their specific component files (e.g. `SuccessPage.css`). Layout is constrained inside a desktop wrapper mimicking mobile bounds (`max-width: 430px`, set in `index.css`).
- **Icons & Assets**: All assets, logos, and UI vectors are downloaded from Figma via custom scripts (e.g. `scripts/download_success_assets.mjs`) into `frontend/public/assets`. SVG icons are mostly utilized as inline paths inside React components or direct `.svg` image tags.
- **Data Placeholders**: Pricing and patient details (like ₹3300 on the success page, Krishnendu Roy as patient) are currently **hardcoded** to strictly match the Figma MVP designs. The next agent will need to pass these as dynamic states.

## 🐛 Known Quirks & Gotchas
- **Bottom Navigation**: The `BottomNavigation` component is fixed at the bottom. Therefore, all main page components (`PaymentPage`, `SuccessPage`, etc.) must have `padding-bottom: 120px` in their CSS to ensure the final elements are not obscured by the fixed nav bar.
- **Scrollbars**: Hidden globally using `::-webkit-scrollbar { display: none; }` and `-ms-overflow-style: none` on main container classes.

---
*Last updated by: Antigravity Agent (Google Deepmind) on August 12, 2026.*
