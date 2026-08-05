// LLB Dojo case-study content (wayfinder #3 for the words, #17 for the
// shots). The deep single-game tool — leads on craft and reliability, never
// on audience size; the leaderboard is deliberately never captured.

import type { CaseStudy, Shot } from "./types";

const sandboxShot: Shot = {
  src: "/case-studies/dojo-sandbox-simulation.png",
  caption:
    "Sandbox mid-simulation — characters placed, attack angles active, trajectories rendered as SVG with midpoint arrows.",
  width: 2880,
  height: 1800,
};

export const dojo: CaseStudy = {
  slug: "dojo",
  name: "LLB Dojo",
  url: "https://dojo.hyhy.gg",
  oneLiner:
    "A daily-puzzle trainer that teaches defensive positioning in Lethal League Blaze — built on a custom 2D physics engine, with puzzles scored against a consensus of expert players.",
  problem: [
    "Lethal League Blaze defence is a geometry problem players solve by instinct: given every angle an attacker could hit from, where do you stand to cover all of them? There was no way to practise it deliberately — you get the reps the match happens to give you. Dojo turns it into a sandbox where you can place characters and simulate ball trajectories, and a daily puzzle everyone in the community attempts against the same scenario.",
  ],
  role: [
    "Sole — concept, design, engineering, and operation. Puzzles generate automatically; I liaise with community experts to source the answers that define correctness.",
  ],
  highlights: [
    {
      title: "A 2D physics engine written from scratch",
      body: "Ball trajectories reflect off stage boundaries and character hitboxes, with the bounce triggered by the ball's leading edge rather than its centre — the detail that makes simulated paths match what players actually see in-game. Paths render as SVG with midpoint arrow markers offset from the bounce vertices. On top of the base simulation sit per-character special moves that launch or curve the ball, reposition the character, or spawn area hazards.",
      shot: sandboxShot,
    },
    {
      title: "Choosing human judgement over an algorithm",
      body: "There's no closed-form “correct answer” to a positioning puzzle, so scoring doesn't try to compute one. Up to five hand-picked expert players pre-submit answers; outliers are dropped and the remaining answers averaged into the canonical solution. Player submissions are scored by Euclidean pixel distance from it, banded into tiers. This is written up as an ADR — expert-sourced answers over algorithmic evaluation — and it's the decision on the page that best shows product thinking rather than implementation skill.",
      shot: {
        pending: true,
        caption: "A daily puzzle with a scored result — tier banding turns the scoring ADR into a visible product mechanic.",
      },
    },
    {
      title: "A puzzle lifecycle that runs itself",
      body: "Puzzles are generated automatically — randomized defender start positions with parry-guard logic, so every scenario is solvable without a human vetting it. Vercel cron jobs rotate the queue weekly: compute consensus from sensei submissions, advance the queue, and fire Discord webhooks to notify the next week's senseis, all behind a shared cron secret. The result is the claim at the top of the proof block: a new puzzle every day since launch, with nobody pressing a button.",
      shot: {
        pending: true,
        caption: "Owner admin — sensei management and the puzzle queue that rotates itself.",
      },
    },
    {
      title: "Discipline that doesn't scale down",
      body: "47 Vitest test files covering business logic, API routes, and components, against ~40K lines of source. A 30KB domain model with a ubiquitous-language glossary, and 11 ADRs recording the decisions (SVG over canvas, Vercel + Neon, expert consensus). Migrations run before every build; Husky and lint-staged gate commits.",
    },
  ],
  stack: [
    "Next.js 16.2 (App Router)",
    "React 19.2",
    "TypeScript 5 strict",
    "Bun",
    "PostgreSQL on Neon serverless",
    "Prisma 7.8",
    "BetterAuth 1.6 (Discord OAuth)",
    "shadcn/ui + Radix",
    "Tailwind v4",
    "PostHog + Vercel Analytics",
    "Vercel cron",
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Bun",
    "PostgreSQL",
    "Neon",
    "Prisma",
    "Better Auth",
    "shadcn/ui",
    "Radix",
    "Tailwind CSS",
    "PostHog",
    "Vercel",
    "Vitest",
  ],
};

// Proof leads on craft, not audience (#3): let each page lead with the proof
// it actually has.
export const dojoProofLead =
  "A new puzzle every single day since launch — roughly 90 consecutive days, generated and rotated without manual intervention.";

export const dojoProofLines = [
  "A small, committed group of regulars, the most active working through 20–25 puzzles a month.",
  "9 pages · 11 API route handlers · 9 Prisma models",
  "47 test files · 11 ADRs · ~40K lines across 181 files",
];

// Landing-page card (#3).
export const dojoCard = {
  scope: "The deep single-game tool",
  blurb:
    "Daily-puzzle positioning trainer for Lethal League Blaze. Custom 2D physics engine, expert-consensus scoring, automated weekly puzzle rotation.",
  craft: [
    "~90 consecutive days of automated daily puzzles",
    "2D physics engine written from scratch",
    "scored against a consensus of expert players",
  ],
  screenshot: sandboxShot,
};
