# Figma Master Build Specification (v2.0 Enhanced)
**Project:** Team BAAAND Campus Navigation ("Campus Finder")  
**Target Figma File Key:** `UVo294wG285kYbtI9eBYaE`  
**Direct File Link:** [https://www.figma.com/design/UVo294wG285kYbtI9eBYaE](https://www.figma.com/design/UVo294wG285kYbtI9eBYaE)  
**File Tier:** Starter Plan (3-Page High-Density Architecture)  
**Phase:** Phase 3 — Design, Test & Iterate  

---

## 1. Page Architecture & Canvas Structure

Due to the Figma Starter Plan limit of 3 pages per file, the required 7 logical sections have been structured into 3 high-density, high-detail pages:

| Page Name in Figma | Canvas Dimensions | Included Sections & Realistic Data | Key Interactive Nodes & Layers |
|:---|:---:|:---|:---|
| **Page 1: Design System & Audit** | $2400 \times 1800\text{px}$ | Foundational Color Tokens (8 Swatches with WCAG 2.2 AA Contrast Ratios), Typography Scale (Display 32 to Caption 13), 4/8pt Spatial Tokens, 4 Button Variants (Primary, Accent, Ghost Exit, Terracotta), Wayfinding Badges (Gate, Walking Time, Verified Sign, Step-Free Ramp), Navigation HUD with Linear Progress Bar, Persistent Off-Route Warning Alert Banner with [Re-center] CTA, and Nielsen 10 Heuristics Summary Table. | `Artboard: 10:2`<br>`Swatches: 8 Cards`<br>`Buttons: 4 Variants`<br>`HUD: 752px Mockup`<br>`Heuristics: H1–H10 Matrix` |
| **Page 2: Screens v1 & Prototype v1** | $2700 \times 844\text{px}$ | Baseline Prototype Build: 6 complete mobile frames ($390\times844\text{px}$) with status bars, bottom tab bar, and authentic research data:<br>• **Screen 01:** Onboarding carousel with Ananya (Student), Meera (Visitor), Arjun (Insider) persona cards.<br>• **Screen 02:** Home with Ananya guidance banner & frequent places list.<br>• **Screen 03:** Live search for "OR Dept" with verified physical sign badge.<br>• **Screen 04:** Place detail with Faculty of Arts hierarchy & co-located departments.<br>• **Screen 05:** Route preview with origin dropdown & turn list.<br>• **Screen 06:** Turn-by-turn navigation HUD with landmark cues & map canvas. | `Phone Shells: 6 Frames`<br>`Cards: 18 Component Cards`<br>`Tabs: 4 Core Views`<br>`Status: 44px Top Bar` |
| **Page 3: Screens v2 & Final Prototype** | $2300 \times 844\text{px}$ | Final Iteration Build: 5 remediated mobile frames ($390\times844\text{px}$) with green remediation tags (`★ FIX: H...`) and detailed features:<br>• **Screen 02 (v2):** Home with Gate 4 tags & `⏱ 3 min walk` badges on cards (H6/H7).<br>• **Screen 04 (v2):** Illustrated red-brick archway & interactive co-located department chips (H2/H8).<br>• **Screen 05 (v2):** 1-tap origin pills (`Gate 4`, `Gate 1`, `Gate 2`, `GPS`) & step-free ramp toggle (H4).<br>• **Screen 06 (v2):** 4-segment progress bar, `[ ✕ Exit Route ]` HUD button & persistent off-route recovery banner with `[Re-center]` (H1/H3/H9).<br>• **Screen 16 (v2):** 24/7 Security Control desk with *"Nearest: Gate 4 Cabin (120m)"* real-time proximity badge (H10). | `Phone Shells: 5 Frames`<br>`Remediation Tags: 5 Badges`<br>`Progress HUD: 4 Segments`<br>`Off-Route: Sticky Alert` |

---

## 2. Frame Dimensions & Mobile Viewport Standards

All screen frames in Figma are strictly configured to mobile-first specifications:
- **Canvas Base Size:** $390\text{px} \text{ (width)} \times 844\text{px} \text{ (height)}$ (iPhone 14 / modern standard mobile viewport).
- **Corner Radius:** `44px` with a `5px–6px` outer stroke representing physical device bezel.
- **Top Safe Area:** `44px` status bar (`#1B365D` navy fill with white status icons).
- **Bottom Navigation Bar:** `68px` persistent bar with 4 core tabs: *Home*, *Map*, *Saved*, *Settings*.
- **Touch Targets:** All interactive icons, chips, and buttons guarantee a minimum bounding box of $\ge 44 \times 44\text{px}$.

---

## 3. Direct Page-by-Page Figma Links

- **Phase 3 Master File (Live):** [https://www.figma.com/design/UVo294wG285kYbtI9eBYaE](https://www.figma.com/design/UVo294wG285kYbtI9eBYaE)
- **Direct to Page 1 (Design System & Audit):** [https://www.figma.com/design/UVo294wG285kYbtI9eBYaE?node-id=0-1](https://www.figma.com/design/UVo294wG285kYbtI9eBYaE?node-id=0-1)
- **Direct to Page 2 (Screens v1 & Baseline):** [https://www.figma.com/design/UVo294wG285kYbtI9eBYaE?node-id=1-4](https://www.figma.com/design/UVo294wG285kYbtI9eBYaE?node-id=1-4)
- **Direct to Page 3 (Screens v2 & Final Remediations):** [https://www.figma.com/design/UVo294wG285kYbtI9eBYaE?node-id=1-5](https://www.figma.com/design/UVo294wG285kYbtI9eBYaE?node-id=1-5)
- **Phase 2 Reference Figma File:** [https://www.figma.com/design/sO6MeBzi4YVVCDcZI4TMOV](https://www.figma.com/design/sO6MeBzi4YVVCDcZI4TMOV)
