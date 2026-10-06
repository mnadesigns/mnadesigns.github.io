// Home page content. Sourced from the "Linkdein Profile Optimization" Claude project; only claims confirmed there are used.
export const site = {
  name: "M Naeem",
  role: "Senior Product Designer, Lahore, Pakistan",
  logo: "MNA",
  email: "me.naeem88@gmail.com",
  behance: "https://www.behance.net/muhammadnaeem",
  linkedin: "https://www.linkedin.com/in/muhammadnaeem88/",
  medium: "https://medium.com/@me.naeem88",
};

// Social links shown beside the hero button. TODO: replace the Upwork link with your own profile URL.
export const socials = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadnaeem88/" },
  { key: "upwork", label: "Upwork", href: "https://www.upwork.com/" },
  { key: "medium", label: "Medium", href: "https://medium.com/@me.naeem88" },
] as const;

// "Consulting" is not offered (open to full-time and long-term contract roles), so it is not in the nav.
export const navLinks = [
  { label: "Work", href: "/#chapters" },
  { label: "About", href: "/about/" },
  { label: "Writing", href: "/writing/" },
  { label: "Resume", href: "/resume/" },
];

// DRAFT claim derived from the positioning ("hand developers a working system"); confirm or reword.
export const hero = {
  line1: "Design with AI.",
  line2: "Ship in days.",
  accent: "AI.",
  sub: "I turn hard ideas into simple apps with AI.\n10+ years, 50+ brands, 3x more conversions.",
  cta: "Get in touch",
};

// Brand logos shown on the hero hover cards. Files live in public/images/brands/ (269 x 200, about 4:3).
export const brands = [
  { name: "QuodArca", src: "/images/brands/quodarca.png" },
  { name: "SRED.io", src: "/images/brands/sredio.png" },
  { name: "Applied Electronics", src: "/images/brands/applied-electronics.png" },
  { name: "Peers", src: "/images/brands/peers.png" },
  { name: "Keysborough Veterinary Practice", src: "/images/brands/keysborough-ver-prac.png" },
  { name: "Specialist Clinic Pharmacy", src: "/images/brands/specialist-clicnic-phramacy.png" },
  { name: "Wonder Pies", src: "/images/brands/wonder-pies.png" },
  { name: "Cupffee", src: "/images/brands/cupffee.png" },
  { name: "Cytosite Bio", src: "/images/brands/cytosite-bio.png" },
  { name: "Telco ICT", src: "/images/brands/telco-ict.png" },
];

export const stats: { value: number; prefix?: string; suffix: string; label: string }[] = [
  // Figures are taken from the resume (muhammad-naeem-resume.pdf).
  { value: 10, suffix: "+", label: "Years of product design" },
  { value: 500, suffix: "+", label: "Screens across six product lines at EISST" },
  { value: 50, suffix: "+", label: "Australian brands directed at MLK Group" },
  { value: 3, suffix: "x", label: "Conversion lift for flagship e-commerce clients" },
];

export const chapters = [
  {
    kind: "ad",
    name: "SRED.io",
    role: "Product Designer & Project Manager, <em>2026 to Present</em>",
    sub: "Introduced the platform's first design system and redesigned its core workflows.",
    stats: [
      { v: "70%", l: "Less scroll, Staff & Teams" },
      { v: "3", l: "Workflows redesigned" },
    ],
    href: site.behance,
    tag: "kinetic ad",
  },
  {
    kind: "film",
    name: "QuodArca",
    role: "Senior Product Designer, EISST International, <em>2023 to 2025</em>",
    sub: "Led UX/UI across six high-security, privacy-first product lines, with a multi-platform design system and full WCAG 2.1 AA compliance.",
    stats: [
      { v: "500+", l: "Screens" },
      { v: "6", l: "Product lines" },
    ],
    href: site.behance,
    tag: "film",
  },
  {
    kind: "still",
    name: "MLK Group",
    role: "Senior UX/UI Designer, <em>2021 to 2023</em>",
    sub: "Directed digital product design for 50+ Australian brands across fintech and e-commerce.",
    stats: [
      { v: "3x", l: "Conversion rate" },
      { v: "2.5x", l: "Online orders" },
    ],
    href: site.behance,
    tag: "still",
  },
  {
    kind: "still",
    name: "Bionorica",
    role: "Senior UX/UI Designer, April & June Digital, <em>2019 to 2021</em>",
    sub: "A modular, component-based design system for a pharmaceutical brand, built to scale across web and mobile.",
    stats: [{ v: "Design system", l: "Web and mobile", word: true }],
    href: site.behance,
    tag: "still",
  },
];

