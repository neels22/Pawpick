# 🐾 PawPick — Swipe to Adopt

A mobile-first, swipe-to-vote web application where users browse cards of fictional adoptable pets and cast a **Yes** or **No** vote on whether they would adopt each one. Every vote is persisted to a real backend database, and a public results view surfaces aggregate community sentiment.

---

## 🚀 How to Run

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Setup & Run

```bash
# 1. Clone the repository
git clone <repo-url>
cd Pawpick

# 2. Install dependencies
npm install

# 3. Run database migration
npx prisma migrate dev --name init

# 4. Seed the database (creates 100 pets + SVGs)
npm run db:seed

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
For the best experience, use Chrome DevTools mobile view (390 × 844 px — iPhone 14 Pro).

---

## 🏗️ Architecture Overview

PawPick is built as a **full-stack vertical slice** using a single Next.js repository:

```
┌──────────────────────────────────────────────────┐
│  Frontend (React + Framer Motion)                │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │SwipeCard │  │EmptyDeck │  │ ResultsView   │  │
│  │(gestures)│  │(end-deck)│  │ (leaderboard) │  │
│  └────┬─────┘  └──────────┘  └───────┬───────┘  │
│       │                              │           │
│  ┌────▼──────────────────────────────▼───────┐   │
│  │        lib/api.ts (fetch wrappers)        │   │
│  └────┬──────────────┬───────────────┬───────┘   │
├───────┼──────────────┼───────────────┼───────────┤
│  API  │              │               │           │
│  ┌────▼────┐  ┌──────▼─────┐  ┌─────▼───────┐   │
│  │GET items│  │POST vote   │  │GET results  │   │
│  │         │  │(upsert)    │  │(aggregated) │   │
│  └────┬────┘  └──────┬─────┘  └─────┬───────┘   │
│       │              │               │           │
│  ┌────▼──────────────▼───────────────▼───────┐   │
│  │          Prisma ORM (type-safe)           │   │
│  └────────────────────┬──────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼──────────────────────┐   │
│  │           SQLite (dev.db file)            │   │
│  └───────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | Full-stack in one repo; API routes as backend |
| Styling | Tailwind CSS 4 | Utility-first with custom design tokens |
| Gestures | Framer Motion | Drag-to-swipe with spring physics, rotation, overlays |
| Database | SQLite | Zero-config, file-based, demo-friendly |
| ORM | Prisma | Type-safe queries, schema management, seed script |
| Icons | Google Material Symbols | Consistent icon set via web font |
| Images | Programmatically generated SVGs | 100 pet placeholders in `/public/items/` |

---

## ✅ Completed Requirements

| # | Requirement | Status |
|---|---|---|
| 1 | 100 fictional pets seeded on fresh install | ✅ |
| 2 | All votes round-trip to SQLite via API | ✅ |
| 3 | One vote per sessionId + itemId (upsert dedup) | ✅ |
| 4 | Swipe right = Yes, left = No, down = Results | ✅ |
| 5 | Yes/No button fallback records same vote | ✅ |
| 6 | Results accuracy reflects actual DB rows | ✅ |
| 7 | Mobile layout at 390 × 844 (no overflow) | ✅ |
| 8 | Desktop mouse drag triggers votes | ✅ |
| 9 | Three sort modes: mostLoved, mostVoted, mostDivisive | ✅ |
| 10 | All 100 pet images load correctly | ✅ |
| 11 | Loading state shown while fetching | ✅ |
| 12 | Error state shown on API failure | ✅ |
| 13 | Empty deck screen when all pets voted | ✅ |
| 14 | Anonymous session via localStorage UUID | ✅ |
| 15 | Already-voted pets filtered from deck | ✅ |

---

## 📁 Project Structure

```
/app
  /api
    /items/route.ts       # GET: items with session vote filtering
    /vote/route.ts        # POST: record/upsert a vote
    /results/route.ts     # GET: aggregate results with sort modes
  page.tsx                # Root page — session init, state, views
  layout.tsx              # App layout with fonts and metadata
  globals.css             # Design tokens and custom utilities
/components
  SwipeCard.tsx           # Framer Motion draggable card with overlays
  ProgressHeader.tsx      # Top bar: progress counter + Results nav
  ResultsView.tsx         # Ranked leaderboard with sort tabs
  EmptyDeck.tsx           # End-of-deck completion screen
/lib
  prisma.ts               # Prisma client singleton
  session.ts              # Session ID utilities
  api.ts                  # Frontend fetch wrappers + types
/prisma
  schema.prisma           # Item + Vote models
  seed.ts                 # Generate 100 pets + reads from public/dogs/
/public
  /dogs                   # Real pet images
```

---

## 🐛 Known Issues

- **No real-time updates** — the results view does not auto-refresh; data is fetched on each view switch.
- **Error handling uses `window.alert()`** — intentionally minimal per PRD specification.
- **Pet categories mixed with dog images** — The database seed data includes categories like "cat" and "bird", but the images are populated from a user-provided `/public/dogs/` directory, resulting in some mismatched images and categories.

---

## 📄 License

This project was built as a technical demonstration.
