// The two decision-record exhibits (wayfinder #9/#15), reproduced verbatim
// from docs/spec/adr-exhibits.md — no stylistic edits; the rough edges are
// the authenticity. Corpus counts as of extraction (2026-08-04); the map
// notes corpus-context copy should use live counts at build time.

import { AdrExhibit } from "../_components/AdrExhibit";

// Proves: the architecture was game-neutral by design — the multi-game,
// multi-community platform is the data model catching up with a decision,
// not a rewrite.
export function DizzyAdrExhibit() {
  return (
    <AdrExhibit
      project="Dizzy.gg"
      adr="ADR 0061"
      date="2026-07-01"
      corpusLine="one of 94 decision records in the repo"
      title="Player-scoped profile and a warping, active-game site flow"
    >
      <p>
        <strong>Context.</strong> The <code>Player</code> is one cross-game identity, but the
        profile route (<code>/[game]/players/[id]</code>) and the whole navigation were
        game-scoped and LLB-hardcoded — a player with both LLB and LL1 data had two disjoint
        profile pages, and the navbar/homepage pointed at <code>/llb</code> literally. Now that
        both games carry live data (and more games/communities are planned, a player in any
        subset), the game-as-primary-axis routing felt wrong: the Player is the identity, the
        Game is a lens on their record. The data model was already game-neutral
        (<code>rank</code>, <code>currentRatings</code>, leaderboard stats, and{" "}
        <code>PlayerCharacter</code> are all keyed per game; only name/slug/country/claim are
        identity), so this is a routing and presentation change, not a migration.
      </p>
      <p>
        <strong>Decision.</strong>
      </p>
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          <strong>Player Profile becomes player-scoped: <code>/players/[id]</code>.</strong> No{" "}
          <code>game</code> segment. A fixed identity band (name, country, avatar, Slug, Claim)
          sits above a per-game <strong>stats band</strong> (rank, rating history, main
          character, tournament history) selected by a <strong>Game lens</strong>. The lens is
          addressed by <code>?game=&lt;id&gt;</code> (shallow-routed, deep-linkable); with no
          param it defaults to the <strong>subject’s Primary Game</strong>. A single-game player
          sees no lens chrome; a multi-game player gets a compact per-game strip that doubles as
          the switcher.
        </li>
        <li>
          <strong>
            The site warps to the user’s world (Active Game), it is not a neutral wiki.
          </strong>{" "}
          Game-scoped surfaces (Players/Tournaments/H2H leaderboards, homepage lists) follow a
          persistent <strong>Active Game</strong> chosen in a navbar switcher. Global surfaces
          (Events, Series, Communities, Profile) stay game-neutral. Active Game resolves:
          signed-in + claimed → their Primary Game; anonymous → cookie → site-wide most-active
          game (computed, never a hardcoded <code>llb</code>).
        </li>
        <li>
          <strong>The homepage is adaptive.</strong> A claimed user gets a single-Active-Game
          homepage (their scene). An anonymous visitor — who has no world yet — gets a{" "}
          <strong>multi-game platform front door</strong> pitching the platform (“host and
          compete in FGC communities”) with each game as a way in. The anon homepage always
          shows the platform door; it does not warp on a cookie.
        </li>
        <li>
          <strong>Directional split for defaults.</strong> <em>Navigational</em> surfaces
          default to the <strong>viewer’s</strong> Active Game; a <em>Player Profile</em>{" "}
          defaults to the <strong>subject’s</strong> Primary Game (defaulting a profile to the
          viewer’s game would routinely render an empty page for a player who never touched that
          game).
        </li>
        <li>
          <strong>Scope boundary.</strong> This pass is the <strong>Game axis only</strong>.
          Community (a filtered view <em>within</em> a game, ADR 0053) is a later, second-level
          lens: the switcher and stats band are designed to <em>accept</em> a{" "}
          <code>Game → Community</code> sub-selection, but it is not built now.
        </li>
        <li>
          <strong>API.</strong> <code>/api/v1/players/[id]</code> goes cross-game (identity +
          per-game blocks), updated in place in v1 (no consumers yet). Leaderboard/H2H/overlay
          endpoints stay game-scoped. No web back-compat redirects — the old{" "}
          <code>/[game]/players/[id]</code> links are not public, so the route simply moves.
        </li>
      </ol>
      <p>
        <strong>Primary Game</strong> = a Player’s most-recent rated activity (tiebreak:
        tournament count). Replaces the Account Hub’s <code>llb || first</code> placeholder.
      </p>
      <p>
        <strong>Consequences.</strong>
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          The Player Profile is the one surface that escapes the <code>[game]</code> segment;
          game-scoped <em>collections</em> (leaderboard, tournament list) legitimately keep it.
          That asymmetry is intentional: a leaderboard is per-game, an identity is not.
        </li>
        <li>
          The Active Game is persisted in a functional cookie for anonymous users, which
          requires a cookie consent/management surface before shipping.
        </li>
        <li>
          “Most-active game” must be a computed default everywhere; any remaining hardcoded{" "}
          <code>llb</code> is a bug once a second scene can overtake it.
        </li>
      </ul>
    </AdrExhibit>
  );
}

// Proves: product judgment — choosing expert consensus over algorithmic
// evaluation because the domain's "best answer" is genuinely subjective.
export function DojoAdrExhibit() {
  return (
    <AdrExhibit
      project="LLB Dojo"
      adr="ADR 0001"
      date="2026-05-01"
      corpusLine="one of 11 decision records in the repo"
      title="Expert-sourced daily puzzle answers instead of algorithmic evaluation"
    >
      <p>
        The tool simulates ball paths deterministically, but “best defensive position” is
        subjective — it depends on character mobility, timing, and option-select judgement that
        cannot be reduced to geometry. We use up to 5 hand-picked expert players to pre-submit
        their defensive answers before each puzzle goes live. The expert consensus
        (outlier-removed average) becomes the canonical answer against which all user
        submissions are scored.
      </p>
      <p>
        <strong>Considered options</strong>
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Algorithmic</strong> — score by whether the user’s position intersects a ball
          path. Rejected: doesn’t capture option-select quality or character-specific mobility;
          produces trivially correct answers (any point on any line scores).
        </li>
        <li>
          <strong>Community vote</strong> — crowdsource the answer from all users after puzzle
          closes. Rejected: susceptible to groupthink and low-skill consensus; delays the answer
          reveal.
        </li>
      </ul>
      <p>
        <strong>Consequences</strong>
      </p>
      <p>
        Puzzles require expert pre-submission before going live. If fewer than 2 experts submit,
        the consensus algorithm degrades to a single random pick. Tier thresholds (currently
        ≤10/30/60/100/150px) may need tuning once real submissions exist.
      </p>
    </AdrExhibit>
  );
}
