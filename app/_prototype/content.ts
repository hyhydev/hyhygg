// PROTOTYPE — shared copy for the three direction prototypes (wayfinder #10/#11/#12).
// Held constant across variants so the comparison is about the visual direction,
// not the words. Sourced from docs/spec/experience-and-skills.md and
// docs/spec/case-study-outlines.md. Throwaway with the prototypes.

export const hero = {
  name: "Harry Hartley",
  tagline: "Lead engineer, Bath/Bristol. I build and run production systems end to end.",
};

export const about = [
  "I've been a software engineer for seven years, across consultancy, product, and defence — most recently leading engineering at Calvium, where I build Next.js and Nuxt systems for clients including Arts Council England and Rolls-Royce.",
  "Outside work I design, build, and run two production products on my own: Dizzy.gg, a multi-game competitive rankings and tournament platform, and LLB Dojo, a single-game training tool. Both are live, both have real users, and I own every part of them — concept, architecture, code, infrastructure, and the day-to-day operations.",
  "Before engineering I taught secondary computing. That's where most of the things on this page that aren't code come from: running study groups and a graduate bootcamp, mentoring engineers, interviewing for senior and lead roles, and speaking at SouthwestJS and in-house on Silent Design, Advanced TypeScript, and Advanced React.",
];

export const projectsIntro =
  "Two production products at deliberately different scopes — one built general because generality is the point, one built narrow and deep because depth is.";

export interface Stat {
  value: number;
  approx?: boolean;
  label: string;
}

export const dizzy = {
  name: "Dizzy.gg",
  url: "https://dizzy.gg",
  card: "Multi-game competitive rankings and tournament platform. Glicko-2 ratings, live brackets, start.gg imports. Web + mobile, in production.",
  scope: "The general platform",
  stats: [
    { value: 3, label: "games" },
    { value: 10, approx: true, label: "communities" },
    { value: 5590, label: "players ranked" },
    { value: 796, label: "tournaments" },
    { value: 30028, label: "sets recorded" },
  ] satisfies Stat[],
  statsNote: "in the first three months, built and operated by one person",
  screenshot: {
    src: "/prototype/dizzy-tournaments.png",
    alt: "Dizzy.gg tournaments listing for the LLB Stadium community — 488 tournaments with dates, entrants, prizes, and winners",
    width: 2880,
    height: 1800,
  },
};

export const dojo = {
  name: "LLB Dojo",
  url: "https://dojo.hyhy.gg",
  card: "Daily-puzzle positioning trainer for Lethal League Blaze. Custom 2D physics engine, expert-consensus scoring, automated weekly puzzle rotation.",
  scope: "The deep single-game tool",
  craft: [
    "~90 consecutive days of automated daily puzzles",
    "2D physics engine written from scratch",
    "scored against a consensus of expert players",
  ],
  screenshot: {
    src: "/prototype/dojo-sandbox.png",
    alt: "LLB Dojo sandbox — the Outskirts stage with character roster, hitbox toggles, and simulation settings",
    width: 2880,
    height: 1800,
  },
};

export const skillGroups = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
  { group: "Runtimes", items: ["Node.js", "Bun"] },
  { group: "Frameworks", items: ["React", "Next.js", "Vue", "Nuxt", "React Native / Expo"] },
  { group: "UI", items: ["Tailwind CSS", "shadcn/ui", "Base UI", "Radix"] },
  { group: "State & data", items: ["Zustand", "TanStack Query"] },
  { group: "APIs & contracts", items: ["oRPC", "REST / OpenAPI", "Zod"] },
  { group: "Data", items: ["PostgreSQL", "Prisma", "Neon"] },
  { group: "Auth, payments, realtime", items: ["Better Auth", "Stripe", "Pusher"] },
  { group: "Testing", items: ["Vitest", "Playwright", "Testing Library"] },
  { group: "Infra & observability", items: ["Docker", "Kubernetes", "AWS", "Vercel", "OpenTelemetry", "PostHog"] },
];

export const stackStrip = [
  "TypeScript", "React", "Next.js", "Node.js", "Bun", "Tailwind CSS",
  "PostgreSQL", "Prisma", "React Native", "Vue", "Nuxt", "oRPC", "Zod",
  "Vitest", "Playwright", "Docker", "Kubernetes", "AWS", "Vercel", "OpenTelemetry",
];

export const experience = [
  {
    years: "2025 —",
    org: "Calvium",
    title: "Lead Engineer",
    line: "Leading engineering on client systems in Next.js and Nuxt, and building the internal templates and tooling the rest of the business ships on.",
    clients: ["Arts Council England", "Rolls-Royce"],
  },
  {
    years: "2023 – 25",
    org: "AND Digital",
    title: "Senior Software Engineer",
    line: "Full system redesign for TravelChapter in TypeScript and Next.js, alongside modernising their engineering practice; OpenTelemetry observability across microservices for the Office for National Statistics.",
    clients: ["TravelChapter", "Office for National Statistics"],
  },
  {
    years: "2022 – 23",
    org: "Scott Logic",
    title: "Software Engineer",
    line: "Led a small team contributing to Vuu, Scott Logic's open-source project, working directly with its stakeholder on requirements and delivery.",
    clients: ["Vuu (open source)"],
  },
  {
    years: "2021 – 22",
    org: "Rocketmakers",
    title: "Senior Software Engineer",
    line: "Built a complete home-automation platform for Sero Energy in React and Node on Docker and Kubernetes, and was elected to the company's Web seat overseeing frontend practice across the business.",
    clients: ["Sero Energy"],
  },
  {
    years: "2019 – 21",
    org: "BMT",
    title: "Software Engineer",
    line: "Web applications for the Royal Navy and internal use, taken from backlog creation through to delivery; ran the week-long graduate bootcamp for new joiners.",
    clients: ["Royal Navy"],
  },
];

export const educationLine =
  "BSc Computer Science, University of Bath (placement year at Altran — C, Ada and SPARK for high-reliability systems) · PGCE Secondary Computing, UWE";

export const writing = {
  blurb:
    "Notes on TypeScript, React, and running production systems solo. Coming soon.",
  talks: ["Silent Design", "Advanced TypeScript", "Advanced React"],
  talksNote: "SouthwestJS + in-house",
};

export const contact = {
  sentence: "Reach me at",
  email: "harry@hyhy.gg",
  github: "https://github.com/hyhydev",
  cvPath: "/cv/harry-hartley-cv.pdf",
  freelanceLine: "Occasionally available for freelance work.",
};
