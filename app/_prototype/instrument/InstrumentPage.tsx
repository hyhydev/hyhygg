"use client";

// PROTOTYPE — the Instrument direction (wayfinder #10): dark, systematic.
// Near-black world, visible grid, hairline rules, tabular metrics. Grotesque
// for headings and body (Geist), a real mono (Geist Mono) for labels, section
// numbers, the stack, and every number. One functional colour for links and
// focus. The screenshots are the only saturated pixels.

import Image from "next/image";
import Reveal from "../Reveal";
import SpotlightCard from "../bits/SpotlightCard";
import CountUp from "../bits/CountUp";
import LogoLoop from "../bits/LogoLoop";
import { useReducedMotion } from "../useReducedMotion";
import {
  hero,
  about,
  projectsIntro,
  dizzy,
  dojo,
  skillGroups,
  stackStrip,
  experience,
  educationLine,
  writing,
  contact,
} from "../content";

// Palette notes: page #0a0a0a; hairlines #1e1e1e; faintest text #8a8a8a —
// the contrast wall from #8 forbids anything darker than #7a7a7a on this
// ground. Accent is the single functional colour (links, focus, live dots).
const ACCENT = "#34d399";

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a8a8a]">
      <span aria-hidden>{n}</span>
      <span aria-hidden className="h-px w-8 self-center bg-[#2c2c2c]" />
      <span>{label}</span>
    </div>
  );
}

function ExternalLink({
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
      target="_blank"
      rel="noreferrer noopener"
      className={`text-[#34d399] underline decoration-[#34d399]/30 underline-offset-4 transition-colors hover:decoration-[#34d399] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34d399] ${className}`}
    >
      {children}
    </a>
  );
}

