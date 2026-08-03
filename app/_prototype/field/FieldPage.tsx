"use client";

// PROTOTYPE — the Field direction (wayfinder #12): light, atmospheric.
// White ground with a low-amplitude greyscale line drift behind everything
// (FieldBackdrop); nothing else on the page moves beyond the one scroll
// primitive. A single neutral grotesque — Archivo — set enormous for the
// hero name and small everywhere else; no serif, no mono. Content sits in
// two registers over the drift: translucent "clearings" (frosted panels,
// no border) for prose, and plain white cards for the two screenshots —
// the only colour on the page.

import Image from "next/image";
import { Archivo } from "next/font/google";
import Reveal from "../Reveal";
import FieldBackdrop from "./FieldBackdrop";
import {
  hero,
  about,
  projectsIntro,
  dizzy,
  dojo,
  stackStrip,
  experience,
  educationLine,
  writing,
  contact,
} from "../content";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

// Palette notes: ground is pure white; drift lines #e0e0e0 (decorative —
// exempt from the #8 wall); ink #161616; body #3d3d3d; faintest text
// #6b6b6b, safely darker than the #767676 wall. No accent colour at all —
// this is the only prototype with zero functional colour.

function FieldLink({
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
      className={`underline decoration-[#bdbdbd] decoration-1 underline-offset-4 transition-colors hover:decoration-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616] ${className}`}
    >
      {children}
    </a>
  );
}

// A "clearing": a soft frosted panel that quiets the drift behind prose
// without fencing it off — no border, no hard shadow, just mist.
function Clearing({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl bg-white/75 p-8 backdrop-blur-[2px] sm:p-12 ${className}`}>
      {children}
    </div>
  );
}

function SectionMark({ label }: { label: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#6b6b6b]">
      {label}
    </p>
  );
}

// The screenshots are the only colour, so they get the only hard edges on
// the page: a plain white card with a hairline and one soft shadow.
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
  children?: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)]">
      <Image
        src={project.screenshot.src}
        alt={project.screenshot.alt}
        width={project.screenshot.width}
        height={project.screenshot.height}
        sizes="(min-width: 1120px) 1024px, 100vw"
        className="w-full border-b border-[#ececec]"
      />
      <div className="p-8 sm:p-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#6b6b6b]">
          {project.scope}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <FieldLink href={project.url} className="no-underline hover:underline">
            {project.name}
          </FieldLink>
          <span className="ml-3 text-[13px] font-normal tracking-normal text-[#6b6b6b]">
            {project.url.replace("https://", "")} ↗
          </span>
        </h3>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-[#3d3d3d]">
          {project.card}
        </p>
        {children}
      </div>
    </article>
  );
}

export default function FieldPage() {
  return (
    <div
      className={`${archivo.variable} font-[family-name:var(--font-archivo)] min-h-screen text-[#161616] antialiased selection:bg-[#161616] selection:text-white`}
    >
      <FieldBackdrop />

      {/* ── header — floats on the field, no rules ─────────────── */}
      <header className="mx-auto flex max-w-[1120px] items-baseline justify-between px-6 py-6 sm:px-8">
        <span className="text-[15px] font-semibold tracking-tight">hyhy.gg</span>
        <nav className="flex gap-6 text-[12px] font-medium uppercase tracking-[0.2em] text-[#6b6b6b]">
          <a href="#work" className="transition-colors hover:text-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616]">Work</a>
          <a href="#experience" className="transition-colors hover:text-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616]">Experience</a>
          <a href="#contact" className="transition-colors hover:text-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616]">Contact</a>
        </nav>
      </header>

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

      {/* ── work — two white cards floating on the drift ───────── */}
      <section id="work" className="scroll-mt-8 mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal className="max-w-[46ch]">
          <SectionMark label="Work" />
          <p className="mt-6 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
            {projectsIntro}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ProjectCard project={dizzy}>
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              {dizzy.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight tabular-nums">
                    {s.approx ? "~" : ""}
                    {s.value.toLocaleString("en-GB")}
                  </dd>
                  <dd className="mt-1 text-[12px] uppercase tracking-[0.15em] text-[#6b6b6b]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[13px] text-[#6b6b6b]">{dizzy.statsNote}</p>
          </ProjectCard>
        </Reveal>

        <Reveal className="mt-16">
          <ProjectCard project={dojo}>
            <ul className="mt-7 space-y-2 text-[14px] leading-relaxed text-[#3d3d3d]">
              {dojo.craft.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden className="mt-[9px] h-px w-5 shrink-0 bg-[#bdbdbd]" />
                  {c}
                </li>
              ))}
            </ul>
          </ProjectCard>
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

      {/* ── writing ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 sm:px-8">
        <Reveal className="max-w-[560px]">
          <SectionMark label="Writing" />
          <p className="mt-6 text-[15px] leading-[1.75] text-[#3d3d3d]">{writing.blurb}</p>
          <p className="mt-3 text-[13px] text-[#6b6b6b]">
            Talks: {writing.talks.join(" · ")} — {writing.talksNote}
          </p>
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

      {/* ── footer ─────────────────────────────────────────────── */}
      <footer className="px-6 pb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b6b6b]">
          hyhy.gg · prototype — field · set in Archivo
        </p>
      </footer>
    </div>
  );
}
