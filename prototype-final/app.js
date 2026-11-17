/**
 * Team BAAAND Campus Navigation — Interactive Prototype Application Logic (v2 FINAL)
 * Incorporates all Heuristic & UX/UI Audit Fixes:
 * - H1: Linear navigation step progress bar
 * - H2: Illustrated entrance view with verified landmark badge
 * - H3: Explicit 'Exit Navigation' button on HUD
 * - H4: Custom interactive origin selection pills (Gate 4, Gate 1, GPS)
 * - H5: Fuzzy search aliases & empty state query suggestions
 * - H6: Prominent walking time & distance badges on home cards
 * - H7: Role mode persistence via localStorage
 * - H8: Co-located department interactive chips linking directly to details
 * - H9: Persistent high-contrast off-route reroute banner
 * - H10: Proximity indicator for nearest security booth
 */

// Global State
const appState = {
  currentScreen: 'screen-splash',
  screenHistory: [],
  selectedRole: localStorage.getItem('baaand_role') || 'student',
  selectedOrigin: 'Gate 4',
  guidanceEnabled: true,
  accessibleRoute: false,
  savedPlaceIds: ['dept-or'],
  activePlace: null,
  activeRoute: null,
  currentNavigationStep: 1,
  totalNavigationSteps: 4,
  offRouteActive: false,
  insiderNoticesFilter: 'all'
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initSearch();
  initModeSwitcher();
  initBottomNav();
  initPlaceDetails();
  initNavigationSimulator();
  initAccessibilityToggles();
  initReportForm();

  // Load default active place (OR Department from research)
  appState.activePlace = CAMPUS_DATA.places.find(p => p.id === 'dept-or');

  // Support direct screen opening via URL hash for testing & audits
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    navigateTo(hash, false);
  } else {
    // Check if role already selected previously
    if (localStorage.getItem('baaand_role')) {
      setRoleMode(localStorage.getItem('baaand_role'));
    }
  }
});

// Router Implementation
function initRouter() {
  window.navigateTo = function(screenId, pushHistory = true) {
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) {
      console.warn(`Screen ${screenId} not found`);
      return;
    }

    if (pushHistory && appState.currentScreen && appState.currentScreen !== screenId) {
      appState.screenHistory.push(appState.currentScreen);
    }

    // Hide all screens
    document.querySelectorAll('.screen-view').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show target
    targetScreen.classList.add('active');
    appState.currentScreen = screenId;

    // Scroll to top of viewport
    const container = document.querySelector('.screen-scroll-container');
    if (container) container.scrollTop = 0;

    // Update Header & Nav
    updateHeaderState(screenId);
    syncBottomNav(screenId);

    // Screen-specific triggers
    onScreenMounted(screenId);
  };

  window.goBack = function() {
    if (appState.screenHistory.length > 0) {
      const prev = appState.screenHistory.pop();
      navigateTo(prev, false);
    } else {
      navigateTo('screen-home', false);
    }
  };
}

function updateHeaderState(screenId) {
  const header = document.querySelector('.app-header');
  const headerTitle = document.getElementById('header-title-text');
  const backBtn = document.getElementById('header-back-btn');

  if (!header || !headerTitle || !backBtn) return;

  // Root views without back buttons
  const isRootView = ['screen-splash', 'screen-home', 'screen-map', 'screen-directory', 'screen-settings'].includes(screenId);
  backBtn.style.visibility = isRootView ? 'hidden' : 'visible';

  // Screen Title Map
  const titleMap = {
    'screen-splash': 'Welcome',
    'screen-home': 'Campus Finder',
    'screen-search': 'Search & Directory',
    'screen-detail': 'Place Details',
    'screen-route': 'Route Preview',
    'screen-navigate': 'Walking Guidance',
    'screen-arrived': 'Destination Reached',
    'screen-map': 'Interactive Map',
    'screen-directory': 'Campus Directory',
    'screen-gates': 'Gates & Entrances',
    'screen-transport': 'Micro-Mobility',
    'screen-saved': 'Saved Places',
    'screen-visitor': 'Visitor Welcome',
    'screen-settings': 'Settings & Preferences',
    'screen-report': 'Report a Signboard',
    'screen-help': 'Emergency & Help'
  };

  headerTitle.textContent = titleMap[screenId] || 'Campus Finder';
}

