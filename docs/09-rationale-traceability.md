# Design Rationale & Full Traceability Matrix
**Project:** Team BAAAND Campus Navigation ("Campus Finder")  
**Phase:** Phase 3 — Design, Test & Iterate  
**Lead:** Senior Product Designer & Front-End Engineer  

---

## 1. Executive Summary & Core Design Philosophy

Campus Finder is designed around one central empirical truth revealed in our Phase 1 research: **the problem on campus is rarely finding a general building zone; it is resolving the "last 100 meters" to the exact department, room, and verified gate without depending on a guard or passerby being physically present.**

### The Core Design Pillars:
1. **Physical-Digital Alignment:** Physical signboards and digital directions speak the exact same vocabulary. Gate numbers (Gates 1–6), architectural landmarks (e.g. "Faculty of Arts Indo-Saracenic Red Brick Archway"), and security cabins are foregrounded before geometric road names.
2. **Progressive Hierarchy Disclosure:** Campus locations are structured strictly into a 3-tier taxonomy: `Campus Zone / Faculty / Block` → `Building / Wing` → `Specific Room / Office`. This directly eliminates the multi-department building confusion experienced by students like Saket.
3. **Cognitive Calm Under Stress:** Bright outdoor sunlight, rush-hour navigation, and first-week cognitive overload demand high contrast (WCAG 2.2 AA compliant $\ge 4.5:1$), oversized touch targets ($\ge 44\times44\text{px}$), and glanceable walking times on every surface.
4. **Role Adaptability:** Ananya (freshman) receives high-touch landmark prompts, Meera (visitor) receives direct reception guidance, and Arjun (campus insider) can instantly silence guidance banners with Insider Mode.

---

## 2. Complete Traceability Matrix

Every single feature prioritized in Phase 2 has been mapped back to empirical user research from Phase 1, translated into functional opportunities, designed into specific prototype screens, and backed by deliberate UI engineering decisions.

