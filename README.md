# Campus Finder — Team BAAAND (Phase 3)
**A Mobile-First Campus Navigation Web Application Aligned with Physical Signage**  
*Course / Program:* User Experience Design — Phase 3 (Design, Test & Iterate)  
*Team Members:* Chinnala Bhargavi, Nishi Patwari, Anushka Shailani, Aman, Ankit Kumar, Deepansh Maurya  
*Lead:* Senior Product Designer & Front-End Engineer  

---

## 1. Project Background & Overview

Campus Finder is a mobile-first campus navigation web application engineered to solve the empirical **"last 100 meters"** wayfinding dilemma on university grounds. 

Derived from 6 contextual user interviews and 19 campus survey responses, our research established that commercial mapping tools (e.g. Google Maps) terminate at broad perimeters and fail to identify internal gate numbers (Gates 1–6), multi-department buildings (e.g., Department of Operational Research located inside the Faculty of Arts), and floor-level room assignments.

### The Revised How Might We (HMW):
> *"How might we help new students find the exact department, building or gate with clear, reliable information, so they do not depend on a guard or another student being physically around?"*

---

## 2. Quick Start & Local Run Instructions

Campus Finder is developed entirely with standard web standards (HTML5, CSS3, vanilla JavaScript) and requires **zero build tools, zero bundlers, and zero npm dependencies** to run.

### Running with the Bundled Node.js Server (Recommended):
```bash
# Start server on port 3000:
node server.js

# Then open in your browser:
# App (Prototype v2): http://localhost:3000/prototype-final/index.html
# Deliverables Hub:   http://localhost:3000/index.html
```

### Running Directly via Browser:
1. Open [prototype-final/index.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/prototype-final/index.html) in any modern browser (Chrome, Edge, Safari, Firefox).
2. To view as a mobile app, press `F12` to open Chrome DevTools and toggle Device Mode (**iPhone 14 / Dimensions: 390 × 844**).

