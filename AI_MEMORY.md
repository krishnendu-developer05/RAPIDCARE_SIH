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
- **Styling constraints**: Strictly **NO Tailwind CSS**. All components use vanilla CSS scoped to their specific component files (e.g. `SuccessPage.css`). Layout is now **fully responsive** — the old 430px phone-simulator wrapper has been removed. `#root` fills the viewport with `max-width: 960px` on desktop.
- **Responsive Design Tokens**: Global CSS custom properties in `index.css` use `clamp()` for fluid spacing: `--page-padding`, `--section-gap`, `--card-radius`, `--content-max-width`. All component CSS files use these tokens.
- **Responsive Breakpoints**: Two main breakpoints — `600px` (tablet) and `1024px` (desktop). On tablet+, hospital cards and ambulance cards switch to CSS Grid (`auto-fill, minmax(280px, 1fr)`).
- **Bottom Navigation**: Uses `position: fixed` centered on the viewport with `max-width: var(--content-max-width)`. Phone-frame border-radius removed.
- **Icons & Assets**: All assets, logos, and UI vectors are downloaded from Figma via custom scripts (e.g. `scripts/download_success_assets.mjs`) into `frontend/public/assets`. SVG icons are mostly utilized as inline paths inside React components or direct `.svg` image tags.
- **Data Placeholders**: Pricing and patient details (like ₹3300 on the success page, Krishnendu Roy as patient) are currently **hardcoded** to strictly match the Figma MVP designs. The next agent will need to pass these as dynamic states.
- **Status Bar / Dynamic Island**: The fake iOS status bar (`dynamic-island`, signal/wifi/battery icons) is hidden via CSS (`display: none`). It was only a Figma design artifact.

## 🐛 Known Quirks & Gotchas
- **Bottom Navigation**: The `BottomNavigation` component uses `position: fixed` at the bottom. All main page components must have `padding-bottom: ~100-120px` to avoid content being hidden behind it.
- **Fixed Bottom Buttons**: The "Continue to payment" and "Pay Securely" buttons use `position: fixed` with `left: 50%; transform: translateX(-50%); max-width: var(--content-max-width)` to stay centered and constrained to the content area.
- **Scrollbars**: Hidden globally using `::-webkit-scrollbar { display: none; }` and `-ms-overflow-style: none` on main container classes.

---
*Last updated by: Antigravity Agent (Google Deepmind) on August 12, 2026.*
