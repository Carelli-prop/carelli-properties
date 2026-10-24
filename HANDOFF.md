# HANDOFF.md

Running record of decisions for Carelli Properties.

## Pass 0 - Facts
- Business: Carelli Properties (renamed from Pear Properties).
- Landlord: Carole (direct landlord). Admin and viewings: Matthew, prefers Matt.
- Contact email: carelliproperties@gmail.com (project inbox, created for this).
- WhatsApp: +447470303576 (Matthew).
- Properties: Flat 88A and Flat 88B, Oldbury Road, Worcester, WR2 6AR. St John's area.
- No agency fees: true, direct landlord. Approved for use on site.
- Furnished: both. EPC: both C. 88B note: assessed before new windows were fitted.
- Pets: considered on request. Smoking: no smoking or vaping indoors.
- Bills: not included. Tenant pays council tax, energy, water.

## Placeholders (must be verified before cutover)
- Council tax: Band A for both. Unverified. Check VOA.
- Rent: £600 pcm each.
- Deposit: £692.31 each (five weeks at £600, legal cap).
- Available from: 1 December 2026 both.
- All live in content/site.ts. One-line edits.

## Pass 1 - Brand
- DESIGN.md approved, including logo policy and Carelli Blue #1D4E89.
- Logo system: line-art master, duck egg colour variant, solid inverse favicon.
- Links unified to Carelli Blue, underlined always.

## Mockup rules (pre-cutover only)
- The nine client photos serve both apartments.
- exterior-88b.jpg appears only on the 88B page, because it shows the 88B number.
- All mockup photos replaced with per-flat photography before cutover.

## Accounts
- Gmail: carelliproperties@gmail.com (project inbox and logins).
- GitHub: Carelli-prop / carelli-properties (public).
- Vercel: not connected yet. Supabase: Pass 3. Resend: Pass 3, needs a owned domain later.

## Open items
- Real per-flat photography.
- VOA council tax bands.
- Final rent and deposit.
- Final available-from dates.
- Domain purchase decision (needed for Resend sending and cutover).




## Pass 2 polish (mobile critique round)
- Display font swapped from Instrument Serif to Fraunces. Client found Instrument Serif too formal on mobile.
- Primary button text changed from Carelli Blue to ink #1A1A1A on duck egg. Client taste call, and contrast improves to about 13:1.
- Header CTA hidden on mobile because the sticky bottom bar covers it. Header static on mobile, sticky on desktop.
- Mockup note bubble removed from public pages. It lives only in this file.
- Gallery is now a horizontal scroll-snap scroller, keyboard focusable.
- Photo fade-in bug fixed. Cached images never fired onLoad, so small fast photos stayed invisible. Carole's photo was the casualty.
- Area page rewritten to cut unverified specifics. Shop names, park names and walk times moved to the pre-cutover check list below.

## Pre-cutover check list (added)
- Verify named shops, parks and walk times for the Area page, or keep the current honest generalities.





## Pass 2 polish round 2
- carole.jpg was uploaded with a capital C and renamed to lowercase. File names are case-sensitive on the web.
- Added top padding to main so every page title clears the header.
- Mobile nav is now a two-by-two grid. No sideways slide, nothing cut off. Desktop nav unchanged.



## Pass 2 polish round 3
- Mobile nav replaced with a Menu button and dropdown panel (details and summary, no JavaScript). Client rejected the two-by-two grid and the sideways scroller.
- Native select rejected for nav: form-field feel, extra tap, links hidden from search engines.
- Supabase signup via GitHub mis-assigned the org role. Fix is a new organization or email sign-in.


