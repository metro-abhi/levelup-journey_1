# Level Up Journey: final build changes (vs. supplied zip)

## Content synced to the Final deck
- Order Management: "22% less incidents" -> "20% less incidents*" (*excluding Security findings); 811 -> 650 incidents; 14.5M orders (17% more); Punchout "+48K EUR" tile removed (not in Final); Dropwizard migration (37 OM services) added; SDCorps wording as in Final.
- CCOV: MM integration 65k added with [TO CONFIRM] (earlier draft 116k, no unit).
- Companion next: Quantities in personal lists, Deeplinking Web2App, "MVP Concept", "Additional placements", Homescreen HBR2 as in Final.
- Checkout AtP: "AtP support in DC Solutions" block added; open-topic flag on the IT/HU rows.
- Platform & technology: placeholder replaced by 3 real slides (Web Experience, FSD, Checkout, OM, Search tech); 10k savings flagged "not verified yet".

## Optimisation
- 52 images JPG -> WebP (3.3 MB -> 2.0 MB), lazy-loaded, async decoded.
- Animation loop slows when the tab is hidden.
- Inline favicon (fixes the 404), meta tags, noindex, Netlify cache headers.

## New
- "?" help overlay. 10 easter eggs with a Secrets n/N counter (saved per browser): horeca, metro, konami, tareq, level, cart, fsd, tea, hbr, plus an idle "sleepy shop" after 90 s.

## Still to confirm
CCOV MM integration 65k unit; Companion growth numbers; Punchout BG/RS status; IT/HU in AtP rows; Saghi's own words; savings 10k.

## v2 additions
- Access code gate (6 digits, keypad + keyboard, remembered for the browser session). The code is stored only as a hash, but this is a client-side gate, not real security.
- Typos fixed: Electronical -> Electronic, Single Signon -> Single Sign-On, ENTRA ID -> Entra ID, APIGEE -> Apigee, Harbour -> Harbor, SolR -> Solr, Mulesoft -> MuleSoft.
- Polish: vignette, card hover lift, glowing progress bar, focus rings, animated pixel gate.

## v3: Final-deck parity, dashboard, transitions

### Content changes (slide / what changed)
- Cover: subtitle now "FY26 review & FY26/27 outlook" as on deck slide 1
- O2O: section heading "How it developed vs PY" as on the deck
- Search cards (delivery address, default assortments, biggest bundle): problem text back to the deck wording (the site had shortened it)
- CCOV cards: full deck sentences restored, including the "→ helps customers…" benefit lines that were missing
- Companion AtP + Notification Center cards: deck wording. Notification Center status corrected to "Live since August 2026" (site said FEB 2026; "Account switcher · Categories · CTA" lines were not in Final and were replaced)
- Companion store lists card: full deck sentence with the three filter criteria
- Search next: Freshdesk line in deck wording
- Search: new slide "Fixing the basics (FY26/27)" with the Home button and Freshdesk button problem / root cause / status (deck 56–57, not on the site before)
- Web Experience: new slide "Fix the basics" (Contextual Geolocation, Store search via MAPS API, Pricing Display), deck 45–47
- CSS: Email verification "X countries" → "14 countries" (Final deck 103); flag removed
- CSS: the problem statement of every improvement added (deck 22, 60, 102–105)
- CSS KPIs: "compared to last FY" added to each label
- CCOV KPIs: per Final deck 108 — 65k "Metro Markets Sales initiated via M.SHOP MetroMarkets link" + 4.17% CTR, period "September-Mid November". REMOVED "84.783 views" and "October-now" (not in Final)
- CCOV next: rebuilt from Final deck 111 (timings added, "Personal lists as instore shopping list" and "Define a homepage based on C&C customer needs" added) + backup slide "Availability in other stores component" (deck 133)
- Checkout milestones: deck 51 wording + the four feature examples (Active Orders export, eExcise Tax in UA, Cut-Off time, Min Order Value)
- Checkout "What drove it": deck wording instead of the shortened version
- Checkout next: added "Loyalty Points Redemption" and "Resolve the orders set to Pending status due to the Comments" (deck 74)
- AtP: rebuilt from Final deck 13. Pilot row corrected to "FR, IT" as on the deck (site had "FR, HU"); KZ removed from the "do we need to proceed?" question (Final: MD, PK only); RO question updated; FY26/FY27 phases added. REMOVED "From Oct27 · Stop support of Non-AtP!!!" (not in Final; Final says "One operating model from Oct27")
- Strategic projects summary: now all 8 rows of Final deck 10 (Punchout, AtP, B2B2C, AI, Harmonization, Juliet, Wholesale Media, Fixing the basics) with Goal / Result / Next step. REMOVED the old "AI.OC · 2 → 10 countries" row and the Live/In progress status pills (not in Final)
- Punchout achieved: deck wording
- Punchout: footnote year from the deck (2025) shown and flagged
- Punchout FY27: rebuilt from Final deck 12 — goal, milestones (FY26 ES,PT,RO,MD → Oct-Dec BG,RS,TR,NL,DE,HU,HR/SI → Jan-Feb PL,IT,CZ,SK → next customers), teams (IDAM added), risks and needs added. The old lanes (NOW / Q1 / Q2 / Q3-Q4) were from an earlier version
- B2B2C: KPI target now "~+100 M€ Digital Sales in 5 Countries p.a." (Final deck 21; site still had ~XX / X placeholders)
- B2B2C: "CZ & Kosik Go live" is Q3 · HBR2 in Final (site said Q2)
- B2B2C: risk and team wording from Final
- NEW slides: AI PDLC – AI Support Agent (goal, KPI ~83%, 30→5 min/ticket, milestones, scope, success criteria; achievements and next steps) and BaC: AI Business document validation (~700k savings, milestones, scope, risks, needs) — deck 17–20, missing from the site
- NEW slide: Project Juliet – Makro to METRO in NL (~32.08 M€ Horeca Sales, Nov → APR 6th go-live, scope, team, risk) — deck 32, missing from the site
- Harmonization CZ & SK: "Web Management Tool by Physter" added
- Companion business continuity: deck wording
- Companion tech: "MARS to APIGEE", "Pentest", "Notification center" added (deck 96)
- Companion CX: intro sentence from deck 58
- Companion CX: "Personalized catalogues (meta tags)" as in Final
- Companion fix the basics: UA labels now "Added Localised Product Labels - Ukraine · Product availability labels localised to reduce claims"; the two "still open" flags removed (Final no longer has [+X%])
- Digital Catalogues: dynamic catalogue rollout waves (Nov 26 / Jan27 / Feb27) added from deck 88
- FSD next: "Display only available products in store list product teaser" added
- Wholesale Media: FY26/27 target "€7M Revenue" added
- NEW slide: Wholesale Media FY26/27 next (fixing the basics + projects with their outcomes) — deck 42
- Evaluate achievements: deck wording (slide 113 — HIDDEN in the deck, flagged)
- Quest Board: each quest now shows its description from deck 7–8 and the header "Who leads which quest · 20 quests · 13 leads"; flag: Punchout quest says "live in 7 countries", Punchout slide says 6
- Report: "The report can be accessed via this link" — the deck link is now a button on the slide
- FSD Ordering PDEs: "5.5m → 5.8m" REPLACED by "+29%" (Final deck 37); WSM spend shown as "33K€"
- Companion 3 → 1: "Saved: 3 Local solutions to be decommissioned by March 2027" (deck wording)
- NEW: M.Companion dashboard – 3 slides after the report (Sales, Customers, PDEs) from the screenshots

