# Phase 3: Base Frontend Architecture (Static UI)

## Objective
Establish the primary React component structure, UI layout (using provided HTML/Tailwind templates), session management, and manual button-based voting. No swipe gestures yet.

## Tasks
1. **Session Management**: In `app/page.tsx`, initialize `sessionId` in `localStorage` if absent, using `crypto.randomUUID()`.
2. **Component Structure**: Create static versions of `SwipeCard`, `VoteButtons`, and `ProgressHeader` extracting markup from the provided design templates in `plan/pawpick`.
3. **Data Fetching**: Fetch `/api/items?sessionId=...` and display the first item.
4. **Voting Integration**: Wire up the Yes/No buttons in `VoteButtons` to call `/api/vote`.
5. **State Updates**: After a successful vote, remove the voted item from the current deck and display the next item. Update the `ProgressHeader` counter.

## Testing Completion
- Start the dev server (`npm run dev`) and open the app in a browser.
- **Verification:**
  - A session ID is generated in `localStorage`.
  - The UI matches the reference designs (static).
  - Clicking Yes/No buttons successfully sends a POST request, saves the vote in the database, and moves to the next card.
