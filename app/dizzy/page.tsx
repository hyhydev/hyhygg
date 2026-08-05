import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import FieldBackdrop from "../_components/FieldBackdrop";
import BackToTop from "../_components/BackToTop";
import CountUp from "../_components/CountUp";
import { SectionMark, ShotSlot, SiteFooter, SiteHeader } from "../_components/field";
import { CaseHero, HighlightBlock, ProseSection, StackSection } from "../_components/case-study";
import { DizzyAdrExhibit } from "../_content/exhibits";
import { dizzy, dizzySecondaryProof, dizzyStats, dizzyStatsNote } from "../_content/dizzy";

export const metadata: Metadata = {
  title: "Dizzy.gg",
  description:
    "Case study: a multi-game competitive rankings and tournament-operations platform, running in production across 3 games and 10 communities — built and operated by one person.",
};

export default function DizzyPage() {
  return (
    <div className="min-h-screen">
      <FieldBackdrop />
      <SiteHeader />

      <CaseHero name={dizzy.name} url={dizzy.url} oneLiner={dizzy.oneLiner}>
        {/* The usage numbers are the visual anchor of the page (#3) — large,
            early, counting (the #13 CountUp graft). */}
        <dl className="mt-14 flex max-w-[900px] flex-wrap gap-x-12 gap-y-6">
          {dizzyStats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                <CountUp to={s.value} prefix={s.approx ? "~" : ""} />
              </dd>
              <dd className="mt-2 text-[12px] uppercase tracking-[0.15em] text-[#6b6b6b]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[14px] text-[#6b6b6b]">{dizzyStatsNote}</p>
      </CaseHero>

      <ProseSection label="The problem" paras={dizzy.problem} />

      {/* The decision record that dates the game-neutral claim — the primary
          source, placed beside the claim it proves (#9). */}
      <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
        <Reveal className="mx-auto max-w-[900px]">
          <DizzyAdrExhibit />
        </Reveal>
      </section>

      <ProseSection label="My role" paras={dizzy.role} className="sm:ml-auto sm:max-w-[720px]" />
      {dizzy.roleShot && (
        <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
          <Reveal className="mx-auto max-w-[900px]">
            <ShotSlot shot={dizzy.roleShot} />
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-[1120px] px-6 sm:px-8">
        <Reveal className="pb-12">
          <SectionMark label="What's technically interesting" />
        </Reveal>
        {dizzy.highlights.map((h, i) => (
          <HighlightBlock key={h.title} highlight={h} offset={i % 2 === 1} />
        ))}
      </section>

      <StackSection stack={dizzy.stack} />

      {/* Code metrics deliberately last (#3): usage proves it's real; ADR and
          test counts do the discipline-signalling. */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal>
          <SectionMark label="Proof" />
          <ul className="mt-6 space-y-2 text-[14px] leading-relaxed text-[#3d3d3d]">
            {dizzySecondaryProof.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="mt-[11px] h-px w-5 shrink-0 bg-[#bdbdbd]" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