function syncBottomNav(screenId) {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
  });

  const tabMapping = {
    'screen-home': 'nav-home',
    'screen-map': 'nav-map',
    'screen-directory': 'nav-directory',
    'screen-settings': 'nav-more',
    'screen-gates': 'nav-directory',
    'screen-transport': 'nav-directory',
    'screen-saved': 'nav-more',
    'screen-help': 'nav-more',
    'screen-report': 'nav-more'
  };

  const activeNavId = tabMapping[screenId];
  if (activeNavId) {
    const activeNav = document.getElementById(activeNavId);
    if (activeNav) activeNav.classList.add('active');
  }
}

function onScreenMounted(screenId) {
  if (screenId === 'screen-detail' && appState.activePlace) {
    renderPlaceDetail(appState.activePlace);
  } else if (screenId === 'screen-route') {
    renderRoutePreview();
  } else if (screenId === 'screen-gates') {
    renderGatesList();
  } else if (screenId === 'screen-transport') {
    renderTransportList();
  } else if (screenId === 'screen-saved') {
    renderSavedList();
  } else if (screenId === 'screen-home') {
    if (appState.selectedRole === 'insider') {
      renderInsiderHome();
    } else {
      renderStudentHome();
    }
  }
}

// Bottom Navigation Initializer
function initBottomNav() {
  const bindings = {
    'nav-home': 'screen-home',
    'nav-map': 'screen-map',
    'nav-directory': 'screen-directory',
    'nav-more': 'screen-settings'
  };

  Object.entries(bindings).forEach(([btnId, screenId]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        navigateTo(screenId);
      });
    }
  });
}

// Mode Switcher (Student / Visitor / Insider) with LocalStorage Persistence (Fix H7)
function initModeSwitcher() {
  window.setRoleMode = function(role) {
    appState.selectedRole = role;
    localStorage.setItem('baaand_role', role);

    // Update segmented controls on home and settings
    document.querySelectorAll('.seg-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });

    const badge = document.getElementById('active-role-indicator');
    if (badge) {
      badge.textContent = role.toUpperCase();
    }

    if (role === 'visitor') {
      appState.guidanceEnabled = true;
      showToast('Switched to Visitor Mode: Gate-to-Gate routing');
      navigateTo('screen-visitor');
    } else if (role === 'insider') {
      appState.guidanceEnabled = false;
      showToast('Insider Mode: Route guidance prompts turned OFF');
      navigateTo('screen-home');
      renderInsiderHome();
    } else {
      appState.guidanceEnabled = true;
      showToast('Switched to New Student Mode: Step-by-step guidance ON');
      navigateTo('screen-home');
      renderStudentHome();
    }
  };
}

function renderStudentHome() {
  const guidanceBanner = document.getElementById('home-guidance-banner');
  const insiderContainer = document.getElementById('home-insider-container');
  const standardContainer = document.getElementById('home-standard-container');

  if (guidanceBanner) guidanceBanner.style.display = 'block';
  if (insiderContainer) insiderContainer.style.display = 'none';
  if (standardContainer) standardContainer.style.display = 'block';
}

function renderInsiderHome() {
  const guidanceBanner = document.getElementById('home-guidance-banner');
  const insiderContainer = document.getElementById('home-insider-container');
  const standardContainer = document.getElementById('home-standard-container');

  if (guidanceBanner) guidanceBanner.style.display = 'none';
  if (insiderContainer) {
    insiderContainer.style.display = 'block';
    renderInsiderNotices();
  }
  if (standardContainer) standardContainer.style.display = 'none';
}

function renderInsiderNotices() {
  const container = document.getElementById('insider-notices-list');
  if (!container) return;

  container.innerHTML = CAMPUS_DATA.eventsAndNotices.map(n => `
    <div class="card card-interactive" onclick="showToast('Viewing notice: ${n.title}')">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <span class="gate-badge">${n.category}</span>
        <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${n.gate}</span>
      </div>
      <h4 style="font-size: var(--text-base); font-weight: var(--font-bold); color: var(--color-text-primary); margin-bottom: 4px;">${n.title}</h4>
      <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">${n.date} · <strong>${n.venue}</strong></p>
    </div>
  `).join('');
}

// Search & Filtering Implementation with Fuzzy Keyword Support (Fix H5)
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (appState.currentScreen !== 'screen-search' && query.length > 0) {
        navigateTo('screen-search');
      }
      runSearch(query);
    });

    input.addEventListener('focus', () => {
      if (appState.currentScreen === 'screen-home') {
        navigateTo('screen-search');
      }
    });
  });

  window.clearSearch = function() {
    document.querySelectorAll('.search-input').forEach(input => {
      input.value = '';
    });
    runSearch('');
  };

  window.filterSearch = function(category, chipElement) {
    document.querySelectorAll('.search-filter-chip').forEach(c => c.classList.remove('active'));
    if (chipElement) chipElement.classList.add('active');

    const input = document.getElementById('main-search-input');
    const query = input ? input.value.trim().toLowerCase() : '';
    runSearch(query, category);
  };
}

