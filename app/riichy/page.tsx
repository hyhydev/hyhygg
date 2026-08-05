import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import FieldBackdrop from "../_components/FieldBackdrop";
import BackToTop from "../_components/BackToTop";
import {
  Clearing,
  FieldLink,
  ScreenshotCard,
  SectionMark,
  SiteFooter,
  SiteHeader,
} from "../_components/field";
import { StackSection } from "../_components/case-study";
import { riichy } from "../_content/riichy";

// The one-off compact page (wayfinder #19) — not a case study. The afternoon
// timeline is the hero artifact; the copy claims "one afternoon" only and the
// timeline carries the sub-2-hour fact.

export const metadata: Metadata = {
  title: "Riichy",
  description:
    "A fairness-optimising table-draw manager for a local riichi mahjong club — blank repo to deployed product in one afternoon, with the discipline intact.",
};

export default function RiichyPage() {
  return (
    <div className="min-h-screen">
      <FieldBackdrop />
      <SiteHeader />

      <section className="mx-auto max-w-[1120px] px-6 pt-16 pb-20 sm:px-8 sm:pt-24">
        <SectionMark label="The afternoon build" />
        <h1 className="mt-6 text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
          {riichy.name}
        </h1>
        <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.7] text-[#3d3d3d] sm:text-lg">
          {riichy.oneLiner}
        </p>
        <p className="mt-6 text-[15px]">
          <FieldLink href={riichy.url} className="font-medium">
            Live at {riichy.url.replace("https://", "")} ↗
          </FieldLink>
        </p>

        {/* The hero artifact: one afternoon, git-evidenced. */}
        <div className="mt-14 max-w-[720px]">
          <ol className="space-y-4">
            {riichy.timeline.map((entry) => (
              <li key={entry.time} className="grid gap-x-8 gap-y-1 sm:grid-cols-[130px_1fr]">
                <p className="text-[14px] font-semibold tracking-tight tabular-nums">
                  {entry.time}
                </p>
                <p className="text-[14px] leading-[1.7] text-[#3d3d3d]">{entry.event}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[14px] leading-[1.7] text-[#6b6b6b]">{riichy.timelineNote}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
        <Reveal>
          <Clearing className="max-w-[720px]">
            <SectionMark label="What it does" />
            <div className="mt-6 space-y-5 text-[15px] leading-[1.75] text-[#3d3d3d]">
              {riichy.what.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Clearing>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
        <Reveal className="mx-auto max-w-[900px]">
          <ScreenshotCard capture={riichy.statsShot} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
        <Reveal className="sm:ml-auto sm:max-w-[720px]">
          <Clearing>
            <SectionMark label="The discipline receipts" />
            <ul className="mt-6 space-y-4 text-[15px] leading-[1.75] text-[#3d3d3d]">
              {riichy.receipts.map((r) => (
                <li key={r.slice(0, 24)} className="flex gap-3">
                  <span aria-hidden className="mt-[12px] h-px w-5 shrink-0 bg-[#bdbdbd]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Clearing>
        </Reveal>
      </section>

      <StackSection stack={riichy.stack} />

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
