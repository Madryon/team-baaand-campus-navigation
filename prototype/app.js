/**
 * Team BAAAND Campus Navigation — Interactive Prototype Application Logic (v1)
 * Powers all 16 screen views, primary flow, secondary flows, role modes,
 * search filtering, and turn-by-turn simulation.
 */

// Global State
const appState = {
  currentScreen: 'screen-splash',
  screenHistory: [],
  selectedRole: 'student', // 'student' | 'visitor' | 'insider'
  guidanceEnabled: true,   // false in Insider mode
  accessibleRoute: false,  // true when wheelchair / ramp mode enabled
  savedPlaceIds: ['dept-or'], // pre-saved for demonstration
  activePlace: null,
  activeRoute: null,
  currentNavigationStep: 1,
  totalNavigationSteps: 4,
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
    'screen-navigate': 'Walking Navigation',
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
  } else if (screenId === 'screen-home' && appState.selectedRole === 'insider') {
    renderInsiderHome();
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

// Mode Switcher (Student / Visitor / Insider)
function initModeSwitcher() {
  window.setRoleMode = function(role) {
    appState.selectedRole = role;

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

// Search & Filtering Implementation
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
        </div>
        <div class="gate-badge">${place.nearestGate}</div>
      </div>
    `).join('');
  }
}

// Place Detail Implementation
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

  // Render co-located departments
  const coLocatedContainer = document.getElementById('detail-same-building-list');
  if (coLocatedContainer && place.departmentsInSameBuilding) {
    coLocatedContainer.innerHTML = place.departmentsInSameBuilding.map(d => `
      <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: var(--text-sm); color: var(--color-text-secondary); border-bottom: 1px dashed var(--color-bg-muted);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>${d}</span>
      </div>
    `).join('');
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

  saveBtn.className = isSaved ? 'btn btn-outline' : 'btn btn-outline';
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

// Route Preview Implementation
function initPlaceDetails() {
  window.startRouteToActivePlace = function() {
    navigateTo('screen-route');
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

  if (appState.accessibleRoute) {
    timeEl.textContent = '10 min walk';
    distanceEl.textContent = '620m (Flat paths & West Elevator)';
    modeBadge.style.display = 'inline-flex';
    modeBadge.textContent = 'Step-free route';
  } else {
    timeEl.textContent = '8 min walk';
    distanceEl.textContent = '540m (Shortest path)';
    modeBadge.style.display = 'none';
  }
}

// Turn-by-Turn Navigation Simulator
function initNavigationSimulator() {
  window.startLiveNavigation = function() {
    appState.currentNavigationStep = 1;
    navigateTo('screen-navigate');
    renderNavigationStep(1);
  };

  window.nextNavigationStep = function() {
    if (appState.currentNavigationStep < appState.totalNavigationSteps) {
      appState.currentNavigationStep++;
      renderNavigationStep(appState.currentNavigationStep);
    } else {
      navigateTo('screen-arrived');
    }
  };

  window.prevNavigationStep = function() {
    if (appState.currentNavigationStep > 1) {
      appState.currentNavigationStep--;
      renderNavigationStep(appState.currentNavigationStep);
    }
  };

  window.triggerOffRouteDemo = function() {
    showToast('⚠️ Off route detected! Recalculating via Central Canteen...', 4000);
    const instructionEl = document.getElementById('nav-step-instruction');
    if (instructionEl) {
      instructionEl.style.color = 'var(--color-error)';
      instructionEl.textContent = 'Recalculating: Turn right towards Central Canteen to rejoin Gate 4 path.';
      setTimeout(() => {
        instructionEl.style.color = 'var(--color-text-primary)';
        renderNavigationStep(appState.currentNavigationStep);
      }, 3500);
    }
  };
}

function renderNavigationStep(stepNumber) {
  const steps = [
    {
      num: 1,
      instruction: "Enter through Gate 4 (Arts Gate) and proceed straight.",
      distance: "80 meters",
      landmark: "Pass the Security Patrol Cabin on your left",
      icon: "arrow-up"
    },
    {
      num: 2,
      instruction: "At the Central Canteen junction, take a left turn into the Arts Quadrangle.",
      distance: "120 meters",
      landmark: "Look for the red-brick arches next to Canteen wooden benches",
      icon: "corner-up-left"
    },
    {
      num: 3,
      instruction: "Enter Faculty of Arts building through the West Wing Entrance.",
      distance: "40 meters",
      landmark: "Notice verified signboard: 'Faculty of Arts — Academic Block'",
      icon: "log-in"
    },
    {
      num: 4,
      instruction: appState.accessibleRoute
        ? "Take the Central Atrium Elevator to 2nd Floor, turn left to Room 214."
        : "Ascend West Wing Staircase to 2nd Floor. Room 214 is 3rd door on right.",
      distance: "Destination at 2nd Floor",
      landmark: "Signboard reads: 'Department of Operational Research — Head Office'",
      icon: "check-circle"
    }
  ];

  const current = steps[stepNumber - 1];
  document.getElementById('nav-step-counter').textContent = `Step ${stepNumber} of ${steps.length}`;
  document.getElementById('nav-step-instruction').textContent = current.instruction;
  document.getElementById('nav-step-distance').textContent = current.distance;
  document.getElementById('nav-step-landmark').textContent = current.landmark;

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
    <div class="card card-interactive" onclick="routeFromGate('${g.id}')">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <span class="gate-badge">Gate ${g.number}</span>
        <span class="verified-tag">${g.guardAvailable}</span>
      </div>
      <h3 style="font-size: var(--text-base); font-weight: var(--font-bold); color: var(--color-text-primary); margin-bottom: 4px;">${g.name}</h3>
      <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 8px;">Road: ${g.road}</p>
      <div style="background-color: var(--color-bg-subtle); padding: 8px 12px; border-radius: var(--radius-sm); font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: 10px;">
        <strong>Directly connects to:</strong> ${g.primaryFor}
      </div>
      <div style="display: flex; gap: 8px; font-size: var(--text-xs);">
        ${g.wheelchairAccessible ? '<span style="color: var(--color-accessible);">♿ Accessible Ramp</span>' : ''}
        ${g.bicycleStandAvailable ? '<span style="color: var(--color-bicycle);">🚲 Smart Bike Point</span>' : ''}
        ${g.eRickshawAvailable ? '<span style="color: var(--color-erickshaw);">🛺 E-Rickshaw Stop</span>' : ''}
      </div>
    </div>
  `).join('');
}

window.routeFromGate = function(gateId) {
  const gate = CAMPUS_DATA.gates.find(g => g.id === gateId);
  if (!gate) return;
  showToast(`Routing from Gate ${gate.number}...`);
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

// Saved Places List
function renderSavedList() {
  const container = document.getElementById('saved-list-container');
  const emptyState = document.getElementById('saved-empty-state');
  if (!container) return;

  const saved = CAMPUS_DATA.places.filter(p => appState.savedPlaceIds.includes(p.id));

  if (saved.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    container.innerHTML = saved.map(p => `
      <div class="card card-interactive list-row" onclick="selectPlace('${p.id}')">
        <div class="list-row-leading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div class="list-row-content">
          <div class="list-row-title">${p.name}</div>
          <div class="list-row-subtitle">${p.building} · ${p.nearestGate}</div>
        </div>
        <div class="gate-badge">${p.nearestGate}</div>
      </div>
    `).join('');
  }
}

// Visitor Mode
window.visitorSelectGate = function(gateNumber) {
  showToast(`Welcome! Setting entry at Gate ${gateNumber}`);
  // Target visitor reception near Gate 1
  appState.activePlace = CAMPUS_DATA.places.find(p => p.id === 'admin-reception');
  navigateTo('screen-route');
};

// Report Form Handler
function initReportForm() {
  window.submitSignboardReport = function(e) {
    if (e) e.preventDefault();
    const loc = document.getElementById('report-location-select').value;
    const desc = document.getElementById('report-desc-input').value;

    showToast(`✅ Report submitted for ${loc}. Campus maintenance notified!`, 4000);
    document.getElementById('report-desc-input').value = '';
    setTimeout(() => {
      navigateTo('screen-home');
    }, 1500);
  };
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
