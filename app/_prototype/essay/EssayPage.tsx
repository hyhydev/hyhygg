"use client";

// PROTOTYPE — the Essay direction (wayfinder #11): light, editorial.
// Warm off-white paper, near-black ink, achromatic warm greys. One centred
// column of prose at ~68ch; product screenshots break out of the column as
// full-bleed captioned figures — the only colour on the page. Fraunces (high-
// contrast serif, optical sizing) for display and prose; Source Sans 3
// (humanist) for nav, labels, and captions. Reveal is the single scroll
// primitive; nothing else moves. GlareHover deliberately omitted — restraint
// is the bet this direction makes.

import Image from "next/image";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Reveal from "../Reveal";
import {
  hero,
  about,
  projectsIntro,
  dizzy,
  dojo,
  skillGroups,
  experience,
  educationLine,
  writing,
  contact,
} from "../content";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

// Palette notes: paper #faf7f2; ink #1f1c18; hairlines #e5dfd4. The contrast
// wall from #8 forbids text lighter than #767676 on white — the faintest text
// here is #6e675d, and only at label sizes. No accent colour anywhere: links
// are ink with a warm-grey underline that darkens on hover.
const serif = "font-[family-name:var(--font-fraunces)]";
const sans = "font-[family-name:var(--font-source-sans)]";

function SectionBreak({ label }: { label: string }) {
  return (
    <div
      className={`${sans} flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.3em] text-[#6e675d]`}
    >
      <span aria-hidden className="h-px w-10 bg-[#d8d1c4]" />
      <span>{label}</span>
      <span aria-hidden className="h-px w-10 bg-[#d8d1c4]" />
    </div>
  );
}

function InkLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      className={`underline decoration-[#b8ae9d] decoration-1 underline-offset-4 transition-colors hover:decoration-[#1f1c18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f1c18] ${className}`}
    >
      {children}
    </a>
  );
}

// The primary experiment of this prototype: how a light product UI is held on
// light paper. Treatment — hairline border, white mat, one soft shadow lifting
// it off the page; a centred caption in the sans with a figure number.
function Figure({
  n,
  screenshot,
  caption,
  url,
}: {
  n: number;
  screenshot: { src: string; alt: string; width: number; height: number };
  caption: string;
  url: string;
}) {
  return (
    <figure className="mx-auto mt-12 w-full max-w-[1150px] sm:px-8">
      <div className="border-y border-[#d8d1c4] bg-white shadow-[0_32px_70px_-30px_rgba(31,28,24,0.35)] sm:border-x">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          sizes="(min-width: 1240px) 1086px, 100vw"
          className="w-full"
        />
      </div>
      <figcaption
        className={`${sans} mx-auto mt-4 flex max-w-[72ch] flex-wrap items-baseline justify-center gap-x-3 gap-y-1 px-6 text-center text-[13px] leading-relaxed text-[#57524a]`}
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#6e675d]">
          Fig. {n}
        </span>
        <span>{caption}</span>
        <InkLink href={url} className="whitespace-nowrap text-[#1f1c18]">
          {url.replace("https://", "")} ↗
        </InkLink>
      </figcaption>
    </figure>
  );
}

