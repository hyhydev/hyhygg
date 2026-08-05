// Dizzy.gg case-study content (wayfinder #3 for the words, #17 for the
// shots). The general platform: multi-game, multi-community in production —
// never an LLB site that happens to be extensible.

import type { CaseStudy, Shot, Stat } from "./types";

// The visual anchor of the page (#3): usage numbers large and early — they
// answer the only sceptical question that matters.
export const dizzyStats = [
  { value: 3, label: "games" },
  { value: 10, approx: true, label: "communities" },
  { value: 5590, label: "players ranked" },
  { value: 796, label: "tournaments" },
  { value: 30028, label: "sets recorded" },
] satisfies Stat[];

export const dizzyStatsNote = "in the first three months, built and operated by one person";

const leaderboardShot: Shot = {
  src: "/case-studies/dizzy-leaderboard.png",
  caption:
    "Game leaderboard, live — conservative Glicko-2 ratings, with the game switcher carrying all three titles.",
  width: 2880,
  height: 1800,
};

const bracketShot: Shot = {
  src: "/case-studies/dizzy-bracket.png",
  caption: "Tournament bracket, live — one of 796 imported or run on the platform.",
  width: 2880,
  height: 1800,
};

export const dizzy: CaseStudy = {
  slug: "dizzy",
  name: "Dizzy.gg",
  url: "https://dizzy.gg",
  oneLiner:
    "A multi-game competitive rankings and tournament-operations platform — Glicko-2 skill ratings, live bracket running, and start.gg/Challonge imports — running in production across 3 games and 10 communities.",
  problem: [
    "Competitive gaming communities track skill in spreadsheets and run brackets across three disconnected tools. Identity is the hard part: the same player appears under different tags on different platforms across years of events, so nobody can answer “who is actually the best right now?” Dizzy.gg makes players first-class entities with moderated identity claiming, computes a real rating from their full match history, and runs the tournaments that generate that history in the first place.",
    "And it does that for any game and any community. Games are database rows, not enum values; scenes are scopes with their own rating pools and their own moderators. Onboarding a new title is configuration, not a migration — a constraint held from the first schema onward, which is why it's still true at 63 models and 118 migrations, and why three different games and ten communities now run on it.",
  ],
  role: [
    "Sole. I came up with the concept, architected it, built it, maintain it, and manage every aspect of the product — no other contributors.",
  ],
  roleShot: {
    pending: true,
    caption: "Scene-moderator dashboard, live — the operational machinery the public never sees.",
  },
  highlights: [
    {
      title: "A pure Glicko-2 rating engine, over 30,000 recorded sets",
      body: "Ratings are computed by a deterministic, side-effect-free module: matches processed in chronological order, inactivity decay applied, and ranks ordered by a conservative estimate (rating − k·deviation) so a volatile newcomer can't leapfrog a proven player. Determinism isn't academic here — it's what makes a full-history recalculation across 30,028 sets a safe operation to run against a live leaderboard. The same engine drives per-scope community ratings — separate rating pools per scene, with a staleness/cadence model and an ops script for full recalculation.",
      shot: leaderboardShot,
    },
    {
      title: "Architecture rules the build enforces",
      body: "packages/domain and packages/contract are checked for purity, and the build fails on an impure import. The convention isn't a wiki page anyone can drift from — it's a gate. Typechecking runs twice, against tsc and tsgo.",
    },
    {
      title: "End-to-end type safety across three clients",
      body: "~62 oRPC procedures across 15 routers, contracts defined with Zod, consumed by the Next.js web app and an Expo React Native app sharing the same domain and contract packages — plus a public REST v1 API with generated OpenAPI docs on top of the same definitions. One contract change propagates to every consumer at compile time.",
      shot: {
        pending: true,
        caption: "The Expo app on a phone — the third client of the same typed contract.",
      },
    },
    {
      title: "Import pipelines for other people's messy data",
      body: "Brackets arrive from start.gg and Challonge in shapes that don't normalize cleanly: single-stage double elimination, grand-final resets, two-stage pool-into-bracket structures. Getting these right retroactively also meant historical migration scripts and a full-site rating recalculation.",
      shot: bracketShot,
    },
    {
      title: "Production plumbing that isn't optional",
      body: "Migration drift is caught in CI against a clean Postgres 18 container; production deploys auto-migrate behind a pg_dump backup workflow. Tests run in parallel against a seeded template database cloned per CPU worker, guarded so a non-_test database can never be touched.",
      shot: {
        pending: true,
        caption: "OBS stream overlay on the native 1920×1080 broadcast canvas — composited over gameplay.",
      },
    },
  ],
  stack: [
    "TypeScript",
    "Bun workspaces monorepo",
    "Next.js 16.2 (App Router, RSC)",
    "React 19.2",
    "Tailwind v4",
    "Base UI + shadcn",
    "Expo 57 / React Native 0.86",
    "oRPC + Zod",
    "PostgreSQL 18",
    "Prisma 7",
    "Better Auth (Discord OAuth)",
    "Pusher",
    "Stripe",
    "Vercel",
  ],
  skills: [
    "TypeScript",
    "Bun",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Base UI",
    "shadcn/ui",
    "React Native / Expo",
    "oRPC",
    "Zod",
    "REST / OpenAPI",
    "PostgreSQL",
    "Prisma",
    "Better Auth",
    "Pusher",
    "Stripe",
    "Vercel",
    "Zustand",
    "TanStack Query",
    "Vitest",
    "Playwright",
    "Testing Library",
  ],
};

// Secondary proof — code metrics deliberately last (#3): usage numbers prove
// it's real, ADR and test counts do the discipline-signalling.
export const dizzySecondaryProof = [
  "63 database models · 118 migrations · ~29 route pages",
  "94 architecture decision records",
  "~286K lines of source across 1,246 files; ~107K lines of tests across 400 test files",
];

// Landing-page card (#3).
export const dizzyCard = {
  scope: "The general platform",
  blurb:
    "Multi-game competitive rankings and tournament platform. Glicko-2 ratings, live brackets, start.gg imports. Web + mobile, in production.",
  screenshot: {
    src: "/case-studies/dizzy-tournaments.png",
    caption:
      "Dizzy.gg tournaments listing for the LLB Stadium community — 488 tournaments with dates, entrants, prizes, and winners",
    width: 2880,
    height: 1800,
  },
};
