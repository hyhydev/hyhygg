# Case-study visual assets — shot list and framing

> Wayfinder ticket [#17](https://github.com/hyhydev/hyhygg/issues/17). Decided with Harry, 2026-08-05.
> This is the spec the build spec ([#7](https://github.com/hyhydev/hyhygg/issues/7)) consumes; the capture work itself is tracked as its own task.

## Placement principle

**Interleaved evidence, no gallery.** The outlines' "Screens" section (§8 of the shared page shape) is dissolved: each capture sits directly beside the claim it proves. With both flagship repos private, screenshots are load-bearing evidence — proof placed next to its claim reads as evidence; proof collected at the bottom reads as decoration. The discipline cuts both ways: **a shot that doesn't earn a claim to sit beside doesn't ship.** This also serves the Field direction — screenshot cards are the page's only colour and only hard edges (#12), so interleaving spreads focal points down the scroll instead of leaving the middle of the page an unbroken drift.

## The shot list — nine captures

### Dizzy.gg (five)

| # | Capture | Sits beside | Access | Staging notes |
|---|---------|-------------|--------|---------------|
| 1 | Game leaderboard / rankings view | Glicko-2 engine item | public | Real ratings, real player counts; the game context switcher visible does the "3 games" work marketing copy can't |
| 2 | Tournament bracket page | Import pipelines item | public | Prefer an **imported** start.gg/Challonge bracket with a messy structure — grand-final reset or pools-into-bracket — so the hard engineering is visible |
| 3 | Admin dashboard (scene-moderator or site-admin tier) | Scope/role prose | Harry's session | The operational machinery the public never sees |
| 4 | OBS stream overlay | Production plumbing item | route access TBC | Native 1920×1080 broadcast canvas; the one sanctioned dark/vivid capture |
| 5 | Expo mobile app | Three-clients type-safety item | Harry's phone | The only way to *show* the third client exists; captured on-device, not emulator |

Deliberately absent: a home-page shot (landing-card territory; the leaderboard's game switcher proves multi-game better), and any Stripe/Pusher surface (demoted in #3 — a screenshot would re-promote them).

### LLB Dojo (three)

| # | Capture | Sits beside | Access | Staging notes |
|---|---------|-------------|--------|---------------|
| 6 | Sandbox **mid-simulation** | Physics engine item | public | **Recapture** — the existing `dojo-sandbox.png` shows an empty stage. Must show characters placed, attack angles active, SVG trajectories with midpoint arrow markers |
| 7 | Daily puzzle with a scored result | Expert-consensus scoring item | live attempt | Tier banding on screen turns the scoring ADR into a visible product mechanic; wants a real, plausible attempt |
| 8 | Owner admin panel (sensei management + puzzle queue) | Lifecycle-runs-itself item | Harry's session | Same evidential job as Dizzy's admin shot |

**Deliberately excluded: the leaderboard.** #3 ruled Dojo must not lead with audience size; a leaderboard capture would put the ~20-user community on screen next to Dizzy's 5,590. The discipline item (tests, ADRs, CONTEXT.md) is evidenced by the ADR exhibit already on the page, not a screenshot.

### Riichy (one)

| # | Capture | Sits beside | Access | Staging notes |
|---|---------|-------------|--------|---------------|
| 9 | Per-player fairness stats view (pairings, seat counts, sanma rotation) | `/riichy` compact page (per #19) | public | Staged with a **plausible fake roster** — never real club members' names |

## Theme per capture

**Light theme everywhere the product offers it; the OBS overlay is the one sanctioned exception.** #12 tested exactly this: light captures hold on the near-white ground because the hairline, the single shadow, and the drift itself separate card from page. Nine light shots keep the quiet register and show the products as their defaults actually ship. The overlay's native context is composited over gameplay — captured honestly it will be dark/vivid, and beside the production-plumbing claim, looking like a broadcast graphic *is* the evidence.

**Recorded fact — Dizzy.gg palette** (was unrecorded): near-white grey ground, dark navy ink, red wordmark, teal accent; light theme by default, **dark theme shipped** but unused for these captures. Dojo and Riichy both ship next-themes; captured light.

## Framing standard

- **The #12 card, unchanged**: white card, hairline border, the page's one shadow. Nine shots on three pages read as one system; nothing heavier earned its place.
- **Bare crops, no browser chrome** — no fake toolbar or URL bar. The live links beside the cards do the "this is real" work chrome would fake.
- **Uniform geometry**: browser shots at the proven ~1440×900 viewport, retina 2×, one shared landscape aspect ratio. Two self-shaping exceptions: the **mobile shot** is a tall narrow capture in the same white card — no skeuomorphic bezel; the aspect ratio says "phone" — and the **OBS overlay** captures at its native 1920×1080.
- **Every card carries a one-line evidential caption** in the quiet register ("Scene-moderator dashboard, live"). The same sentence is the alt text — caption and a11y from one line.

## Drift and clearings on case-study pages (the #13 deferral)

**Extended — one ground, every route.** The drift runs behind case-study pages too; each prose section sits in **one continuous frosted clearing** (`bg-white/75` + 2px blur, borderless, per #12); the drift lives in the margins, between sections, and around the screenshot cards. You never navigate from the atmospheric poster into a flat white document. Reduced motion stays uniform: every route degrades to the same ruled poster. The #8 machinery (tab-hide pause, reduce = still, canvas never LCP) already covers the long-reading cost; "marginal at rest" is the direction's accepted character, not a failure of it.

## Privacy rule — hard gate

This repo is public: **every committed PNG is published the instant it lands.**

1. Auth-gated captures may only show data **already public on the site** — player tags and tournament names yes; emails, Discord IDs, reports, moderation notes, never.
2. **Harry eyeballs every auth-gated capture before it is committed.** This is a checklist step in the capture task, not a suggestion.
3. The Riichy roster is staged with plausible fake names.

## Carried to the capture task

- Confirm whether the OBS overlay route is publicly reachable or auth-gated (decides script vs manual capture).
- Session-cookie injection into the proven playwright-core pipeline for the two admin captures, or Harry captures manually.
- Mobile capture happens on Harry's phone against the current live build.
- Dojo sandbox staging: choose a scenario that shows multiple angles and at least one reflected trajectory (capture-time judgment).