function runSearch(query, categoryFilter = 'all') {
  const resultsContainer = document.getElementById('search-results-list');
  const emptyState = document.getElementById('search-empty-state');
  const countBadge = document.getElementById('search-results-count');

  if (!resultsContainer) return;

  let matches = CAMPUS_DATA.places;

  if (categoryFilter !== 'all') {
    matches = matches.filter(p => p.category === categoryFilter);
  }

  if (query) {
    matches = matches.filter(p => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchBuilding = p.building.toLowerCase().includes(query);
      const matchTag = p.tags && p.tags.some(t => t.toLowerCase().includes(query));
      const matchGate = p.nearestGate.toLowerCase().includes(query);
      return matchName || matchBuilding || matchTag || matchGate;
    });
  }

  if (countBadge) {
    countBadge.textContent = `${matches.length} location${matches.length === 1 ? '' : 's'}`;
  }

  if (matches.length === 0) {
    resultsContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    resultsContainer.innerHTML = matches.map(place => `
      <div class="card card-interactive list-row" onclick="selectPlace('${place.id}')">
        <div class="list-row-leading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="list-row-content">
          <div class="list-row-title">${place.name}</div>
          <div class="list-row-subtitle">
            <span>${place.building}</span>
            <span>·</span>
            <span>${place.floorWing}</span>
          </div>
          <span class="walking-metric-badge">⏱ ${place.gateDistance} from ${place.nearestGate}</span>
        </div>
        <div class="gate-badge">${place.nearestGate}</div>
      </div>
    `).join('');
  }
}

// Place Detail Implementation with Interactive Co-located Chips (Fix H8)
function selectPlace(placeId) {
  const place = CAMPUS_DATA.places.find(p => p.id === placeId);
  if (!place) return;

  appState.activePlace = place;
  navigateTo('screen-detail');
}

function renderPlaceDetail(place) {
  document.getElementById('detail-title').textContent = place.name;
  document.getElementById('detail-hierarchy').textContent = `Campus › ${place.building} › ${place.floorWing}`;
  document.getElementById('detail-gate-badge').textContent = place.nearestGate;
  document.getElementById('detail-distance').textContent = place.gateDistance;
  document.getElementById('detail-landmark').textContent = place.landmark;
  document.getElementById('detail-desc').textContent = place.description;
  document.getElementById('detail-access').textContent = place.accessibility;

  // Render co-located departments as interactive buttons (Fix H8)
  const coLocatedContainer = document.getElementById('detail-same-building-list');
  if (coLocatedContainer && place.departmentsInSameBuilding) {
    coLocatedContainer.innerHTML = place.departmentsInSameBuilding.map(d => {
      // Find matching place id if available
      let targetPlace = CAMPUS_DATA.places.find(p => d.includes(p.shortName) || p.name.includes(d));
      const targetId = targetPlace ? targetPlace.id : null;

      return `
        <button class="colocated-chip" onclick="${targetId ? `selectPlace('${targetId}')` : `showToast('Viewing floor info for ${d}')`}" aria-label="View details for ${d}">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--color-accent);">🏢</span>
            <span style="font-weight: var(--font-medium);">${d}</span>
          </div>
          <span style="color: var(--color-primary); font-size: var(--text-xs); font-weight: var(--font-bold);">Inspect →</span>
        </button>
      `;
    }).join('');
  }

  // Update save bookmark button
  updateSaveButtonUI(place.id);
}

function updateSaveButtonUI(placeId) {
  const saveBtn = document.getElementById('detail-save-btn');
  if (!saveBtn) return;

  const isSaved = appState.savedPlaceIds.includes(placeId);
  saveBtn.innerHTML = isSaved ? `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    <span>Saved in Favourites</span>
  ` : `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    <span>Save Place</span>
  `;
}

