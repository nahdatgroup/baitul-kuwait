export const STATS = [
  { label: "Established", value: 1996, plain: true },
  { label: "Projects Delivered", value: 500, suffix: "+" },
  { label: "Satisfied Clients", value: 150, suffix: "+" },
  { label: "Years of Experience", value: 30, suffix: "+" },
];

export const VALUES = [
  {
    title: "Integrity",
    description: "Transparency and accountability in every engagement.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z",
  },
  {
    title: "Excellence",
    description: "Held to the highest engineering and safety standards.",
    icon: "M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.1l1.5-7L2 9.3l7-.8L12 2Z",
  },
  {
    title: "Reliability",
    description: "Delivered on schedule and within scope.",
    icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.4 3.3 3.3-1.4 1.4L11 13.2V6h2v6.4Z",
  },
  {
    title: "Partnership",
    description: "Lasting relationships grounded in trust.",
    icon: "M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Zm8 2c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4Zm-8 .3C4.6 14.9 0 16.2 0 18.7V21h6v-2.6c0-1.3.6-2.4 1.5-3.3-.5-.1-1-.1-1.5.2Z",
  },
];

export const CERTIFICATIONS = [
  { name: "ISO 9001:2015", description: "Quality Management" },
  { name: "ISO 45001:2018", description: "Health & Safety" },
  { name: "ISO 14001:2015", description: "Environmental" },
];

export const WHY_US = [
  {
    title: "Proven Experience",
    stat: "30+",
    statLabel: "years delivering",
    description: "Three decades of proven delivery across engineering, construction and trading sectors.",
    icon: "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    title: "Certified Expertise",
    stat: "3",
    statLabel: "ISO certifications",
    description: "Certified engineers, project managers and technicians committed to technical excellence.",
    icon: "m9 12 2 2 4-4M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z",
  },
  {
    title: "Operational Efficiency",
    stat: "On time",
    statLabel: "milestone discipline",
    description: "Disciplined project scheduling and logistics that keep every milestone on track.",
    icon: "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
  },
  {
    title: "Quality Assurance",
    stat: "ISO 9001",
    statLabel: "quality system",
    description: "Rigorous QA/QC protocols aligned with international standards on every project.",
    icon: "M20 6 9 17l-5-5",
  },
  {
    title: "Customer Satisfaction",
    stat: "150+",
    statLabel: "returning clients",
    description: "Long-term client relationships built on transparency, safety and reliability.",
    icon: "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z",
  },
];

export const MISSION_VISION = [
  {
    title: "Mission",
    tone: "blue",
    // Placeholder photo
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1400&auto=format&fit=crop",
    icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6Zm0-9a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z",
    text: "To deliver safe, efficient and technically sound engineering, construction and trading solutions that create lasting value for our clients and communities.",
    points: ["Safety on every site", "Technically sound delivery", "Lasting client value"],
  },
  {
    title: "Vision",
    tone: "red",
    // Placeholder photo
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=1400&auto=format&fit=crop",
    icon: "M12 5C6.5 5 2 12 2 12s4.5 7 10 7 10-7 10-7-4.5-7-10-7Zm0 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z",
    text: "To be Kuwait's most trusted multidisciplinary contracting partner, recognised across the Gulf for engineering quality, integrity and on-time delivery.",
    points: ["Most trusted in Kuwait", "Recognised across the Gulf", "Quality and integrity first"],
  },
];

// Growth figures by milestone year. Replace with the company's actual records.
export const GROWTH = [
  { year: 1996, projects: 5, clients: 3, workforce: 25 },
  { year: 2001, projects: 40, clients: 18, workforce: 90 },
  { year: 2006, projects: 110, clients: 42, workforce: 220 },
  { year: 2011, projects: 190, clients: 70, workforce: 380 },
  { year: 2016, projects: 290, clients: 98, workforce: 560 },
  { year: 2021, projects: 400, clients: 126, workforce: 740 },
  { year: 2026, projects: 500, clients: 150, workforce: 900 },
];

