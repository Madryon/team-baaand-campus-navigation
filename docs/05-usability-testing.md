# Usability Testing Kit & Evaluation Protocol
**Project:** Team BAAAND Campus Navigation — Campus Finder  
**Document:** `docs/05-usability-testing.md`  
**Status:** Protocol Approved; Live User Sessions **PENDING (REAL PARTICIPANTS)**  
**Non-Negotiable Rule 1 Compliance:** Zero fabricated participant data. Test harness, observation instruments, and evaluation templates are fully established. Preliminary expert verification is documented under *"AI Cognitive Walkthrough, Not User Testing"*.

---

## 1. Study Overview & Methodology

### 1.1 Objective
To evaluate the usability, navigational confidence, task completion rate, and cognitive load of the **Campus Finder (v1)** mobile-first web app among individuals navigating an unfamiliar university campus. The evaluation specifically tests whether the interface resolves the primary Phase 1 research pain points:
- The "last-step" problem (locating departments nested inside larger macro-complexes like Faculty of Arts).
- Unclear gate numbers and lack of internal pathways on generic map apps.
- Dependency on campus guards and peers.

### 1.2 Methodology
- **Format:** Synchronous, moderated usability sessions (in-person on campus grounds and remote mobile screen-share).
- **Technique:** Concurrent Think-Aloud (CTA) protocol combined with unobtrusive observation.
- **Sample Size:** 5 to 8 participants representing our primary persona (Ananya), visitor persona (Meera), and insider anti-persona (Arjun).

---

## 2. Participant Screening & Target Cohort

| Participant ID | Cohort / Background | Campus Association | Target Persona Representation | Testing Focus |
|---|---|---|---|---|
| **P1** | 1st Year Master's Student (Operational Research / Arts) | < 2 weeks on campus | **Ananya (Primary)** | Nested department search, Gate 4 discovery |
| **P2** | 1st Year Postgraduate (Psychology / Humanities) | < 1 month on campus | **Ananya (Primary)** | Multi-department building hierarchy clarity |
| **P3** | New Science / Electronics Postgraduate | 3 weeks on campus | **Ananya (Primary)** | Building identification & walking time accuracy |
| **P4** | First-Time Campus Visitor / Conference Attendee | First day on campus | **Meera (Visitor)** | Gate-first routing, jargon-free reception finding |
| **P5** | Mobility-Impaired Student or Temporary Injury | Enrolled student | **Accessibility Specialist** | Step-free pathing, ramp/lift visibility |
| **P6** | Final-Year Senior Resident (Campus Insider) | 3+ years on campus | **Arjun (Anti-Persona)** | Insider mode toggle, turning guidance prompts off |
| **P7** | First-Year Hostel Resident | 1 week on campus | **Shivang Archetype** | Hostel location from Gate 5, bike stands |
| **P8** | Graduate Student / Inter-Campus Transit User | 1 month on campus | **Inter-Campus Traveller** | Micro-mobility (E-rickshaw / Smart Bikes) |

---

## 3. Test Tasks Tied to Jobs-To-Be-Done (JTBD)

### Task T1: Locate a Nested Department (JTBD 1.1 — Find a Destination)
- **Scenario:** *"You are a newly admitted student looking for your first class in the Department of Operational Research. You have opened Campus Finder on your phone."*
- **Instruction:** *"Find out where the Department of Operational Research is located, including what building and floor it is in."*
- **Success Criteria:** Locates "Dept. of Operational Research" and successfully identifies that it is on the **2nd Floor, Room 214 inside the Faculty of Arts**.
- **Max Time:** 90 seconds.

### Task T2: Plan Walking Route from a Specific Gate (JTBD 1.2 — Understand the Route)
- **Scenario:** *"You just got dropped off at Gate 4 (Arts Gate). You need to reach the OR Department before orientation starts."*
- **Instruction:** *"Find the walking directions from Gate 4 to the OR Department, and check how long the walk will take."*
- **Success Criteria:** Selects Gate 4 as the starting point, observes the **8-minute walking estimate (540m)**, and starts the route preview.
- **Max Time:** 60 seconds.

### Task T3: Navigate Using Physical Landmarks (JTBD 1.3 — Identify Confusing Buildings)
- **Scenario:** *"You are walking along the campus pathway and want to make sure you don't miss the turn into the Arts complex."*
- **Instruction:** *"Start turn-by-turn navigation and identify the prominent campus landmark where you must turn left."*
- **Success Criteria:** Cites the **Central Canteen** and red-brick archways as the visual cue to turn left.
- **Max Time:** 60 seconds.

