# UI States Specification & Error Recovery Model
**Project:** Team BAAAND Campus Navigation — Campus Finder  
**Document:** `docs/04-ui-states.md`  
**Interactive Catalog:** `prototype/states.html`

---

## 1. Overview & States Framework

In an intra-campus mobile navigation experience, user trust hinges on unambiguous system feedback across varied real-world operating conditions: sunlight glare, spotty campus Wi-Fi, missed junctions, and disabled sensors.

Every component and screen in Campus Finder explicitly implements an 8-state model:

```
[Default / Rest] ──► [Hover / Focus] ──► [Pressed / Active] ──► [Loading / Skeleton]
        │                     │
        ▼                     ▼
[Empty State]         [Error Recovery] ──► [Success / Verified Confirmation]
```

---

## 2. Component-Level States Matrix

| Component | Default / Rest | Hover / Focus (`:focus-visible`) | Pressed / Active | Loading State | Disabled State |
|---|---|---|---|---|---|
| **Primary Button (`.btn-primary`)** | Navy (`#1B365D`), white text, 48px min height | Shift to `#12243F`, 3px teal focus ring (`#028090`) | Dark navy (`#0B1728`), scale `0.98` | Shimmer / spinner with "Calculating Route..." text | 50% opacity, `cursor: not-allowed`, no shadow |
| **Search Field (`.search-input`)** | `#F1F5F9` background, muted placeholder | White background, 3px accent focus ring (`--shadow-focus`) | Caret active, clear button `✕` visible | Pulsing search indicator icon | 60% opacity, placeholder reads "Search unavailable offline" |
| **Filter Chips (`.chip`)** | White surface, 1px border (`#E2E8F0`), secondary text | Border shifts to `#CBD7E6`, text darkened | Light blue tint (`#EBF1F8`), solid navy border, bold text | Ghost pulse chip placeholder | Greyscale border, muted text, unclickable |
| **Place Card (`.card`)** | White surface, subtle shadow (`--shadow-sm`) | Elevated shadow (`--shadow-md`) | Scale `0.99`, slight inset shadow | Shimmering rectangular skeleton blocks | Border dashed, greyed-out content |
| **Gate Tag (`.gate-badge`)** | Terracotta tint (`#FDF2F2`), red text (`#D9534F`) | Inverted contrast on tap | Solid terracotta pill with white text | N/A (Static metadata) | Grey badge with "Gate Closed / Under Repair" |

---

## 3. System & Wayfinding Error States

| Error Condition | Triggering Event | Visual Feedback & Component Presentation | User Recovery Pathway (Self-Service) |
|---|---|---|---|
| **GPS / Sensor Off** | User denies location permissions or enters indoor basement corridor | Top amber banner: *"GPS Location Disabled. Cannot detect current gate coordinates."* | Prominent CTA: *"Select Entry Gate Manually (Gates 1–6)"* allowing routing from known entrances. |
| **No Network Connection** | Moving between campus Wi-Fi access points or mobile data dropout | Neutral info pill: *"You are offline. Viewing cached campus vector map."* | Retains all static building hierarchies, gate numbers, and walking paths; only pauses live transit arrival countdowns. |
| **Off-Route Detour** | User takes wrong turn (e.g. misses Central Canteen junction) | Dynamic red warning card: *"⚠️ Off Route Detected. You passed the turn for Central Canteen."* | Clear turn-around prompt: *"Turn right at Library Colonnade to rejoin Gate 4 path."* + *"Reroute"* 1-tap action. |
| **Inaccessible Route (Lift Maintenance)** | Wheelchair mode enabled but primary elevator out of service | Warning card: *"No Step-Free Path via East Wing (Elevator Under Maintenance)."* | Automated re-pathing via West Wing ramp and atrium elevator with explicit time delta (*"+4 min detour"*). |

---

## 4. Success & Confirmation States

1. **Destination Arrival Verified:**  
   Presented on `#screen-arrived`. Large circular green checkmark badge (`#15803D`), confirmed room identifier (`Room 214`), and visual checkpoint cues:
   > *"Confirm you are at door Room 214 with verified signboard: Department of Operational Research — Head & Faculty Offices."*
2. **Saved Place Toast:**  
   Appears at top-center when bookmarking a place. High-contrast slate pill (`#0F172A`) with emerald checkmark: *"Saved to your Campus Places!"* (auto-dismisses after 3000ms).
3. **Signboard Report Acknowledged:**  
   Submitted via `#screen-report`. Reassures the user that their crowdsourced report has been logged with Estates & Maintenance (`Report ID #4092 Logged`).

---

## 5. Empty States & Graceful Degradation

| Screen | Empty Trigger | Visual Display | Actionable Recovery Option |
|---|---|---|---|
| **Search Results** | Query matches no department, building, room or gate | Search lens illustration + *"No matching campus places found"* | Clear search query button + *"Browse by Faculty Complex or Gate"* |
| **Saved Places** | User has not bookmarked any locations | Bookmark icon + *"No saved places yet"* | *"Explore Campus Directory"* or *"Browse Interactive Map"* |
| **Insider Notices** | No new announcements or exam notices for the current day | Calendar icon + *"No active notices today"* | *"Browse Academic Calendar"* or *"Switch to Guided Mode"* |

---

## 6. Implementation Verification
The interactive states catalog is verified in [prototype/states.html](file:///C:/Users/DELL/.gemini/antigravity/scratch/baaand-phase3/prototype/states.html) and can be opened in any modern browser.
