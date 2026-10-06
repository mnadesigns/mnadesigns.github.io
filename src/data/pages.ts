// About and Resume are written from the resume (muhammad-naeem-resume.pdf) plus facts confirmed in the LinkedIn project chat.
export const aboutPage = {
  kicker: "About",
  title: "Hi, I'm <em>Muhammad</em>",
  lead: "Senior Product Designer and UX Strategist with 10+ years of end-to-end product design across fintech, healthcare and enterprise SaaS, with clients in the US, Canada, Australia and Europe.",
  story: [
    "I translate ambiguous business problems into scalable, system-oriented user experiences that drive measurable outcomes.",
    "I do my best work where one designer carries a product end to end: framing the problem, mapping the flows, designing the interface, building the system behind it, and staying with the developers until it ships.",
    "I'm based in Lahore, Pakistan, and work remotely with teams around the world. I'm open to full-time and long-term contract roles, remote or with relocation.",
  ],
  lens: [
    { n: "01", t: "Design systems", d: "Multi-platform design systems, design tokens and component libraries, with a handoff strategy that removes cross-platform inconsistencies." },
    { n: "02", t: "Product UX", d: "User research, journey mapping, information architecture and usability testing, turned into flows people can follow." },
    { n: "03", t: "AI-augmented design", d: "AI-augmented workflows and prompt engineering for design, using Claude, Gemini and Figma AI." },
    { n: "04", t: "Accessibility first", d: "Accessibility-first, data-informed work, including a full WCAG 2.1 AA upgrade of icons, colour and type at EISST." },
  ],
  how: [
    { n: "500+", t: "Screens", d: "Across six high-security product lines at EISST, on mobile, web and desktop." },
    { n: "50+", t: "Brands", d: "Australian fintech and e-commerce brands directed at MLK Group." },
    { n: "3x", t: "Conversion", d: "Lift for flagship e-commerce clients, with online orders up 2.5x." },
    { n: "50%", t: "Fewer revisions", d: "Design revision cycles cut by introducing a shared design system." },
  ],
};

// Education is intentionally omitted until supplied.
export const resumePage = {
  name: "Muhammad Naeem",
  title: "Senior Product Designer · UX Strategist · AI-Augmented Design",
  contact: [
    { label: "Lahore, Pakistan" },
    { label: "me.naeem88@gmail.com", href: "mailto:me.naeem88@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadnaeem88/" },
    { label: "Portfolio", href: "https://www.behance.net/muhammadnaeem" },
  ],
  summary:
    "Senior Product Designer and UX Strategist with 10+ years of experience delivering end-to-end product design across fintech, healthcare and enterprise SaaS, with clients across the US, Canada, Australia and Europe. Expert in translating ambiguous business problems into scalable, system-oriented user experiences that drive measurable outcomes. Experienced in AI-augmented design workflows and committed to accessibility-first, data-informed design.",
  experience: [
    {
      company: "SRED.io",
      role: "Product Designer & Project Manager",
      meta: "Aug 2026 – Present · Canada, Remote",
      desc: "",
      bullets: [
        "Introduced the product's first design system, built on Flowbite, and redesigned core workflows including Staff & Teams, Timesheets and File Vaults.",
        "Connected the Figma design system to Claude Code through MCP to speed up front-end build.",
      ],
    },
    {
      company: "EISST International Ltd",
      role: "Senior Product Designer",
      meta: "Oct 2023 – Dec 2025 · Remote",
      desc: "",
      bullets: [
        "Led end-to-end UX/UI design across 6 high-security, privacy-first product lines, delivering 500+ screens across mobile, web and desktop under strict compliance constraints.",
        "Rebuilt core application, authenticator and setup flows, resolving critical onboarding drop-off across 3 interconnected product surfaces.",
        "Architected a scalable, multi-platform design system with standardized components, design tokens and responsive patterns, reducing design-to-dev handoff time.",
        "Upgraded the icon library, colour palette and typography to achieve full WCAG 2.1 AA compliance.",
        "Streamlined design documentation and handoff, reducing revision cycles and accelerating sprint velocity.",
        "Conducted competitor benchmarking and moderated usability testing to validate design decisions with real users.",
      ],
    },
    {
      company: "MLK Group Pvt Ltd",
      role: "Senior UX/UI Designer",
      meta: "Jun 2021 – Sep 2023 · Remote",
      desc: "",
      bullets: [
        "Directed digital product design strategy for 50+ Australian brands across fintech and e-commerce, owning design quality from discovery through launch.",
        "Reduced design revision cycles by 50% by introducing reusable component frameworks and a shared design system.",
        "Boosted conversion rates by 3x and increased online orders by 2.5x for flagship e-commerce clients through data-informed UX improvements.",
        "Designed pitch decks and investor-facing assets that supported business development and repeat contract wins.",
        "Established design roadmaps aligned with business OKRs, implemented Lean UX and Design Thinking, and mentored junior designers.",
      ],
    },
    {
      company: "April & June Digital (Pvt) Ltd",
      role: "Senior UX/UI Designer",
      meta: "Dec 2019 – May 2021 · Lahore, Pakistan",
      desc: "",
      bullets: [
        "Engineered a modular, component-based design system for Bionorica (pharmaceutical brand), ensuring scalability and visual consistency across web and mobile surfaces.",
        "Designed high-fidelity interfaces and interaction models for Web3 and crypto platforms, navigating novel UX paradigms.",
        "Translated complex, multi-stakeholder requirements into clear user journeys, personas and measurable design outcomes.",
        "Led design strategy for eCommerce, Web3 and pharma platforms, reporting directly to the CEO.",
      ],
    },
    {
      company: "Quantum CPH A/S",
      role: "UX/UI Designer",
      meta: "Aug 2017 – Oct 2019 · Lahore, Pakistan",
      desc: "",
      bullets: [
        "Architected the end-to-end web experience for Viavana, a hotel and ticket management booking engine, from information architecture through high-fidelity prototyping and developer handoff.",
        "Developed high-fidelity interactive prototypes for a data management mobile app, surfacing usability issues before development investment.",
        "Built scalable design systems and ran systematic heuristic UX audits to enforce interface standards.",
      ],
    },
    {
      company: "Earlier experience",
      role: "Brainlogix Pvt Ltd, Lahore: Sr. Graphic Designer / Web Designer (Jun 2014 – Jul 2017). iApp11 Technologies, Lahore: Graphic Designer (Jan 2014 – Jun 2014).",
      meta: "",
      desc: "",
      bullets: [],
    },
  ],
  expertise: [
    { cat: "UX practice", items: "User research, journey mapping, usability testing, information architecture, service blueprinting, A/B testing, heuristic evaluation, accessibility (WCAG 2.1 AA/AAA)" },
    { cat: "Design systems", items: "Multi-platform design systems, design tokens, component libraries, responsive and adaptive layouts, dev handoff strategy" },
    { cat: "Strategy & leadership", items: "UX strategy, product roadmapping, design thinking, pre-sales engagement, cross-functional collaboration, stakeholder management, Agile/Scrum" },
    { cat: "AI & innovation", items: "AI-augmented workflows, prompt engineering for design, ethical AI governance. Gemini, Claude, UX Pilot, Figma AI" },
    { cat: "Design tools", items: "Figma, FigJam, Adobe XD, Photoshop, Illustrator, Sketch, InVision, Zeplin" },
    { cat: "Collaboration tools", items: "Jira, Confluence, Notion, Miro, Slack, Trello" },
  ],
};


