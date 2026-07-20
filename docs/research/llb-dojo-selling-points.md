# LLB Dojo — selling-points recon (2026-07-20)

Raw material for the portfolio case study. Sourced from a codebase survey of `~/dev/llb`.

## What it does

A **defensive-positioning trainer and daily puzzle game** for the fighting game Lethal League Blaze:

- **Sandbox tool** — place characters on a stage, activate attack angles, simulate ball trajectories with configurable reflections/bounces and frame markers (SVG-rendered)
- **Daily puzzle** — one shared scenario per day; players find the single "option-select" position covering all of an attacker's possible angles, scored on a tier 1–5 scale
- **Expert-consensus scoring** — up to 5 hand-picked "senseis" pre-submit answers; an outlier-removed average becomes the canonical solution; player submissions scored by pixel distance
- Leaderboards (daily / 30-day rolling / cumulative), player profiles with attempt history, guest submissions persisted through sign-in, owner admin panel with sensei management and a puzzle queue

## Stack

- **Next.js 16.2** (App Router), **React 19.2**, TypeScript 5 `strict`, **Bun**
- **PostgreSQL on Neon serverless** via **Prisma 7.8** (Neon adapter)
- **BetterAuth 1.6** with Discord OAuth
- shadcn/ui + Radix, **Tailwind v4**, next-themes, sonner, lucide-react
- PostHog + Vercel Analytics; hosted on Vercel

## Scale

- ~40,300 lines of TS/TSX across 181 source files; ~300 commits
- 9 pages + 11 API route handlers; 9 Prisma models
- **47 test files** (Vitest 4 + Testing Library) covering business logic, API routes, and components
- Husky + lint-staged, ESLint 9 + Prettier; migrations run before build
- Vercel cron jobs: weekly puzzle-queue rotation (computes consensus, advances queue) and sensei-week Discord webhook notifications, secured via CRON_SECRET

## Technically impressive

- **Custom 2D physics/geometry engine** (`lib/simulation.ts` + `lib/ballPath.ts`): ball trajectories with reflections off stage boundaries and character hitboxes, modeling the ball's leading edge (not center) as the bounce trigger; SVG rendering with midpoint arrow markers offset from bounce vertices
- **Character-specific special-move modeling** — per-character actions that launch/curve the ball, reposition the character, or spawn area hazards
- **Puzzle generation** with randomized defender start positions and parry-guard logic
- **Consensus algorithm** — outlier-removed averaging of expert submissions; Euclidean pixel distance mapped to tiers (50/100/200/350/500px → tiers 5–1)
- Documentation discipline: 30KB domain model (`CONTEXT.md`) with ubiquitous-language glossary, **10 ADRs** (expert-sourced answers over algorithmic evaluation, SVG over canvas, Vercel+Neon)
- Extra touches: in-app feedback route that files GitHub issues via fine-grained PAT; guest→user submission migration; cookie-consent-gated analytics

## One-liner

> LLB Dojo — a daily-puzzle positioning trainer for Lethal League Blaze (Next.js 16 / React 19 / Neon Postgres) with a custom SVG-rendered 2D physics engine, expert-consensus scoring, cron-driven puzzle rotation, and 47 test files behind strict TypeScript.

Live at: https://dojo.hyhy.gg
