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



## Pass 3 Part B - Booking Flow
- 4-step booking flow built: Apartment, Date (wheel), Time (wheel), Details.
- Wheel pickers use CSS scroll-snap, fading masks, and keyboard/screen-reader support.
- Step indicator shows "Step X of 4".
- "Fully booked" state handled. If a chosen day is full, UI prompts for another day.
- Success screen implemented with summary, "what happens next" copy, and WhatsApp `wa.me` deep link with pre-filled text.
- Skeletons used for loading states, no spinners.




## Pass 4 Part 1
- /admin bookings table added, locked behind HTTP Basic auth via middleware. ADMIN_PASSWORD env required.
- Button press pulse (ButtonFeel) applied site-wide to all .btn and .choice-btn elements.
- robots.ts, sitemap.ts, and a warm not-found.tsx added.
- Email delivery ready: RESEND_API_KEY env switches on automatic request emails to carelliproperties@gmail.com.



## Micro-interactions decision
- Site-wide press pulse (ButtonFeel) removed after external design review. Redundant with hover and :active, invisible on navigating taps, too loud for a calm brand.
- Unlock pulse kept in the booking flow only, as a state-change signal. Policy written into DESIGN.md.




## Admin chrome
- /admin now hides the public nav, menu, header CTA and sticky booking bar. Logo remains as the exit route. Admin is a tool, not a shop window.



## Pass 4 Part 2
- Viewing windows confirmed: Mondays and Tuesdays, 08:00 to 21:00, 30-minute slots, minimum one day ahead.
- Micro-interactions shipped: step progress hairline, 150ms step fade, focus-within labels, gallery hover scale on desktop only, link underline thickening.
- Social cards added: twitter summary_large_image, OG alt text, mobile theme colour.
- Privacy disclosure added to Good To Know.

## Pre-cutover checklist
- [ ] Real per-flat photography uploaded and mapped to the correct flats.
- [ ] VOA council tax bands verified for 88A and 88B.
- [ ] Final rent and deposit figures set in content/site.ts.
- [ ] Final available-from dates set.
- [ ] Resend account with a verified domain, RESEND_FROM set to a real address.
- [ ] Domain purchased, DNS pointed at Vercel, NEXT_PUBLIC_SITE_URL updated.
- [ ] Test bookings deleted from Supabase.
- [ ] Lighthouse mobile 95 or above on all four categories, or fixes applied.
- [ ] Carole has reviewed the live preview and approved.



## Pass 4 Part 3
- Apartments page: hero merged into the gallery scroller as slide one. Dots plus a swipe hint make the scroller self-evident.
- Canonical set on /book-a-viewing so ?apartment= variants do not split SEO.
- Lighthouse mobile gates passed: home 99/100/100/100, booking 98/100/96/100.
- Pricing research opened. Worcester average private rent was £984 pcm in September 2026, up 6.1% year on year (ONS).
- St John's one-bed listings observed around £725 to £895 pcm.
- University of Worcester St John's campus sits on Oldbury Road itself, which makes student demand walkable and real.


## Pricing and verified facts
- EPC verified: 88A ground floor 29 sqm, C, valid to 15 Mar 2032. 88B top floor 31 sqm, C, valid to 28 Jun 2032. Both gas heated, double glazed, legally lettable.
- Note: 88B measures 2 sqm larger than 88A despite feeling crampier. Layout, not area. Square metres never published on site.
- Separate bedroom and private bathroom in both: compact one-beds, not studios.
- Recommended rents, bills excluded: 88A £825 pcm, 88B £750 pcm. Deposits at five-week cap: £951.92 and £865.38. Fallback rule: no application within three weeks of viewings, drop £25, one step, never twice in a week.
- Furnishing corrected to part-furnished (sofa, table, small-double bed).
- New fact rows: floor and entrance, kitchen, laundry, parking, outdoor space, broadband.
- Parking: one free driveway space each. Washer-dryer in each flat. Shared garden, landlord mows.
- Broadband not included for now.
- Renters' Rights Act 2025: fixed terms and section 21 ending during 2026. No twelve-month minimum can be required. Risk managed by guarantor and references, applied identically to all applicants. No student premium, ever.
- robots.txt now a static file in public, after PSI fetch timeouts on the generated route.
- Gallery slides uniform 3:4 frame with centre crop, fixing the landscape-portrait height mismatch.


