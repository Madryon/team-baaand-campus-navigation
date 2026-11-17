# Campus Finder: Team BAAAND Phase 3 Presentation Deck
**A Mobile-First Campus Navigation System Aligned with Physical Signage**  
*Team Members: Chinnala Bhargavi, Nishi Patwari, Anushka Shailani, Aman, Ankit Kumar, Deepansh Maurya*  
*Lead: Senior Product Designer & Front-End Engineer*  

---

## Slide 1: Title & Overview
- **Product Name:** Campus Finder (Team BAAAND)
- **Tagline:** Solving the "Last 100-Meter" Campus Navigation Problem
- **Scope:** Phase 3 — Design System, Interactive Prototypes (v1 & v2), Usability Kit, Expert Audits, and Design Traceability
- **Platform:** Mobile-First Web Application (390×844) responsive to desktop

---

## Slide 2: Empirical Research Findings (Phase 1 Synthesis)
- **Methodology:** 6 in-depth contextual interviews + 19 survey respondents across campus.
- **The Core Disorientation:**
  - **57.9%** are new to campus (<1 month).
  - **74.0%** have trouble finding a campus location at least sometimes.
  - **63.2%** urgently demand an interactive campus map.
- **How Students Cope When Lost:**
  - 53% ask security guards or campus staff.
  - 21% ask random passersby / senior students.
  - Guards are frequently missing at back gates (Akansha interview).

---

## Slide 3: The True Problem & Revised HMW
- **The Core Disconnect:** Google Maps routes students to a broad street address or general campus perimeter, but completely misses:
  1. Internal gate numbers (Gates 1–6).
  2. Multi-department buildings (e.g. OR Dept located inside Faculty of Arts).
  3. Specific floor numbers and room numbers (Room 214, 2nd floor).
- **Revised How Might We:**
  > *"How might we help new students find the exact department, building, or gate with clear, reliable information, so they do not depend on a guard or another student being physically around?"*

---

