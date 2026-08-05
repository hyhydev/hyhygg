// Riichy content (wayfinder #19): a one-off compact page, not a case study —
// the afternoon timeline is the hero artifact. Copy claims "one afternoon"
// only; the timeline carries the sub-2-hour fact. Third axis: velocity with
// the discipline intact.

import type { Capture } from "./types";
import type { SkillId } from "./skills";

export const riichy = {
  name: "Riichy",
  url: "https://riichy.hyhy.gg",
  oneLiner:
    "A fairness-optimising table-draw manager for a local riichi mahjong club — blank repo to deployed product in one afternoon.",
  what: [
    "The organiser enters a player list and a number of hanchan (rounds); Riichy generates the full seating schedule for the whole event at once — who sits at which table, in which seat, every round — optimised for three fairness objectives in strict priority order: minimise repeat pairings, rotate who sits at three-player (sanma) tables when the count isn't a multiple of four, and spread the high-value seats.",
    "Re-roll is deliberately the only post-generation control — no manual draw editing. No backend, no accounts: the active event persists to localStorage. Built for a real club I attend — a genuine user with a genuine recurring need, not a demo.",
  ],
  // Git-evidenced (#19): all nine commits on 2026-08-05.
  timeline: [
    { time: "12:35", event: "Initial commit from Create Next App" },
    { time: "14:28", event: "Add riichi table-draw manager — the working app: engine, UI, tests" },
    { time: "15:04 – 17:42", event: "Polish: header and dark mode, copy pass, favicon and OG metadata, README" },
  ],
  timelineNote:
    "Blank scaffold to a working optimiser with tests in under two hours; a finished, deployed, documented product by the end of the afternoon.",
  // The discipline receipts: the habits the big apps evidence, surviving a
  // two-hour build.
  receipts: [
    "36 tests / 1,192 assertions over the draw engine and event state — the engine is a pure TypeScript module with no React or DOM dependency, persistence behind an injectable Storage-shaped interface.",
    "Seeded, best-of-N randomised search with near-lexicographic scoring weights, so the optimiser never trades a repeat pairing for seat polish; the seed is stored with the event for provenance.",
    "A CONTEXT.md domain glossary — organiser, hanchan, yonma, sanma, pairing, re-roll — used consistently across code, UI copy, and docs; invariants stated, and deliberate scope cuts recorded as decisions rather than omissions.",
  ],
  stack: [
    "Next.js 16.3 (App Router)",
    "React 19.2",
    "TypeScript 5 strict",
    "Bun",
    "shadcn/ui on Base UI",
    "Tailwind v4",
    "No database, no auth — everything client-side, hosted on Vercel",
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Bun",
    "shadcn/ui",
    "Base UI",
    "Tailwind CSS",
    "Vercel",
  ] satisfies SkillId[],
  statsShot: {
    src: "/case-studies/riichy-stats.png",
    caption:
      "Per-player fairness stats — pairings, seat counts, and sanma rotation, so the organiser can see the fairness for themselves.",
    width: 2880,
    height: 1800,
  } satisfies Capture,
};

// Landing-page strip (#19): lighter than the two flagship cards.
export const riichyStrip = {
  scope: "The afternoon build",
  blurb:
    "Fairness-optimising table-draw manager for a local riichi mahjong club. Pure tested draw engine, seeded optimiser, no backend — built in one afternoon.",
};
