export const SERVICES = [
  {
    id: "engineering-consulting",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop",
    colors: ["#3B3E8B", "#6B6FD8"],
    category: "Engineering",
    icon: "M12 2 2 7l10 5 10-5-10-5Zm-7 8.7V16c0 1.9 3.1 4 7 4s7-2.1 7-4v-5.3l-7 3.5-7-3.5Z",
    title: "Engineering Consulting",
    description: "Feasibility, design and technical advisory for complex industrial and infrastructure assets.",
    bullets: ["FEED and detailed engineering", "Structural & civil engineering", "Project management consultancy"],
  },
  {
    id: "construction-services",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop",
    colors: ["#D93637", "#F2706B"],
    category: "Construction",
    icon: "M3 21h18v-2H3v2ZM5 10h2v9H5v-9Zm4-6h2v15H9V4Zm4 3h2v12h-2V7Zm4-4h2v16h-2V3Z",
    title: "Construction Services",
    description: "Turnkey civil, structural and industrial construction delivered on time and to specification.",
    bullets: ["Industrial plant construction", "Site management & supervision"],
  },
  {
    id: "equipment-rental",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=1800&auto=format&fit=crop",
    colors: ["#3B3E8B", "#D93637"],
    category: "Equipment",
    icon: "M2 17h1.5a2.5 2.5 0 0 0 4.9 0H15a2.5 2.5 0 0 0 4.9 0H22v-4l-3-4h-4V6H2v11Zm14-9h3l2 3h-5V8ZM6.9 18.5A1.5 1.5 0 1 1 6.9 15.5a1.5 1.5 0 0 1 0 3Zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z",
    title: "Equipment Rental & Maintenance",
    description:
      "A well-maintained fleet of cranes, excavators, generators and specialized site equipment, backed by an in-house maintenance workshop that keeps every unit mission-ready.",
    bullets: ["Heavy machinery rental"],
  },
  {
    id: "material-supply-trading",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1800&auto=format&fit=crop",
    colors: ["#262953", "#4F53B0"],
    category: "Trading",
    icon: "M3 3h18v4H3V3Zm2 6h14v12H5V9Zm3 3v6h2v-6H8Zm5 0v6h2v-6h-2Z",
    title: "Material Supply & Trading",
    description: "Sourcing and supply of construction and industrial materials from trusted global manufacturers.",
    bullets: ["Building & construction materials", "Bulk & project-based supply"],
  },
  {
    id: "manpower-recruitment",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1800&auto=format&fit=crop",
    colors: ["#B3282A", "#E5534F"],
    category: "Workforce",
    icon: "M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Zm8 2c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4Zm-8 .3C4.6 14.9 0 16.2 0 18.7V21h6v-2.6c0-1.3.6-2.4 1.5-3.3-.5-.1-1-.1-1.5.2Z",
    title: "Manpower Recruitment",
    description:
      "We recruit, vet and mobilize skilled tradesmen, engineers and technical professionals for short and long-term contracts, backed by transparent compliance and welfare standards.",
    bullets: ["Engineering & technical staff", "Contract & project-based staffing"],
  },
  {
    id: "real-estate-vehicle-rental",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
    colors: ["#4548A3", "#8387E6"],
    category: "Property",
    icon: "M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z",
    title: "Real Estate & Vehicle Rental",
    description:
      "Our real estate portfolio covers commercial and residential leasing and property management, complemented by a vehicle rental fleet serving corporate and project mobility needs.",
    bullets: ["Commercial & residential leasing", "Corporate vehicle rental"],
  },
  {
    id: "pool-services",
    // Placeholder photo — replace with the company's own project image
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1800&auto=format&fit=crop",
    colors: ["#D93637", "#3B3E8B"],
    category: "Leisure",
    icon: "M2 20c1.5 0 1.5-1.5 3-1.5S6.5 20 8 20s1.5-1.5 3-1.5S12.5 20 14 20s1.5-1.5 3-1.5S18.5 20 20 20l2-.001V17c-1.5 0-1.5 1.5-3 1.5S17.5 17 16 17s-1.5 1.5-3 1.5S11.5 17 10 17s-1.5 1.5-3 1.5S5.5 17 4 17H2v3ZM6 13h12V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v9Z",
    title: "Pool Services",
    description:
      "From design and construction to ongoing maintenance, our pool services team delivers safe, well-engineered swimming pools for villas, compounds and commercial developments.",
    bullets: ["Pool design & engineering", "Construction & waterproofing"],
  },
];

export const SERVICE_CATEGORIES = ["All", ...new Set(SERVICES.map((s) => s.category))];
