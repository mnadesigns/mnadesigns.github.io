// Placeholder content for sub-pages. Replace with your own; layout does not depend on exact wording.
const lorem = "Placeholder paragraph. Replace this with your own writing. It is here so the layout, line length and rhythm match the design exactly.";

export const aboutPage = {
  kicker: "About",
  title: "I design the systems, then <em style=\"white-space:nowrap\">ship the code.</em>",
  lead: "I'm Muhammad Naeem, an AI Product Leader based in Lahore, Pakistan, with 10+ years of design across SaaS, Fintech, Data, Health and e-commerce. I turn hard ideas into simple apps with AI.",
  story: [
    "I started as a front-end designer: the person who turns a layout into HTML and CSS and notices where the two disagree. That habit never left. It is why I care about tokens, component states and what a developer actually receives, and it pulled me from single screens into whole products, from a hotel booking engine and a pharma brand to crypto platforms and e-commerce.",
    "Systems are where I do my best work. At MLK Group I led three designers and a shared component library that halved revision cycles across 50+ Australian brands, and for flagship e-commerce clients conversion rose 3x and online orders 2.5x. At EISST I rebuilt onboarding and setup for six high-security, privacy-first products: 500+ screens, a multi-platform design system with tokens, and full WCAG 2.1 AA, so one action finally looked and behaved the same on Mac, iOS and Android.",
    "Today I lead design at SRED.io, a tax-credit platform for Canadian companies. I introduced its first design system on Flowbite, cut core pages by 70% with no loss of content, and worked on more than 17 microservices. I work with a front-end developer, and the designs reach production through Claude Code in Cursor, with Figma and Claude Code connected.",
    "AI sits in the loop, not in charge. Claude Code takes the repetitive build work, in Cursor with Figma connected. Interviews, benchmarks, accessibility and product decisions stay with me, which is how a design system becomes code that developers can wire up instead of rebuild.",
  ],
  lens: [
    { n: "01", t: "Systems before screens", d: "A shared design system comes first, so every product and every screen starts from the same foundation." },
    { n: "02", t: "AI does the heavy lifting", d: "AI handles the repetitive work. Taste, accessibility and product decisions stay human." },
    { n: "03", t: "Design that ships", d: "A design is finished when it is in code, so I hand developers working UI instead of static files." },
  ],
  how: [
    { n: "01", t: "Understand", d: "Interviews, UX audits and benchmarks turn opinions into a validated foundation." },
    { n: "02", t: "Shape", d: "Information architecture, user flows and a design system turn findings into direction." },
    { n: "03", t: "Build", d: "Figma and code stay in sync through Figma MCP and GitHub, so what is designed is what ships." },
    { n: "04", t: "Measure", d: "Accessibility standards, UX laws and results such as conversion and order growth show whether it worked." },
  ],
  personal: [
    "Based in Lahore, Pakistan, and open to full-time and long-term contract roles, remote or with relocation.",
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

export const storiesIndex = {
  kicker: "Selected work",
  lede: "I turn messy products into systems people trust, then ship them: a first design system for a tax-credit platform, privacy-first software for every device, and sites and apps for 50+ Australian brands.",
  stats: [
    { v: "10+", l: "Years in product design" },
    { v: "50+", l: "Australian brands" },
    { v: "25+", l: "Industries" },
    { v: "500+", l: "Screens at EISST" },
  ],
  features: [
    { slug: "sred-io", film: true, eyebrow: "Lead Product Designer", name: "SRED.io", sub: "The platform's first design system, then more than 17 microservices.", metrics: [{ v: "17+", l: "Microservices" }, { v: "100+", l: "Screens designed" }], cap: "Lead Product Designer", logo: "/images/brands/sredio.png" },
    { slug: "quodarca", film: true, eyebrow: "Senior Product Designer", name: "QuodArca", sub: "Six high-security, privacy-first product lines on one multi-platform design system.", metrics: [{ v: "500+", l: "Screens" }, { v: "6", l: "Product lines" }], cap: "EISST International", logo: "/images/brands/quodarca.png" },
    { slug: "mlk-group", eyebrow: "Senior UX/UI Designer", name: "MLK Group", sub: "Digital product design for 50+ Australian brands across fintech and e-commerce.", metrics: [{ v: "25+", l: "Industries" }, { v: "3x", l: "Conversion rate" }, { v: "2.5x", l: "Online orders" }], cap: "Senior UX/UI Designer" },
  ],
  moreSub: "Websites, apps and platforms delivered along the way, from clinics to learning tools.",
  more: [
    { slug: "zero-gaspi", name: "Zero Gaspi", v: "iOS + Android", l: "Anti-food-waste marketplace", line: "Unsold food from local merchants, sold as Surprise Baskets at about 30 to 35% of the original price.", logo: "/images/work/zerogaspi/logo-mark.svg" },
    { slug: "vyno", name: "VYNO Carpool", v: "iOS + Android", l: "Carpooling app", line: "Affordable shared rides for Cameroon: verified drivers, smart filters and QR pickups.", logo: "/images/brands/vyno.png", shot: "/images/work/vyno/vyno-app-poster.webp", video: "/images/work/vyno/vyno-app.mp4", bg: "#017ac3" },
    { slug: "peers", name: "Peers", v: "Web + mobile", l: "Learning platform", line: "Assessment results and team views for a skills platform, on desktop and phone.", logo: "/images/brands/peers.png", shot: "/images/work/peers/cover-16x9.webp", cover: true },
  ],
  footer: "More <em>coming</em>.",
};

export const pods = [
  { channel: "Podcast Name", title: "Episode title goes here", date: "Month 2026" },
  { channel: "Talk Name", title: "Talk title goes here", date: "Month 2025" },
];

export const stories = [
  { slug: "sred-io", name: "SRED.io", co: "SRED.io · 2026 – Present", line: "The platform's first design system, then more than 17 microservices.", feature: true },
  { slug: "quodarca", name: "QuodArca", co: "EISST International · 2023 – 2025", line: "Six high-security, privacy-first product lines, with a multi-platform design system and full WCAG 2.1 AA compliance.", feature: true },
  { slug: "mlk-group", name: "MLK Group", co: "MLK Group · 2021 – 2023", line: "Directed digital product design for 50+ Australian brands across fintech and e-commerce.", feature: true },
];

// details pages of works that are not one of the three featured ones (the "And more." list links to them)
export const extraStories = [{ slug: "specialist-clinic-pharmacy", name: "Specialist Clinic Pharmacy" }, { slug: "vyno", name: "VYNO Carpool" }, { slug: "zero-gaspi", name: "Zero Gaspi" }, { slug: "peers", name: "Peers" }];