// Stories are written only from facts in the resume and the LinkedIn project chat; no invented chapters or metrics.
export const stories = [
  {
    slug: "sred-io",
    name: "SRED.io",
    co: "SRED.io, Canada",
    role: "Product Designer & Project Manager",
    period: "Aug 2026 to Present",
    line: "Product design and delivery for a Canadian SaaS platform that manages SR&ED tax-credit claims.",
    eyebrow: "SRED.io · 2026",
    cap: "Canadian tax-credit SaaS",
    stats: [
      { v: "70%", l: "Less vertical scroll on Staff & Teams" },
      { v: "70%", l: "Smaller sync status bar" },
      { v: "3", l: "Core workflows redesigned" },
    ],
    context: "A SaaS platform for SR&ED tax-credit claims with no design system, hidden filters and long, hard-to-scan screens. About 80% of the role is hands-on design and 20% managing front-end delivery.",
    chapters: [
      { t: "A first design system", ps: ["Introduced the product's first design system, built on Flowbite, to resolve consistency, accessibility and usability issues across the platform."] },
      { t: "Staff & Teams", ps: ["Surfaced search and filters, added a member list and split long pages into tabs, cutting vertical scroll by 70%. The redesign shipped to clients."] },
      { t: "Timesheets", ps: ["Reworked the screen around a clear action hierarchy, placing each action beside the content it affects, and reduced the sync status bar's footprint by 70%."] },
      { t: "File Vaults", ps: ["Simplified the screen so the full view fits the viewport, with a persistent fiscal-year indicator."] },
      { t: "Testing and delivery", ps: ["Tested two design concepts for Timesheets and File Vaults with four internal and client users, and took the stronger one forward. Designed and shipped an in-product feedback widget, and connected the Figma design system and Flowbite to Claude Code through MCP to speed up front-end build."] },
    ],
  },
  {
    slug: "quodarca",
    name: "QuodArca",
    co: "EISST International Ltd",
    role: "Senior Product Designer",
    period: "Oct 2023 to Dec 2025",
    line: "End-to-end UX/UI across six high-security, privacy-first product lines.",
    eyebrow: "EISST · 2023 to 2025",
    cap: "Privacy-first product suite",
    stats: [
      { v: "500+", l: "Screens" },
      { v: "6", l: "Product lines" },
      { v: "AA", l: "WCAG 2.1 compliance" },
    ],
    context: "A suite of high-security, privacy-first products across mobile, web and desktop, designed under strict compliance constraints.",
    chapters: [
      { t: "Six product lines", ps: ["Led end-to-end UX/UI design across six high-security, privacy-first product lines, delivering 500+ screens across mobile, web and desktop while holding design quality under compliance constraints."] },
      { t: "Core flows", ps: ["Rebuilt the core application, authenticator and setup flows, resolving critical onboarding drop-off and reducing friction across three interconnected product surfaces."] },
      { t: "One design system", ps: ["Architected a scalable, multi-platform design system with standardized components, design tokens and responsive patterns, reducing design-to-dev handoff time and cross-platform inconsistencies."] },
      { t: "Accessibility", ps: ["Upgraded the icon library, colour palette and typography to reach full WCAG 2.1 AA compliance, widening access and meeting enterprise client requirements."] },
      { t: "Handoff and research", ps: ["Streamlined documentation and handoff between design, engineering and QA, which reduced revision cycles and sped up sprints. Ran competitor benchmarking and moderated usability testing to validate decisions with real users."] },
    ],
  },
  {
    slug: "mlk-group",
    name: "MLK Group",
    co: "MLK Group Pvt Ltd",
    role: "Senior UX/UI Designer",
    period: "Jun 2021 to Sep 2023",
    line: "Digital product design strategy for 50+ Australian brands across fintech and e-commerce.",
    eyebrow: "MLK Group · 2021 to 2023",
    cap: "Australian fintech and e-commerce",
    stats: [
      { v: "50+", l: "Australian brands" },
      { v: "3x", l: "Conversion rate" },
      { v: "2.5x", l: "Online orders" },
      { v: "50%", l: "Fewer revision cycles" },
    ],
    context: "Owned design quality from discovery through launch for a portfolio of fintech and e-commerce brands.",
    chapters: [
      { t: "A shared system", ps: ["Reduced design revision cycles by 50% by introducing reusable component frameworks and a shared design system, so the team could scale output without losing quality."] },
      { t: "Conversion work", ps: ["Boosted conversion rates by 3x and increased online orders by 2.5x for flagship e-commerce clients through data-informed UX improvements and conversion-rate optimization."] },
      { t: "Business development", ps: ["Designed pitch decks and investor-facing assets that supported business development and contributed to repeat contract wins."] },
      { t: "Process and mentoring", ps: ["Established design roadmaps aligned with business OKRs, introduced Lean UX and Design Thinking, and mentored junior designers on UX method, Figma practice and client communication."] },
    ],
  },
  {
    slug: "bionorica",
    name: "Bionorica",
    co: "April & June Digital (Pvt) Ltd",
    role: "Senior UX/UI Designer",
    period: "Dec 2019 to May 2021",
    line: "A modular design system, CMS interface and public front end for a pharmaceutical brand.",
    eyebrow: "April & June Digital · 2019 to 2021",
    cap: "Pharmaceutical brand",
    stats: [
      { v: "Live", l: "bionorica.com" },
      { v: "Web + mobile", l: "Design system surfaces" },
    ],
    context: "Design work for Bionorica, a global pharmaceutical brand, delivered through April & June Digital while reporting directly to the CEO.",
    chapters: [
      { t: "Design system", ps: ["Engineered a modular, component-based design system for Bionorica, built for cross-platform scalability and visual consistency across web and mobile surfaces."] },
      { t: "CMS and public site", ps: ["Created the UI and prototypes for the internal content management system and designed the public website's front end, which is live at bionorica.com."] },
      { t: "Strategy", ps: ["Led design strategy across eCommerce, Web3 and pharma platforms, aligning visual systems with business KPIs and product roadmaps, and turned multi-stakeholder requirements into clear user journeys and personas."] },
    ],
  },
];

export const storiesIndex = {
  lede: "Four pieces of work, told with what I did and what changed.",
  stats: [
    { v: "10+", l: "Years" },
    { v: "500+", l: "Screens at EISST" },
    { v: "50+", l: "Brands at MLK Group" },
    { v: "3x", l: "Conversion lift" },
  ],
};

// Writing: the only published article found on Medium (@me.naeem88).
export const essaysIndex = [
  {
    title: "I Built a Figma Plugin Using AI Prompts and It Actually Works",
    meta: "Medium",
    date: "Jul 7",
    excerpt: "What started as a quick experiment in Claude Code turned into a working Design Token Builder plugin, and how it happened step by step.",
    href: "https://medium.com/@me.naeem88/i-built-a-figma-plugin-using-ai-prompts-and-it-actually-works-b6ba12a15e1a",
  },
];
