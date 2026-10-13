// The resume page, taken from Muhammad-Naeem-Resume-final.pdf (the PDF is also offered for download from /Muhammad-Naeem-Resume.pdf).
export const resume = {
  name: "Muhammad Naeem",
  title: "Lead Product Designer · Design Engineer · AI-Augmented Design",
  pdf: "/Muhammad-Naeem-Resume.pdf",
  contact: [
    { label: "me.naeem88@gmail.com", href: "mailto:me.naeem88@gmail.com" },
    { label: "+92 321 888 6461", href: "tel:+923218886461" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadnaeem88/" },
    { label: "Portfolio", href: "https://muhammadnaeem.vercel.app" },
  ],
  summary:
    "Lead Product Designer with 10+ years across SaaS, fintech, and health, working remotely with teams in Canada, the UK, and Australia. Builds design systems from scratch, then ships them as production UI using AI-augmented workflows (Claude Code, Cursor, Figma MCP).",
  experience: [
    {
      company: "SRED.io", place: "Remote (Canada)", role: "Lead Product Designer", dates: "Jul 2026 – Present",
      desc: "Toronto SaaS platform helping 100+ Canadian companies claim R&D (SR&ED) tax credits, integrated with Jira, GitHub, and Azure DevOps.",
      bullets: [
        "Built the platform's first design system on Flowbite, giving engineering one shared component library.",
        "Cut core page length by 70% through a layout redesign, with no loss of content.",
        "Designed four products (Staff & Teams, File Vaults, Timesheets, Feedback Widget): 12 end-to-end flows and 50+ screens.",
        "Lead design and manage a front-end developer, taking designs into production code through a Figma MCP workflow.",
      ],
    },
    {
      company: "EISST Ltd", place: "Remote (London, UK)", role: "Senior Product Designer", dates: "Dec 2023 – May 2026",
      bullets: [
        "Led end-to-end UX/UI design across 6 high-security, privacy-first product lines, delivering 500+ screens across mobile, web, and desktop while maintaining design quality under strict compliance constraints.",
        "Rebuilt core application, authenticator, and setup flows, resolving critical onboarding drop-off issues and reducing user friction across 3 interconnected product surfaces.",
        "Architected and implemented a scalable, multi-platform design system with standardized components, design tokens, and responsive patterns, reducing design-to-dev handoff time and eliminating cross-platform inconsistencies.",
        "Upgraded icon library, color palette, and typography to achieve full WCAG 2.1 AA compliance, enabling accessibility for a broader user base and satisfying enterprise client requirements.",
        "Streamlined design documentation and handoff processes, resolving persistent misalignment between design, engineering, and QA teams, reducing revision cycles and accelerating sprint velocity.",
        "Conducted competitor benchmarking and moderated usability testing sessions to validate design decisions with real users, ensuring products solved verified pain points.",
      ],
    },
    {
      company: "MLK Group Pty Ltd", place: "Remote (Australia)", role: "Design Team Lead", dates: "Jul 2021 – Nov 2023",
      bullets: [
        "Led a team of 3 designers and directed digital product design strategy for 50+ Australian brands across fintech and e-commerce, owning design quality from discovery through launch.",
        "Reduced design revision cycles by 50% by introducing reusable component frameworks and establishing a shared design system, enabling the team to scale output without sacrificing quality.",
        "Boosted conversion rates by 3x and increased online orders by 2.5x for flagship e-commerce clients through data-informed UX improvements and conversion-rate optimization.",
        "Designed high-impact pitch decks and investor-facing assets that directly supported business development, contributing to repeat contract wins in competitive markets.",
        "Established design roadmaps aligned with business OKRs and implemented Lean UX and Design Thinking processes, bringing structure and repeatability to a previously ad hoc design workflow.",
        "Mentored designers on UX methodology, Figma best practices, and client communication, building team capability and design culture.",
      ],
    },
    {
      company: "April and June Digital (Pvt) Ltd.", place: "Lahore, Pakistan", role: "Senior UX/UI Designer", dates: "Dec 2019 – May 2021",
      bullets: [
        "Engineered a modular, component-based design system for Bionorica (pharmaceutical brand), ensuring cross-platform scalability and visual consistency across web and mobile surfaces.",
        "Designed high-fidelity interfaces and interaction models for Web3 and crypto platforms, navigating novel UX paradigms to support successful market entry for emerging-tech clients.",
        "Translated complex, multi-stakeholder requirements into clearly defined user journeys, personas, and measurable design outcomes, bridging the gap between technical constraints and user needs.",
        "Led design strategy for e-commerce (including Expofair, a German online store), Web3, and pharma platforms, reporting directly to the CEO and aligning visual systems with business KPIs and product roadmaps.",
      ],
    },
    {
      company: "Quantum CPH A/S", place: "Lahore, Pakistan", role: "UX/UI Designer", dates: "Aug 2017 – Oct 2019",
      bullets: [
        "Architected the end-to-end web experience for Viavana, a hotel and ticket management booking engine, from information architecture through high-fidelity prototyping and developer handoff.",
        "Lead UX/UI designer on Hidebox, a mobile app for cataloguing personal items and recording insurance claims; built high-fidelity interactive prototypes that validated user journeys and surfaced usability issues before development investment.",
        "Translated complex technical requirements into detailed personas, user stories, and task flows, enabling a shared understanding across product, engineering, and business stakeholders.",
        "Built scalable design systems and performed systematic heuristic UX audits to enforce premium interface standards and flag usability regressions.",
      ],
    },
  ],
  consultingIntro: "Independent product design consulting for clients in the US, Germany, and Australia, with 235 completed client projects.",
  consulting: [
    { name: "VYNO", kind: "Mobility app", desc: "Designed a carpooling app around the three things stopping people from booking: trust, discoverability, and ride clarity. Introduced verified profiles, smart ride filters, and QR-based ride confirmations to raise booking confidence and reduce missed connections." },
    { name: "Applied Electronics", kind: "Enterprise website", desc: "Redesigned the web experience for an audio-visual and broadcast technology integrator. Organic search visibility grew about 50%, branded search volume rose from 12.8K to 20K+ (57%), and mobile bounce rate fell about 46% through improved responsiveness and speed." },
    { name: "Zero Gaspi", kind: "iOS & Android", desc: "Designed native iOS and Android apps for an anti-food-waste marketplace connecting food merchants with consumers, who buy unsold food as \"Surprise Baskets\" at about 30 to 35% of the original price." },
  ],
  skills: [
    { cat: "Product Design", items: ["End-to-end Product Design", "UX Strategy", "Information Architecture", "Interaction Design", "Prototyping", "Design Thinking"] },
    { cat: "Research & Validation", items: ["User Research", "Usability Testing", "Competitor Benchmarking", "Heuristic Evaluation", "Journey Mapping"] },
    { cat: "Design Systems & Accessibility", items: ["Multi-platform Design Systems", "Design Tokens", "Component Libraries", "Responsive Layouts", "WCAG 2.1 AA", "Dev Handoff & Design QA"] },
    { cat: "AI & Design to Code", items: ["Claude Code", "Cursor", "Figma MCP", "Claude", "Gemini", "Figma AI", "UX Pilot", "React", "Angular", "React Native", "HTML/CSS"] },
    { cat: "Leadership", items: ["Design Team Leadership", "Mentoring", "Product Roadmapping", "Stakeholder Management", "Cross-functional Collaboration", "Agile/Scrum"] },
    { cat: "Tools", items: ["Figma", "FigJam", "Adobe Photoshop", "Adobe Illustrator", "Jira", "Confluence", "Notion", "Miro", "Slack"] },
  ],
  earlier: [
    { role: "Graphic and Web Designer", org: "Brainlogix Private Limited, Lahore", dates: "Jul 2014 – Jul 2017" },
    { role: "Graphic Design Internship", org: "iApp11 Technologies, Lahore", dates: "Jan 2014 – Jun 2014" },
  ],
  education: { degree: "Bachelor of Commerce, Information Technology", school: "University of the Punjab, Lahore, Pakistan", dates: "2011 – 2013" },
};