| Phase 1 Finding & Evidence | User Need | Phase 2 Opportunity & Feature | Priority | Screen(s) Representing Feature | Concrete Design Decision & Implementation | Status |
|:---|:---|:---|:---:|:---|:---|:---:|
| **Saket Interview:** "I reached Faculty of Arts easily, but spent 25 minutes wandering the corridors looking for the Department of Operational Research." | Clear hierarchical location mapping inside multi-department complexes. | **Place Hierarchy & Co-located Departments List** | **MUST** | `screen-detail`, `screen-directory` | Displayed 3-tier breadcrumb: `Campus › Faculty of Arts › 2nd Floor, Room 214`. Added interactive co-located department pills (`.colocated-chip`) showing other departments sharing the building (Psychology, Business Econ) with 1-tap room lookups. | **Represented** |
| **Survey:** 63.2% want an interactive campus map with verified gate numbers. 74% have trouble finding locations. | Visual spatial orientation showing campus boundaries and entry gates. | **Interactive Campus Map with Gate Pins** | **MUST** | `screen-map` | Built an interactive SVG vector map rendering all 6 entry gates, primary pedestrian paths, and campus zones with pan/zoom and filter layers (Gates, Food, Transit). | **Represented** |
| **Survey:** 53% ask staff/security and 21% ask students when lost. Google Maps misses gate numbers and room detail. | Accurate, verified search engine covering departments, gates, and facilities. | **Instant Multi-Entity Search with Typo Tolerance** | **MUST** | `screen-search`, `screen-home` | Implemented instant substring and fuzzy search matching across 4 data categories (Departments, Gates, Hostels, Facilities) with a prominent "Did you mean?" suggestion card on typo entry. | **Represented** |
| **Divakar & Aman Interviews:** Crossroad signboards are missing or unreadable; walking between buildings causes anxiety. | Landmark-based turn-by-turn guidance rather than abstract street names. | **Step-by-Step Landmark Navigation with Distance/Time** | **MUST** | `screen-route`, `screen-navigate`, `screen-arrived` | Navigation instructions anchor to physical landmarks ("Pass the Security Patrol Cabin on your left", "Enter through Gate 4 Archway"). Includes linear route progress bar and walking time estimates (e.g. "8 min walk · 540m"). | **Represented** |
| **Survey:** 57.9% are new to campus (<1 month); experience peak disorientation in first 2 weeks. | Immediate role identification and gentle introduction to campus navigation. | **3-Step Onboarding with Role Selection** | **MUST** | `screen-splash` | Clean 3-card onboarding carousel explaining physical sign alignment, gate mapping, and offering immediate role selection (`New Student`, `First-Time Visitor`, `Know the Campus`). | **Represented** |
| **Survey:** 17% require accessibility-friendly routes. Wheelchair users cannot navigate unexpected stairs. | Step-free navigation avoiding stairs, high curbs, and steep gradients. | **Accessible Step-Free Route Mode** | **SHOULD** | `screen-route`, `screen-settings` | 1-tap accessible route toggle (`#route-access-toggle`) that dynamically re-routes paths via paved ramps and ground-floor elevators, showing step-free verification tags. | **Represented** |
| **Akansha Interview:** "Back gates often have no guards, and Google Maps doesn't tell you which gate is locked after 7 PM." | Verified directory of campus gates with operational hours and transit connections. | **Dedicated Gates & Entrances Directory** | **SHOULD** | `screen-gates` | Catalog of all 6 campus gates with operating hours, vehicle/pedestrian access permissions, nearest departments, and direct "Navigate from this Gate" action pills. | **Represented** |
| **Deepika Interview:** Walking long distances in midday heat causes extreme fatigue; students need quick transport points. | Visibility into campus mobility hubs (bicycle stands, e-rickshaw stands). | **Transport Points Directory** | **SHOULD** | `screen-transport` | Dedicated screen mapping 4 Smart Bike stands and 3 E-Rickshaw boarding points with live capacity counts and typical fares (₹10 flat campus fare). | **Represented** |
| **Ananya Persona:** Freshmen visit their department, library, and hostel repeatedly every single day. | Quick access to frequently visited destinations without re-typing searches. | **Saved Places Bookmark System** | **SHOULD** | `screen-saved`, `screen-home` | 1-tap bookmark icon on all place cards. Dedicated "Saved Places" tab storing bookmarks in client storage for offline, 1-tap navigation initiation. | **Represented** |
| **Arjun Anti-Persona:** Experienced students who know the campus find step-by-step landmark banners annoying and want a fast map. | Distraction-free, minimal interface with route prompts turned off. | **Insider Mode** | **SHOULD** | `screen-settings`, `screen-home` | Segmented role toggle on home screen and settings toggle that silences step-by-step guidance banners and expands the direct interactive map canvas. | **Represented** |
| **Meera Persona:** First-time campus visitors coming for seminars or admissions need the reception desk and event halls. | Focused entrance and visitor orientation without academic jargon. | **Visitor Mode** | **SHOULD** | `screen-visitor`, `screen-home` | Dedicated visitor view foregrounding the Central Administrative Reception, Conference Center, public parking lots, and visitor FAQ links. | **Represented** |
| **Survey:** 38% rely on physical signboards, but report many are faded, occluded, or missing. | Citizen reporting mechanism to alert campus administration of broken signage. | **Report a Missing / Damaged Signboard** | **COULD** | `screen-report` | Photo upload simulator, landmark selector, damage category pills, and description form that logs issues directly for estates maintenance. | **Represented** |
| **Akansha & Shivang Interviews:** Disorientation after dark; finding unlit hostels or quiet back gates creates safety anxiety. | Immediate access to campus security patrol and nearest guard post. | **Campus Security Helpline & Nearest Guard Post** | **COULD** | `screen-help` | Dedicated safety card with a 1-tap 24/7 Security Control dialer (`011-2766-7777`) and real-time proximity badge (`Nearest: Gate 4 Cabin - 120m away`). | **Represented** |
| **Project Brief:** Live vehicle tracking, indoor floor-level positioning, payment gateways. | N/A (Scope management and feasibility control). | **Out of Scope Safeguard** | **OUT OF SCOPE** | N/A | Strictly excluded from interface to prevent misleading user expectations; campus transit uses static schedule/stand indicators rather than live GPS vehicle pings. | **Properly Excluded** |

---

## 3. Evaluation of Scope Coverage

- **Must Features:** 5 / 5 Represented in Prototype v2 (**100%**)
- **Should Features:** 6 / 6 Represented in Prototype v2 (**100%**)
- **Could Features:** 2 / 2 Represented in Prototype v2 (**100%**)
- **Out of Scope Features:** 3 / 3 Excluded (**100% compliant**)

There are **zero unrepresented features**. Every single requirement stipulated in the Phase 2 specification and research brief is implemented in `prototype-final/` and covered by automated regression tests.