### Task T4: Enable Step-Free Accessible Route (Accessibility Compliance)
- **Scenario:** *"A classmate who uses crutches needs to accompany you to the department, and cannot climb exterior stairs."*
- **Instruction:** *"Configure your route to ensure it avoids stairs and uses accessible ramps or elevators."*
- **Success Criteria:** Toggles the "Accessible Route" switch on the route preview, notes the **10-minute** revised walking time and elevator routing.
- **Max Time:** 45 seconds.

### Task T5: Visitor Welcome & Gate-to-Reception (JTBD 1.4 — Visitor Flow: Meera)
- **Scenario:** *"You are visiting the university for the first time for a guest lecture and have entered through Gate 1. You need to report to the Visitor Helpdesk."*
- **Instruction:** *"Switch to Visitor Mode, choose Gate 1, and find directions to the Visitor Reception."*
- **Success Criteria:** Activates Visitor mode, taps Gate 1, and initiates route to Central Administration / Visitor Reception.
- **Max Time:** 60 seconds.

### Task T6: Disable Route Guidance for Fast Event Lookup (Anti-Persona: Arjun)
- **Scenario:** *"You know every shortcut on campus and find step-by-step walking prompts distracting. You only want to see today's notices."*
- **Instruction:** *"Turn route guidance off and view today's campus orientation notices."*
- **Success Criteria:** Toggles Insider Mode (or guidance toggle to OFF), accessing the unfiltered notices feed.
- **Max Time:** 45 seconds.

---

## 4. Evaluation Metrics & Scoring Scales

1. **Task Completion Rate (Binary):**
   - Direct Success (No assistance) = $1.0$
   - Assisted Success (Minor verbal prompt after stall $> 30\text{s}$) = $0.5$
   - Failure / Abandoned = $0.0$
2. **Time on Task (ToT):** Measured in seconds from prompt delivery to verbal task completion confirmation.
3. **Error Frequency:** Count of wrong taps, misidentified gates, backtracks, or off-target navigation clicks.
4. **System Usability Scale (SUS):** Standard 10-item Likert questionnaire administered immediately post-test.
   $$\text{SUS Score} = \left(\sum (R_{\text{odd}} - 1) + \sum (5 - R_{\text{even}})\right) \times 2.5$$
   *Target Industry Benchmark:* $> 80.0$ (Grade A, High Usability).
5. **Issue Severity Classification (Nielsen Scale):**
   - **0 = No Problem:** Cosmetic observation with zero impact.
   - **1 = Minor:** Superficial friction; user recovers quickly without assistance.
   - **2 = Moderate:** Causes notable delay or confusion; recoverable with exploration.
   - **3 = Major:** Significant hurdle; high risk of task failure without prompt.
   - **4 = Catastrophic Blocker:** Prevents task completion; critical design breakdown.

---

## 5. Participant Consent Form & Audio Release

```
INFORMED CONSENT & MEDIA RELEASE
Project: Team BAAAND Campus Navigation — Usability Study
Academic Context: University UI/UX Project (Phase 3 Field Testing)

Purpose:
You are invited to participate in a research evaluation of a mobile campus navigation tool.
Your feedback will help us identify confusing labels, improve navigation clarity, and ensure
the campus is accessible to all students and visitors.

Procedure:
- You will be asked to perform 6 short navigational tasks using a mobile prototype.
- You will be encouraged to "think out loud" as you explore the interface.
- The session will take approximately 25 to 30 minutes.

Voluntary Participation & Privacy:
Your participation is entirely voluntary. You may decline to answer any question or stop
at any time without penalty. All data collected will be strictly anonymized (assigned a
code such as P1, P2). Screen recordings and notes will be used solely for academic research.

Consent:
[ ] I agree to participate in the usability study under the conditions described.
[ ] I consent to screen/audio recording during the session for note-taking purposes.

Participant Name: __________________________________   Date: _______________
Signature: _________________________________________
```

---

## 6. Moderator Guide & Script

### 6.1 Briefing & Warm-Up (3 mins)
> *"Hello! Thank you for taking the time to test our campus navigation tool today. We are Team BAAAND, and we are working on making our university campus easier to navigate for newcomers, visitors, and students.*
>
> *Before we begin, I want to emphasize that **we are testing the design, not you**. You cannot make any mistakes here. If something feels confusing, slow, or difficult to find, that is a flaw in our interface, and discovering that is our main goal today.*
>
> *As you move through the screens, please try to **think out loud** — tell me what you are looking for, what you expect will happen when you tap a button, and if anything surprises you. Do you have any questions before we jump into Task 1?"*

### 6.2 Task Administration Protocol (15 mins)
- Read scenario prompts verbatim without providing leading hints.
- If the participant falls silent for $> 15$ seconds, prompt gently: *"What are you thinking right now?"* or *"What are you looking at on this screen?"*
- Never explain how a feature works during the task.

