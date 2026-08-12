# 🚑 RapidCare 
Welcome to the **RapidCare** repository! Follow this guide to set up your local development environment and run the application.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended)
- **Git**
- **npm** (comes with Node.js)

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd RAPIDCARE_SIH
```

### Step 2: Install Dependencies
Run the following commands to install packages for both the root project and the frontend application:

```bash
# Install root dependencies (includes @dotenvx/dotenvx)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

---

## 🔑 Step 3: Configure Environment Keys (.env.keys)

This project uses **`dotenvx`** to encrypt sensitive environment variables directly inside `.env`. The encrypted `.env` file is tracked in Git, but the decryption key is NOT.

1. Obtain the `.env.keys` file securely from a teammate (via Slack / 1Password / secure channel).
2. Place the `.env.keys` file directly in the **root directory** of this repository:
   ```text
   RAPIDCARE_SIH/
   ├── .env
   ├── .env.keys   <-- Place it here!
   ├── package.json
   └── frontend/
   ```

---

## 💻 Step 4: Run the Local Development Server

You can start the app directly using `dotenvx` wrapper or standard npm scripts:

### Standard Start (from root):
```bash
npm run dev
```

### Or using `dotenvx` to automatically inject decrypted environment variables:
```bash
npx dotenvx run -- npm run dev
```

The application will launch locally at:
👉 **`http://localhost:5173`** (or the port indicated in your terminal).

---

## 📁 Project Structure

```text
RAPIDCARE_SIH/
├── .agents/          # Global AI rules & standards (AGENTS.md)
├── AI_MEMORY.md       # Cross-Agent persistent memory ledger
├── frontend/          # React + Vite web application
│   ├── public/
│   │   └── assets/    # Figma images & SVG assets
│   └── src/
│       ├── components/# React UI components & matching CSS
│       ├── App.jsx    # React Router setup
│       └── index.css  # Global design tokens & CSS variables
├── scripts/           # Asset downloaders and utility scripts
├── supabase/          # Supabase configuration & migrations
└── package.json       # Root scripts & configuration
```

---

## 🤖 Working with AI Coding Assistants (Cursor, Windsurf, Claude Code, etc.)

This repo is configured with **Cross-Agent Memory**:
1. **Before starting a task**: AI agents will automatically check `.agents/AGENTS.md` and `AI_MEMORY.md` to understand context and existing design rules.
2. **Before ending a task**: Please update `AI_MEMORY.md` with a quick summary of what was completed so the next developer/agent can pick up smoothly.

---

## 🛠️ Key Rules & Styling Guidelines

- **Styling**: Vanilla CSS **only**. Do **NOT** install or use Tailwind CSS.
- **Mobile Container**: The app is designed mobile-first and constrained to `max-width: 430px` inside `index.css`.
- **Component Naming**: PascalCase for components (`HospitalCard.jsx`) and matching CSS (`HospitalCard.css`).

---

## ❓ Troubleshooting

- **Missing variables / Supabase connection errors?**
  Verify `.env.keys` exists in the root directory and contains the correct decryption key.
- **Port already in use?**
  Stop any running dev servers or specify a different port in Vite.
- **Assets missing?**
  Run any asset helper scripts located inside `/scripts` (e.g. `node scripts/download_success_assets.mjs`).
