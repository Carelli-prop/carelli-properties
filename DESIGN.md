# DESIGN.md

## Business Summary
Carelli Properties is a direct-landlord letting business offering two compact, furnished apartments in St John's, Worcester. The sole purpose of the site is to honestly present the homes and convert qualified visitors into booked viewers in under a minute.

## Audience
Single professionals, mature students, or couples seeking an affordable, low-maintenance base in Worcester. We intentionally exclude large families to manage expectations regarding the compact footprint and small-double bed capacities.

## Voice and Copy Rules
- **Tone:** Warm, plain British English. Calm and confident.
- **Structure:** Short sentences. One idea per sentence.
- **Punctuation:** Use hyphens (-) for pauses, never em dashes.
- **Persuasion:** Lead with the benefit, then give the reason.
- **Honesty:** Never claim what we cannot keep. If a fact is unverified, omit it or phrase it experientially. No hyperbolic adjectives.

## Design Tokens
- **Page Background:** `#FCFCFA` (Warm off-white).
- **Surface:** `#FFFFFF` (Cards).
- **Soft Accent:** `#AECED0` (Johnstone's "New Duck Egg", primary action background).
- **Accent Hover:** `#8FB9BC`.
- **Hairlines:** `#E5E5E5`.
- **Heading Colour:** `#1A1A1A`.
- **Body Colour:** `#333333`.
- **Meta Colour:** `#666666`.
- **Carelli Blue:** `#1D4E89` (sampled from the approved logo render). Used for logo, wordmark, primary action text, focus rings, and all links.
- **Links:** Carelli Blue with a permanent underline.

## Typography
- **Display Face:** Instrument Serif (self-hosted via next/font). Headings and the "Carelli" wordmark.
- **Body Face:** Inter (self-hosted via next/font).
- **Fallbacks:** Metric-matched (Times New Roman for display, Arial metrics for body) to prevent layout shift.
- **Base Size:** 16px minimum for body text.
- **Line Height:** 1.5 body, 1.2 headings.

## Spacing Scale
4px grid: 4, 8, 16, 24, 32, 48, 64, 96.

## Card and Button Conventions
- **Cards:** 1px hairline border, 8px radius, white surface. No drop shadows.
- **Buttons:** 16px vertical and 24px horizontal padding, 8px radius. Primary is duck egg background with Carelli Blue text. Buttons change verb on tap in the booking flow.

## Visible Focus States
- 2px solid Carelli Blue outline with 2px offset. Never removed.

## Prefers-Reduced-Motion Rule
- All transitions snap to their end state. Photos render fully opaque with no fade.

## Image Rules
- **Real photos only.** Zero stock, zero generated imagery of the properties.
- **Treatment:** Natural light, honest exposure, no filters.
- **Performance:** Hero priority-loaded. Below-fold lazy with a fade-in. Explicit dimensions for zero layout shift.

## Logo Policy
- **Master mark:** The doorway arch with a negative-space letter C, drawn as single-weight line art in Carelli Blue (`#1D4E89`). Based on the artwork approved by the client.
- **Lockup:** The mark sits to the left of the wordmark. "Carelli" in Instrument Serif. "PROPERTIES" in Inter capitals, tracked out widely, beneath it.
- **Colour variant:** The left body of the arch filled with New Duck Egg (`#AECED0`). Used only in the site header on white, and on the OG image.
- **Small sizes:** Below 32px, use the solid inverse cut. A navy silhouette with the C knocked out in off-white. This protects the favicon.
- **Reversed:** On navy backgrounds or on photographs, use the line art in off-white (`#FCFCFA`).
- **Clear space:** Keep empty space equal to half the mark's height on all sides.
- **Never:** No gradients, no shadows, no 3D, no bevels, no stretching, no secondary icons anywhere else on the site.
- **Production file:** A hand-coded SVG snapped exactly to these tokens. Raster renders are for approval only, never shipped.
