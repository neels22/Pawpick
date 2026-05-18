---
name: PawPick
colors:
  surface: '#fff7f9'
  surface-dim: '#e5d6df'
  surface-bright: '#fff7f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ffeff8'
  surface-container: '#f9eaf2'
  surface-container-high: '#f3e4ed'
  surface-container-highest: '#eedee7'
  on-surface: '#21191f'
  on-surface-variant: '#554244'
  inverse-surface: '#372e34'
  inverse-on-surface: '#fcecf5'
  outline: '#887274'
  outline-variant: '#dac0c3'
  surface-tint: '#9c3f53'
  primary: '#9c3f53'
  on-primary: '#ffffff'
  primary-container: '#ff8da1'
  on-primary-container: '#782338'
  inverse-primary: '#ffb2bd'
  secondary: '#79564c'
  on-secondary: '#ffffff'
  secondary-container: '#fed0c3'
  on-secondary-container: '#79574d'
  tertiary: '#006e1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#61c462'
  on-tertiary-container: '#004e11'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#400013'
  on-primary-fixed-variant: '#7e273c'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#e9bcb0'
  on-secondary-fixed: '#2d150e'
  on-secondary-fixed-variant: '#5f3f36'
  tertiary-fixed: '#94f990'
  tertiary-fixed-dim: '#78dc77'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005313'
  background: '#fff7f9'
  on-background: '#21191f'
  surface-variant: '#eedee7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-lg:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 20px
  gutter-mobile: 16px
  card-padding: 24px
  stack-gap: 12px
---

## Brand & Style
The design system is centered on the emotional bond between humans and animals. The brand personality is playful, nurturing, and vibrantly energetic. It prioritizes high-quality photography of pets, framed within a UI that feels as soft and approachable as a pet’s paw.

The design style is a blend of **Minimalism** and **Tactile** design. It utilizes heavy whitespace to keep the focus on the animals, but employs soft, "squishy" interactive elements and deep, diffused shadows to create a sense of physical presence. The interface should feel "huggable"—avoiding sharp edges or clinical layouts in favor of organic, friendly containers.

## Colors
The palette is inspired by natural animal tones and the affectionate "paw-pad pink."
- **Primary (Paw-pad Pink):** Used for primary actions, active states, and brand accents. It conveys warmth and playfulness.
- **Secondary (Friendly Brown):** Used for text, iconography, and grounding elements. This provides a stable, earthy contrast to the pink.
- **Success (Energetic Green):** Reserved for "Adopt," "Yes," or "Like" interactions. It should be vibrant and high-saturation.
- **Error (Energetic Red):** Used for "Pass," "Skip," or "Unlike" interactions. 
- **Neutral/Background:** A warm cream base (#FFFBF7) replaces pure white to prevent the UI from feeling sterile, while the neutral text color is a very dark, warm-tinted brown rather than black.

## Typography
The typography is selected for maximum friendliness. **Plus Jakarta Sans** provides a modern, geometric structure for headlines with subtle rounded terminals that feel optimistic. **Quicksand** is used for body copy and labels; its naturally rounded letterforms ensure that even dense information feels soft and accessible.

To maintain readability on mobile-first screens, line heights are generous. For "Display" and "Headline" levels, use tighter letter spacing to create a cohesive, "chunky" brand feel.

## Layout & Spacing
The layout follows a **Fixed-Width Mobile-First** model, optimized for one-handed thumb interaction. 

The centerpiece of this design system is the **Hero Card**. On the primary screen, the UI should be dominated by a single large container that takes up approximately 70-80% of the viewport height. 
- **Margins:** Use a 20px safe area on the left and right edges.
- **Vertical Rhythm:** A base unit of 8px guides all spacing. Elements within cards should use 12px (stack-gap) for related items and 24px (card-padding) for internal container padding.
- **Alignment:** Center-aligned content for hero cards to emphasize the "featured" nature of the pet photography.

## Elevation & Depth
This design system avoids harsh dropshadows. Instead, it uses **Ambient Depth** to create a "floating" effect for cards.
- **Hero Cards:** Use a dual-shadow technique—a soft, wide-spread shadow (30px blur, 10% opacity) tinted with the secondary brown, and a tighter, more opaque shadow (8px blur, 5% opacity) to ground the element.
- **Interactive Elements:** Buttons should have a subtle inner-glow or a very slight "lift" shadow that disappears (flattens) when pressed, mimicking a physical button being pushed into a soft surface.
- **Layers:** Use tonal layering for background surfaces. The main background is cream, while secondary containers can use a slightly darker, desaturated pink or tan.

## Shapes
The shape language is extremely rounded to communicate safety and friendliness.
- **Hero Cards:** Must use `rounded-xl` (1.5rem / 24px) or larger to create a friendly, "cushion" look.
- **Buttons and Chips:** Use fully rounded (pill-shaped) ends to invite touch.
- **Input Fields:** Use `rounded-lg` (1rem / 16px) to maintain consistency with the card corners.
- **Icons:** Use icons with rounded caps and joins; avoid sharp 90-degree angles in any custom iconography.

## Components
- **Buttons:** Primary buttons are pill-shaped, filled with the Primary Pink, and use white or high-contrast brown text. The "Yes/No" voting buttons should be circular with large, bold icons.
- **Hero Card:** A large container with a 24px corner radius. The image within should have a top-only corner radius to fit perfectly into the frame. Information overlays should use a subtle semi-transparent gradient at the bottom for text legibility.
- **Chips:** Small, pill-shaped tags used for pet traits (e.g., "Active," "Good with cats"). Use a low-opacity version of the Primary Pink for the background with Secondary Brown text.
- **Lists:** Use "Card-style" list items rather than flat dividers. Each list item should be its own rounded container with a subtle soft shadow.
- **Input Fields:** Soft beige backgrounds with a 2px border that turns Primary Pink on focus.
- **Voting Controls:** Floating Action Buttons (FABs) positioned at the bottom of the hero card. Use the Energetic Green for "Like" and Energetic Red for "Pass," both utilizing the same soft elevation style as the main cards.