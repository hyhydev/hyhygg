# Case-study content outlines — DRAFT for reaction

> Wayfinder ticket [#3](https://github.com/hyhydev/hyhygg/issues/3). This is a **proposal to be corrected**, not a decision.
> Slots marked ⟨HARRY⟩ are facts I don't have. Points marked **↯** are editorial calls worth arguing with.

Raw material: [Dizzy.gg recon](../research/dizzy-gg-selling-points.md) · [LLB Dojo recon](../research/llb-dojo-selling-points.md)

---

## Shared page shape

Both case studies use the same section order, so a reader who skims one knows where to look in the other:

1. **One-liner** — what it is, in a sentence, above the fold
2. **Live link + evidence** — the button, right next to the one-liner
3. **The problem** — why this exists, in the language of the people who use it
4. **My role** — scope of ownership, stated plainly
5. **What's technically interesting** — 3–5 items, each a short heading + 2–3 sentences
6. **Stack** — a compact list, not prose
7. **Proof** — the numbers that survive scrutiny
8. **Screens** — captured images/recordings ⟨depends on visual direction, ticket #4⟩

**↯ Both repos are private, which changes the evidence strategy.** There's no "view source" button to lean on, so code quality has to be *shown* rather than linked. Three substitutes, in order of strength:

1. **The running products themselves.** Both are live and public. This is the strongest evidence available and it's already free — the case studies should push hard toward the live links rather than treating them as a footnote.
2. **Excerpted architecture decision records.** 89 ADRs on Dizzy.gg and 10 on Dojo are the highest-signal artifact a private repo can surface: they show reasoning, alternatives weighed, and trade-offs accepted — which is what a code link is really being asked to prove. Publishing two or three verbatim (Glicko-2 ranking order; expert-consensus over algorithmic evaluation) would carry more weight with a senior reviewer than a repo they won't clone.
3. **Screenshots of the non-obvious surfaces** — admin dashboards, the OBS stream overlay, the Dojo simulation canvas. These show scope that prose can't.

Whether to publish ADR excerpts is a real decision with a real cost (they're internal documents written without an audience in mind). Flagged as a candidate ticket rather than settled here.

**↯ Framing decision that spans both pages.** The two projects sit at deliberately different scopes, and the portfolio should make that contrast do the work:

- **Dizzy.gg is multi-game and multi-community in production** — arbitrary games and arbitrary scenes, not a Lethal League Blaze site that happens to be extensible. This is the general platform.
- **LLB Dojo is explicitly single-game** — a tool built deep into one game's mechanics, and it could not be anything else.

Read together they show range in the axis employers care about: *building for generality where generality is the point, and building narrow and deep where depth is the point.* The landing page should say that in one line above the two cards. What it must **not** do is imply both are Lethal League Blaze projects — that undersells Dizzy.gg badly, and it's simply wrong.

---

## Dizzy.gg

### One-liner

> A multi-game competitive rankings and tournament-operations platform — Glicko-2 skill ratings, live bracket running, and start.gg/Challonge imports — running in production across 3 games and 10 communities.

**↯** The recon one-liner leads with the stack. For an employer skimming, leading with *what it does for whom* lands harder; the stack is one scroll below and doesn't need to fight for the first sentence. "Multi-game" is load-bearing and belongs in the first six words — it's the difference between a platform and a fan site.

**↯** Put the concrete counts in the one-liner rather than saving them for the Proof block. "Serving arbitrary games and communities" is the kind of phrase a reader discounts on sight; "3 games and 10 communities" is checkable, and a checkable small number is more persuasive than an unfalsifiable large claim.

### The problem

Competitive gaming communities track skill in spreadsheets and run brackets across three disconnected tools. Identity is the hard part: the same player appears under different tags on different platforms across years of events, so nobody can answer "who is actually the best right now?" Dizzy.gg makes players first-class entities with moderated identity claiming, computes a real rating from their full match history, and runs the tournaments that generate that history in the first place.

And it does that for **any** game and any community. Games are database rows, not enum values; scenes are scopes with their own rating pools and their own moderators. Onboarding a new title is configuration, not a migration — a constraint held from the first schema onward, which is why it's still true at 63 models and 118 migrations, and why three different games and ten communities now run on it.

### My role

Sole. I came up with the concept, architected it, built it, maintain it, and manage every aspect of the product — no other contributors.

**↯** State it in roughly those words and then stop. The temptation is to decorate it ("full ownership across the entire stack…"), but the flat version is more credible, and the numbers in the Proof block below are what make it land: a one-person project that 5,590 players and 796 tournaments actually depend on is a much louder claim than any adjective. It also pre-empts the interview question — an employer reading a platform this size assumes a team until told otherwise.

### What's technically interesting

**A pure Glicko-2 rating engine, over 30,000 recorded sets.** Ratings are computed by a deterministic, side-effect-free module: matches processed in chronological order, inactivity decay applied, and ranks ordered by a conservative estimate (rating − k·deviation) so a volatile newcomer can't leapfrog a proven player. Determinism isn't academic here — it's what makes a full-history recalculation across 30,028 sets a safe operation to run against a live leaderboard. The same engine drives per-scope community ratings — separate rating pools per scene, with a staleness/cadence model and an ops script for full recalculation.

**Architecture rules the build enforces.** `packages/domain` and `packages/contract` are checked for purity, and the build fails on an impure import. The convention isn't a wiki page anyone can drift from — it's a gate. Typechecking runs twice, against `tsc` and `tsgo`.

**End-to-end type safety across three clients.** ~62 oRPC procedures across 15 routers, contracts defined with Zod, consumed by the Next.js web app and an Expo React Native app sharing the same domain and contract packages — plus a public REST v1 API with generated OpenAPI docs on top of the same definitions. One contract change propagates to every consumer at compile time.

**Import pipelines for other people's messy data.** Brackets arrive from start.gg and Challonge in shapes that don't normalize cleanly: single-stage double elimination, grand-final resets, two-stage pool-into-bracket structures. Getting these right retroactively also meant historical migration scripts and a full-site rating recalculation.

**Production plumbing that isn't optional.** Migration drift is caught in CI against a clean Postgres 18 container; production deploys auto-migrate behind a `pg_dump` backup workflow. Tests run in parallel against a seeded template database cloned per CPU worker, guarded so a non-`_test` database can never be touched.

**↯** Five is the ceiling. If it must go to four, I'd cut *Import pipelines* — it's the most impressive engineering but the least legible to a non-domain reader. Alternatively cut *Production plumbing* if the target roles are product-engineering rather than platform.

**↯ Deliberately not highlighted:** Stripe payments, Pusher real-time presence, OBS stream overlays, the multi-tier admin dashboards. All real, all listable in the stack block — but as headline items they read as feature inventory, and each one dilutes the four that show judgment.

### Stack

TypeScript · Bun workspaces monorepo · Next.js 16.2 (App Router, RSC) · React 19.2 · Tailwind v4 · Base UI + shadcn · Expo 57 / React Native 0.86 · oRPC + Zod · PostgreSQL 18 · Prisma 7 · Better Auth (Discord OAuth) · Pusher · Stripe · Vercel

### Proof

- Live and in production at **https://dizzy.gg**
- **5,590 players ranked · 796 tournaments · 30,028 sets recorded — in the first three months, built and operated by one person**
  - **↯ State the three-month window.** Without it these are good numbers; with it they're a traction story, and traction is what makes a reviewer read the rest of the page properly.
  - **↯ Verify the wording on "796 tournaments" before this ships.** The platform both *imports* historical brackets from start.gg/Challonge and *runs* tournaments live — and 796 in three months reads to me like it's mostly imported history. If so, "796 tournaments run" is a claim an interviewer will probe, and being caught loose on it costs more than the number gains. Split it: "796 tournaments indexed, N run live on the platform." The split is a *better* story anyway — importing 796 messy real-world brackets correctly is the harder engineering, and it's currently disguised as an operations stat. ⟨HARRY — what's the actual split?⟩
- **3 games · ~10 communities live**
  - **↯ State these plainly and early — do not apologise for their size.** An employer's instinctive read of "game-neutral architecture" is *"built for one game, hedged with an abstraction."* Three kills that read outright: an abstraction exercised across three titles has been tested, while one used by a single game is speculative. The community count does similar work for the per-scope rating pools — ten scenes means the scoping model has met real moderators with real disagreements, not just a schema diagram.
  - **↯** Ten communities across three games is also the honest justification for the architectural effort. Without those numbers, "games are database rows, not enums" is a design preference; with them, it's a constraint that paid off.
- 63 database models · 118 migrations · ~29 route pages
- 89 architecture decision records
- ~286K lines of source across 1,246 files; ~107K lines of tests across 400 test files

**↯** The three usage numbers should be the visual anchor of this page — large type, near the top, not buried in a list at the bottom. They are the single most persuasive thing in the whole portfolio, and they're the answer to the only sceptical question that matters: *did anyone actually use it?*

**↯ Strong recommendation.** Lead this block with community numbers, not line counts. "1,400 players ranked across 200 tournaments" is proof the thing is real and used; "286K lines of code" is ambiguous — a sceptical reviewer can read it as bloat as easily as scale. Keep the code metrics, put them last, and let ADR count and test count do the discipline-signalling.

### Landing-page card

> **Dizzy.gg** — Multi-game competitive rankings and tournament platform. Glicko-2 ratings, live brackets, start.gg imports. Web + mobile, in production.

---

## LLB Dojo

### One-liner

> A daily-puzzle trainer that teaches defensive positioning in Lethal League Blaze — built on a custom 2D physics engine, with puzzles scored against a consensus of expert players.

**↯** Name the game in the first sentence rather than saying "a fighting game." Dojo's narrowness is the point of it, and it's the counterweight to Dizzy.gg's generality — hedging it into a vague "a fighting game" costs the contrast and gains nothing.

### The problem

Lethal League Blaze defence is a geometry problem players solve by instinct: given every angle an attacker could hit from, where do you stand to cover all of them? There was no way to practise it deliberately — you get the reps the match happens to give you. Dojo turns it into a sandbox where you can place characters and simulate ball trajectories, and a daily puzzle everyone in the community attempts against the same scenario.

### My role

Sole — concept, design, engineering, and operation. Puzzles generate automatically; I liaise with community experts to source the answers that define correctness.

**↯** Say the liaison part explicitly. It's the one line on either page that isn't about code: it shows recruiting and coordinating domain experts as an ongoing operational commitment, which is exactly the kind of work engineers usually can't evidence.

### What's technically interesting

**A 2D physics engine written from scratch.** Ball trajectories reflect off stage boundaries and character hitboxes, with the bounce triggered by the ball's *leading edge* rather than its centre — the detail that makes simulated paths match what players actually see in-game. Paths render as SVG with midpoint arrow markers offset from the bounce vertices. On top of the base simulation sit per-character special moves that launch or curve the ball, reposition the character, or spawn area hazards.

**Choosing human judgement over an algorithm.** There's no closed-form "correct answer" to a positioning puzzle, so scoring doesn't try to compute one. Up to five hand-picked expert players pre-submit answers; outliers are dropped and the remaining answers averaged into the canonical solution. Player submissions are scored by Euclidean pixel distance from it, banded into tiers (50/100/200/350/500px → tiers 5–1). This is written up as an ADR — *expert-sourced answers over algorithmic evaluation* — and it's the decision on the page that best shows product thinking rather than implementation skill.

**A puzzle lifecycle that runs itself.** Puzzles are generated automatically — randomized defender start positions with parry-guard logic, so every scenario is solvable without a human vetting it. Vercel cron jobs rotate the queue weekly: compute consensus from sensei submissions, advance the queue, and fire Discord webhooks to notify the next week's senseis, all behind a shared cron secret. The result is the claim at the top of the Proof block: a new puzzle every day since launch, with nobody pressing a button.

**Discipline that doesn't scale down.** 47 Vitest test files covering business logic, API routes, and components, against ~40K lines of source. A 30KB domain model with a ubiquitous-language glossary, and 10 ADRs recording the decisions (SVG over canvas, Vercel + Neon, expert consensus). Migrations run before every build; Husky and lint-staged gate commits.

**↯** I'd add one line, not a full section, for the small touches that show user-flow care: guest submissions that survive sign-in, an in-app feedback route that files GitHub issues, cookie-consent-gated analytics.

### Stack

Next.js 16.2 (App Router) · React 19.2 · TypeScript 5 strict · Bun · PostgreSQL on Neon serverless · Prisma 7.8 · BetterAuth 1.6 (Discord OAuth) · shadcn/ui + Radix · Tailwind v4 · PostHog + Vercel Analytics · Vercel cron

### Proof

- Live at **https://dojo.hyhy.gg** since ⟨month⟩ 2026
- **A new puzzle every single day since launch — roughly 90 consecutive days, generated and rotated without manual intervention.** Regular solvers work through 20–25 puzzles a month.
- 9 pages · 11 API route handlers · 9 Prisma models
- 47 test files · 10 ADRs · ~40K lines across 181 files

**↯ Reverse the Dizzy.gg advice here — this page must not lead with audience size.** Dojo has ~20 active users. That number is real and I'd never suggest hiding it, but foregrounding it would be actively self-defeating: it invites the reader to judge a piece of engineering by an audience it was never trying to win, and it sits next to a page boasting 5,590. The honest and stronger move is to let each page lead with the proof it actually has:

- **Dizzy.gg proves demand** — thousands of players depend on it.
- **Dojo proves craft and reliability** — a bespoke physics engine and a lifecycle that has run itself daily for three months without a missed day.

Both are legitimate things to be proud of; they're just not the same claim. If a usage figure is wanted for completeness, "a small, committed group of regulars, the most active working through 20–25 puzzles a month" is accurate, unembarrassed, and says *engaged* rather than *big* — engagement depth is the honest headline for a tool this specialised.

### Landing-page card

> **LLB Dojo** — Daily-puzzle positioning trainer for Lethal League Blaze. Custom 2D physics engine, expert-consensus scoring, automated weekly puzzle rotation.

---

## Settled

- **Framing** — Dizzy.gg is genuinely multi-game/multi-community; Dojo is deliberately single-game. The contrast between them is the story.
- **Role** — solo on both. Dizzy.gg: concept, architecture, build, maintenance, product. Dojo: same, plus liaising with community experts for puzzle answers.
- **Repos** — both private. Evidence comes from the live products, ADR excerpts, and screenshots instead.
- **Time live** — both roughly three months.
- **Dizzy.gg proof** — 3 games · ~10 communities · 5,590 players · 796 tournaments · 30,028 sets, in three months.
- **Dojo proof** — leads on craft and reliability, *not* audience size: ~90 consecutive days of automated puzzles; regulars solving 20–25 a month.

## Still open

1. **Dizzy.gg: tournaments imported vs. run live** — needed before "796 tournaments" can be worded safely.
2. **Launch months** — "running since ⟨month⟩ 2026" for each.
3. **ADR excerpts** — whether to publish two or three verbatim as code-quality evidence, given both repos are private. Tracked as [#9](https://github.com/hyhydev/hyhygg/issues/9).