### On the site but not found in the Final deck text (kept, please confirm)
- Companion CX: "Support of true weighted articles", "Supersmart integration" (may only be in a screenshot)
- CCOV milestones: "MM tracking event", "Backoffice improvements · Visibility Rules for Store Lists"
- Corporate Websites: "Content tree"
- CCOV next: heading "Low-dependency Topics"
- Companion legal details (BG currency change, FR invoices, UA price per unit, NL product documents): from the deck's speaker notes

### New flags to confirm
- Companion growth: dashboard FSD 1.3bn ▲52.4% vs report +43.4% vs squad slide +4.6%
- AtP table: IT in two rows, HU in none
- Punchout: BG/RS live (FY26 slide) vs planned Oct-Dec (FY27 slide); Quest Board says 7 countries, Punchout slide says 6; footnote year 2025
- CCOV 65k: unit missing
- Evaluate achievements slide is hidden in the deck
- Presenters for BaC and Project Juliet

### Experience
- Scene transitions: iris, blinds, pixel dissolve added next to pan / zoom / climb; every stop change ~40% faster
- Slide transitions vary by content (slide, rise, card flip, wipe, zoom) and follow the direction you move
- "Now presenting" baton when the squad changes inside a stop
- Up-next button that names the next part / slide / stop; progress bar ticks per stop
- O overview of all slides · / search across every slide with highlighted hits · T 90-min pacing timer · L laser pointer · . blackout
- Single-letter shortcuts wait a beat, so typing secret words no longer toggles things

## v4: new flow (deck agenda 01-06) and presenters, 19.11.2026
- Journey re-sequenced from 9 customer-journey stops to the six deck parts: 01 Digital Commerce Report · 02 Strategic Projects · 03 Fixing the basics · 04 Milestones & looking ahead · 05 Tech: under the hood · 06 Summary & asks. Navigation, progress ticks, overview (O), "Presenting now" plate and tags follow the new numbering. The shop backdrop per slide is unchanged.
- The route slide is now "Agenda: who presents what" (tap a part to jump).
- Presenters set as briefed: 01 Tareq + Cosmin · 02 Punchout/AtP Mikhail, B2B2C/AI.OC Derya, AI Document validation Christoph, AI PDLC Annette, Harmonization (CZ/SK, AT, M.Companion 3→1, rollout matrix) Cosmin, Juliet Stefan, WSM Bastian · 03 Annkathrin + Chloe · 04 each squad lead · 05 Saghi · 06 Tareq.
- Moved: Wholesale Media and Juliet into 02; Search "Customer journey improvement" and "Fixing the basics", Web Experience "Fix the basics", Companion store lists and Fix the basics into 03; "Fixing the basics, squad by squad" opens 03. B2B2C no longer uses the Order Management backdrop.
- Removed the "confirm Bastian still leads WSM" flag and the "?" on Mikhail for Punchout. No slide content changed.
- Assumptions to confirm: "Annka" = Annkathrin Heinze, "Chloe" = Bee Peng (Chloe) Lim, "Stefan" = Stefan Trasca, Corporate Websites stays a squad slide in 04 (the deck also shows it in Strategic Projects).

## v4.1: presenter visuals (19.11.2026)
- 8-bit pixel avatar for every presenter (same person, same face everywhere): "Presenting now" card, header chips, stop title cards, baton and cast screen.
- "Presenting now" card is larger, with a live dot, the part name and a "Then: next presenter" button that jumps to their part. Tap an avatar for a quick "who / what" bubble.
- New stop title cards: giant stop number, scan lines, presenter cards pop in, pixel confetti. Shown at every new part, also when the backdrop stays the same.
- Handover baton shows the leaving and arriving presenter faces when the squad changes.
- "Who's who" screen (button top right, key P or W): every presenter, their parts and squads, current presenter highlighted, click to jump to their first slide. Added to the "?" help.