export const GROWTH_MILESTONES = [
  { year: 1996, text: "Founded as a general trading company in Kuwait" },
  { year: 2006, text: "Construction and equipment rental divisions launched" },
  { year: 2016, text: "ISO 9001, 14001 and 45001 certified" },
  { year: 2026, text: "Seven divisions under one contracting group" },
];

// Power Division work, summarised from the 2025 payment register.
// Private individuals, PO numbers and amounts are intentionally left out of the public site.
const L = (f) => `/assets/img/clients/${f}.png`;

export const PROJECT_CATEGORIES = ["Panels & DBs", "Drives & Starters", "Maintenance", "Oil & Gas", "Supply"];

export const PROJECTS = [
  {
    client: "Kuwait Oil Company",
    logo: L("koc"),
    category: "Oil & Gas",
    scope: "Instrument air piping upgrade from carbon steel to stainless steel at BS-140, compressor discharge to wet air vessel",
  },
  { client: "Kuwait Oil Company", logo: L("koc"), category: "Oil & Gas", scope: "Supply of Pikotek VCS isolation gasket kits and materials" },
  { client: "Emco Gulf", logo: L("emco-gulf"), category: "Supply", scope: "Pikotek VCS isolation gaskets and Eaton 160A TP MCCBs" },
  { client: "Bader Al Mulla & Brothers", logo: L("bader-al-mulla-mark"), category: "Drives & Starters", scope: "Supply and installation of 15 kW VFD, contactor and LCP enclosures" },
  { client: "Alghanim Industries", logo: L("alghanim"), category: "Drives & Starters", scope: "15 kW variable frequency drives" },
  { client: "Beyond Limit Property Management", logo: L("beyond-limit"), category: "Maintenance", scope: "HVAC repair, preventive maintenance of MLTP panels and ATS, A/C unit connections" },
  { client: "Blue Breeze Company", logo: L("blue-breeze"), category: "Panels & DBs", scope: "Pump and pump heater control panel, overload relays and connectors" },
  { client: "Trust Civil Specialist Co.", category: "Panels & DBs", scope: "Substation LT panels for TR-1, TR-2 and TR-4 with MCCBs, plus automatic voltage regulator" },
  { client: "Kuwait Swedish GTC", category: "Panels & DBs", scope: "Distribution boards, DB modifications, contactor enclosures, meters, RCDs and HRC fuses" },
  { client: "Trust Al Ahliya / Al Qurain Co.", category: "Panels & DBs", scope: "MSB 2-way TPN, DB doors, 16 telephone boxes and manual changeover switch" },
  { client: "Al Hamra Real Estate Co.", category: "Drives & Starters", scope: "17 VFD starter panels" },
  { client: "Refrigeration & Air Conditioning System Co.", category: "Drives & Starters", scope: "AHU-1 starter panel and 14 starter panels" },
  { client: "Tri East Building Construction Co.", category: "Panels & DBs", scope: "400A automatic transfer switch" },
  { client: "UES Mechanical", category: "Panels & DBs", scope: "7LP lighting panel" },
  { client: "Arabian Construction Co.", category: "Panels & DBs", scope: "Indoor DB power box" },
  { client: "Creative International Construction", category: "Panels & DBs", scope: "12-way distribution board" },
  { client: "ASTA Contracting Co.", category: "Panels & DBs", scope: "Seven 4-way distribution boards" },
  { client: "Al Daajani Building Construction", category: "Panels & DBs", scope: "Custom electrical enclosure" },
  { client: "Al Mulla Engineering", category: "Panels & DBs", scope: "LCP enclosures" },
  { client: "Al Sayer Mech. & Electrical Co.", category: "Drives & Starters", scope: "4 kW and 7.5 kW DOL starters" },
  { client: "Rasco", category: "Drives & Starters", scope: "Motor starter box" },
  { client: "Fadi Electrical Co.", category: "Supply", scope: "100A isolator, ELCBs and MCBs" },
];