function toggleSavePlace(placeId) {
  const idx = appState.savedPlaceIds.indexOf(placeId);
  if (idx > -1) {
    appState.savedPlaceIds.splice(idx, 1);
    showToast('Removed from Saved Places');
  } else {
    appState.savedPlaceIds.push(placeId);
    showToast('Saved to your Campus Places!');
  }
  updateSaveButtonUI(placeId);
}

// Route Preview with Custom Interactive Origin Selection (Fix H4)
function initPlaceDetails() {
  window.startRouteToActivePlace = function() {
    navigateTo('screen-route');
  };

  window.selectRouteOrigin = function(originName, pillElement) {
    appState.selectedOrigin = originName;
    document.querySelectorAll('.origin-pill').forEach(p => p.classList.remove('selected'));
    if (pillElement) pillElement.classList.add('selected');

    renderRoutePreview();
    showToast(`Origin set to: ${originName}`);
  };

  window.toggleAccessibleRoute = function() {
    appState.accessibleRoute = !appState.accessibleRoute;
    renderRoutePreview();
    showToast(appState.accessibleRoute ? 'Accessible Route Enabled: Step-free ramps & elevators prioritized' : 'Standard Walking Route Enabled');
  };
}

function renderRoutePreview() {
  const place = appState.activePlace || CAMPUS_DATA.places[0];
  document.getElementById('route-dest-name').textContent = place.name;
  document.getElementById('route-dest-building').textContent = `${place.building} (${place.floorWing})`;

  const timeEl = document.getElementById('route-walk-time');
  const distanceEl = document.getElementById('route-walk-distance');
  const modeBadge = document.getElementById('route-access-badge');

  let baseMinutes = 8;
  let baseDistance = 540;

  if (appState.selectedOrigin === 'Gate 1') {
    baseMinutes = 12;
    baseDistance = 850;
  } else if (appState.selectedOrigin === 'Gate 2') {
    baseMinutes = 9;
    baseDistance = 620;
  }

  if (appState.accessibleRoute) {
    timeEl.textContent = `${baseMinutes + 2} min walk`;
    distanceEl.textContent = `${baseDistance + 80}m (Flat paths & West Elevator)`;
    modeBadge.style.display = 'inline-flex';
    modeBadge.textContent = 'Step-free route';
  } else {
    timeEl.textContent = `${baseMinutes} min walk`;
    distanceEl.textContent = `${baseDistance}m (Shortest path)`;
    modeBadge.style.display = 'none';
  }
}

// Audio Feedback Utilities (Web Audio API & SpeechSynthesis)
window.voiceEnabled = true;

function playChime(type = 'turn') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'turn') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(330, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'arrive') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.45);
    }
  } catch (e) {}
}

