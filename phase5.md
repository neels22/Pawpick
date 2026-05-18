# Phase 5: Results View, Empty State & Polish

## Objective
Complete the remaining screens, ensure smooth transitions, and handle edge cases like loading states and an exhausted pet deck.

## Tasks
1. **Results View**: Implement `ResultsView.tsx` matching the design templates. Fetch data from `/api/results` and implement UI controls to switch between the three sort modes.
2. **Empty Deck**: Implement `EmptyDeck.tsx` to show when all 100 items have been voted on. Provide a prominent link to the results view.
3. **Navigation**: Ensure smooth toggling between the Swipe view and the Results view.
4. **Feedback States**: Add loading indicators while fetching items/results, and implement error boundaries or alerts if API calls fail.
5. **Mobile Layout**: Polish the layout to ensure it works perfectly on a 390x844 viewport (no overflow, buttons reachable).

## Testing Completion
- Complete a full run-through in the browser.
- **Verification:**
  - The Results screen accurately displays sorted data from the backend.
  - Sorting tabs correctly re-order the list.
  - After voting on all 100 pets, the `EmptyDeck` screen appears automatically.