## Pass 4 close
- PageSpeed final: home mobile 99/100/100/100 and desktop 100 on all four. Booking mobile 99/100/100/100 and desktop 100 on all four. Gate passed on both form factors.
- Static robots.txt resolved the fetch-timeout SEO failure.
- Preview noindex guard added: X-Robots-Tag noindex on any vercel.app hostname, so placeholder rents and mockup photos never reach search indexes. Drops automatically at cutover.
- Rents £825 and £750 pending Carole's consent. Deposits follow the five-week cap automatically.
- EPC certificate numbers on record: 88A 9351-3014-1207-2192-4200, valid to 15 March 2032. 88B 2586-3017-3206-1072-8200, valid to 28 June 2032. The assessor made no recommendations for either property.
- Cutover defined: domain purchase, DNS to Vercel, site URL and sitemap update, Resend domain verification and sending address, per-flat photography swap, final facts, test data purge, Carole sign-off, flip.


## Pre-cutover trust and ease batch
- Autocomplete attributes on booking form fields.
- Running choice summary under the step indicator.
- Honeypot spam field on booking form, fake-success response for bots.
- Energy estimate row per flat from verified EPC certificates, with 2022-prices caveat.
- Good To Know: tenancy length under Renters' Rights Act, neutral references and guarantors, no-cookies statement.
- Area page: University of Worcester St John's campus on Oldbury Road, verified from the campus map.
- Contact: tel link and prefilled email subject.


## Brochure review and EPC batch, trimmed
- Sale brochure used as a corroborating witness only. Band A for both flats now confirmed by a second document. VOA check remains the final word at cutover.
- En-suite shower room off the bedroom confirmed for both flats and added to the facts table.
- Allocated parking per flat and communal rear garden corroborated.
- Brochure claims rejected where they conflict with measured truth: generous double bedroom, 28 sq m for 88B, washing machine versus washer-dryer.
- Brochure images not used. Copyright sits with the agent or photographer, and staged sale photos would misrepresent the let. Brochure kept as a shot-list reference for photo day.
- EPC batch trimmed to what a tenant actually asks: will it be cold, what will it cost, is it legit. Carbon tonnes, numeric score, heating control config and the separate legal disclosure all cut.


## Admin cockpit and booker service loop
- viewings table gains status, ref and reminded_at columns.
- /admin becomes a working board: Needs action, Upcoming confirmed, Past and cancelled, with one-click confirm, cancel, reminder, completed-plus-followup, reopen, WhatsApp, mailto and CSV export.
- Requests older than 24 hours flag red to protect the one-working-day promise.
- Booker loop: reference on screen and in every email, immediate acknowledgement, confirmation with exact door and parking, 24-hour reminder, post-viewing next steps, and a browser-generated calendar file.
- Entrance facts from the verified brochure: 88A side door, 88B rear door.
- Deferred by decision: self-serve reschedule tokens and scheduled automatic reminders. Revisit after cutover if volume earns them.



## Owner decisions, pre-cutover
- Rents held at £825 (88A) and £750 (88B) for the mockup. Owners judge them slightly high and will run their own comp research before cutover. History recorded: first recommendation 825/750, corrected band 795/750 after comp verification errors, owners chose to hold and research later.
- Booking flow skips the flat-choice step when arriving from a flat-specific Book button. Back still returns to the choice. Generic CTAs still start at the choice.
- Phone is now required on the booking form, enforced in the browser and on the server.
- /admin board verified working: statuses, over-24h flag, CSV, WhatsApp and mailto. Email buttons report skipped until RESEND_API_KEY exists.
- Resend key procedure: create with Sending access at resend.com API Keys, paste only into Vercel environment variables, never into chat.



## Apartments split into two pages
- /apartments becomes an index with two cards. /apartments/88a and /apartments/88b are their own pages with their own metadata.
- Owner decision: a reader committed to one flat should never re-choose it. The skip-step and the per-flat mobile CTA enforce that momentum.



## Step 1 skip and sticky bar fix
- Sticky booking bar now hides entirely on /apartments/88a and /apartments/88b. This forces mobile users to use the inline CTA, which carries the apartment ID and successfully skips Step 1.
- URL parameter check for initialApartment made case-insensitive to prevent "88A" vs "88a" mismatches.
- Resend email delivery clarified: free tier is sufficient. Real-world delivery unlocks upon free domain verification at cutover. Gmail SMTP rejected due to automated-sending blocks.


## Booking navigation performance
- Booking CTAs converted from plain anchors to next/link for client-side handover and prefetch.
- Bookable dates now server-rendered into the form as props, removing the /api/dates round trip. One fetch remains (taken slots), fired on mount and covered by the skeleton.
- loading.tsx added to /book-a-viewing so cold visits show a skeleton instead of blank space.


