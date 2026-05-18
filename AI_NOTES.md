# 🤖 AI Notes — PawPick

An honest reflection on the use of AI tools during the development of PawPick.

---

## How AI Was Used

The **Antigravity AI Agent** (powered by the **Gemini** models) and various code-generation LLMs were used throughout the development of PawPick, primarily for:

- **Project scaffolding** — Generating the initial component structure, Prisma schema, and seed script based on the PRD specification.
- **API route implementation** — Drafting the three API endpoints (items, vote, results) including validation logic and sort algorithms.
- **Frontend components** — Building React components with Framer Motion gestures, translating design templates into functional TSX.
- **Styling** — Translating design tokens from the provided `DESIGN.md` into Tailwind CSS custom theme configuration.
- **Debugging** — Identifying and resolving issues with drag gesture thresholds, animation timing, and state management edge cases.

---

## What AI Generated

- **Prisma schema and seed script** — The `schema.prisma` and `seed.ts` files were primarily AI-generated based on the PRD data model specification.
- **API route handlers** — All three route files (`items`, `vote`, `results`) were generated with AI assistance, including the sort logic for mostLoved, mostVoted, and mostDivisive modes.
- **SwipeCard component** — The Framer Motion integration including `useMotionValue`, `useTransform`, drag handlers, and exit animations were AI-assisted.
- **ResultsView component** — The leaderboard layout with sort tabs and dynamic data fetching.
- **CSS design system** — The `globals.css` theme tokens were generated from the design specification.

---

## What Was Fixed / Rejected

- **Drag direction conflicts** — AI initially implemented horizontal-only drag (`drag="x"`), which prevented downward drag detection for opening results. This was corrected to use unconstrained `drag` with `dragConstraints` to allow both x and y movement detection.
- **Vote button placement** — AI initially placed vote buttons as a separate component below the card. The design templates called for floating action buttons overlaid on the card itself, so the implementation was adjusted.
- **Animation timing** — The initial exit animation was too fast (100ms), making swipes feel abrupt. The timing was tuned to 300ms for a smoother feel.
- **Sort algorithm edge cases** — The mostDivisive sort initially didn't handle items with zero votes correctly (division by zero on yesRate). Added explicit handling to rank zero-vote items last.
- **State management** — AI suggested using `useReducer` for complex state, but `useState` with multiple state variables proved simpler and more readable for this scale.

---

## AI Strengths & Weaknesses

### Strengths

- **Boilerplate and scaffolding** — AI excelled at generating repetitive structure (100 pet entries, API route patterns, type definitions).
- **API implementation** — The Prisma query patterns and REST endpoint structure were generated accurately on the first attempt.
- **Framer Motion integration** — AI had strong knowledge of the gesture API and produced working drag-to-vote mechanics quickly.

### Weaknesses

- **Design fidelity** — AI struggled to faithfully reproduce the exact look of the HTML/Tailwind design templates. Manual iteration was needed to match spacing, colors, and typography.
- **Edge case handling** — Sort algorithms and empty state logic required manual review. AI's first pass often missed boundary conditions.
- **Component architecture decisions** — AI sometimes over-engineered solutions (suggesting Context API, custom hooks) when simpler patterns sufficed.
- **Tailwind v4 specifics** — AI occasionally suggested Tailwind v3 syntax that required adjustment for the v4 `@theme` block approach.

---

*This document was written to satisfy the AI_NOTES.md requirement in the PawPick PRD (Section 14.2).*
