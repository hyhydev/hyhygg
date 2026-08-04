# ADR exhibits (final text for the case-study pages)

The two decision records that ship as inline "primary source" exhibits, per
[#9](https://github.com/hyhydev/hyhygg/issues/9) (selection, framing) and
[#15](https://github.com/hyhydev/hyhygg/issues/15) (extraction). Reproduced
verbatim from each project's decision log; redacted where noted — no stylistic
edits. Corpus counts are as of extraction (2026-08-04).

Framing rules from #9: each exhibit renders inline in its case-study page at
the point where the page makes the claim it proves, visually distinct, labelled
honestly (e.g. "reproduced from the project's decision log; redacted where
noted"), with ADR number, date, and the corpus-context line.

---

## Exhibit 1 — Dizzy.gg · ADR 0061 (2026-07-01)

**Corpus context:** one of 94 decision records in the repo.
**Claim it proves:** the architecture was game-neutral by design — the
multi-game, multi-community platform is the data model catching up with a
decision, not a rewrite.

> # Player-scoped profile and a warping, active-game site flow
>
> **Context.** The `Player` is one cross-game identity, but the profile route (`/[game]/players/[id]`) and the whole navigation were game-scoped and LLB-hardcoded — a player with both LLB and LL1 data had two disjoint profile pages, and the navbar/homepage pointed at `/llb` literally. Now that both games carry live data (and more games/communities are planned, a player in any subset), the game-as-primary-axis routing felt wrong: the Player is the identity, the Game is a lens on their record. The data model was already game-neutral (`rank`, `currentRatings`, leaderboard stats, and `PlayerCharacter` are all keyed per game; only name/slug/country/claim are identity), so this is a routing and presentation change, not a migration.
>
> **Decision.**
>
> 1. **Player Profile becomes player-scoped: `/players/[id]`.** No `game` segment. A fixed identity band (name, country, avatar, Slug, Claim) sits above a per-game **stats band** (rank, rating history, main character, tournament history) selected by a **Game lens**. The lens is addressed by `?game=<id>` (shallow-routed, deep-linkable); with no param it defaults to the **subject's Primary Game**. A single-game player sees no lens chrome; a multi-game player gets a compact per-game strip that doubles as the switcher.
>
> 2. **The site warps to the user's world (Active Game), it is not a neutral wiki.** Game-scoped surfaces (Players/Tournaments/H2H leaderboards, homepage lists) follow a persistent **Active Game** chosen in a navbar switcher. Global surfaces (Events, Series, Communities, Profile) stay game-neutral. Active Game resolves: signed-in + claimed → their Primary Game; anonymous → cookie → site-wide most-active game (computed, never a hardcoded `llb`).
>
> 3. **The homepage is adaptive.** A claimed user gets a single-Active-Game homepage (their scene). An anonymous visitor — who has no world yet — gets a **multi-game platform front door** pitching the platform ("host and compete in FGC communities") with each game as a way in. The anon homepage always shows the platform door; it does not warp on a cookie.
>
> 4. **Directional split for defaults.** *Navigational* surfaces default to the **viewer's** Active Game; a *Player Profile* defaults to the **subject's** Primary Game (defaulting a profile to the viewer's game would routinely render an empty page for a player who never touched that game).
>
> 5. **Scope boundary.** This pass is the **Game axis only**. Community (a filtered view *within* a game, ADR 0053) is a later, second-level lens: the switcher and stats band are designed to *accept* a `Game → Community` sub-selection, but it is not built now.
>
> 6. **API.** `/api/v1/players/[id]` goes cross-game (identity + per-game blocks), updated in place in v1 (no consumers yet). Leaderboard/H2H/overlay endpoints stay game-scoped. No web back-compat redirects — the old `/[game]/players/[id]` links are not public, so the route simply moves.
>
> **Primary Game** = a Player's most-recent rated activity (tiebreak: tournament count). Replaces the Account Hub's `llb || first` placeholder.
>
> **Consequences.**
> - The Player Profile is the one surface that escapes the `[game]` segment; game-scoped *collections* (leaderboard, tournament list) legitimately keep it. That asymmetry is intentional: a leaderboard is per-game, an identity is not.
> - The Active Game is persisted in a functional cookie for anonymous users, which requires a cookie consent/management surface before shipping.
> - "Most-active game" must be a computed default everywhere; any remaining hardcoded `llb` is a bug once a second scene can overtake it.

**Redactions:** none required.

---

## Exhibit 2 — LLB Dojo · ADR 0001 (2026-05-01)

**Corpus context:** one of 11 decision records in the repo.
**Claim it proves:** product judgment — choosing expert consensus over
algorithmic evaluation because the domain's "best answer" is genuinely
subjective.

> # Expert-sourced daily puzzle answers instead of algorithmic evaluation
>
> The tool simulates ball paths deterministically, but "best defensive position" is subjective — it depends on character mobility, timing, and option-select judgement that cannot be reduced to geometry. We use up to 5 hand-picked expert players to pre-submit their defensive answers before each puzzle goes live. The expert consensus (outlier-removed average) becomes the canonical answer against which all user submissions are scored.
>
> ## Considered options
>
> - **Algorithmic** — score by whether the user's position intersects a ball path. Rejected: doesn't capture option-select quality or character-specific mobility; produces trivially correct answers (any point on any line scores).
> - **Community vote** — crowdsource the answer from all users after puzzle closes. Rejected: susceptible to groupthink and low-skill consensus; delays the answer reveal.
>
> ## Consequences
>
> Puzzles require expert pre-submission before going live. If fewer than 2 experts submit, the consensus algorithm degrades to a single random pick. Tier thresholds (currently ≤10/30/60/100/150px) may need tuning once real submissions exist.

**Redactions:** none required.