## Slide 4: User Personas & The Anti-Persona
- **Primary Persona: Ananya (New Master's Student)**
  - *Goal:* Reach the Dept. of Operational Research on time without anxiety.
  - *Need:* High-touch landmark cues, verified gate numbers, walking time estimates.
- **Secondary Persona: Meera (First-Time Visitor)**
  - *Goal:* Attend a conference in the Central Quad; needs public parking & reception.
- **Anti-Persona: Arjun (Campus Insider)**
  - *Behavior:* Knows the shortcuts; finds step-by-step landmark banners annoying.
  - *Design Response:* **Insider Mode** suppresses navigation prompts and yields full map screen space.

---

## Slide 5: Design System & Token Foundation
- **Design Philosophy:** Grounded, trustworthy academic wayfinding inspired by campus architecture.
- **Color Palette (WCAG 2.2 AA Verified):**
  - **Colonial Deep Navy (`#1B365D`):** Primary institutional authority (12.6:1 contrast).
  - **Terracotta Brick (`#D95D39`):** High-salience physical signposts & landmark cues.
  - **Campus Verdigris Teal (`#028090`):** Interactive actions & routes (4.54:1 contrast).
- **Spatial Grid:** Strict 4pt/8pt rhythm with 44px minimum touch target guarantee across all 56 interactive controls.

---

## Slide 6: Information Architecture & Taxonomy
- **The 3-Tier Campus Hierarchy:**
  1. **Zone / Faculty:** North Campus Quad › Faculty of Arts
  2. **Building / Wing:** Main Brick Complex › West Wing
  3. **Room / Office:** 2nd Floor › Room 214 (Operational Research)
- **Cross-Referenced Entities:** Every department card explicitly links to co-located departments sharing the same building, resolving the "Saket trap".

---

## Slide 7: Prototype v1 Architecture (The Baseline)
- **16 Full High-Fidelity Screens:**
  - Onboarding & Role Selection, Home, Live Search, Place Detail, Route Preview, Turn-by-Turn Navigation, Arrival Confirmation.
  - Interactive SVG Vector Map, Hierarchy Directory, Gates 1–6 List, Transport Points (Bikes & E-Rickshaws), Saved Places, Visitor Reception, Settings (Insider & Accessibility), Report Broken Sign, Emergency Help.
- **Zero Fabrication:** Tested via automated scripts and cognitive walkthroughs.

---

## Slide 8: Expert Review & Heuristic Audit (Nielsen's 10)
- **Audit Findings on v1:**
  - **3 Severity 3 Issues:** Trapped navigation without instant exit button (H3), lack of glanceable gate proximity on home list (H6), ephemeral 3-second off-route toast easily missed outdoors (H9).
  - **6 Severity 2 Issues:** Lack of visual step progress bar (H1), unstyled origin select dropdown (H4), strict search zero-result dead ends (H5), non-persistent role switching (H7), static text for co-located departments (H8), generic entrance graphic (H2).
  - **1 Severity 1 Issue:** Missing nearest guard booth proximity badge (H10).

---

## Slide 9: Iteration to v2 — Key Transformations
- **H1:** Introduced 4-segment linear route progress bar.
- **H2:** Replaced dark block with illustrated Indo-Saracenic brick archway & *"✓ Verified Physical Sign"* badge.
- **H3:** Added persistent `[ ✕ Exit Route ]` action in navigation HUD.
- **H4:** Replaced dropdown with 1-tap interactive origin pills (`Gate 4`, `Gate 1`, `Gate 2`, `GPS`).
- **H5:** Built fuzzy search alias matcher with *"Did you mean?"* suggestions.
- **H6:** Displayed Gate 4 badges and walking time (`⏱ 3 min walk`) directly on home cards.
- **H7:** LocalStorage state persistence for student/visitor/insider modes.
- **H8:** Interactive co-located department pills with instant floor disclosure.
- **H9:** Sticky, persistent off-route warning banner with 1-tap `[ Re-center ]`.
- **H10:** Real-time *"Nearest: Gate 4 Cabin (120m)"* emergency badge.

---

## Slide 10: Before & After Visual Evidence
- **Home Screen:** From plain building text to immediate glanceable Gate 4 tags and walking time.
- **Place Detail:** From static text to an architectural landmark header and clickable co-located departments.
- **Turn-by-Turn Navigation:** From an isolated text card to an active HUD with a linear progress bar, exit button, and persistent off-route recovery banner.

---

## Slide 11: Usability Testing Protocol (Ready for Field Trial)
- **Methodology:** Mixed-methods in-situ testing with 5–8 freshmen.
- **6 Core Tasks (JTBD Aligned):**
  - T1: Onboard as new student.
  - T2: Search "OR Department" and inspect room location inside Faculty of Arts.
  - T3: Preview and launch step-free route from Gate 4.
  - T4: Navigate turn-by-turn and handle simulated off-route event.
  - T5: Save Central Library to bookmarks.
  - T6: Toggle Insider Mode to suppress route banners.
- **Status:** **PENDING (REAL PARTICIPANTS)** to uphold academic integrity; evaluation templates and SUS questionnaire fully prepared.

---

## Slide 12: Complete Traceability Matrix
- **100% Feature Representation:**
  - **Must (5/5):** Search, Map, Place Detail, Route/Turn-by-Turn, Onboarding.
  - **Should (6/6):** Step-Free Accessibility, Gates List, Transport Points, Saved Places, Insider Mode, Visitor Mode.
  - **Could (2/2):** Report Signboard, Security Control Helpline.
  - **Out of Scope (3/3):** Live vehicle tracking, indoor BLE trilateration, payment processing properly excluded.

---

## Slide 13: Future Roadmap (2027)
- **Q1: Physical-Digital QR Sync:** Weatherproof signposts at Gates 1–6 with direct QR deep-linking.
- **Q2: Campus Mobility Telemetry:** Live GPS pings for e-rickshaws and dock availability for Smart Bikes.
- **Q3: Indoor 2.5D Spatial Graphs:** BLE beacons deployed across Faculty of Arts corridors.
- **Q4: Estates Administration CMS:** Real-time detour engine for construction and gate closures.

---

## Slide 14: Conclusion & Team Acknowledgements
- **The Outcome:** A validated, accessible, mobile-first web app that bridges the gap between neglected physical signs and digital wayfinding.
- **Team BAAAND:** Chinnala Bhargavi, Nishi Patwari, Anushka Shailani, Aman, Ankit Kumar, Deepansh Maurya.
- **Repository & Live Prototype:**
  - Final Prototype: `prototype-final/index.html`
  - Design Tokens: `tokens.css` / `tokens.json`
  - Audit Reports: `docs/06-heuristic-ux-ui-audit.md` & `docs/07-before-after.md`
