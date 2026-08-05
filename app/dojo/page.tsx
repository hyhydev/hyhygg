import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import FieldBackdrop from "../_components/FieldBackdrop";
import BackToTop from "../_components/BackToTop";
import { SectionMark, SiteFooter, SiteHeader } from "../_components/field";
import { CaseHero, HighlightBlock, ProseSection, StackSection } from "../_components/case-study";
import { DojoAdrExhibit } from "../_content/exhibits";
import { dojo, dojoProofLead, dojoProofLines } from "../_content/dojo";

export const metadata: Metadata = {
  title: "LLB Dojo",
  description:
    "Case study: a daily-puzzle positioning trainer for Lethal League Blaze — a custom 2D physics engine, expert-consensus scoring, and a puzzle lifecycle that has run itself daily since launch.",
};

export default function DojoPage() {
  return (
    <div className="min-h-screen">
      <FieldBackdrop />
      <SiteHeader />

      <CaseHero name={dojo.name} url={dojo.url} oneLiner={dojo.oneLiner}>
        {/* This page leads with the proof it has — craft and reliability,
            never audience size (#3). */}
        <p className="mt-14 max-w-[46ch] text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
          {dojoProofLead}
        </p>
      </CaseHero>

      <ProseSection label="The problem" paras={dojo.problem} />
      <ProseSection label="My role" paras={dojo.role} className="sm:ml-auto sm:max-w-[720px]" />

      <section className="mx-auto max-w-[1120px] px-6 sm:px-8">
        <Reveal className="pb-12">
          <SectionMark label="What's technically interesting" />
        </Reveal>
        {dojo.highlights.map((h, i) => (
          <div key={h.title}>
            <HighlightBlock highlight={h} offset={i % 2 === 1} />
            {/* The scoring decision's primary source, beside the claim it
                proves (#9). */}
            {h.title === "Choosing human judgement over an algorithm" && (
              <Reveal className="mx-auto mb-20 max-w-[900px]">
                <DojoAdrExhibit />
              </Reveal>
            )}
          </div>
        ))}
      </section>

      <StackSection stack={dojo.stack} />

      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal>
          <SectionMark label="Proof" />
          <ul className="mt-6 space-y-2 text-[14px] leading-relaxed text-[#3d3d3d]">
            {dojoProofLines.map((line) => (
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
