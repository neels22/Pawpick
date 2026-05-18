# Phase 4: Framer Motion Swipe Gestures

## Objective
Transform the static `SwipeCard` into a dynamic, swipeable card using Framer Motion, completing the core interactive experience.

## Tasks
1. **Framer Motion Setup**: Wrap the card in `SwipeCard.tsx` with `<motion.div drag="x" ...>`.
2. **Drag Visuals**: Bind `rotate` and background tint opacities (green for right, red for left) to the `x` drag offset using `useMotionValue` and `useTransform`.
3. **Labels**: Display "YES" and "NO" labels on the card based on the drag direction and distance.
4. **Drag Handlers**: Implement `onDragEnd`. If `x` passes the threshold (+100px or -100px), trigger the respective vote and animate the card off-screen.
5. **Downward Drag**: Detect a downward drag (`y > 120px`) and trigger the `onOpenResults` callback without recording a vote.

## Testing Completion
- Open the app in a browser (use mobile view in dev tools).
- **Verification:**
  - Swiping a card right turns it green, tilts it, and records a "Yes" vote.
  - Swiping a card left turns it red, tilts it, and records a "No" vote.
  - Dragging down opens the results view.
  - Releasing a card before the threshold snaps it back to the center.
