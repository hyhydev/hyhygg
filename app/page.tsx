import Image from "next/image";
import Reveal from "./_components/Reveal";
import FieldBackdrop from "./_components/FieldBackdrop";
import BackToTop from "./_components/BackToTop";
import CountUp from "./_components/CountUp";
import {
  Clearing,
  FieldLink,
  SectionMark,
  SiteFooter,
  SiteHeader,
} from "./_components/field";
import { hero, about, projectsIntro, experience, educationLine, talks, contact } from "./_content/site";
import { stackStrip } from "./_content/skills";
import { dizzy, dizzyCard, dizzyStats, dizzyStatsNote } from "./_content/dizzy";
import { dojo, dojoCard } from "./_content/dojo";
import { riichy, riichyStrip } from "./_content/riichy";
import type { Capture } from "./_content/types";

// The Field direction (wayfinder #13), promoted from the winning prototype:
// white ground, greyscale line drift, Archivo alone, zero functional colour.
// Grafts from Instrument per #13: CountUp on the Dizzy stats row, back-to-top.

export const metadata = {
  description: hero.tagline,
};

// A flagship project card: the screenshot is the only colour, so it gets the
// only hard edges — white card, hairline, the page's one shadow (#12).
function ProjectCard({
  name,
  url,
  scope,
  blurb,
  caseStudyHref,
  screenshot,
  children,
}: {
  name: string;
  url: string;
  scope: string;
  blurb: string;
  caseStudyHref: string;
  screenshot: Capture;
  children?: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)]">
      <Image
        src={screenshot.src}
        alt={screenshot.caption}
        width={screenshot.width}
        height={screenshot.height}
        sizes="(min-width: 1120px) 1024px, 100vw"
        className="w-full border-b border-[#ececec]"
      />
      <div className="p-8 sm:p-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#6b6b6b]">
          {scope}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <FieldLink href={url} className="no-underline hover:underline">
            {name}
          </FieldLink>
          <span className="ml-3 text-[13px] font-normal tracking-normal text-[#6b6b6b]">
            {url.replace("https://", "")} ↗
          </span>
        </h3>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-[#3d3d3d]">{blurb}</p>
        {children}
        <p className="mt-7">
          <FieldLink href={caseStudyHref} className="text-[14px] font-medium">
            Read the case study →
          </FieldLink>
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <FieldBackdrop />
      <SiteHeader />

      {/* ── hero — the name IS the section, straight on the drift ─ */}
      <section className="mx-auto flex min-h-[calc(100svh-80px)] max-w-[1120px] flex-col justify-center px-6 pb-24 sm:px-8">
        <h1 className="text-[clamp(4.5rem,15vw,12.5rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance">
          {hero.name}
        </h1>
        <p className="mt-8 max-w-[40ch] text-[15px] leading-[1.7] text-[#3d3d3d] sm:text-base">
          {hero.tagline}
        </p>
        <p aria-hidden className="mt-16 text-[11px] uppercase tracking-[0.3em] text-[#6b6b6b]">
          Scroll ↓
        </p>
      </section>

      {/* ── about — a clearing, pushed off-centre ──────────────── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal className="sm:ml-auto sm:max-w-[640px]">
          <Clearing>
            <SectionMark label="About" />
            <div className="mt-6 space-y-5 text-[15px] leading-[1.75] text-[#3d3d3d]">
              {about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Clearing>
        </Reveal>
      </section>

      {/* ── work — two flagship cards + the Riichy strip (#19) ─── */}
      <section id="work" className="scroll-mt-8 mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal className="max-w-[46ch]">
          <SectionMark label="Work" />
          <p className="mt-6 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
            {projectsIntro}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ProjectCard
            name={dizzy.name}
            url={dizzy.url}
            scope={dizzyCard.scope}
            blurb={dizzyCard.blurb}
            caseStudyHref="/dizzy"
            screenshot={dizzyCard.screenshot}
          >
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              {dizzyStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight tabular-nums">
                    <CountUp to={s.value} prefix={s.approx ? "~" : ""} />
                  </dd>
                  <dd className="mt-1 text-[12px] uppercase tracking-[0.15em] text-[#6b6b6b]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[13px] text-[#6b6b6b]">{dizzyStatsNote}</p>
          </ProjectCard>
        </Reveal>

        <Reveal className="mt-16">
          <ProjectCard
            name={dojo.name}
            url={dojo.url}
            scope={dojoCard.scope}
            blurb={dojoCard.blurb}
            caseStudyHref="/dojo"
            screenshot={dojoCard.screenshot}
          >
            <ul className="mt-7 space-y-2 text-[14px] leading-relaxed text-[#3d3d3d]">
              {dojoCard.craft.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden className="mt-[9px] h-px w-5 shrink-0 bg-[#bdbdbd]" />
                  {c}
                </li>
              ))}
            </ul>
          </ProjectCard>
        </Reveal>

        {/* Riichy — a lighter, full-width strip, deliberately quieter than
            the two flagship cards (#19). */}
        <Reveal className="mt-16">
          <article className="rounded-2xl border border-[#ececec] bg-white/80 p-8 backdrop-blur-[2px] sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#6b6b6b]">
                  {riichyStrip.scope}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  <FieldLink href={riichy.url} className="no-underline hover:underline">
                    {riichy.name}
                  </FieldLink>
                  <span className="ml-3 text-[13px] font-normal tracking-normal text-[#6b6b6b]">
                    {riichy.url.replace("https://", "")} ↗
                  </span>
                </h3>
              </div>
              <FieldLink href="/riichy" className="text-[14px] font-medium">
                The one-afternoon build →
              </FieldLink>
            </div>
            <p className="mt-4 max-w-[70ch] text-[15px] leading-[1.75] text-[#3d3d3d]">
              {riichyStrip.blurb}
            </p>
          </article>
        </Reveal>
      </section>

      {/* ── stack — pills scattered on the field ───────────────── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal>
          <SectionMark label="Stack" />
          <ul className="mt-8 flex max-w-[820px] flex-wrap gap-2.5">
            {stackStrip.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[#e4e4e4] bg-white/80 px-3.5 py-1.5 text-[13px] text-[#3d3d3d]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-[#6b6b6b]">
            The full list, with versions and contexts, is in the{" "}
            <FieldLink href={contact.cvPath} className="text-[#3d3d3d]">
              CV
            </FieldLink>
            .
          </p>
        </Reveal>
      </section>

      {/* ── experience — one wide clearing, rows with no rules ─── */}
      <section id="experience" className="scroll-mt-8 mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal>
          <Clearing>
            <SectionMark label="Experience" />
            <div className="mt-8 space-y-10">
              {experience.map((role) => (
                <article key={role.org} className="grid gap-x-8 gap-y-1 sm:grid-cols-[110px_1fr]">
                  <p className="text-[13px] text-[#6b6b6b] tabular-nums">{role.years}</p>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-tight">
                      {role.org}
                      <span className="ml-3 text-[14px] font-normal text-[#6b6b6b]">
                        {role.title}
                      </span>
                    </h3>
                    <p className="mt-2 max-w-[68ch] text-[14px] leading-[1.7] text-[#3d3d3d]">
                      {role.line}
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.15em] text-[#6b6b6b]">
                      {role.clients.join(" · ")}
                    </p>
                  </div>
                </article>
              ))}
              <p className="text-[13px] leading-relaxed text-[#6b6b6b] sm:col-start-2">
                {educationLine}
              </p>
            </div>
          </Clearing>
        </Reveal>
      </section>

      {/* ── talks — a quiet list that reads well with one entry (#14) ─ */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal className="max-w-[560px]">
          <SectionMark label="Talks" />
          <ul className="mt-6 space-y-3">
            {talks.map((talk) => (
              <li key={talk.title} className="text-[15px] leading-[1.75] text-[#3d3d3d]">
                <span className="font-medium text-[#161616]">{talk.title}</span>
                <span className="text-[#6b6b6b]">
                  {" "}
                  · {talk.venue}
                  {talk.year !== null && ` · ${talk.year}`}
                </span>
                {talk.deck !== null && (
                  <>
                    {" "}
                    · <FieldLink href={talk.deck}>Slides (PDF)</FieldLink>
                  </>
                )}
                {talk.recording !== null && (
                  <>
                    {" "}
                    · <FieldLink href={talk.recording}>Recording</FieldLink>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── contact — big, open, straight on the drift ─────────── */}
      <section id="contact" className="scroll-mt-8 mx-auto max-w-[1120px] px-6 pb-24 sm:px-8">
        <Reveal className="py-10 text-center sm:py-16">
          <SectionMark label="Contact" />
          <p className="mx-auto mt-8 max-w-[24ch] text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            {contact.sentence}{" "}
            <FieldLink href={`mailto:${contact.email}`}>{contact.email}</FieldLink>
          </p>
          <p className="mt-8 text-[14px] text-[#3d3d3d]">
            Or find me on <FieldLink href={contact.github}>GitHub</FieldLink> ·{" "}
            <FieldLink href={contact.cvPath}>Download CV (PDF)</FieldLink>
          </p>
          <p className="mt-4 text-[13px] text-[#6b6b6b]">{contact.freelanceLine}</p>
        </Reveal>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
