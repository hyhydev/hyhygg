// Landing-page content (wayfinder #6 for the words, #19 for the three-axis
// framing). Prose is the settled draft wording from
// docs/spec/experience-and-skills.md.

export const hero = {
  name: "Harry Hartley",
  tagline: "Lead engineer, Bath/Bristol. I build and run production systems end to end.",
};

export const about = [
  "I've been a software engineer for seven years, across consultancy, product, and defence — most recently leading engineering at Calvium, where I build Next.js and Nuxt systems for clients including Arts Council England and Rolls-Royce.",
  "Outside work I design, build, and run two production products on my own: Dizzy.gg, a multi-game competitive rankings and tournament platform, and LLB Dojo, a single-game training tool. Both are live, both have real users, and I own every part of them — concept, architecture, code, infrastructure, and the day-to-day operations.",
  "Before engineering I taught secondary computing. That's where most of the things on this page that aren't code come from: running study groups and a graduate bootcamp, mentoring engineers, interviewing for senior and lead roles, and speaking at SouthwestJS and in-house on Silent Design, Advanced TypeScript, and Advanced React.",
];

// Three axes (#19): Dizzy.gg = scale, Dojo = craft depth, Riichy = velocity
// with the discipline intact.
export const projectsIntro =
  "Three production products at deliberately different scopes — one built general because generality is the point, one built narrow and deep because depth is, and one built in an afternoon with the discipline intact.";

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

// Talks (wayfinder #14): quiet list, title · venue · year · link, designed to
// read well with a single entry. Silent Design is cleared; Advanced TypeScript
// and Advanced React are benched pending the #18 disclosure check — they are
// deliberately absent, not "coming soon". Deck PDFs and years land with #18.
export interface Talk {
  title: string;
  venue: string;
  year: number | null;
  deck: string | null; // self-hosted PDF path under /talks, never a Drive link
  recording: string | null;
}

export const talks: Talk[] = [
  {
    title: "Silent Design",
    venue: "SouthwestJS",
    year: null,
    deck: null,
    recording: null,
  },
];

export const contact = {
  sentence: "Reach me at",
  email: "harry@hyhy.gg",
  github: "https://github.com/hyhydev",
  cvPath: "/cv/harry-hartley-cv.pdf",
  freelanceLine: "Occasionally available for freelance work.",
};
