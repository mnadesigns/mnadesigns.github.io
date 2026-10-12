import type { FilmItem } from "@/types/film";
import type { ToolIconName } from "@/components/atoms/ToolIcons";
// Home page content. Sourced from the "Linkdein Profile Optimization" Claude project; only claims confirmed there are used.
export const site = {
  name: "Muhammad Naeem",
  role: "AI Product Leader, Lahore, Pakistan",
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
  sub: "I turn hard ideas into simple apps with AI. I have 10+ years of design in SaaS, Fintech, Data, Health and e-commerce. I design the systems, then ship the code.",
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
    sub: "Introduced the platform's first design system, then designed four products: Staff & Teams, File Vaults, Timesheets and the Feedback Widget.",
    stats: [
      { v: "4", l: "Projects" },
      { v: "12", l: "Flows" },
      { v: "50+", l: "Screens" },
    ],
    href: site.behance,
    tag: "",
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
    // Clips, scenes drawn in code and slides play one after another and loop. A clip is preloaded while the item before it shows.
    film: {
      poster: "/images/work/quodarca/poster.webp",
      items: [
        { type: "scene", id: "welcome", dur: 4500 },
        { type: "slide", bg: "#24243b", dark: true, dur: 3000, kicker: "The scope", giant: 6, tag: "Product lines" },
        { type: "scene", id: "process-challenges", dur: 10000 },
        { type: "slide", bg: "#1d1c4e", image: "/images/work/quodarca/bg-devices.webp", dark: true, dur: 3200, kicker: "The work", giant: 500, suffix: "+", tag: "Screens designed" },
        { type: "scene", id: "approach", dur: 9000 },
        { type: "slide", bg: "#302f7f", dark: true, dur: 3200, kicker: "The foundation", giant: 100, suffix: "%", tag: "Custom design system, from scratch" },
        { type: "scene", id: "design-system", dur: 4000 },
        { type: "slide", bg: "#24243b", dark: true, dur: 3000, kicker: "The reach", giant: 3, tag: "Platforms: desktop, tablet, mobile" },
        { type: "scene", id: "product-features", dur: 14500 },
        { type: "slide", bg: "#24243b", dark: true, dur: 3000, kicker: "The standard", line: "WCAG 2.1 AA", tag: "Accessible on every screen" },
        { type: "scene", id: "projects-delivered", dur: 4000 },
      ] as FilmItem[],
    },
    tag: "",
  },
  {
    kind: "film",
    name: "MLK Group",
    role: "Senior UX/UI Designer, <em>2021 to 2023</em>",
    sub: "Directed digital product design for 50+ Australian brands across fintech and e-commerce.",
    stats: [
      { v: "3x", l: "Conversion rate" },
      { v: "2.5x", l: "Online orders" },
    ],
    href: site.behance,
    // The Zero Gaspi scene, the Applied Electronics and Vyno videos, the Keysborough, Spoonful OS and Wonder Pies scenes, then a few plain stat slides, on a loop.
    film: {
      poster: "", // no poster: the film opens on a scene, and a picture of the phone would show before it plays
      items: [
        // apps and products, then a figure
        { type: "scene", id: "zerogaspi", dur: 12500 },
        { type: "clip", src: "/images/work/applied-video/applied-electronics.mp4", bg: "#324560", fit: "cover" },
        { type: "clip", src: "/images/work/vyno/vyno-app.mp4", bg: "#017ac3", fit: "cover" },
        { type: "scene", id: "spoonful", dur: 4000 },
        { type: "scene", id: "peers", dur: 4000 },
        { type: "slide", bg: "#302f7f", dark: true, dur: 3000, kicker: "The reach", giant: 50, suffix: "+", tag: "Australian brands" },
        // more websites, a figure in the middle and one at the end
        { type: "scene", id: "keysborough", dur: 4000 },
        { type: "scene", id: "wonderpies", dur: 4000 },
        { type: "slide", bg: "#ffffff", dark: false, dur: 3000, kicker: "The result", giant: 3, suffix: "x", tag: "Conversion rate" },
        { type: "scene", id: "telcoict", dur: 4000 },
        { type: "scene", id: "pharmacy", dur: 10000 },
        { type: "scene", id: "zigbis", dur: 4000 },
        { type: "slide", bg: "#24243b", dark: true, dur: 3000, kicker: "The growth", line: "2.5x", tag: "Online orders" },
      ] as FilmItem[],
    },
    tag: "",
  },
];

// Kinetic ad beats for the SRED.io plate: background colour, dark text, line and optional counter.
export const adBeats = [
  { bg: "#ffffff", dark: false, dur: 2400, logo: { src: "/images/brands/sredio.png", name: "Sred.io" } },
  { bg: "#1297D9", dark: true, dur: 2900, line: "Built fast. <span style=\"white-space:nowrap\">Never designed.</span>", kicker: "The problem" },
  { bg: "#0b0b0a", dark: true, dur: 2700, line: "Too much scrolling.", kicker: "The pain point" },
  { bg: "#ffffff", dark: false, dur: 3600, giant: 70, suffix: "%", kicker: "The first win", tag: "Shorter. Same page." },
  { bg: "#003A66", dark: true, dur: 3200, line: "The first design system, built on Flowbite", kicker: "The foundation" },
  { bg: "#ffffff", dark: false, dur: 4000, shot: { src: "/images/work/sredio/design-system.webp", alt: "The Sred.io design system: components built on Flowbite", fit: "contain" as const } },
  { bg: "#1297D9", dark: true, dur: 5400, line: "Staff & Teams, File Vaults, Timesheets, Feedback Widget" },
  { bg: "#1E2939", dark: true, dur: 4000, shot: { src: "/images/work/sredio/products-collage.webp", alt: "Screens from the four Sred.io products" } },
  { bg: "#003A66", dark: true, dur: 2900, line: "Figma to code through MCP", kicker: "Design to code, with AI", icons: ["figma", "mcp", "claude", "cursor"] as ToolIconName[] },
  { bg: "#ffffff", dark: false, dur: 3600, line: "Shipped, <em>with AI</em> <span style=\"white-space:nowrap\">in the loop</span>" },
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
export const skillChips: { label: string; tone: "brand" | "white"; icon?: "claude" | "cursor" | "figma" }[] = [
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
  { label: "Claude Code", tone: "brand", icon: "claude" },
  { label: "Cursor", tone: "white", icon: "cursor" },
  { label: "Figma", tone: "white", icon: "figma" },
  { label: "Vibe Coder", tone: "brand" },
  { label: "First AI Designer", tone: "white" },
];
