/**
 * Team BAAAND Campus Navigation — Verified Research Dataset
 * Contains all campus locations, gates, departments, and mobility points derived from Phase 1 & 2 research.
 */

const CAMPUS_DATA = {
  places: [
    {
      id: "dept-or",
      name: "Department of Operational Research",
      shortName: "OR Department",
      category: "department",
      building: "Faculty of Arts",
      floorWing: "2nd Floor, West Wing, Room 214",
      nearestGate: "Gate 4",
      gateDistance: "180m (3 min walk)",
      landmark: "Adjacent to Central Canteen; enter through the red-brick arches",
      photoPlaceholder: "Faculty of Arts — West Wing Entrance Archway",
      departmentsInSameBuilding: [
        "Department of Psychology",
        "Department of Business Economics",
        "Faculty of Arts Administrative Office",
        "Arts Faculty Library"
      ],
      description: "Houses MSc Operational Research, PhD programs, and computational optimization labs. Located on the 2nd floor directly above the Arts Seminar Hall.",
      accessibility: "Elevator available in Central Atrium; ramp access at West Wing entrance (Gate 4 side).",
      tags: ["OR", "Operational Research", "Arts Faculty", "Room 214", "Maths", "Saket", "Shivang"]
    },
    {
      id: "fac-arts",
      name: "Faculty of Arts",
      shortName: "Arts Faculty",
      category: "building",
      building: "Faculty of Arts (Main Macro-Complex)",
      floorWing: "Ground to 3rd Floor",
      nearestGate: "Gate 4",
      gateDistance: "120m (2 min walk)",
      landmark: "Historic red sandstone pillars with central courtyard and fountain",
      photoPlaceholder: "Faculty of Arts — Main Portico Pillars",
      departmentsInSameBuilding: [
        "Department of Operational Research (2nd Floor)",
        "Department of Psychology (Ground & 1st Floor)",
        "Department of Business Economics (3rd Floor)",
        "Department of English & Modern Indian Languages",
        "Central Arts Auditorium"
      ],
      description: "One of the two largest multi-department macro-buildings on campus. Hosts over 14 postgraduate departments and academic offices.",
      accessibility: "Wide exterior ramps at Main Portico and Gate 4 rear entrance. Central lift serves all 4 floors.",
      tags: ["Arts", "Arts Faculty", "Main Building", "Complex"]
    },
    {
      id: "dept-psych",
      name: "Department of Psychology",
      shortName: "Psychology Dept",
      category: "department",
      building: "Faculty of Arts",
      floorWing: "Ground Floor & 1st Floor, East Wing",
      nearestGate: "Gate 4",
      gateDistance: "210m (3.5 min walk)",
      landmark: "Opposite Department of Philosophy, near East Quad garden",
      photoPlaceholder: "Psychology Department Entrance — East Wing",
      departmentsInSameBuilding: [
        "Department of Operational Research",
        "Department of Business Economics",
        "Faculty of Arts Main Office"
      ],
      description: "Contains cognitive assessment labs, postgraduate classrooms, and psychological clinic consultation suites.",
      accessibility: "Ground floor fully step-free. Tactile guide paths along main corridor.",
      tags: ["Psychology", "Psych", "Divakar", "Arts"]
    },
    {
      id: "dept-busecon",
      name: "Department of Business Economics",
      shortName: "Business Economics (DBE)",
      category: "department",
      building: "Faculty of Arts (also annex at South Wing)",
      floorWing: "3rd Floor, South Wing, Room 308",
      nearestGate: "Gate 4",
      gateDistance: "240m (4 min walk)",
      landmark: "Above the Department of History, signposted at Staircase 3",
      photoPlaceholder: "Business Economics Annex — Staircase 3 Landing",
      departmentsInSameBuilding: [
        "Department of Operational Research",
        "Department of Psychology",
        "Faculty of Arts"
      ],
      description: "Conducts MBE and finance doctoral programs. Shares administrative wing with Faculty of Arts.",
      accessibility: "Accessible via Central Lift to 3rd floor followed by flat corridor.",
      tags: ["Business Economics", "DBE", "Deepika", "Economics"]
    },
    {
      id: "dept-elec",
      name: "Department of Electronic Science",
      shortName: "Electronic Science Dept",
      category: "department",
      building: "Electronic Science Block (UDSC)",
      floorWing: "Ground, 1st & 2nd Floor, Microwave & Semiconductor Wings",
      nearestGate: "Gate 1",
      gateDistance: "150m (2.5 min walk)",
      landmark: "Adjacent to IIC Building, facing the South Campus Central Lawn",
      photoPlaceholder: "Electronic Science Block — Main Porch & Microwave Lab Wing",
      departmentsInSameBuilding: [
        "Institute of Informatics & Communication (IIC)",
        "Microprocessor & Embedded Systems Facility",
        "Semiconductor Device Research Laboratory"
      ],
      description: "Premier department offering M.Sc. Electronics, M.Tech Microwave Electronics, and Ph.D. research at DU South Campus. Houses cutting-edge semiconductor fabrication, optical communication, and microwave characterization laboratories.",
      accessibility: "Direct level access ramp at main entrance; wide doorways and accessible restrooms on ground floor.",
      tags: ["Electronics", "Electronic Science", "Microwave", "Semiconductor", "VLSI", "Circuits", "Aman", "UDSC", "South Campus"]
    },
    {
      id: "dept-iic",
      name: "Institute of Informatics & Communication (IIC)",
      shortName: "IIC Department",
      category: "department",
      building: "Informatics & Computer Centre (IIC Building)",
      floorWing: "Ground & 1st Floor, Networking & AI Research Labs",
      nearestGate: "Gate 1",
      gateDistance: "140m (2 min walk)",
      landmark: "Adjacent to Dept. of Electronic Science; distinctive blue glass entrance porch & Cyber Tower",
      photoPlaceholder: "IIC Building Main Glass Portico & Seminar Foyer",
      departmentsInSameBuilding: [
        "Department of Electronic Science",
        "Central Computer Centre (UDSC)",
        "Bioinformatics Computational Facility"
      ],
      description: "Premier academic institute for M.Sc. Informatics and Ph.D. research at Delhi University South Campus. Houses specialized embedded networks, cyber systems, machine intelligence labs, and high-performance computing clusters.",
      accessibility: "Zero-threshold entrance ramp, wide automated entrance doors, and elevator access to upper floor laboratories.",
      tags: ["IIC", "Informatics", "Institute of Informatics and Communication", "Computer Science", "Networks", "AI", "South Campus", "MSc Informatics", "Cyber"]
    },
    {
      id: "bldg-fms",
      name: "Faculty of Management Studies (FMS South Campus)",
      shortName: "FMS / SP Jain Centre",
      category: "department",
      building: "SP Jain Centre for Management Studies",
      floorWing: "Ground to 3rd Floor, Executive MBA Lecture Theatres & Finance Wing",
      nearestGate: "Gate 1",
      gateDistance: "90m (1.5 min walk)",
      landmark: "Modern red brick façade with glass entrance atrium on Benito Juarez Marg",
      photoPlaceholder: "SP Jain Centre (FMS) — Main Atrium & Executive Foyer",
      departmentsInSameBuilding: [
        "MBA Classrooms & Amphitheatre",
        "Management Library & Case Study Rooms",
        "FMS Placement Cell & Corporate Relations Wing",
        "Executive Seminar Auditoriums"
      ],
      description: "Premier management institute at DU South Campus (SP Jain Centre). Conducts MBA, Executive MBA, and doctoral programs with dedicated amphitheatre classrooms and digital finance labs.",
      accessibility: "Gentle entrance ramp, automatic sliding glass doors, dual elevators, accessible restrooms on all floors.",
      tags: ["FMS", "Management", "MBA", "SP Jain", "FMS South Campus", "Deepika", "Business", "Finance", "South Campus"]
    },
    {
      id: "cent-lib",
      name: "Central Library",
      shortName: "Central Library",
      category: "facility",
      building: "Central Library Complex (UDSC)",
      floorWing: "Ground to 2nd Floor",
      nearestGate: "Gate 2",
      gateDistance: "100m (1.5 min walk)",
      landmark: "Prominent colonnade and reading pavilion overlooking Benito Juarez Marg",
      photoPlaceholder: "Central Library Colonnade & Main Steps",
      departmentsInSameBuilding: [
        "Reference Reading Hall",
        "Periodical Section",
        "Digital Research Lab",
        "Braille Resource Unit"
      ],
      description: "University central reference library housing over 200,000 volumes, digital journals, and round-the-clock reading spaces.",
      accessibility: "Dedicated ramp at East entrance, Braille wayfinding signage, accessible elevator.",
      tags: ["Library", "Books", "Study", "Reading", "South Campus"]
    },
    {
      id: "hostel-boys",
      name: "Saramati Post-Graduate Men's Hostel",
      shortName: "Saramati Men's Hostel",
      category: "hostel",
      building: "Saramati Hostel Complex, South Campus",
      floorWing: "Blocks A & B, Dining Mess, Reading Room & Warden Office",
      nearestGate: "Gate 3",
      gateDistance: "160m (2.5 min walk)",
      landmark: "Behind South Campus Sports Pavilion, along the Aravali Ridge path near Geetanjali Hostel",
      photoPlaceholder: "Saramati Men's Hostel Security Gate & Dining Hall Quad",
      departmentsInSameBuilding: [
        "Hostel Warden Office",
        "Student Dining Mess",
        "Recreation & Reading Hall",
        "Resident Gymnasium & Common Room"
      ],
      description: "Primary residential hall for post-graduate men (M.Sc., MBA, Ph.D. scholars) at Delhi University South Campus. Features 24/7 security checkpoint, mess facilities, and bicycle parking along the ridge trail.",
      accessibility: "Ground floor accessible rooms; ramped entry to mess, dining hall, and central common areas.",
      tags: ["Hostel", "Saramati", "Saramati Men Hostel", "Men Hostel", "Boys Hostel", "Shivang", "Residence", "Rooms", "South Campus", "UDSC"]
    },
    {
      id: "admin-reception",
      name: "Central Administration & Visitor Reception",
      shortName: "Visitor Reception",
      category: "facility",
      building: "Vice Regal Administrative Block",
      floorWing: "Ground Floor, Entrance Hall",
      nearestGate: "Gate 1",
      gateDistance: "80m (1 min walk)",
      landmark: "Flagstaff lawn and main ceremonial fountain",
      photoPlaceholder: "Main Administration Building — Reception Desk",
      departmentsInSameBuilding: [
        "Registrar Office",
        "Dean of Students Welfare",
        "Security Head Office",
        "Information & Visitor Helpdesk"
      ],
      description: "Primary welcome hub for first-time visitors, guest lecturers, official delegates, and parents.",
      accessibility: "Level entry from Gate 1 driveway, automatic entrance doors, accessible help counters.",
      tags: ["Visitor", "Reception", "Helpdesk", "Admin", "Gate 1"]
    },
    {
      id: "cent-canteen",
      name: "Central University Canteen & Cafe",
      shortName: "Central Canteen",
      category: "facility",
      building: "Student Amenities Hub",
      floorWing: "Ground Floor & Open Verandah",
      nearestGate: "Gate 4",
      gateDistance: "140m (2 min walk)",
      landmark: "Opposite Arts Faculty East Gate; marked by outdoor wooden benches",
      photoPlaceholder: "Central Canteen Verandah & Dining Terrace",
      departmentsInSameBuilding: [
        "Coffee Shop",
        "Stationery & Print Kiosk",
        "Student Union Help Point"
      ],
      description: "Popular dining landmark serving breakfast, hot lunch, and refreshments. Key navigation reference point.",
      accessibility: "Step-free verandah access and wide corridor entries.",
      tags: ["Canteen", "Food", "Cafeteria", "Chai", "Coffee", "Deepika"]
    }
  ],

  gates: [
    {
      id: "gate-1",
      number: 1,
      name: "Gate 1 — Main South Campus Gate",
      road: "Benito Juarez Marg",
      primaryFor: "Visitor Reception, Administration Block, IIC Dept, Dept. of Electronic Science, FMS (SP Jain Centre)",
      guardAvailable: "Yes (24/7 Police & Campus Security Post)",
      landmarks: "University Ceremonial Arch & Durgabai Deshmukh Metro walkway",
      wheelchairAccessible: true,
      eRickshawAvailable: true,
      bicycleStandAvailable: true
    },
    {
      id: "gate-2",
      number: 2,
      name: "Gate 2 — Academic & Library Gate",
      road: "Benito Juarez Marg (Academic Crescent)",
      primaryFor: "South Campus Central Library, Biotech Centre, Electronic Science labs",
      guardAvailable: "Yes (Day & Night Shift)",
      landmarks: "Central Library Colonnade Vista",
      wheelchairAccessible: true,
      eRickshawAvailable: true,
      bicycleStandAvailable: true
    },
    {
      id: "gate-3",
      number: 3,
      name: "Gate 3 — Saramati & Residential Gate",
      road: "Hostel Link Road (Aravali Ridge)",
      primaryFor: "Saramati Post-Graduate Men's Hostel, Geetanjali Girls Hostel, Dining Mess",
      guardAvailable: "Yes (Residential Patrol Booth)",
      landmarks: "Aravali Ridge Trail & Bicycle Station",
      wheelchairAccessible: true,
      eRickshawAvailable: true,
      bicycleStandAvailable: true
    },
    {
      id: "gate-4",
      number: 4,
      name: "Gate 4 — Arts & Humanities Gate",
      road: "Academic Link Road",
      primaryFor: "Faculty of Arts, Dept. of Operational Research, Dept. of Psychology, Central Canteen",
      guardAvailable: "Yes (Guard Cabin installed at Arts link)",
      landmarks: "Red sandstone arches, directly leads to Central Canteen",
      wheelchairAccessible: true,
      eRickshawAvailable: true,
      bicycleStandAvailable: true
    },
    {
      id: "gate-5",
      number: 5,
      name: "Gate 5 — Benito Juarez South Gate",
      road: "Benito Juarez Ring Road",
      primaryFor: "Saramati Hostel Annex, Health Centre, Sports Pavilion",
      guardAvailable: "Yes (Security Patrol Booth)",
      landmarks: "South Campus Pavilion & Shaded Lawn",
      wheelchairAccessible: true,
      eRickshawAvailable: true,
      bicycleStandAvailable: true
    },
    {
      id: "gate-6",
      number: 6,
      name: "Gate 6 — Sports & Gymnasium Gate",
      road: "Stadium Ring Road",
      primaryFor: "University Sports Pavilion, Indoor Stadium, Tennis Courts",
      guardAvailable: "Yes (Events Security Post)",
      landmarks: "Floodlight towers & Sports Entrance Gate",
      wheelchairAccessible: true,
      eRickshawAvailable: false,
      bicycleStandAvailable: false
    }
  ],

  transportPoints: [
    {
      id: "bike-g1",
      type: "bicycle",
      name: "Smart Bike Stand 1 (Gate 1 Plaza)",
      location: "Inside Gate 1 beside Visitor Reception",
      availableVehicles: "14 Bicycles Available",
      priceInfo: "Free for enrolled students (Campus ID swipe); ₹5/hr visitors",
      nearestPlaces: "Admin Block, Bank, Gate 1"
    },
    {
      id: "bike-g4",
      type: "bicycle",
      name: "Smart Bike Stand 2 (Arts Faculty Junction)",
      location: "Beside Central Canteen, Gate 4 link",
      availableVehicles: "8 Bicycles Available",
      priceInfo: "Free for enrolled students (Campus ID swipe)",
      nearestPlaces: "Faculty of Arts, OR Dept, Psychology, Canteen"
    },
    {
      id: "bike-g5",
      type: "bicycle",
      name: "Smart Bike Stand 3 (Hostel Quad)",
      location: "Gate 5 Hostel Entrance",
      availableVehicles: "12 Bicycles Available",
      priceInfo: "Free for enrolled students (Campus ID swipe)",
      nearestPlaces: "Boys Hostel, Dining Hall, Sports Pavilion"
    },
    {
      id: "rickshaw-g1",
      type: "erickshaw",
      name: "Green Loop E-Rickshaw Stop (Gate 1)",
      location: "Gate 1 Transit Shelter",
      frequency: "Departs every 4 minutes",
      route: "Gate 1 → Central Library → Arts Faculty (Gate 4) → Hostels (Gate 5)",
      fare: "₹10 flat campus shuttle"
    },
    {
      id: "rickshaw-g4",
      type: "erickshaw",
      name: "Green Loop E-Rickshaw Stop (Arts Faculty Crossing)",
      location: "Outside Arts Faculty West Entrance",
      frequency: "Departs every 5 minutes",
      route: "Arts Faculty → Central Library → Gate 1 Main Gate",
      fare: "₹10 flat campus shuttle"
    }
  ],

  eventsAndNotices: [
    {
      id: "notice-1",
      title: "MSc Operational Research Orientation & Lab Allocation",
      date: "Aug 28 · 10:30 AM",
      venue: "Faculty of Arts, 2nd Floor Room 214",
      category: "Academic",
      gate: "Gate 4"
    },
    {
      id: "notice-2",
      title: "FMS South Campus Annual Leadership Conclave: Innovate 2026",
      date: "Sep 02 · 09:00 AM",
      venue: "SP Jain Centre Main Auditorium",
      category: "Event",
      gate: "Gate 1"
    },
    {
      id: "notice-3",
      title: "IIC M.Sc. Informatics Advanced Networks & AI Symposium",
      date: "Sep 05 · 10:00 AM",
      venue: "IIC Seminar Hall, Ground Floor",
      category: "Academic",
      gate: "Gate 1"
    },
    {
      id: "notice-4",
      title: "Saramati Men's Hostel Room Allocation & Verification",
      date: "Aug 29 · 11:00 AM",
      venue: "Saramati Hostel Warden Office",
      category: "Hostel",
      gate: "Gate 3"
    }
  ]
};
