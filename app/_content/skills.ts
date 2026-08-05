// The derived skill set (wayfinder #6): a skill appears on the site only if
// a case study or a role references it — the SkillId union is the enforcement
// mechanism, so an unreferenced skill is a compile error, not a wish-list
// entry. Everything the rule drops (Go, Rust, Terraform, Angular, …) stays on
// the CV and appears nowhere here.
//
// Open call carried to the build spec (#7): the four BMT-only skills
// (MySQL, MongoDB, GraphQL, ASP.NET) are excluded pending the recency clause.

export type SkillId =
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Node.js"
  | "Bun"
  | "React"
  | "Next.js"
  | "Vue"
  | "Nuxt"
  | "React Native / Expo"
  | "Tailwind CSS"
  | "shadcn/ui"
  | "Base UI"
  | "Radix"
  | "Zustand"
  | "TanStack Query"
  | "oRPC"
  | "REST / OpenAPI"
  | "Zod"
  | "PostgreSQL"
  | "Prisma"
  | "Neon"
  | "Better Auth"
  | "Stripe"
  | "Pusher"
  | "Vitest"
  | "Playwright"
  | "Testing Library"
  | "Docker"
  | "Kubernetes"
  | "AWS"
  | "Vercel"
  | "OpenTelemetry"
  | "PostHog";

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
  {
    group: "Infra & observability",
    items: ["Docker", "Kubernetes", "AWS", "Vercel", "OpenTelemetry", "PostHog"],
  },
] as const satisfies ReadonlyArray<{ group: string; items: readonly SkillId[] }>;

// The landing-page strip — a curated subset of the derived set.
export const stackStrip = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Bun",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "React Native / Expo",
  "Vue",
  "Nuxt",
  "oRPC",
  "Zod",
  "Vitest",
  "Playwright",
  "Docker",
  "Kubernetes",
  "AWS",
  "Vercel",
  "OpenTelemetry",
] as const satisfies readonly SkillId[];
