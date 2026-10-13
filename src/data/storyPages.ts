// The three full stories behind /stories/. Everything here comes from the work itself (the work section's slides, copy and figures) and nothing is invented:
// where the work gives a figure it is used, and where it does not, the story says what was done instead.
export type StoryChapter = { n: string; d: string; t: string; ps: string[]; pull?: string; image?: string };
export type StoryPage = {
  poster: string; // the big picture under the hero
  secondary: string;
  desc: string;
  stakesBig: { v: string; l: string };
  stakesSupporting: { v: string; l: string }[];
  stakesHeading: string;
  stakesParas: string[];
  arc: string[];
  storyHeading: string;
  storySub: string;
  chapters: StoryChapter[];
  shots: string[]; // three screens shown side by side
  serviceEyebrow: string;
  serviceHeading: string;
  serviceLede: string;
  cases: { t: string; p: string }[];
  nextKicker: string;
};

export const storyPages: Record<string, StoryPage> = {
  "sred-io": {
    poster: "/images/work/sredio/products-collage.webp",
    secondary: "The platform's first design system, then four products built on it",
    desc: "As Product Designer and Project Manager I introduced SRED.io's first design system, then designed its Staff & Teams, File Vaults, Timesheets and Feedback Widget products.",
    stakesBig: { v: "4", l: "Products designed" },
    stakesSupporting: [
      { v: "12", l: "Flows" },
      { v: "50+", l: "Screens" },
      { v: "70%", l: "Shorter pages" },
      { v: "1", l: "First design system" },
    ],
    stakesHeading: "What was <span class=\"accent\">at stake</span>",
    stakesParas: [
      "SRED.io had been built fast and never designed. Pages scrolled on and on, and every screen was a one-off.",
      "The platform needed a foundation before it needed more screens: one system that every product could share.",
    ],
    arc: ["Problem", "Foundation", "Products", "Design to code"],
    storyHeading: "How it came together",
    storySub: "From a platform that was built fast to one that is designed, shipped with AI in the loop.",
    chapters: [
      { n: "01", d: "The problem", t: "Built fast, never designed", ps: ["The first pass at the platform put function first. Screens grew long and pages made people scroll, with no shared rules to hold them together."], pull: "Too much scrolling." },
      { n: "02", d: "The foundation", t: "The first design system, built on Flowbite", ps: ["I introduced the platform's first design system on top of Flowbite, with components that every product reuses. The first win was visible at once: pages became 70% shorter and stayed on the same page."], image: "/images/work/sredio/design-system.webp" },
      { n: "03", d: "The products", t: "Four products on one system", ps: ["With the system in place I designed Staff & Teams, File Vaults, Timesheets and the Feedback Widget: four products, twelve flows and more than fifty screens, all sharing the same components."], image: "/images/work/sredio/file-vaults.webp" },
      { n: "04", d: "Design to code", t: "Figma to code through MCP", ps: ["Designs went from Figma to code through the Figma MCP, with Claude and Cursor in the loop, so what was designed is what shipped."] },
    ],
    shots: ["/images/work/sredio/file-vaults.webp", "/images/work/sredio/design-system.webp", "/images/work/sredio/products-collage.webp"],
    serviceEyebrow: "What it means for you",
    serviceHeading: "The work, applied",
    serviceLede: "The same approach, applied to your product: a real system first, then the products, then the code.",
    cases: [
      { t: "Two-way design system build", p: "One design system built in Figma and code, and kept in sync both ways." },
      { t: "Production-ready UI code", p: "Your designs delivered as UI code in your stack, so developers wire up logic instead of rebuilding screens." },
    ],
    nextKicker: "Next story",
  },
  quodarca: {
    poster: "/images/work/quodarca/poster.webp",
    secondary: "Six privacy-first product lines on one design system",
    desc: "As Senior Product Designer at EISST International I led UX and UI across six high-security, privacy-first product lines, with a multi-platform design system and full WCAG 2.1 AA compliance.",
    stakesBig: { v: "500+", l: "Screens designed" },
    stakesSupporting: [
      { v: "6", l: "Product lines" },
      { v: "100%", l: "Custom design system, from scratch" },
      { v: "WCAG 2.1 AA", l: "Accessibility" },
      { v: "3", l: "Platforms: desktop, tablet, mobile" },
    ],
    stakesHeading: "What was <span class=\"accent\">at stake</span>",
    stakesParas: [
      "QuodArca had big ambitions but a fragmented UX. Setup varied between desktop and mobile, and the same action looked and felt different across Mac, iOS and Android.",
      "Developer handoffs lacked structure, buttons lacked focus states, and the type and contrast did not meet accessibility standards.",
    ],
    arc: ["Define", "Design", "Deliver"],
    storyHeading: "How it came together",
    storySub: "A practical, user-centred framework that turned a fragmented product into a scalable, consistent and accessible experience.",
    chapters: [
      { n: "01", d: "Define", t: "Understanding the problem", ps: ["The work started with a UX audit and the key challenges: disjointed onboarding flows, missing documentation, an unaligned cross-platform experience, accessibility gaps and an incomplete design system."], image: "/images/work/quodarca/approach/audit.webp" },
      { n: "02", d: "Design", t: "Thinking across devices", ps: ["Generating, iterating and validating design solutions across desktop, tablet and mobile, so one product behaves like one product wherever it runs."], image: "/images/work/quodarca/approach/devices-tight.webp" },
      { n: "03", d: "The system", t: "A custom design system, from scratch", ps: ["A single design system covering navigation, buttons, calendars, notifications, forms, media controls and menus, built so every product line shares it."], image: "/images/work/quodarca/system/board.webp" },
      { n: "04", d: "Deliver", t: "Product features and handoff", ps: ["Five product views were finalised and handed off: Arca organises data with contextual links, Quod gives modular blocks for structured data, Files supports multimedia and over 30 other file types, Users covers roles and access control, and Messages gives end-to-end encrypted messaging."] },
    ],
    shots: ["/images/work/quodarca/approach/audit.webp", "/images/work/quodarca/system/board.webp", "/images/work/quodarca/bg-devices.webp"],
    serviceEyebrow: "What it means for you",
    serviceHeading: "The work, applied",
    serviceLede: "The same approach, applied to your product: audit, systematise, then ship it consistently on every platform.",
    cases: [
      { t: "AI-driven UX foundations", p: "Your user interviews turned into a validated product foundation before any UI is designed." },
      { t: "Two-way design system build", p: "One design system for your SaaS, mobile app and marketing site, built in Figma and code, and kept in sync both ways." },
    ],
    nextKicker: "Next story",
  },
  "mlk-group": {
    poster: "/images/work/spoonful/collage.webp",
    secondary: "Digital product design for 50+ Australian brands",
    desc: "As Senior UX/UI Designer at MLK Group I directed digital product design across fintech and e-commerce, from native apps to websites, covering more than 25 industries.",
    stakesBig: { v: "50+", l: "Australian brands" },
    stakesSupporting: [
      { v: "25+", l: "Industries" },
      { v: "3x", l: "Conversion rate" },
      { v: "2.5x", l: "Online orders" },
      { v: "3", l: "Apps, platforms and websites" },
    ],
    stakesHeading: "What was <span class=\"accent\">at stake</span>",
    stakesParas: [
      "Every client was a different industry with a different audience, and each needed a product that felt designed for it, not adapted from a template.",
      "The aim was the same each time: a product that people use, and results that show on the business: higher conversion and more online orders.",
    ],
    arc: ["Apps", "Platforms", "Websites", "Results"],
    storyHeading: "From fintech to fashion",
    storySub: "One team, every solution: 25+ industries served.",
    chapters: [
      { n: "01", d: "Apps", t: "Native mobile apps", ps: ["Zero Gaspi, an anti-food-waste mobile marketplace on iOS and Android; Vyno, a carpooling app; and Spoonful OS, a family health app. Each one a product designed end to end."], image: "/images/work/spoonful/collage.webp" },
      { n: "02", d: "Platforms", t: "A learning platform on web and phone", ps: ["Peers, a skills platform with assessment results and team views, designed to work on desktop and on a phone."], image: "/images/work/peers/frame.webp" },
      { n: "03", d: "Websites", t: "Websites that sell", ps: ["Websites and e-commerce for Applied Electronics, Keysborough Veterinary Practice, Wonder Pies, Telco ICT, Specialist Clinic Pharmacy and Zigbis, designed to look right on every screen."], image: "/images/work/wonderpies/devices.webp" },
      { n: "04", d: "Results", t: "What it did for the business", ps: ["For flagship e-commerce clients the work lifted conversion rates three times over and grew online orders two and a half times."], pull: "25+ industries. One team. Every solution." },
    ],
    shots: ["/images/work/telcoict/devices.webp", "/images/work/wonderpies/devices.webp", "/images/work/peers/frame.webp"],
    serviceEyebrow: "What it means for you",
    serviceHeading: "The work, applied",
    serviceLede: "The same approach, applied to your site or app: a proven reference, tailored to your brand, shipped as clean code.",
    cases: [
      { t: "Reference-driven redesign", p: "A proven reference layout, tailored to your brand and goals, handed over as clean code." },
      { t: "Benchmark-led MVP sprint", p: "A clickable front end in 2 to 3 weeks, benchmarked and built on a real design system." },
    ],
    nextKicker: "Next story",
  },
};
