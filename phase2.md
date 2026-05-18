# Phase 2: Backend API Layer

## Objective
Implement the server-side API routes required for the frontend to fetch data, cast votes, and retrieve aggregated results.

## Tasks
1. **`GET /api/items`**: Fetch pets for the swipe deck. Must accept a `sessionId` query parameter and return only items where the current session hasn't voted (`userChoice === null`).
2. **`POST /api/vote`**: Persist a vote. Must handle upserting (based on `sessionId` and `itemId` unique constraint) and accept `choice` ("yes" or "no").
3. **`GET /api/results`**: Return aggregate results. Must accept an optional `sort` parameter (`mostLoved`, `mostVoted`, `mostDivisive`) and return accurate counts (`yesCount`, `noCount`, `totalVotes`, `yesRate`).

## Testing Completion
- Use `curl`, Postman, or a browser API testing tool to hit the endpoints.
- **Verification:** 
  - `GET /api/items?sessionId=test-1` returns 100 items.
  - `POST /api/vote` with `sessionId=test-1`, `itemId=pet-001`, `choice=yes` returns success.
  - Repeating the POST request doesn't crash (upsert works).
  - `GET /api/results` correctly reflects the 1 vote in its payload.