function ProjectCard({
  project,
  children,
}: {
  project: {
    name: string;
    url: string;
    card: string;
    scope: string;
    screenshot: { src: string; alt: string; width: number; height: number };
  };
  children: React.ReactNode;
}) {
  return (
    <SpotlightCard
      className="border border-[#1e1e1e] bg-[#0f0f0f]"
      spotlightColor="rgba(255, 255, 255, 0.07)"
    >
      <div className="border-b border-[#1e1e1e]">
        <Image
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
          sizes="(min-width: 1024px) 520px, 100vw"
          className="w-full"
        />
      </div>
      <div className="p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a8a8a]">
          {project.scope}
        </p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-100">
            {project.name}
          </h3>
          <ExternalLink href={project.url} className="font-mono text-sm no-underline">
            {project.url.replace("https://", "")} ↗
          </ExternalLink>
        </div>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-[#c4c4c4]">{project.card}</p>
        {children}
      </div>
    </SpotlightCard>
  );
}

export default function InstrumentPage() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-neutral-100 antialiased selection:bg-[#34d399] selection:text-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] border-x border-[#1e1e1e]">
        {/* ── header ─────────────────────────────────────────────── */}
        <header className="flex items-center justify-between border-b border-[#1e1e1e] px-6 py-4 sm:px-10">
          <span className="font-mono text-sm tracking-tight text-neutral-100">hyhy.gg</span>
          <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a8a8a]">
            <a href="#work" className="transition-colors hover:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34d399]">Work</a>
            <a href="#experience" className="transition-colors hover:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34d399]">Experience</a>
            <a href="#contact" className="transition-colors hover:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34d399]">Contact</a>
          </nav>
        </header>

        {/* ── 01 hero ────────────────────────────────────────────── */}
        <section className="px-6 py-20 sm:px-10 sm:py-28">
          <SectionLabel n="01" label="Ident" />
          <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl">
            {hero.name}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[#c4c4c4] sm:text-xl">
            {hero.tagline}
          </p>
          <div className="mt-10 max-w-[62ch] space-y-4 border-l border-[#2c2c2c] pl-6 text-[15px] leading-relaxed text-[#a8a8a8]">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        {/* ── 02 work ────────────────────────────────────────────── */}
        <section id="work" className="scroll-mt-8 border-t border-[#1e1e1e] px-6 py-16 sm:px-10 sm:py-20">
          <Reveal>
            <SectionLabel n="02" label="Work" />
            <p className="mt-6 max-w-[56ch] text-xl font-medium leading-snug tracking-tight text-neutral-100 sm:text-2xl">
              {projectsIntro}
            </p>
          </Reveal>

          {/* Dizzy proof row — the visual anchor of the page */}
          <Reveal className="mt-12">
            <div className="grid grid-cols-2 border border-[#1e1e1e] sm:grid-cols-5">
              {dizzy.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-4 py-5 sm:px-5 ${i > 0 ? "border-l border-[#1e1e1e] max-sm:odd:border-l-0" : ""} ${i >= 2 ? "max-sm:border-t max-sm:border-[#1e1e1e]" : ""}`}
                >
                  <div className="font-mono text-2xl tracking-tight text-neutral-100 tabular-nums sm:text-3xl">
                    <CountUp to={stat.value} prefix={stat.approx ? "~" : ""} />
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-[#8a8a8a]">
              <span aria-hidden className="mr-2 inline-block size-1.5 rounded-full align-middle" style={{ backgroundColor: ACCENT }} />
              dizzy.gg — {dizzy.statsNote}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <ProjectCard project={dizzy}>
                <ul className="mt-6 space-y-1.5 border-t border-[#1e1e1e] pt-5 font-mono text-[13px] text-[#a8a8a8]">
                  <li>glicko-2 engine · 30,028 sets, deterministic recalc</li>
                  <li>62 oRPC procedures · web + expo + public REST</li>
                  <li>89 architecture decision records</li>
                </ul>
              </ProjectCard>
            </Reveal>
            <Reveal delay={120}>
              <ProjectCard project={dojo}>
                <ul className="mt-6 space-y-1.5 border-t border-[#1e1e1e] pt-5 font-mono text-[13px] text-[#a8a8a8]">
                  {dojo.craft.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </ProjectCard>
            </Reveal>
          </div>
        </section>

        {/* ── 03 stack ───────────────────────────────────────────── */}
        <section className="border-t border-[#1e1e1e] py-16 sm:py-20">
          <div className="px-6 sm:px-10">
            <Reveal>
              <SectionLabel n="03" label="Stack" />
            </Reveal>
          </div>
          <Reveal className="mt-10">
            {reduced ? (
              <ul className="flex flex-wrap gap-x-10 gap-y-3 px-6 font-mono text-sm text-[#a8a8a8] sm:px-10">
                {stackStrip.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <LogoLoop
                logos={stackStrip.map((s) => ({
                  node: <span className="font-mono text-sm text-[#a8a8a8]">{s}</span>,
                }))}
                speed={40}
                gap={56}
                logoHeight={20}
                fadeOut
                fadeOutColor="#0a0a0a"
                ariaLabel="Technology stack"
              />
            )}
          </Reveal>
          <Reveal className="mt-12 px-6 sm:px-10">
            <dl className="grid gap-px overflow-hidden border border-[#1e1e1e] bg-[#1e1e1e] sm:grid-cols-2">
              {skillGroups.map((g) => (
                <div key={g.group} className="bg-[#0a0a0a] px-5 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a]">
                    {g.group}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-[#c4c4c4]">
                    {g.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ── 04 experience ──────────────────────────────────────── */}
        <section id="experience" className="scroll-mt-8 border-t border-[#1e1e1e] px-6 py-16 sm:px-10 sm:py-20">
          <Reveal>
            <SectionLabel n="04" label="Experience" />
          </Reveal>
          <div className="mt-10">
            {experience.map((role) => (
              <Reveal key={role.org}>
                <article className="grid gap-2 border-t border-[#1e1e1e] py-6 first:border-t-0 sm:grid-cols-[110px_1fr] sm:gap-8">
                  <div className="font-mono text-[13px] text-[#8a8a8a] tabular-nums">{role.years}</div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-neutral-100">
                      {role.org}
                      <span className="ml-3 font-normal text-[#a8a8a8]">{role.title}</span>
                    </h3>
                    <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-[#c4c4c4]">
                      {role.line}
                    </p>
                    <p className="mt-2 font-mono text-[12px] text-[#8a8a8a]">
                      {role.clients.join(" · ")}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="border-t border-[#1e1e1e] pt-5 font-mono text-[12px] leading-relaxed text-[#8a8a8a]">
              {educationLine}
            </p>
          </Reveal>
        </section>

        {/* ── 05 writing ─────────────────────────────────────────── */}
        <section className="border-t border-[#1e1e1e] px-6 py-16 sm:px-10 sm:py-20">
          <Reveal>
            <SectionLabel n="05" label="Writing" />
            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[#c4c4c4]">
              {writing.blurb}
            </p>
            <p className="mt-4 font-mono text-[12px] text-[#8a8a8a]">
              Talks: {writing.talks.join(" · ")} — {writing.talksNote}
            </p>
          </Reveal>
        </section>

        {/* ── 06 contact ─────────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-8 border-t border-[#1e1e1e] px-6 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <SectionLabel n="06" label="Contact" />
            <p className="mt-8 max-w-[40ch] text-2xl font-medium leading-snug tracking-tight text-neutral-100 sm:text-3xl">
              {contact.sentence}{" "}
              <ExternalLink href={`mailto:${contact.email}`}>{contact.email}</ExternalLink>, or find
              me on <ExternalLink href={contact.github}>GitHub</ExternalLink>.
            </p>
            <p className="mt-8 font-mono text-[13px] text-[#a8a8a8]">
              <a
                href={contact.cvPath}
                className="text-[#34d399] underline decoration-[#34d399]/30 underline-offset-4 transition-colors hover:decoration-[#34d399] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34d399]"
              >
                Download CV (PDF)
              </a>
            </p>
            <p className="mt-3 font-mono text-[12px] text-[#8a8a8a]">{contact.freelanceLine}</p>
          </Reveal>
        </section>

        {/* ── footer ─────────────────────────────────────────────── */}
        <footer className="flex items-center justify-between border-t border-[#1e1e1e] px-6 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a8a8a] sm:px-10">
          <span>hyhy.gg</span>
          <span>prototype — instrument</span>
        </footer>
      </div>
    </div>
  );
}