window.speakInstruction = function(text) {
  if (!window.voiceEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
};

window.toggleVoicePrompts = function() {
  window.voiceEnabled = !window.voiceEnabled;
  const btn = document.getElementById('toggle-voice-btn');
  const hudBtn = document.getElementById('hud-voice-btn');
  const label = window.voiceEnabled ? '🔊 Voice Prompts: ON' : '🔇 Voice Prompts: OFF';
  if (btn) btn.textContent = label;
  if (hudBtn) hudBtn.textContent = window.voiceEnabled ? '🔊 ON' : '🔇 OFF';
  showToast(window.voiceEnabled ? 'Voice Guidance Audio Enabled' : 'Voice Guidance Muted');
  if (window.voiceEnabled) {
    speakInstruction("Voice prompts active. Ready for campus navigation.");
  }
};

// Turn-by-Turn Navigation Simulator with Linear Progress, Exit Action, Auto-Walk & Audio (Fix H1, H3, H9)
function initNavigationSimulator() {
  window._autoWalkInterval = null;

  window.startLiveNavigation = function() {
    appState.currentNavigationStep = 1;
    appState.offRouteActive = false;
    navigateTo('screen-navigate');
    renderNavigationStep(1);
    playChime('turn');
    speakInstruction("Starting walking route to Department of Operational Research. Enter Gate 4 and proceed straight.");
  };

  window.exitNavigation = function() {
    if (window._autoWalkInterval) {
      clearInterval(window._autoWalkInterval);
      window._autoWalkInterval = null;
    }
    if (confirm("Are you sure you want to exit active walking navigation?")) {
      speakInstruction("Navigation canceled.");
      navigateTo('screen-route');
    }
  };

  window.nextNavigationStep = function() {
    if (appState.currentNavigationStep < appState.totalNavigationSteps) {
      appState.currentNavigationStep++;
      renderNavigationStep(appState.currentNavigationStep);
    } else {
      if (window._autoWalkInterval) {
        clearInterval(window._autoWalkInterval);
        window._autoWalkInterval = null;
      }
      playChime('arrive');
      speakInstruction("You have arrived at Room 214, Department of Operational Research.");
      navigateTo('screen-arrived');
    }
  };

  window.prevNavigationStep = function() {
    if (appState.currentNavigationStep > 1) {
      appState.currentNavigationStep--;
      renderNavigationStep(appState.currentNavigationStep);
    }
  };

  window.startAutoWalk = function() {
    const btn = document.getElementById('nav-autowalk-btn');
    if (window._autoWalkInterval) {
      clearInterval(window._autoWalkInterval);
      window._autoWalkInterval = null;
      if (btn) btn.textContent = "▶ Auto-Walk";
      showToast("Auto-Walk Simulation Paused");
      return;
    }

    if (btn) btn.textContent = "⏸ Pause Walk";
    showToast("▶ Auto-Walk Active: Stepping through campus route...");
    
    window._autoWalkInterval = setInterval(() => {
      if (appState.currentNavigationStep < appState.totalNavigationSteps) {
        nextNavigationStep();
      } else {
        clearInterval(window._autoWalkInterval);
        window._autoWalkInterval = null;
        if (btn) btn.textContent = "▶ Auto-Walk";
        navigateTo('screen-arrived');
      }
    }, 4500);
  };

  window.triggerOffRouteDemo = function() {
    appState.offRouteActive = true;
    const banner = document.getElementById('persistent-reroute-banner');
    if (banner) banner.style.display = 'flex';
    
    // Move GPS dot off course
    const dot = document.getElementById('nav-gps-dot');
    const ring = document.getElementById('nav-gps-pulse');
    if (dot && ring) {
      dot.setAttribute('cx', '240');
      dot.setAttribute('cy', '220');
      ring.setAttribute('cx', '240');
      ring.setAttribute('cy', '220');
    }

    playChime('alert');
    speakInstruction("Warning! You missed the turn. Turn right at the Canteen to rejoin the route.");
    showToast('⚠️ Off route detected! Please check physical landmarks.', 4000);
  };

  window.dismissOffRoute = function() {
    appState.offRouteActive = false;
    const banner = document.getElementById('persistent-reroute-banner');
    if (banner) banner.style.display = 'none';
    
    playChime('turn');
    speakInstruction("Route re-centered. Return to Gate 4 walkway path established.");
    showToast('✅ Re-centered to Gate 4 walkway');
    renderNavigationStep(appState.currentNavigationStep);
  };
}

function renderNavigationStep(stepNumber) {
  const steps = [
    {
      num: 1,
      instruction: "Enter through Gate 4 (Arts Gate) and proceed straight.",
      distance: "80 meters",
      landmark: "Pass the Security Patrol Cabin on your left",
      progressMeters: "540m remaining",
      coords: { x: 60, y: 260 }
    },
    {
      num: 2,
      instruction: "At the Central Canteen junction, take a left turn into the Arts Quadrangle.",
      distance: "120 meters",
      landmark: "Look for the red-brick arches next to Canteen wooden benches",
      progressMeters: "420m remaining",
      coords: { x: 150, y: 180 }
    },
    {
      num: 3,
      instruction: "Enter Faculty of Arts building through the West Wing Entrance.",
      distance: "40 meters",
      landmark: "Notice verified signboard: 'Faculty of Arts — Academic Block'",
      progressMeters: "180m remaining",
      coords: { x: 260, y: 180 }
    },
    {
      num: 4,
      instruction: appState.accessibleRoute
        ? "Take the Central Atrium Elevator to 2nd Floor, turn left to Room 214."
        : "Ascend West Wing Staircase to 2nd Floor. Room 214 is 3rd door on right.",
      distance: "Destination at 2nd Floor",
      landmark: "Signboard reads: 'Department of Operational Research — Head Office'",
      progressMeters: "Arriving at Room 214",
      coords: { x: 320, y: 80 }
    }
  ];

  const current = steps[stepNumber - 1];
  document.getElementById('nav-step-counter').textContent = `Step ${stepNumber} of ${steps.length} · ${current.progressMeters}`;
  document.getElementById('nav-step-instruction').textContent = current.instruction;
  document.getElementById('nav-step-distance').textContent = current.distance;
  document.getElementById('nav-step-landmark').textContent = current.landmark;

  // Move GPS Dot & Pulse Ring on SVG
  const dot = document.getElementById('nav-gps-dot');
  const ring = document.getElementById('nav-gps-pulse');
  if (dot && ring) {
    dot.setAttribute('cx', current.coords.x);
    dot.setAttribute('cy', current.coords.y);
    ring.setAttribute('cx', current.coords.x);
    ring.setAttribute('cy', current.coords.y);
  }

  // Speak Instruction Aloud
  if (stepNumber > 1) {
    playChime('turn');
  }
  speakInstruction(`${current.instruction} ${current.landmark}`);

  // Update Linear Step Progress Bar (Fix H1)
  const segments = document.querySelectorAll('.nav-progress-segment');
  segments.forEach((seg, idx) => {
    seg.classList.remove('completed', 'current');
    if (idx + 1 < stepNumber) {
      seg.classList.add('completed');
    } else if (idx + 1 === stepNumber) {
      seg.classList.add('current');
    }
  });

  const nextBtn = document.getElementById('nav-next-step-btn');
  if (nextBtn) {
    nextBtn.textContent = stepNumber === steps.length ? "I've Arrived at Room 214" : "Next Turn →";
  }
}

// Gates and Entrances Directory
function renderGatesList() {
  const container = document.getElementById('gates-list-container');
  if (!container) return;

  container.innerHTML = CAMPUS_DATA.gates.map(g => `
    <div class="card card-interactive" onclick="routeFromGate('${g.id}')" style="display:flex;gap:var(--space-3);align-items:flex-start;padding:var(--space-4);">
      <div class="gate-number-bubble">G${g.number}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <h3 style="font-size:var(--text-base);font-weight:var(--font-bold);color:var(--color-text-primary);margin:0;">${g.name}</h3>
          <span class="verified-tag">${g.guardAvailable}</span>
        </div>
        <p style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-bottom:6px;">📍 Road: <strong>${g.road}</strong></p>
        <div style="background-color:var(--color-bg-subtle);padding:6px 10px;border-radius:var(--radius-sm);font-size:var(--text-xs);color:var(--color-text-secondary);margin-bottom:8px;border-left:2.5px solid var(--color-primary);">
          <strong>Connects to:</strong> ${g.primaryFor}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;font-size:var(--text-xs);">
          ${g.wheelchairAccessible ? '<span class="accessible-badge">♿ Step-Free Ramp</span>' : ''}
          ${g.bicycleStandAvailable ? '<span class="chip-transport" style="padding:2px 8px;border-radius:var(--radius-pill);font-weight:600;">🚲 Smart Bike Stand</span>' : ''}
          ${g.eRickshawAvailable ? '<span class="chip-hostel" style="padding:2px 8px;border-radius:var(--radius-pill);font-weight:600;">🛺 E-Rickshaw Stop</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');
}

window.routeFromGate = function(gateId) {
  const gate = CAMPUS_DATA.gates.find(g => g.id === gateId);
  if (!gate) return;
  showToast(`Routing from Gate ${gate.number}...`);
  appState.selectedOrigin = `Gate ${gate.number}`;
  appState.activePlace = CAMPUS_DATA.places.find(p => p.id === 'dept-or');
  navigateTo('screen-route');
};

// Transport Points Hub
function renderTransportList() {
  const container = document.getElementById('transport-list-container');
  if (!container) return;

  container.innerHTML = CAMPUS_DATA.transportPoints.map(t => `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <span class="gate-badge" style="background-color: ${t.type === 'bicycle' ? '#E0F2FE' : '#D1FAE5'}; color: ${t.type === 'bicycle' ? '#0369A1' : '#047857'}; border-color: transparent;">
          ${t.type === 'bicycle' ? '🚲 Smart Bicycle Stand' : '🛺 Green Loop E-Rickshaw'}
        </span>
        <span class="verified-tag">${t.type === 'bicycle' ? t.availableVehicles : t.frequency}</span>
      </div>
      <h3 style="font-size: var(--text-base); font-weight: var(--font-bold); color: var(--color-text-primary); margin-bottom: 4px;">${t.name}</h3>
      <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 6px;">📍 ${t.location}</p>
      <p style="font-size: var(--text-xs); color: var(--color-text-muted);">${t.priceInfo || t.fare + ' · ' + t.route}</p>
    </div>
  `).join('');
}

// Interactive Map Controls & Entity Inspection
let currentMapZoom = 600;

window.zoomMap = function(delta) {
  const svg = document.querySelector('#screen-map .map-svg');
  if (!svg) return;
  currentMapZoom = Math.max(300, Math.min(800, currentMapZoom + delta));
  svg.setAttribute('viewBox', `0 0 ${currentMapZoom} ${currentMapZoom}`);
  showToast(`Map Zoom: ${Math.round((600 / currentMapZoom) * 100)}%`);
};

window.inspectMapEntity = function(type, id) {
  const drawer = document.getElementById('map-entity-drawer');
  const dTitle = document.getElementById('drawer-title');
  const dSub = document.getElementById('drawer-sub');
  const dMeta = document.getElementById('drawer-meta');
  const dAction = document.getElementById('drawer-action-btn');
  if (!drawer) return;

  if (type === 'gate') {
    const gate = CAMPUS_DATA.gates.find(g => g.id === id);
    if (!gate) return;
    dTitle.textContent = `${gate.name} (Gate ${gate.number})`;
    dSub.textContent = `Road: ${gate.road} · ${gate.guardAvailable}`;
    dMeta.textContent = `Connects to: ${gate.primaryFor}. Ramp access: ${gate.wheelchairAccessible ? 'Yes' : 'No'}`;
    dAction.textContent = `Route from Gate ${gate.number} →`;
    dAction.onclick = () => { routeFromGate(gate.id); closeMapDrawer(); };
  } else if (type === 'place') {
    const place = CAMPUS_DATA.places.find(p => p.id === id);
    if (!place) return;
    dTitle.textContent = place.name;
    dSub.textContent = `${place.building} · Nearest: ${place.nearestGate}`;
    dMeta.textContent = place.description;
    dAction.textContent = `View Details & Route →`;
    dAction.onclick = () => { selectPlace(place.id); closeMapDrawer(); };
  }

  drawer.style.display = 'block';
  playChime('turn');
};

window.closeMapDrawer = function() {
  const drawer = document.getElementById('map-entity-drawer');
  if (drawer) drawer.style.display = 'none';
};

// Saved Places List with LocalStorage Persistence
function renderSavedList() {
  const container = document.getElementById('saved-list-container');
  const emptyState = document.getElementById('saved-empty-state');
  if (!container) return;

  // Sync from localStorage if present
  try {
    const stored = localStorage.getItem('baaand_saved_places');
    if (stored) {
      appState.savedPlaceIds = JSON.parse(stored);
    }
  } catch(e) {}

  const saved = CAMPUS_DATA.places.filter(p => appState.savedPlaceIds.includes(p.id));

  if (saved.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    container.innerHTML = saved.map(p => `
      <div class="card list-row" style="margin-bottom: var(--space-3);">
        <div class="list-row-leading" onclick="selectPlace('${p.id}')" style="cursor: pointer;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div class="list-row-content" onclick="selectPlace('${p.id}')" style="cursor: pointer;">
          <div class="list-row-title">${p.name}</div>
          <div class="list-row-subtitle">${p.building} · ${p.nearestGate}</div>
          <span class="walking-metric-badge">⏱ ${p.gateDistance}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
          <div class="gate-badge">${p.nearestGate}</div>
          <button class="btn btn-sm btn-ghost" onclick="removeSavedPlace('${p.id}')" style="color: var(--color-error); font-size: 11px; padding: 2px 4px;" title="Remove from Saved">
            ✕ Remove
          </button>
        </div>
      </div>
    `).join('');
  }
}

window.toggleBookmarkActivePlace = function() {
  if (!appState.activePlace) return;
  const id = appState.activePlace.id;
  const idx = appState.savedPlaceIds.indexOf(id);
  if (idx > -1) {
    appState.savedPlaceIds.splice(idx, 1);
    showToast(`Removed from Saved Places`);
  } else {
    appState.savedPlaceIds.push(id);
    playChime('turn');
    showToast(`Saved ${appState.activePlace.shortName || appState.activePlace.name} to Favorites!`);
  }
  localStorage.setItem('baaand_saved_places', JSON.stringify(appState.savedPlaceIds));
  updateBookmarkButton();
  renderSavedList();
};

window.removeSavedPlace = function(id) {
  const idx = appState.savedPlaceIds.indexOf(id);
  if (idx > -1) {
    appState.savedPlaceIds.splice(idx, 1);
    localStorage.setItem('baaand_saved_places', JSON.stringify(appState.savedPlaceIds));
    showToast('Place removed from Saved list');
    renderSavedList();
    updateBookmarkButton();
  }
};

function updateBookmarkButton() {
  const btn = document.getElementById('detail-bookmark-btn');
  if (!btn || !appState.activePlace) return;
  const isSaved = appState.savedPlaceIds.includes(appState.activePlace.id);
  btn.textContent = isSaved ? '🔖 Saved in Favorites' : '🔖 Save to Favorites';
  btn.style.color = isSaved ? 'var(--color-primary)' : 'var(--color-text-secondary)';
  btn.style.fontWeight = isSaved ? 'var(--font-bold)' : 'var(--font-normal)';
}

// Visitor Mode
window.visitorSelectGate = function(gateNumber) {
  showToast(`Welcome! Setting entry at Gate ${gateNumber}`);
  appState.selectedOrigin = `Gate ${gateNumber}`;
  appState.activePlace = CAMPUS_DATA.places.find(p => p.id === 'admin-reception');
  navigateTo('screen-route');
};

// Report Form Handler with LocalStorage Persistence
function initReportForm() {
  window.submitSignboardReport = function(e) {
    if (e) e.preventDefault();
    const loc = document.getElementById('report-location-select').value;
    const desc = document.getElementById('report-desc-input').value;
    const type = document.querySelector('input[name="sign-issue"]:checked')?.value || 'Damaged / Faded';

    const reportId = Math.floor(1000 + Math.random() * 9000);
    const newReport = {
      id: `#DU-${reportId}`,
      location: loc,
      issueType: type,
      description: desc || 'Reported via student navigation client',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let reports = [];
    try {
      const stored = localStorage.getItem('baaand_reports');
      if (stored) reports = JSON.parse(stored);
    } catch(err) {}

    reports.unshift(newReport);
    localStorage.setItem('baaand_reports', JSON.stringify(reports));

    playChime('arrive');
    showToast(`✅ Report ${newReport.id} Logged for ${loc}. Campus maintenance dispatched!`, 4500);
    document.getElementById('report-desc-input').value = '';
    renderReportHistory();
    setTimeout(() => {
      navigateTo('screen-home');
    }, 1600);
  };
}

function renderReportHistory() {
  const container = document.getElementById('report-history-container');
  if (!container) return;

  let reports = [];
  try {
    const stored = localStorage.getItem('baaand_reports');
    if (stored) reports = JSON.parse(stored);
  } catch(e) {}

  if (reports.length === 0) {
    container.innerHTML = '<p style="font-size: var(--text-xs); color: var(--color-text-muted);">No reports logged yet in this session.</p>';
  } else {
    container.innerHTML = reports.slice(0, 3).map(r => `
      <div style="background: var(--color-bg-subtle); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 6px; font-size: var(--text-xs);">
        <strong>${r.id} · ${r.location}</strong> (${r.timestamp})<br>
        <span style="color: var(--color-text-secondary);">${r.issueType}: ${r.description}</span>
      </div>
    `).join('');
  }
}

// Accessibility Toggles
function initAccessibilityToggles() {
  window.toggleHighContrast = function(e) {
    const isChecked = e.target.checked;
    document.body.classList.toggle('high-contrast-mode', isChecked);
    showToast(isChecked ? 'High Contrast Mode Enabled' : 'Normal Contrast Restored');
  };

  window.toggleLargeText = function(e) {
    const isChecked = e.target.checked;
    document.documentElement.style.fontSize = isChecked ? '18px' : '16px';
    showToast(isChecked ? 'Large Text Scaling Enabled' : 'Standard Text Scale Restored');
  };

  window.toggleFullscreenSimulator = function() {
    document.body.classList.toggle('full-width-mode');
    const isWide = document.body.classList.contains('full-width-mode');
    showToast(isWide ? 'Responsive Viewport: Tablet / Desktop Mode' : 'Mobile Viewport: 390x844 Mode');
  };
}

// Toast Feedback Utility
function showToast(message, duration = 3000) {
  const toast = document.getElementById('app-toast');
  const toastText = document.getElementById('toast-text');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('visible');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}
