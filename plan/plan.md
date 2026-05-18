# 🐾 PawPick — Product Requirements Document

**Version:** 1.0 | **Status:** Final Draft | **Last Updated:** May 2026 | **Classification:** Confidential

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Goals & Success Criteria](#2-product-goals--success-criteria)
3. [Scope](#3-scope)
4. [User Stories](#4-user-stories)
5. [Screen Specifications](#5-screen-specifications)
6. [API Specification](#6-api-specification)
7. [Data Model](#7-data-model)
8. [Seed Data](#8-seed-data)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Technical Stack](#10-technical-stack)
11. [Build Order](#11-build-order)
12. [Hard Rules](#12-hard-rules)
13. [Acceptance Checklist](#13-acceptance-checklist)
14. [Submission Requirements](#14-submission-requirements)
15. [Appendix](#15-appendix)

---

## 1. Executive Summary

PawPick is a mobile-first, swipe-to-vote web application where users browse cards of fictional adoptable pets and cast a Yes or No vote on whether they would adopt each one. Every vote is persisted to a real backend database, and a public results view surfaces aggregate community sentiment — ranked by Most Loved, Most Voted, and Most Divisive pets.

The product is designed to be immediately understandable, emotionally engaging, and technically demonstrable. It showcases a complete full-stack architecture: a Next.js frontend with fluid gesture-driven UI, API route handlers acting as the backend layer, and a SQLite database managed through Prisma. The end-to-end data flow — swipe a card, persist the vote, reflect it in aggregated results — is the core value of the system.

| Attribute | Value | Notes |
|---|---|---|
| App Name | PawPick | |
| Product Type | Mobile-first web app | Also functional on desktop |
| Core Action | Swipe-to-vote on pet adoption | Yes or No per pet |
| Data Scope | 100 fictional adoptable pets | Seeded at launch |
| Session Model | Anonymous via sessionId | localStorage only for ID |
| Vote Persistence | SQLite via Prisma ORM | Server-side source of truth |
| Target Viewport | 390 × 844 px (iPhone 14 Pro) | Desktop drag also supported |

---

## 2. Product Goals & Success Criteria

### 2.1 Primary Goals

- Deliver a polished, playful mobile UX for swiping through pet adoption cards.
- Persist every vote to a real backend database — no client-side vote storage.
- Surface meaningful aggregate results that update from actual vote data.
- Demonstrate a working full-stack vertical slice suitable for technical review.

### 2.2 Success Criteria

| Criterion | Target | Priority |
|---|---|---|
| Seed data created | Exactly 100 pets seeded on fresh install | P0 |
| Vote persistence | All votes round-trip to SQLite | P0 |
| Deduplication | One vote per sessionId + itemId | P0 |
| Swipe gestures work | Right = Yes, Left = No, Down = Results | P0 |
| Button fallback works | Yes/No buttons record same vote as swipe | P0 |
| Results accuracy | Counts reflect actual DB rows | P0 |
| Mobile layout | No overflow or breakage at 390 × 844 | P0 |
| Desktop drag | Mouse drag triggers votes on desktop | P1 |
| Sort modes all work | mostLoved, mostVoted, mostDivisive correct | P1 |
| No broken images | All 100 SVGs load from /public/items/ | P1 |
| Loading + error states | UI shows feedback on async operations | P1 |
| Clean console on happy path | Zero unhandled errors in normal usage | P2 |

---

## 3. Scope

### 3.1 In Scope

- Anonymous session management via localStorage-stored UUID.
- Full 100-pet seed dataset with programmatically generated SVG images.
- Three API endpoints: items, vote, results.
- Swipe card UI with Framer Motion gestures and visual drag feedback.
- Yes/No button fallback controls.
- Results view with three sort modes.
- End-of-deck screen when all pets are voted on.
- Loading, error, and empty states.
- README and AI_NOTES documentation.

### 3.2 Out of Scope (v1)

- User authentication or accounts.
- Real pet images or external image hosting.
- Push notifications or real-time vote updates.
- Admin panel or content management.
- Social sharing or referral mechanics.
- Mobile native apps (iOS / Android).
- Payment, donation, or real adoption workflows.

---

## 4. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | As a visitor, I want the app to remember who I am across reloads so my votes are not lost. | sessionId loaded from localStorage; generated with crypto.randomUUID() if absent. |
| US-02 | As a visitor, I want to see one pet card at a time so I can focus on each decision. | Single card displayed; progress counter shows e.g. 12/100. |
| US-03 | As a visitor, I want to swipe right to vote Yes so the interaction feels natural. | Right drag > 100px triggers Yes vote and smooth card exit animation. |
| US-04 | As a visitor, I want to swipe left to vote No with the same natural gesture. | Left drag < -100px triggers No vote and smooth card exit animation. |
| US-05 | As a visitor, I want Yes/No buttons as a tap fallback for when swiping is inconvenient. | Buttons visible below card; tap records same vote as swipe. |
| US-06 | As a visitor, I want visual feedback while dragging so I know what vote I am about to cast. | Green tint + "YES" label on right drag; red tint + "NO" label on left drag; card tilts proportionally. |
| US-07 | As a visitor, I want to open results at any point so I can see community sentiment. | Swipe down (y > 120px) or tap Results button switches to results view. |
| US-08 | As a visitor, I want my votes to be saved so they count toward community results. | POST /api/vote persists to SQLite; GET /api/results reflects actual DB counts. |
| US-09 | As a visitor, I want to see an end-of-deck screen when I have voted on all pets. | EmptyDeck component shown; link to results view provided. |
| US-10 | As a visitor, I want to sort results to find the most loved, most voted, and most divisive pets. | Three sort modes in results view; each applies correct ordering. |
| US-11 | As a returning visitor, I want already-voted pets filtered from my deck so I do not see them again. | GET /api/items filters by sessionId; only userChoice === null items shown in swipe deck. |

---

## 5. Screen Specifications

### 5.1 Screen: Swipe

#### Layout Elements

| Element | Description | Notes |
|---|---|---|
| ProgressHeader | Top bar showing currentIndex / totalItems + Results button | e.g. "12 / 100" |
| Pet Image | Large hero SVG centered on card | Full-width, aspect-ratio preserved |
| Pet Name | Display name in large bold type | |
| Description | 1–2 sentence flavour text | Below name |
| VoteButtons | YES (green, Check icon) and NO (red, X icon) below card | w-16 h-16 rounded-full |

#### Drag Behaviour & Thresholds

| Drag Direction | Threshold | Outcome |
|---|---|---|
| Right (positive x) | x > 100px | Vote Yes; card exits right with animation |
| Left (negative x) | x < -100px | Vote No; card exits left with animation |
| Down (positive y) | y > 120px | Open Results view; no vote recorded |
| Below threshold | Any direction | Card snaps back; no vote recorded |

#### Visual Feedback During Drag

- Card rotation: proportional to x offset using `useTransform`.
- Green overlay (`bg-green-500/50`) fades in when dragging right.
- Red overlay (`bg-red-500/50`) fades in when dragging left.
- "YES" label visible when dragging right past ~50px.
- "NO" label visible when dragging left past ~-50px.

---

### 5.2 Screen: Results

#### Layout Elements

| Element | Description | Notes |
|---|---|---|
| Sort Controls | Tabs or dropdown: Most Loved / Most Voted / Most Divisive | Default: Most Loved |
| Rank | Integer rank (1, 2, 3…) | Based on selected sort mode |
| Thumbnail | Small SVG image of pet | |
| Pet Name | Display name | |
| Yes Count | Integer vote count | |
| No Count | Integer vote count | |
| Total Votes | yesCount + noCount | |
| Yes % | yesRate formatted as percentage | e.g. 92% |

#### Sort Logic

| Sort Mode | SQL / Logic | Tiebreaker |
|---|---|---|
| mostLoved | ORDER BY (yesCount / totalVotes) DESC | totalVotes DESC; 0 total → rate defaults to 0 |
| mostVoted | ORDER BY totalVotes DESC | yesRate DESC |
| mostDivisive | ORDER BY ABS((yesCount / totalVotes) - 0.5) ASC | totalVotes DESC; 0 total → ranked last |

---

### 5.3 Screen: Empty Deck

- Shown when all 100 pets have been voted on by the current session.
- Display a friendly completion message (e.g. "You've seen them all!").
- Prominent button linking to the Results view.

---

## 6. API Specification

### 6.1 GET /api/items

| Property | Value | Notes |
|---|---|---|
| Method | GET | |
| Path | /api/items | |
| Query Param | sessionId (string) | Required |
| Auth | None | Anonymous |
| Caching | No-cache | Must reflect latest votes |

**Response shape:**
```json
{
  "items": [
    {
      "id": "pet-001",
      "name": "Pug Puppy",
      "description": "A playful little pug who loves naps and snacks.",
      "category": "dog",
      "imageUrl": "/items/pet-001.svg",
      "userChoice": null
    }
  ]
}
```

`userChoice` values:
- `"yes"` — this session voted Yes on this item
- `"no"` — this session voted No on this item
- `null` — this session has not yet voted on this item

> Frontend behaviour: only items with `userChoice === null` are shown in the swipe deck.

---

### 6.2 POST /api/vote

| Property | Value | Notes |
|---|---|---|
| Method | POST | |
| Path | /api/vote | |
| Content-Type | application/json | |
| Deduplication | Upsert on conflict | unique(sessionId, itemId) |

**Request body:**
```json
{
  "itemId": "pet-001",
  "choice": "yes",
  "sessionId": "abc-123",
  "decisionMs": 1420
}
```

**Validation rules:**
- `itemId` must exist in the Item table.
- `choice` must be `"yes"` or `"no"` — reject any other value.
- `sessionId` is required — reject if missing or empty.
- `decisionMs` is optional; store if provided.

**Success response (200):**
```json
{ "ok": true, "itemId": "pet-001", "choice": "yes" }
```

**Error responses:**

| Status | Condition | Body |
|---|---|---|
| 400 | Missing or invalid fields | `{ "error": "Invalid request" }` |
| 404 | itemId not found in database | `{ "error": "Item not found" }` |
| 500 | Unexpected server error | `{ "error": "Server error" }` |

---

### 6.3 GET /api/results

| Property | Value | Notes |
|---|---|---|
| Method | GET | |
| Path | /api/results | |
| Query Param | sort (string) | Optional; defaults to mostLoved |
| Sort Values | mostLoved, mostVoted, mostDivisive | See Section 5.2 for logic |

**Response shape:**
```json
{
  "results": [
    {
      "itemId": "pet-001",
      "name": "Pug Puppy",
      "description": "A playful little pug who loves naps and snacks.",
      "category": "dog",
      "imageUrl": "/items/pet-001.svg",
      "yesCount": 92,
      "noCount": 8,
      "totalVotes": 100,
      "yesRate": 0.92
    }
  ]
}
```

---

## 7. Data Model

### 7.1 Entity: Item

| Field | Type | Description |
|---|---|---|
| id | String (PK) | Stable identifier, e.g. pet-001 |
| name | String | Display name, e.g. Pug Puppy |
| description | String | 1–2 sentence flavour text |
| category | String | Species: dog, cat, rabbit, bird, etc. |
| imageUrl | String | Path to local SVG, e.g. /items/pet-001.svg |
| createdAt | DateTime | Auto-set on insert |

### 7.2 Entity: Vote

| Field | Type | Description |
|---|---|---|
| id | String (PK, cuid) | Auto-generated unique ID |
| itemId | String (FK → Item) | Which pet was voted on |
| sessionId | String | Anonymous session identifier |
| choice | String | "yes" or "no" |
| decisionMs | Int (nullable) | Milliseconds taken to decide; optional |
| createdAt | DateTime | Auto-set on insert |
| updatedAt | DateTime | Auto-updated on upsert |

### 7.3 Constraints

- `@@unique([sessionId, itemId])` — one vote per session per pet.
- On conflict: upsert (update existing vote rather than insert duplicate).
- `choice` field: enforced in application layer as `"yes" | "no"` only.
- Database: SQLite file; managed entirely by Prisma migrations.

---

## 8. Seed Data

### 8.1 Requirements

- Exactly **100 fictional pets** created by `prisma/seed.ts`.
- Run command: `npm run db:seed`
- Species mix: dogs, cats, rabbits, birds, hamsters, ferrets, chinchillas, guinea pigs.
- Each pet requires: `id`, `name`, `description`, `category`, `imageUrl`.

### 8.2 SVG Generation

The seed script must programmatically generate SVGs — do not write 100 raw SVG strings. Use a template function:

```ts
function generateSvg(color: string, letter: string): string {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
    `  <rect width="100" height="100" fill="${color}"/>`,
    `  <text x="50" y="50" dominant-baseline="middle"`,
    `    text-anchor="middle" font-size="40"`,
    `    fill="white" font-family="sans-serif">${letter}</text>`,
    '</svg>',
  ].join('');
}
```

- Color and first letter vary per pet so cards are visually distinct.
- Files saved via `fs.writeFileSync` to `/public/items/pet-001.svg` through `pet-100.svg`.
- All 100 SVGs must be present before the app starts.

### 8.3 Example Pets

| ID | Name | Category |
|---|---|---|
| pet-001 | Pug Puppy | dog |
| pet-002 | Tabby Cat | cat |
| pet-003 | Lop Rabbit | rabbit |
| pet-004 | Parakeet | bird |
| pet-005 | Golden Retriever | dog |
| pet-006 | Tuxedo Cat | cat |
| pet-007 | Beagle | dog |
| pet-008 | Hamster | hamster |
| pet-009 | Ferret | ferret |
| pet-010 | Chinchilla | chinchilla |
| pet-011 | Cockatiel | bird |
| pet-012 | Dachshund | dog |
| pet-013 | Siamese Cat | cat |
| pet-014 | Mini Rex Rabbit | rabbit |
| pet-015 | Cockapoo | dog |

*(Continue to 100 with varied names and species.)*

---

## 9. Frontend Architecture

### 9.1 Component Structure

| Component | File | Responsibility |
|---|---|---|
| Page | app/page.tsx | Root: session init, data fetching, state management |
| SwipeCard | components/SwipeCard.tsx | Framer Motion draggable card with tint and rotation |
| VoteButtons | components/VoteButtons.tsx | Yes/No fallback button row |
| ProgressHeader | components/ProgressHeader.tsx | Top bar: progress counter + Results button |
| ResultsView | components/ResultsView.tsx | Ranked leaderboard with sort tabs |
| EmptyDeck | components/EmptyDeck.tsx | End-of-deck completion screen |

### 9.2 State Shape

```ts
interface AppState {
  sessionId:    string
  items:        Item[]
  currentIndex: number
  loading:      boolean
  error:        string | null
  view:         'swipe' | 'results'
  sortMode:     'mostLoved' | 'mostVoted' | 'mostDivisive'
}
```

### 9.3 Component Interfaces

```tsx
// SwipeCard.tsx
interface SwipeCardProps {
  item: Item
  onVote: (choice: 'yes' | 'no') => void
  onOpenResults: () => void
}

// VoteButtons.tsx
interface VoteButtonsProps {
  onVote: (choice: 'yes' | 'no') => void
}

// ProgressHeader.tsx
interface ProgressHeaderProps {
  currentIndex: number
  totalItems: number
  onOpenResults: () => void
}
```

### 9.4 Framer Motion Directives

- SwipeCard must use: `<motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={...}>`
- Use `useMotionValue` and `useTransform` to bind `rotate` and tint opacity to the `x` drag offset.
- Down drag detected separately; use a combined drag handler checking `info.offset.y`.
- Smooth exit animation triggered programmatically after vote threshold is met.

### 9.5 Styling Directives

| Element | Tailwind Classes | Notes |
|---|---|---|
| Card | `bg-white shadow-xl rounded-2xl` | Main swipe card container |
| Yes button | `w-16 h-16 rounded-full shadow-md bg-green-500` | Lucide Check icon |
| No button | `w-16 h-16 rounded-full shadow-md bg-red-500` | Lucide X icon |
| Right tint | `bg-green-500/50 absolute inset-0` | Fades in on right drag |
| Left tint | `bg-red-500/50 absolute inset-0` | Fades in on left drag |
| Wrapper | `overflow-hidden` | No horizontal overflow |
| Error state | `window.alert(message)` | Simplest acceptable UX |

### 9.6 Session Initialisation

Inside a `useEffect` in `app/page.tsx` on component mount:

1. Read `sessionId` from `localStorage.getItem('sessionId')`.
2. If `null`, generate one with `crypto.randomUUID()`.
3. Save to `localStorage.setItem('sessionId', id)`.
4. Set `sessionId` in state.
5. Fetch `/api/items?sessionId=...` with the resolved ID.

### 9.7 UI Reference & Implementation (CRITICAL)

A set of static HTML/Tailwind mockups and design documentation have been provided in the `plan/` directory. **You MUST use these files as the definitive source of truth for all markup, layout, and Tailwind CSS classes.** Do not invent your own UI layouts from scratch; extract the DOM structure and Tailwind utility classes directly from these `code.html` files and adapt them into the React components.

- **Design System Tokens:** Read `plan/pawpick/DESIGN.md` for the exact brand colors, typography, and spacing values. Use this to configure your `tailwind.config.ts`.
- **Swipe Card UI:** Extract markup from `plan/pawpick_scrolling_card_stack/code.html` and apply it to `SwipeCard.tsx`.
- **Empty Deck UI:** Extract markup from `plan/pawpick_all_caught_up_scroll/code.html` and apply it to `EmptyDeck.tsx`.
- **Results/Stats UI:** Extract markup from `plan/pawpick_profile_stats_scroll/code.html` and `plan/pawpick_your_matches_scroll/code.html` to build the `ResultsView.tsx`.

You can also view the `screen.png` files in those directories as visual references of what the final components should look like.

---

## 10. Technical Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js App Router + TypeScript | Full-stack in one repo; API routes as backend |
| Styling | Tailwind CSS | Utility-first; no runtime CSS-in-JS overhead |
| Gestures/Animation | Framer Motion | Production-grade drag + spring animations |
| Database | SQLite | Zero-config; demo-friendly; file-based |
| ORM | Prisma | Type-safe queries; migration management |
| Icons | Lucide React | Consistent icon set; tree-shakeable |
| Images | Generated SVGs in /public/items/ | No external dependencies; no broken images |

### 10.1 File Structure

```
/app
  /api
    /items/route.ts       # GET: items with session vote status
    /vote/route.ts        # POST: record a vote
    /results/route.ts     # GET: aggregate results
  /page.tsx               # Root page — session + state
/components
  SwipeCard.tsx
  ResultsView.tsx
  ProgressHeader.tsx
  VoteButtons.tsx
  EmptyDeck.tsx
/lib
  prisma.ts               # Prisma client singleton
  session.ts              # Session utilities
  api.ts                  # Frontend fetch wrappers
/prisma
  schema.prisma
  seed.ts
/public
  /items                  # 100 generated SVGs
README.md
AI_NOTES.md
```

---

## 11. Build Order

Execute steps in this exact sequence to avoid setup dependency issues.

| Step | Action | CLI Command |
|---|---|---|
| 1 | Create Next.js project | `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes` |
| 2 | Install runtime dependencies | `npm install @prisma/client framer-motion lucide-react` |
| 3 | Install Prisma dev dependency | `npm install prisma --save-dev` |
| 4 | Initialise Prisma with SQLite | `npx prisma init --datasource-provider sqlite` |
| 5 | Define schema (Item + Vote models) | Edit `prisma/schema.prisma` |
| 6 | Run initial migration | `npx prisma migrate dev --name init` |
| 7 | Write + run seed script | `npm run db:seed` (verify 100 rows) |
| 8 | Implement GET /api/items | |
| 9 | Implement POST /api/vote | |
| 10 | Implement GET /api/results | |
| 11 | Build static card frontend | One card displayed, no gestures |
| 12 | Wire Yes/No buttons to API | |
| 13 | Add Framer Motion swipe gestures | |
| 14 | Add drag feedback (tint, rotation) | |
| 15 | Build Results screen | |
| 16 | Add sort options to Results | |
| 17 | Add loading/error/empty states | |
| 18 | Polish mobile layout | |
| 19 | Write README.md | |
| 20 | Write AI_NOTES.md | |
| 21 | Full fresh-clone acceptance test | |

---

## 12. Hard Rules

These rules are non-negotiable. Violating any of them is grounds for rejection.

| Rule | Requirement |
|---|---|
| NO localStorage votes | localStorage may only store sessionId. Votes must be persisted in SQLite via the API. |
| NO faked backend | All vote counts must be read from the database. No hardcoded numbers. |
| NO external images | All 100 pet images must be local SVGs in /public/items/. No external image URLs. |
| NO real people images | Do not use photographs or likenesses of real people. |
| NO unused code | Remove all dead code, unused imports, and AI-generated scaffolding not needed by the app. |
| Full round-trip required | Every vote must: reach the API → be validated → be upserted in SQLite → be reflected in /api/results. |
| Vote deduplication required | The @@unique([sessionId, itemId]) constraint must be enforced; upsert on conflict. |

---

## 13. Acceptance Checklist

All items below must be verified before the build is considered complete.

| # | Check | Priority |
|---|---|---|
| 1 | App runs from a fresh git clone | P0 |
| 2 | `npm install` succeeds without errors | P0 |
| 3 | `npx prisma migrate dev` succeeds | P0 |
| 4 | `npm run db:seed` creates exactly 100 pet items | P0 |
| 5 | Swipe right records a Yes vote in SQLite | P0 |
| 6 | Swipe left records a No vote in SQLite | P0 |
| 7 | Yes/No buttons record the same votes as swiping | P0 |
| 8 | Swiping down or tapping Results opens the results view | P0 |
| 9 | Results counts come from the database (not hardcoded) | P0 |
| 10 | Voting twice from the same session does not double-count | P0 |
| 11 | App renders correctly at 390 × 844 px viewport | P0 |
| 12 | Mouse drag triggers votes correctly on desktop | P1 |
| 13 | All three sort modes (mostLoved, mostVoted, mostDivisive) work | P1 |
| 14 | All 100 pet SVGs load without broken images | P1 |
| 15 | Loading state is visible while fetching | P1 |
| 16 | Error state is shown if a backend call fails | P1 |
| 17 | Empty deck screen appears when all pets are voted on | P1 |
| 18 | No unhandled console errors on the happy path | P2 |
| 19 | README.md is complete and accurate | P2 |
| 20 | AI_NOTES.md is complete and honest | P2 |

---

## 14. Submission Requirements

The final submission must include the following documentation files in the root directory:

### 14.1 README.md
Must contain:
- **How to run the app:** Clear, step-by-step setup and run instructions (install, migrate, seed, run).
- **Architecture overview:** High-level description of the Next.js, Framer Motion, and Prisma/SQLite stack.
- **Completed requirements:** A checklist showing which features from the PRD were successfully implemented.
- **Known issues:** Honest disclosure of any bugs or incomplete features.

### 14.2 AI_NOTES.md
Must contain an honest reflection on the use of AI tools during development (or this can be an "AI Notes" section within the README):
- **How AI was used:** Which tools were used (e.g., Cursor, GitHub Copilot, ChatGPT) and for what purpose.
- **What AI generated:** Which parts of the codebase were primarily generated by AI.
- **What you fixed/rejected:** Specific instances where the AI made mistakes, hallucinated, or proposed bad architecture, and how it was corrected.
- **AI strengths/weaknesses:** A brief evaluation of where the AI excelled and where it struggled on this specific assignment.

---

## 15. Appendix

### 15.1 Prisma Schema

```prisma
model Item {
  id          String   @id
  name        String
  description String
  category    String
  imageUrl    String
  votes       Vote[]
  createdAt   DateTime @default(now())
}

model Vote {
  id         String   @id @default(cuid())
  itemId     String
  sessionId  String
  choice     String
  decisionMs Int?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  item Item @relation(fields: [itemId], references: [id])

  @@unique([sessionId, itemId])
}
```

### 15.2 SVG Generation Template

```ts
function generateSvg(color: string, letter: string): string {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
    `  <rect width="100" height="100" fill="${color}"/>`,
    `  <text x="50" y="50" dominant-baseline="middle"`,
    `    text-anchor="middle" font-size="40"`,
    `    fill="white" font-family="sans-serif">${letter}</text>`,
    '</svg>',
  ].join('');
}
```

### 15.3 Glossary

| Term | Definition |
|---|---|
| sessionId | A UUID stored in localStorage that identifies an anonymous browser session. Used to deduplicate votes. |
| userChoice | The vote a specific sessionId has cast on a specific item: "yes", "no", or null if not yet voted. |
| yesRate | Ratio of yes votes to total votes for a given item. Computed as yesCount / totalVotes. |
| mostDivisive | Sort mode ranking items whose yes rate is closest to 0.5 (most evenly split community opinion). |
| Upsert | Database operation that inserts a new row if none exists, or updates the existing row on conflict. |
| SVG | Scalable Vector Graphic. Used here for pet images: generated programmatically, no external dependencies. |

---

*— End of Document —*