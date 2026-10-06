// About and Resume are written from the resume (muhammad-naeem-resume.pdf) plus facts confirmed in the LinkedIn project chat.
// Other sub-pages below (consulting, stories, writing) are still placeholder content.
const lorem = "Placeholder paragraph. Replace this with your own writing. It is here so the layout, line length and rhythm match the design exactly.";

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

export const consultingPage = {
  eyebrow: "Consulting · Currently available",
  poster: { line1: "Your headline", op: "×", line2: "goes here" },
  desc: "One sentence describing who you help and how.",
  descEm: "Service one. Service two. Service three. Service four.",
  ticker: ["Service One", "Service Two", "Service Three", "Service Four", "Service Five", "Service Six"],
  problemsLabel: "If you are nodding at any of these",
  problems: [
    "A common problem your clients have.",
    "Another problem that slows their team down.",
    "A third problem that keeps coming back.",
    "A fourth problem nobody has time to fix.",
  ],
  closer: "I have solved each of these.",
  closerSub: "Yours is next.",
  servicesKicker: "The services",
  servicesHeading: "Four things I do.",
  services: [
    { n: "01", t: "Service One", d: "A one or two sentence description of what this service delivers and why it matters to the client." },
    { n: "02", t: "Service Two", d: "A one or two sentence description of what this service delivers and why it matters." },
    { n: "03", t: "Service Three", d: "A one or two sentence description of what this service delivers and why it matters." },
    { n: "04", t: "Service Four", d: "A one or two sentence description of what this service delivers and why it matters." },
  ],
  processKicker: "The engagement",
  processHeading: "How it actually runs.",
  process: [
    { n: "01", t: "Discovery", d: "A short line about how the first phase works." },
    { n: "02", t: "Shape", d: "A short line about how the scope gets locked." },
    { n: "03", t: "Build", d: "A short line about how the work gets done." },
    { n: "04", t: "Scale", d: "A short line about optional ongoing support." },
  ],
  testiKicker: "What they said",
  testiHeading: "Trusted by people.",
  testimonials: [
    { by: "Person One", role: "Title, Company", text: "A testimonial about the consulting work, specific and short, in the client's own words." },
    { by: "Person Two", role: "Title, Company", text: "Another testimonial about the engagement and its result." },
    { by: "Person Three", role: "Title, Company", text: "A third, shorter testimonial." },
  ],
  engageKicker: "Engagement shapes",
  engageHeading: "Four ways to work together.",
  engage: [
    { tag: "For specific problems", t: "Project", fit: "A scoped engagement with a fixed outcome.", range: "4 – 12 weeks", fill: 60, price: "$00k", note: "Fixed scope", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project" },
    { tag: "For ongoing support", t: "Retainer", fit: "A monthly engagement for steady access.", range: "3+ months", fill: 85, price: "$0k", note: "Per month", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project", featured: true, badge: "Most popular" },
    { tag: "For teams", t: "Workshop", fit: "A focused session to upskill a team.", range: "1 – 2 days", fill: 20, price: "$0k", note: "Per session", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project" },
    { tag: "For leaders", t: "Advisory", fit: "Occasional strategic guidance on call.", range: "Flexible", fill: 40, price: "$000", note: "Per hour", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project" },
  ],
  cta: { eyebrow: "Currently available for new clients", l1: "Let's build", acc: "something", l3: "together.", sub: "A short line inviting people to get in touch.", foot: "Based in City · Working with teams worldwide" },
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

export const storiesIndex = {
  lede: "A short line explaining that each project below is told in full: the stakes, the decisions and the result.",
  stats: [
    { v: "30+", l: "Products shipped" },
    { v: "8", l: "Years" },
    { v: "3", l: "Companies" },
    { v: "6M+", l: "Users" },
  ],
  features: [
    { slug: "project-one", eyebrow: "Company One · 2022", name: "Project One", sub: "A one-line summary of this project and its result.", metrics: [{ v: "4M+", l: "Users" }, { v: "700K", l: "Waitlist" }], cap: "Company One" },
    { slug: "project-two", eyebrow: "Company Two · 2021", name: "Project Two", sub: "A one-line summary of this project and its result.", metrics: [{ v: "$10M", l: "Raised" }, { v: "0 to 1", l: "Product" }], cap: "Company Two" },
    { slug: "project-three", eyebrow: "Company Three · 2019", name: "Project Three", sub: "A one-line summary of this project and its result.", metrics: [{ v: "Fortune 500", l: "Clients" }], cap: "Company Three" },
  ],
  moreSub: "Smaller engagements and earlier work.",
  more: [
    { slug: "project-one", name: "Project Four", v: "120K", l: "Monthly users", line: "A one-line summary of this project." },
    { slug: "project-two", name: "Project Five", v: "35%", l: "Conversion lift", line: "A one-line summary of this project." },
    { slug: "project-three", name: "Project Six", v: "9", l: "Markets", line: "A one-line summary of this project." },
  ],
  footer: "More <em>coming</em>.",
};

export const pods = [
  { channel: "Podcast Name", title: "Episode title goes here", date: "Month 2026" },
  { channel: "Talk Name", title: "Talk title goes here", date: "Month 2025" },
];

export const stories = [
  { slug: "project-one", name: "Project One", co: "Company One", line: "A one-line summary of this project and its result.", feature: true },
  { slug: "project-two", name: "Project Two", co: "Company Two", line: "A one-line summary of this project and its result.", feature: true },
  { slug: "project-three", name: "Project Three", co: "Company Three", line: "A one-line summary of this project and its result.", feature: true },
];

export const storyPage = {
  secondary: "A short secondary line",
  desc: "Two sentences describing the project, your role and the outcome.",
  stakesBig: { v: "4M+", l: "Users" },
  stakesSupporting: [
    { v: "$10M", l: "Raised" },
    { v: "18", l: "Months" },
    { v: "12", l: "Team size" },
    { v: "3", l: "Markets" },
  ],
  stakesHeading: "What was <span class=\"accent\">at stake</span>",
  stakesParas: [lorem, lorem],
  arc: ["Brief", "Build", "Launch", "Scale"],
  storyHeading: "How it came together",
  storySub: "A short italic line introducing the chapters below.",
  chapters: [
    { n: "01", d: "Month Year", t: "The brief", ps: [lorem, lorem], pull: "A short pull quote that captures the turning point." },
    { n: "02", d: "Month Year", t: "The approach", ps: [lorem, lorem] },
    { n: "03", d: "Month Year", t: "The build", ps: [lorem, lorem], image: true },
    { n: "04", d: "Month Year", t: "The result", ps: [lorem] },
  ],
  serviceEyebrow: "What it means for you",
  serviceHeading: "The work, applied",
  serviceLede: "One or two sentences connecting this project to the kind of work you do for clients.",
  cases: [
    { t: "Case one", p: lorem },
    { t: "Case two", p: lorem },
  ],
  nextKicker: "Next story",
};

export const essaysIndex = [
  { slug: "essay-one", title: "A placeholder essay title about design systems", meta: "Essay · 6 min", date: "Jan 2026" },
  { slug: "essay-two", title: "A placeholder essay title about AI and craft", meta: "Essay · 8 min", date: "Feb 2026" },
  { slug: "essay-three", title: "A placeholder essay title about team ratios", meta: "Essay · 5 min", date: "Mar 2026" },
  { slug: "essay-four", title: "A placeholder essay title about watching users", meta: "Essay · 7 min", date: "Apr 2026" },
];

export const articleBody = [
  { p: lorem }, { p: lorem }, { h: "A section heading" }, { p: lorem }, { p: lorem }, { h: "Another section heading" }, { p: lorem },
];