export const TESTIMONIALS = [
  {
    name: "Ahmed Al-Fadhli",
    role: "Project Director, Regional Logistics Group",
    quote:
      "Baitul Jameeh delivered our warehouse complex ahead of schedule without compromising on quality or safety. Their engineering team anticipated issues before they became delays.",
  },
  {
    name: "Fatima Al-Sabah",
    role: "Facilities Manager, Government Housing Authority",
    quote: "A dependable contracting partner. Communication was clear at every stage and their site supervision kept the project firmly on budget.",
  },
  {
    name: "Rashid Al-Mutairi",
    role: "Operations Manager, Industrial Energy Co.",
    quote: "Their equipment rental and maintenance division has kept our operations running with minimal downtime for over six years.",
  },
];

export const CLIENTS = [
  { name: "Kuwait Oil Company", logo: "/assets/img/clients/koc.png" },
  { name: "KNPC", logo: "/assets/img/clients/knpc.png" },
  { name: "Halliburton", logo: "/assets/img/clients/halliburton.png" },
  { name: "Larsen & Toubro", logo: "/assets/img/clients/lt.png" },
  { name: "Alghanim Industries", logo: "/assets/img/clients/alghanim.png" },
  { name: "V2X", logo: "/assets/img/clients/v2x.png" },
  { name: "NBTC", logo: "/assets/img/clients/nbtc.png" },
  { name: "Arabi Company", logo: "/assets/img/clients/arabi.png" },
  { name: "KIMMCO", logo: "/assets/img/clients/kimmco.png" },
  { name: "Alamara Projects", logo: "/assets/img/clients/alamara.png" },
  { name: "Fixed Asset", logo: "/assets/img/clients/fixed-asset.png" },
  { name: "MVL", logo: "/assets/img/clients/mvl.png" },
  { name: "Bader Al Mulla & Brothers", logo: "/assets/img/clients/bader-al-mulla.png", wide: true },
  { name: "Emco Gulf", logo: "/assets/img/clients/emco-gulf.png" },
  { name: "Beyond Limit Property Management", logo: "/assets/img/clients/beyond-limit.png" },
  { name: "Blue Breeze HVAC & Electrical", logo: "/assets/img/clients/blue-breeze.png" },
];

export const FAQS = [
  {
    question: "What services does Baitul Jameeh provide?",
    answer:
      "Engineering Consulting, Construction, Equipment Rental, Material Supply, Manpower Recruitment, Real Estate & Vehicle Rental, and Pool Services — seven specialized divisions working together to deliver complete project outcomes.",
  },
  {
    question: "Are your personnel and subcontractors certified?",
    answer: "Yes. All personnel and subcontractors are vetted, certified where applicable, and covered under our project insurance policies.",
  },
  {
    question: "What areas do you operate in?",
    answer: "We operate across Kuwait with mobilization capability for regional projects on request.",
  },
  {
    question: "How quickly will you respond to a quote request?",
    answer: "Our team will get back to you within one business day.",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

// Office hours in Kuwait time (Asia/Kuwait). Days: 0 = Sunday … 6 = Saturday.
export const OFFICE_HOURS = { days: [0, 1, 2, 3, 4], open: 8, close: 17, label: "Sun – Thu, 8:00 AM – 5:00 PM" };

export const CONTACT_STEPS = [
  { title: "We review your brief", text: "A division lead reads your request the same business day." },
  { title: "We call to scope it", text: "A short call to confirm site, timeline and technical requirements." },
  { title: "You receive a proposal", text: "A clear, itemised quotation with schedule and deliverables." },
];

export const CONTACT = {
  phoneDisplay: "+965 2384 1605",
  phoneHref: "tel:+96523841605",
  phone2Display: "+965 6049 0405",
  phone2Href: "tel:+96560490405",
  email: "info@baitulkw.com",
  whatsapp: "https://wa.me/96560490405",
  address: "7th Floor, Awtad Tower, Egaila, Kuwait",
};