### GitHub Repository:
- **Repository URL:** [https://github.com/Madryon/team-baaand-campus-navigation](https://github.com/Madryon/team-baaand-campus-navigation)
- **Primary Branch:** `main`

### Running Other Artifacts:
- **Final Prototype v2:** [prototype-final/index.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/prototype-final/index.html)
- **Initial Prototype v1:** [prototype/index.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/prototype/index.html)
- **UI States Catalog:** [prototype/states.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/prototype/states.html)
- **14-Slide Interactive Presentation:** [presentation/index.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/presentation/index.html)
- **Consolidated Phase 3 Report:** [Phase3_Report.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/Phase3_Report.html)

---

## 3. Directory & Repository Structure

```
baaand-phase3/
├── README.md                      # Complete project manual & run guide (this file)
├── submission-checklist.md        # Mapping of all 11 required build items to paths
├── Phase3_Report.html             # Consolidated single-document report
├── Phase3_Report.docx             # Word document version of final report
├── audit_runner.js                # Automated WCAG AA & heuristic auditor for v1
├── audit_runner_v2.js             # Automated WCAG AA & regression auditor for v2
├── tokens.json                    # Root design tokens schema
├── docs/                          # Core documentation & design deliverables
│   ├── 00-assumptions.md          # Autonomous design defaults & scope boundaries
│   ├── 01-design-system.md        # Color tokens, typography, 4/8pt spacing, components
│   ├── 04-ui-states.md            # Default, hover, focus, loading, error, success specs
│   ├── 05-usability-testing.md    # Test kit (T1-T6, SUS, cognitive walkthrough, PENDING results)
│   ├── 06-heuristic-ux-ui-audit.md # Nielsen 10 heuristics audit & WCAG automated scan
│   ├── 07-iteration-log.md        # H1–H10 problem, token, solution, and impact matrix
│   ├── 07-before-after.md         # Side-by-side visual analysis with live screenshots
│   ├── 09-rationale-traceability.md # Complete Finding → Need → Feature → Screen matrix
│   ├── 10-future-scope-reflection.md # 2027 strategic roadmap & candid design reflection
│   ├── contributions.md           # Team contribution matrix (tasks left blank)
│   ├── audit_summary.json         # Automated audit results for Prototype v1
│   ├── audit_v2_summary.json      # Automated audit results for Prototype v2
│   └── img/                       # High-resolution screenshots
│       ├── v1/                    # 16 screenshots of initial prototype v1
│       ├── before-after/          # Comparative before/after screenshots (v1 vs v2)
│       └── states_catalog.png     # Full-page screenshot of UI states catalog
├── prototype/                     # Prototype v1 (Initial Baseline Build)
│   ├── index.html                 # 16 connected mobile views
│   ├── styles.css                 # Mobile simulation & component styles
│   ├── app.js                     # Flow router, live search & step-by-step guidance
│   ├── campus-data.js             # Verified realistic campus entities (OR Dept, Gates 1-6)
│   ├── states.html                # Interactive UI states catalog
│   ├── tokens.css                 # CSS custom property token definitions
│   └── tokens.json                # JSON token definitions
├── prototype-final/               # Prototype v2 (Final Iterated Deliverable)
│   ├── index.html                 # 16 remediated views (progress bar, exit HUD, badges)
│   ├── styles.css                 # Remediated component styles & persistent banners
│   ├── app.js                     # Fuzzy search, local persistence & vector rerouting
│   ├── campus-data.js             # Shared verified campus dataset
│   ├── tokens.css                 # Synchronized design system tokens
│   └── tokens.json                # Synchronized JSON tokens
├── presentation/                  # Executive Presentation
│   ├── slides.md                  # 14-slide executive presentation source
│   └── index.html                 # Standalone responsive slide deck with keyboard nav
└── figma/                         # Figma Deliverables & Specifications
    ├── BUILD-SPEC.md              # Frame sizes, layers, components, token mapping & wires
    └── screens/                   # 16 standalone SVG vector screen exports
```

---

## 4. Figma Design Deliverable

- **Live Figma File:** [https://www.figma.com/design/UVo294wG285kYbtI9eBYaE](https://www.figma.com/design/UVo294wG285kYbtI9eBYaE)
- **File Key:** `UVo294wG285kYbtI9eBYaE`
- **Page Layout (Figma Starter Tier 3-Page Structure):**
  - **Page 1:** `Design System & Audit` (Foundational color tokens, WCAG AA contrast values, typography, buttons, badges, heuristic matrix).
  - **Page 2:** `Screens v1 & Prototype v1` (6 primary mobile frames at 390×844px representing the initial prototype baseline).
  - **Page 3:** `Screens v2 & Final Prototype` (4 remediated mobile frames representing Prototype v2 with iteration badges and prototype wires).
- **Standalone Vector Screen Exports:** Located in [figma/screens/](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/figma/screens/) for easy direct import.

---

## 5. Automated Verification & Quality Assurance

To verify that all design tokens, accessibility constraints, and heuristic remediations are met, two automated Node.js test scripts are included:

```bash
# 1. Audit Prototype v1:
node audit_runner.js

# 2. Audit Prototype v2 (Confirms 10/10 Heuristic Remediations & Zero Regressions):
node audit_runner_v2.js
```

### Verified Audit Results:
- **WCAG 2.2 AA Contrast:** 100% compliance across all 8 core foreground/background pairs (all $\ge 4.5:1$; Navy on White achieves $12.6:1$).
- **Touch Targets:** 56 out of 56 interactive controls guarantee $\ge 44 \times 44\text{px}$.
- **Heuristic Remediations:** 10 out of 10 issues resolved in `prototype-final/` (progress bar, exit HUD, fuzzy search, gate proximity badges, persistent off-route banner, etc.).
- **Research Integrity:** Usability testing results marked strictly `PENDING (REAL PARTICIPANTS)`; zero test fabrication.