### 6.3 Debriefing & SUS Administration (7 mins)
- Hand over the 10-item SUS questionnaire.
- Ask open qualitative debrief questions:
  1. *"What was the most helpful piece of information when finding the OR Department?"*
  2. *"Did the mention of physical landmarks (like the Central Canteen) feel natural, or did you look primarily at the map line?"*
  3. *"What one thing would you change to make this app easier to use on your first day?"*

---

## 7. Usability Testing Observation Sheet

```
Participant ID: [ P_ ]        Date: [ 2026-__-__ ]        Moderator: [ ________________ ]
Device: [ Mobile / Desktop Viewport ]        Role Tested: [ Student / Visitor / Insider ]

Task 1: Search & Hierarchy (OR Dept inside Faculty of Arts)
- Time Taken: _____ sec
- Path Taken: [ Home Search / Directory / Map Pin / Other ]
- Notes & Verbal Quotes:
- Errors Observed:
- Outcome: [ Pass / Assisted / Fail ]

Task 2: Route Preview & Walking Time from Gate 4
- Time Taken: _____ sec
- Origin Selected: [ Gate 4 / Current Location / Other ]
- Noticed Walking Time (8 min)? [ Yes / No ]
- Notes:
- Outcome: [ Pass / Assisted / Fail ]

Task 3: Turn-by-Turn Navigation with Landmark Cue
- Time Taken: _____ sec
- Noticed Canteen Landmark? [ Yes / No ]
- Reaction to Step 1 & 2 Instructions:
- Outcome: [ Pass / Assisted / Fail ]

Task 4: Accessible Route Configuration
- Time Taken: _____ sec
- Easily located Step-Free toggle? [ Yes / No ]
- Noticed revised time (+2 min)? [ Yes / No ]
- Outcome: [ Pass / Assisted / Fail ]

Task 5: Visitor Mode (Meera Flow)
- Time Taken: _____ sec
- Switched to Visitor successfully? [ Yes / No ]
- Outcome: [ Pass / Assisted / Fail ]

Task 6: Insider Mode (Arjun Flow)
- Time Taken: _____ sec
- Guidance turned off successfully? [ Yes / No ]
- Outcome: [ Pass / Assisted / Fail ]
```

---

## 8. Quantitative & Qualitative Results Template

> **STATUS: PENDING REAL PARTICIPANT SESSIONS.**  
> In compliance with Non-Negotiable Rule 1, participant rows below remain unpopulated pending moderated field runs with recruited student cohorts.

| Participant | Role / Cohort | T1 Completion | T2 Completion | T3 Completion | T4 Completion | T5 Completion | T6 Completion | Total Errors | SUS Score |
|---|---|---|---|---|---|---|---|---|---|
| **P1** | New Student (Arts) | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P2** | New Student (Psych) | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P3** | New Student (Science) | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P4** | Visitor (Meera) | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P5** | Accessibility User | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P6** | Senior (Arjun) | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P7** | Hostel Resident | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **P8** | Transit User | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |
| **Mean** | — | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* | *PENDING* |

---

## 9. AI Cognitive Walkthrough (Expert Walkthrough, Not User Testing)

*Note: Per Non-Negotiable Rule 1, this section documents an autonomous heuristic walkthrough conducted by the senior product designer and front-end engineer to evaluate path friction prior to human participant exposure.*

### Walkthrough Findings by Task:
- **T1 Walkthrough (OR Dept Search):** Search query "OR" matches immediately. The result card clearly shows `Dept. of Operational Research · Faculty of Arts · 2nd Floor`.
  - *Observation:* Cognitive friction is minimal, but the list row subtitle text (`var(--text-sm)`) could be more prominent to reinforce the macro-building context before the user clicks.
- **T2 Walkthrough (Gate 4 Route Preview):** Selecting Gate 4 updates the origin correctly. The 8-minute walking time is prominent in navy.
  - *Observation:* The origin dropdown styling looks slightly plain compared to the destination card.
- **T3 Walkthrough (Landmark Cues):** Canteen landmark callout is positioned inside a tinted callout box.
  - *Observation:* High visual salience; ensures users recognize physical on-ground surroundings.
- **T4 Walkthrough (Accessible Route):** Checkbox smoothly updates walking time to 10 minutes and reveals the "Step-free" badge.
  - *Observation:* Toggle switch is effective, but an explicit elevation / ramp indicator on the map line would enhance spatial clarity.
- **T5 Walkthrough (Visitor Mode):** Grid of 6 gates allows 1-tap entry selection.
  - *Observation:* Extremely straightforward for non-academic visitors.
- **T6 Walkthrough (Insider Mode):** Toggling Insider role successfully hides guidance banners and displays daily notices.
  - *Observation:* Fulfills Arjun's need for zero intrusive navigation overlays.