// Kinetic ad beats for the SRED.io plate: background colour, dark text, line and optional counter.
export const adBeats = [
  { bg: "#ffffff", dark: false, dur: 2400, tag: "SRED.io" },
  { bg: "#02c3a3", dark: false, dur: 2900, line: "A tax-credit platform with no design system" },
  { bg: "#0b0b0a", dark: true, dur: 2700, line: "Hidden filters. <em>Long</em> screens." },
  { bg: "#ffffff", dark: false, dur: 3600, giant: 70, suffix: "%", tag: "Less vertical scroll" },
  { bg: "#02c3a3", dark: false, dur: 3200, line: "The first design system, built on Flowbite" },
  { bg: "#ff7b66", dark: false, dur: 3400, giant: 3, tag: "Core workflows redesigned" },
  { bg: "#1c9ce5", dark: false, dur: 5400, line: "Staff & Teams, Timesheets, File Vaults" },
  { bg: "#02c3a3", dark: false, dur: 2900, line: "Figma to code through MCP" },
  { bg: "#ffffff", dark: false, dur: 3600, line: "Shipped to <em>clients</em>" },
  { bg: "#ffffff", dark: false, dur: 2600, tag: "SRED.io" },
];

export const breakerWords = ["design systems", "SaaS products", "AI-augmented workflows", "accessible interfaces", "e-commerce that converts"];

// Testimonials and Upwork review screenshots are hidden until real, approved ones are supplied (People section is not rendered).
export const quotes: { by: string; role: string; text: string; variant: string }[] = [];
export const receipts: number[] = [];

export const essays = [
  {
    slug: "figma-plugin-ai-prompts",
    meta: "Medium · Jul 7",
    title: "I Built a Figma Plugin Using AI Prompts and It Actually Works",
    href: "https://medium.com/@me.naeem88/i-built-a-figma-plugin-using-ai-prompts-and-it-actually-works-b6ba12a15e1a",
  },
];

export const doors = [
  { kicker: "For hiring managers", title: "Let's <em>talk</em>", line: "Open to full-time and long-term contract roles, remote or with relocation.", href: "/resume/", cta: "See resume" },
  { kicker: "For everyone else", title: "See the <em>work</em>", line: "Case studies and projects live on Behance.", href: site.behance, cta: "Open Behance" },
];

// Skills circle (below the hero): generic placeholder labels; replace with your own words.
export const skillChips: { label: string; tone: "brand" | "white" }[] = [
  { label: "Design Systems", tone: "brand" },
  { label: "Prototyping", tone: "brand" },
  { label: "User Research", tone: "white" },
  { label: "Accessibility", tone: "white" },
  { label: "Product Strategy", tone: "white" },
  { label: "Interaction Design", tone: "brand" },
  { label: "Usability Testing", tone: "brand" },
  { label: "Wireframing", tone: "white" },
  { label: "Design Tokens", tone: "white" },
  { label: "Handoff", tone: "brand" },
  { label: "Quality", tone: "brand" },
  { label: "Claude Code", tone: "brand" },
  { label: "Cursor", tone: "white" },
  { label: "Vibe Coder", tone: "brand" },
  { label: "First AI Designer", tone: "white" },
];
