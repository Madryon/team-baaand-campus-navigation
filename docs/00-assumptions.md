# Phase 3 Assumptions & Constraints Record
**Project:** Team BAAAND Campus Navigation — "Campus Finder"  
**Date:** November 2026  
**Document:** `docs/00-assumptions.md`

This document records all baseline assumptions, defaults, and boundary conditions adopted for Phase 3 (Design, Test & Iterate) in accordance with the project brief and Phase 1 / Phase 2 research findings.

---

## 1. Campus Geography & Data Hierarchy
- **Campus Setting:** Modeled directly after University of Delhi campus environments, incorporating authentic Delhi University South Campus (UDSC - Benito Juarez Marg) departments and facilities as refined by project stakeholders:
  - **Saramati Post-Graduate Men's Hostel:** Replaced temporary placeholder (Rajiv Gandhi) with authentic South Campus post-graduate men's residential hall (`hostel-boys`), located in the South Campus Residential Complex along the Aravali Ridge path near Geetanjali Hostel and Gate 3.
  - **Institute of Informatics & Communication (IIC):** Added as premier computing and communication department (`dept-iic`) in the Informatics & Computer Centre Building, housing M.Sc. Informatics and AI/networking labs near Gate 1.
  - **Faculty of Management Studies (FMS South Campus / SP Jain Centre):** Refined to SP Jain Centre for Management Studies (`bldg-fms`) on Benito Juarez Marg near Gate 1, featuring dedicated MBA lecture theatres and corporate relations.
  - **Department of Electronic Science:** Refined to premier science department (`dept-elec`) in the Electronic Science Block, co-located adjacent to IIC and Central Library near Gate 1.
  - **Faculty of Arts & Dept. of Operational Research:** Maintained as core research primary flow (Saket / Divakar interview locus) at Gate 4.
- **Macro-to-Micro Hierarchy:** Every entity follows `Campus Area › Main Complex / Faculty Building › Floor / Wing › Specific Department or Room` (e.g., `South Campus (UDSC) › Informatics & Computing Block › Ground Floor › Institute of Informatics & Communication (IIC)`).
- **Gate Alignment:** Gates 1 through 6 anchored to Benito Juarez Marg and campus perimeter:
  - Gate 1: Main South Campus Gate (Benito Juarez Marg) — Admin, IIC Dept, Dept. of Electronic Science, FMS (SP Jain Centre), Metro Walkway.
  - Gate 2: Academic & Library Gate — South Campus Central Library, Biotech Centre.
  - Gate 3: Saramati & Residential Gate (Hostel Link Road) — Saramati Men's Hostel, Geetanjali Women's Hostel, Mess.
  - Gate 4: Arts & Humanities Gate — Faculty of Arts, Dept. of Operational Research, Psychology, Central Canteen.
  - Gate 5: Benito Juarez South Gate — Sports Pavilion, Health Centre.
  - Gate 6: South Ridge Perimeter Gate — Ridge Trail & Security Patrol.
- **Micro-Mobility Anchor Points:** Bicycle rental stands and e-rickshaw boarding points are located near Gates 1, 2, 4, 5 and outside major cluster intersections (Arts Faculty / Library crossing).

---

## 2. User Roles & Mode Logic
- **New Student Mode (Primary Persona — Ananya):** Default mode. Emphasizes step-by-step landmark cues ("Turn left at Central Canteen", "Pass the red-brick courtyard"), entrance photos, gate numbers, walking time estimates, and accessible routing.
- **Visitor Mode (Secondary Persona — Meera):** Simplified entry-gate-first routing. Strips internal academic jargon, prioritizes visitor registration/helpdesks, guest parking, and major event halls.
- **Insider Mode (Anti-Persona — Arjun):** Turn-by-turn routing prompts toggled OFF. Provides direct search for event notices, faculty offices, admin counters, and rapid service lookups without passive map popups.

---

## 3. Design System & Technical Constraints
- **Design System Tokens:** Strict tokenized CSS architecture (`prototype/tokens.css` and `tokens.json`). Zero hardcoded hex colors or arbitrary pixel margins in screen implementations.
- **Mobile-First Dimensions:** Primary mobile frame is 390px × 844px (standard viewport for iOS/Android modern devices), responsive up to desktop tablet/desktop screens with centered containment or widescreen map view.
- **Accessibility Compliance:** Strict WCAG 2.2 AA standard: minimum text contrast ratio of 4.5:1 (large text 3:1), minimum interactive target dimension of 44 × 44 pt/px, visible focus rings (`:focus-visible`), information never conveyed by color alone (always paired with icon/text badge).
- **Version Separation:** `prototype/` houses initial v1 screens before usability and heuristic auditing. `prototype-final/` houses refined v2 screens incorporating all severity 2–4 audit fixes and iterations.

---

## 4. Testing & Auditing Protocol
- **Non-Fabrication Rule:** Real participant testing sessions are scheduled with prospective student cohorts and marked **PENDING** in `docs/05-usability-testing.md`.
- **Expert Review:** Heuristic evaluations (Nielsen's 10 heuristics) and UX/UI audits in `docs/06-heuristic-ux-ui-audit.md` are performed as qualified expert reviews and automated test runs via headless browser tooling. Any automated walk is strictly labeled *"AI cognitive walkthrough, not user testing"*.

---

## 5. Figma MCP Integration Defaults
- **File Key:** `UVo294wG285kYbtI9eBYaE` (newly created dedicated design file).
- **Page Partitioning:** 7 structured pages: `Design System`, `Screens v1`, `UI States`, `Prototype v1`, `Audit`, `Screens v2 (Final)`, and `Final Prototype`.
- **Standalone Backup:** If any Figma API rate limit or seat restriction limits write operations, `figma/BUILD-SPEC.md` and complete SVG/HTML screen exports guarantee 100% reproduction.