export default function EssayPage() {
  return (
    <div
      className={`${fraunces.variable} ${sourceSans.variable} ${serif} min-h-screen bg-[#faf7f2] text-[#1f1c18] antialiased selection:bg-[#1f1c18] selection:text-[#faf7f2]`}
    >
      {/* ── header ─────────────────────────────────────────────── */}
      <header
        className={`${sans} mx-auto flex max-w-[1150px] items-baseline justify-between px-6 py-5 sm:px-8`}
      >
        <span className={`${serif} text-lg italic`}>hyhy.gg</span>
        <nav className="flex gap-6 text-[12px] uppercase tracking-[0.2em] text-[#57524a]">
          <a href="#work" className="transition-colors hover:text-[#1f1c18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f1c18]">Work</a>
          <a href="#experience" className="transition-colors hover:text-[#1f1c18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f1c18]">Experience</a>
          <a href="#contact" className="transition-colors hover:text-[#1f1c18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f1c18]">Contact</a>
        </nav>
      </header>
      <div aria-hidden className="mx-auto max-w-[1150px] border-b border-[#e5dfd4]" />

      {/* ── hero — centred title block, then left prose ────────── */}
      <section className="px-6 pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-[72ch] text-center">
          <p className={`${sans} text-[12px] uppercase tracking-[0.3em] text-[#6e675d]`}>
            Portfolio of
          </p>
          <h1 className="mt-6 text-6xl font-medium tracking-tight text-balance sm:text-8xl">
            {hero.name}
          </h1>
          <p className="mx-auto mt-8 max-w-[44ch] text-xl leading-relaxed italic text-[#33302b] sm:text-2xl">
            {hero.tagline}
          </p>
          <div aria-hidden className="mx-auto mt-10 h-px w-16 bg-[#d8d1c4]" />
        </div>
        <div className="mx-auto mt-12 max-w-[68ch] space-y-6 text-[17px] leading-[1.75] text-[#33302b] sm:text-lg sm:leading-[1.8]">
          {about.map((p, i) => (
            <p
              key={p.slice(0, 24)}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mt-1 first-letter:pr-3 first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:font-medium"
                  : ""
              }
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── work ───────────────────────────────────────────────── */}
      <section id="work" className="scroll-mt-8 px-0 py-16 sm:py-20">
        <Reveal className="px-6">
          <SectionBreak label="Work" />
          <p className="mx-auto mt-10 max-w-[30ch] text-center text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
            {projectsIntro}
          </p>
        </Reveal>

        {/* Dizzy — figure first, then prose */}
        <Reveal>
          <Figure
            n={1}
            screenshot={dizzy.screenshot}
            caption={`${dizzy.name} — ${dizzy.scope.toLowerCase()}.`}
            url={dizzy.url}
          />
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-[68ch] px-6">
          <h3 className="text-2xl font-medium tracking-tight">{dizzy.name}</h3>
          <p className="mt-4 text-[17px] leading-[1.75] text-[#33302b] sm:text-lg sm:leading-[1.8]">
            {dizzy.card} Under the hood: a Glicko-2 engine that can
            deterministically recalculate all 30,028 sets, 62 oRPC procedures
            serving web, Expo, and a public REST API, and 89 architecture
            decision records.
          </p>
        </Reveal>
        {/* the proof, set as an editorial "by the numbers" line */}
        <Reveal className="mx-auto mt-10 max-w-[72ch] px-6">
          <div className="border-y border-[#d8d1c4] py-5 text-center">
            <p className="text-lg leading-relaxed oldstyle-nums sm:text-xl">
              {dizzy.stats
                .map((s) => `${s.approx ? "~" : ""}${s.value.toLocaleString("en-GB")} ${s.label}`)
                .join(" · ")}
            </p>
            <p className={`${sans} mt-2 text-[12px] uppercase tracking-[0.2em] text-[#6e675d]`}>
              {dizzy.statsNote}
            </p>
          </div>
        </Reveal>

        {/* Dojo — same treatment, held constant */}
        <Reveal className="mt-20">
          <Figure
            n={2}
            screenshot={dojo.screenshot}
            caption={`${dojo.name} — ${dojo.scope.toLowerCase()}.`}
            url={dojo.url}
          />
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-[68ch] px-6">
          <h3 className="text-2xl font-medium tracking-tight">{dojo.name}</h3>
          <p className="mt-4 text-[17px] leading-[1.75] text-[#33302b] sm:text-lg sm:leading-[1.8]">
            {dojo.card} The craft is the point here: {dojo.craft[0]}, a{" "}
            {dojo.craft[1]}, and every attempt {dojo.craft[2]}.
          </p>
        </Reveal>
      </section>

      {/* ── stack — set as a colophon index ────────────────────── */}
      <section className="px-6 py-16 sm:py-20">
        <Reveal>
          <SectionBreak label="Stack" />
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-[68ch]">
          <dl>
            {skillGroups.map((g) => (
              <div
                key={g.group}
                className="flex flex-col gap-x-8 border-b border-[#e5dfd4] py-3 first:border-t sm:flex-row"
              >
                <dt
                  className={`${sans} w-44 shrink-0 pt-1 text-[11px] uppercase tracking-[0.2em] text-[#6e675d]`}
                >
                  {g.group}
                </dt>
                <dd className="text-[16px] leading-relaxed text-[#33302b]">
                  {g.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ── experience ─────────────────────────────────────────── */}
      <section id="experience" className="scroll-mt-8 px-6 py-16 sm:py-20">
        <Reveal>
          <SectionBreak label="Experience" />
        </Reveal>
        <div className="mx-auto mt-10 max-w-[68ch]">
          {experience.map((role) => (
            <Reveal key={role.org}>
              <article className="border-b border-[#e5dfd4] py-7 first:border-t">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-xl font-medium tracking-tight">
                    {role.org}
                    <span className="ml-3 text-lg font-normal italic text-[#57524a]">
                      {role.title}
                    </span>
                  </h3>
                  <span className={`${sans} text-[13px] text-[#6e675d] oldstyle-nums`}>
                    {role.years}
                  </span>
                </div>
                <p className="mt-3 text-[16px] leading-[1.75] text-[#33302b]">{role.line}</p>
                <p className={`${sans} mt-2 text-[12px] uppercase tracking-[0.15em] text-[#6e675d]`}>
                  {role.clients.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <p className="pt-6 text-[14px] leading-relaxed italic text-[#57524a]">
              {educationLine}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── writing ────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:py-20">
        <Reveal>
          <SectionBreak label="Writing" />
          <div className="mx-auto mt-10 max-w-[68ch]">
            <p className="text-[17px] leading-[1.75] text-[#33302b]">{writing.blurb}</p>
            <p className={`${sans} mt-4 text-[13px] text-[#57524a]`}>
              Talks: {writing.talks.join(" · ")} — {writing.talksNote}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── contact ────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-8 px-6 py-16 sm:py-24">
        <Reveal>
          <SectionBreak label="Contact" />
          <div className="mx-auto mt-10 max-w-[68ch] text-center">
            <p className="text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
              {contact.sentence}{" "}
              <InkLink href={`mailto:${contact.email}`}>{contact.email}</InkLink>, or find me
              on <InkLink href={contact.github}>GitHub</InkLink>.
            </p>
            <p className={`${sans} mt-8 text-[14px] text-[#57524a]`}>
              <InkLink href={contact.cvPath} className="text-[#1f1c18]">
                Download CV (PDF)
              </InkLink>
            </p>
            <p className={`${sans} mt-3 text-[13px] italic text-[#57524a]`}>
              {contact.freelanceLine}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── footer — colophon ──────────────────────────────────── */}
      <footer className="px-6 pt-4 pb-10 text-center">
        <p aria-hidden className="text-xl text-[#6e675d]">
          ⁂
        </p>
        <p className={`${sans} mt-4 text-[11px] uppercase tracking-[0.25em] text-[#6e675d]`}>
          hyhy.gg · prototype — essay · set in Fraunces &amp; Source Sans
        </p>
      </footer>
    </div>
  );
}
