# Riichy — selling-points recon (2026-08-05)

Raw material for the portfolio. Sourced from a codebase survey of `~/dev/riichy`. Unlike Dizzy.gg and LLB Dojo, the proof here is **velocity with discipline intact**: the whole thing was built in one afternoon, and the habits the big apps evidence (pure tested core, domain glossary, deliberate scope cuts) survived the speed.

## What it does

A **table-draw manager for local riichi mahjong events**. The organiser enters a player list and a number of hanchan (rounds); Riichy generates the full seating schedule for the whole event at once — who sits at which table, in which seat, every round — optimised for fairness:

- **Three fairness objectives in strict priority order**: minimise repeat pairings, rotate who sits at 3-player (sanma) tables when the count isn't a multiple of 4, and spread the high-value seats (East > South > West > North)
- **Stats view** — per-player breakdown of pairings, seat counts, and sanma appearances, so the organiser can see the fairness for themselves
- **Re-roll** is deliberately the only post-generation control — no manual draw editing
- No backend, no accounts: the active event persists to `localStorage`

Built for a real club Harry attends — a genuine user with a genuine recurring need, not a demo.

## The build timeline (git-evidenced)

All 9 commits on **2026-08-05**:

| Time | Commit |
| --- | --- |
| 12:35 | Initial commit from Create Next App |
| 14:28 | Add riichi table-draw manager *(the working app — engine, UI, tests)* |
| 15:04–17:42 | Polish: header + dark mode, copy pass, favicon/OG metadata, README |

**Blank scaffold → working optimiser with tests in under 2 hours**; a finished, deployed, documented product by end of afternoon. ⚠️ If a "built in 2 hours" claim ships as copy, scope it honestly: ~2h to the working app, one afternoon total.

## Stack

- **Next.js 16.3** (App Router), **React 19.2**, TypeScript 5 `strict`, **Bun** (package manager + test runner)
- shadcn/ui on **Base UI** primitives, **Tailwind v4**, next-themes
- No database, no auth, no analytics — everything client-side; hosted on Vercel

## Scale

- ~2,150 lines of TS/TSX across 28 source files; 9 commits
- **36 tests / 1,192 assertions** (`bun test`, ~100ms) over the draw engine and event state
- `CONTEXT.md` domain glossary — same documentation habit as Dojo's 30KB domain model, sized to a 2-hour app

## Technically impressive

- **Pure, tested core**: the draw engine (`lib/draw/engine.ts`, 415 lines) and event state are plain TypeScript modules with no React/DOM dependency — persistence takes an injectable `Storage`-shaped interface — which is what makes them directly unit-testable
- **Seeded, best-of-N randomised search** with near-lexicographic scoring weights (`pair: 1000, sanma: 50, seat: 1`), so the optimiser never trades a repeat pairing for seat polish; the seed is stored with the event for provenance; time-budgeted with a restart cap
- **Domain thinking at micro scale**: canonical glossary (organiser/hanchan/yonma/sanma/pairing/re-roll) used consistently across code, UI copy, and docs; invariants stated (player counts of 5 are unpartitionable and rejected)
- **Defensive state model**: editing players or hanchan count invalidates the stored draw — a stale draw is dropped on load rather than trusted
- **Deliberate scope cuts as design**: re-roll-only (no draw editing), single active event, no backend — each a stated decision, not an omission

## Evidence constraints

- Repo is **private** (`hyhydev/Riichy`) like the other two — evidence is the live product plus this survey; no code links
- Live at: https://riichy.hyhy.gg

## One-liner

> Riichy — a fairness-optimising table-draw manager for a local riichi mahjong club (Next.js 16 / React 19, no backend), with a seeded best-of-N draw optimiser as a pure tested module — blank repo to deployed product in one afternoon.
