# Dizzy.gg — selling-points recon (2026-07-20)

Raw material for the portfolio case study. Sourced from a codebase survey of `~/dev/llbdb`.

## What it does

Community competitive-rankings platform for fighting/sports games — founded on Lethal League Blaze / Lethal League 1, but deliberately **game-neutral** (games are DB rows, not enums; new titles need no migration). Tracks real player identities across platforms and computes skill ratings via **Glicko-2**. Beyond leaderboards it is a full **tournament operations suite**: bracket imports from start.gg and Challonge, live tournament running, per-scene/community sub-rankings, event registration + check-in, and monetized premium passes.

Core domain concepts (from an 89KB canonical `CONTEXT.md` glossary): Player, Prefix/tag, Claim (moderated identity claiming), Community/Scene scopes, Events vs Tournaments, per-scope community ratings, rating boards.

## Stack

- TypeScript throughout; **Bun** workspaces monorepo: `apps/web`, `apps/mobile`, `packages/{domain, contract, api, db}`
- Web: **Next.js 16.2** (App Router, RSC), **React 19.2**, **Tailwind v4**, Base UI + shadcn, Recharts, Zustand, TanStack Query
- Mobile: **Expo ~57 / React Native 0.86** sharing domain + contract packages with web
- API: **oRPC** end-to-end type-safe RPC — ~62 procedures across 15 routers — plus a public REST v1 API with OpenAPI docs
- DB: **PostgreSQL 18** via **Prisma 7**, 63 models, 118 migrations
- Auth: Better Auth (Discord OAuth + Expo adapter). Real-time: **Pusher** (live tournament presence, entity updates). Payments: **Stripe** (checkout basket, orders, discount codes, premium passes)
- Infra: Vercel (Analytics, Blob), Docker Compose local dev/test DBs

## Scale

- ~286,000 lines of non-test TS/TSX across 1,246 source files
- ~107,000 lines of tests across 400 test files
- **89 ADRs**, plus docs/research and docs/agents
- ~29 route pages incl. multi-tier dashboards (site-admin / scene-moderator / event-organizer) and OBS **stream overlay** routes
- Active development: PRs past #1065

## Technically impressive

- **Pure Glicko-2 rating engine** — deterministic, side-effect-free; chronological per-game processing, inactivity decay, ranks ordered by conservative estimate (rating − k·deviation); documented in ADRs
- **Per-scope community ratings** — separate rating pools per community/scope with a cadence/staleness model and ops recalculation script
- Bracket/tournament algorithms as pure domain functions: Swiss pairing, round-robin, pool distribution, DE import handling, advancement projection, seeding, upset-factor
- **Type-safety discipline**: oRPC + Zod contracts, enforced domain-purity checks that fail the build on impure imports in `packages/domain`/`contract`, dual typecheck against tsc and tsgo (`@typescript/native-preview`)
- Import pipelines for start.gg / Challonge handling 1-stage DE, GF-reset, and 2-stage pool structures; historical migration + full-site rating recalc scripts
- CI/CD: migration drift guard against a clean Postgres 18 container, auto-migrations on production deploy with pg_dump backup workflow
- Parallel test infra: seeded template DB cloned per CPU worker with a `_test` name guard; Vitest + Playwright E2E

## One-liner

> Dizzy.gg — a game-neutral competitive-rankings and tournament-ops platform (Next.js 16 / React 19 / Bun monorepo + Expo mobile) with a pure Glicko-2 rating engine, per-scope community ratings, start.gg/Challonge import pipelines, real-time Pusher features, and end-to-end type-safe oRPC APIs — ~286K LOC, 400 test files, 89 ADRs, auto-migrating CI/CD on Vercel.

Live at: https://dizzy.gg
