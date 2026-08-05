import Image from "next/image";
import Link from "next/link";
import { isPending, type Capture, type Shot } from "../_content/types";

// The Field direction's shared primitives (wayfinder #12/#13), promoted from
// the winning prototype. Server-safe — no hooks; motion lives in Reveal and
// FieldBackdrop only.
//
// Palette: ground pure white; drift lines #e0e0e0 (decorative — exempt from
// the #8 wall); ink #161616; body #3d3d3d; faintest text #6b6b6b, safely
// darker than the #767676 contrast wall. Zero functional colour — the
// screenshots are the only colour on any page.

export function FieldLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const styles = `underline decoration-[#bdbdbd] decoration-1 underline-offset-4 transition-colors hover:decoration-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616] ${className}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className={styles}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}

// A "clearing": a soft frosted panel that quiets the drift behind prose
// without fencing it off — no border, no hard shadow, just mist. Every prose
// section on every route sits in one continuous clearing (#17).
export function Clearing({
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

export function SectionMark({ label }: { label: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#6b6b6b]">
      {label}
    </p>
  );
}

// The #12 card, unchanged: white card, hairline border, the page's one shadow.
export function ScreenshotCard({
  capture,
  className = "",
}: {
  capture: Capture;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)] ${className}`}
    >
      <Image
        src={capture.src}
        alt={capture.caption}
        width={capture.width}
        height={capture.height}
        sizes="(min-width: 1120px) 1024px, 100vw"
        className="w-full"
      />
      <figcaption className="border-t border-[#ececec] px-6 py-4 text-[13px] text-[#6b6b6b]">
        {capture.caption}
      </figcaption>
    </figure>
  );
}

// Stand-in for a capture that hasn't been taken yet (wayfinder #20). Same
// geometry as the real card so the layout doesn't shift when pixels land.
// Deleted with the last pending shot.
export function PendingShot({
  caption,
  className = "",
}: {
  caption: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="m-2 flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-[#e0e0e0]">
        <p className="px-8 text-center text-[13px] uppercase tracking-[0.2em] text-[#6b6b6b]">
          Capture pending
        </p>
      </div>
      <figcaption className="border-t border-[#ececec] px-6 py-4 text-[13px] text-[#6b6b6b]">
        {caption}
      </figcaption>
    </figure>
  );
}

// Renders a shot slot from the shot list (#17): the committed capture if its
// pixels exist, the same-geometry placeholder if they're still pending (#20).
export function ShotSlot({ shot, className = "" }: { shot: Shot; className?: string }) {
  return isPending(shot) ? (
    <PendingShot caption={shot.caption} className={className} />
  ) : (
    <ScreenshotCard capture={shot} className={className} />
  );
}

export function SiteHeader() {
  const link =
    "transition-colors hover:text-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616]";
  return (
    <header className="mx-auto flex max-w-[1120px] items-baseline justify-between px-6 py-6 sm:px-8">
      <Link
        href="/"
        className="text-[15px] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616]"
      >
        hyhy.gg
      </Link>
      <nav className="flex gap-6 text-[12px] font-medium uppercase tracking-[0.2em] text-[#6b6b6b]">
        <Link href="/#work" className={link}>
          Work
        </Link>
        <Link href="/#experience" className={link}>
          Experience
        </Link>
        <Link href="/#contact" className={link}>
          Contact
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-6 pb-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b6b6b]">
        hyhy.gg · Harry Hartley
      </p>
    </footer>
  );
}
