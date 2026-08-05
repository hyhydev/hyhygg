import Reveal from "./Reveal";
import { Clearing, FieldLink, SectionMark, ShotSlot } from "./field";
import type { Highlight } from "../_content/types";

// Case-study page pieces (wayfinder #3 for the shape, #17 for the ground):
// the drift runs behind every route; each prose section sits in one
// continuous frosted clearing; captures live in white cards between the
// clearings, each beside the claim it proves.

export function CaseHero({
  name,
  url,
  oneLiner,
  children,
}: {
  name: string;
  url: string;
  oneLiner: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1120px] px-6 pt-16 pb-20 sm:px-8 sm:pt-24">
      <SectionMark label="Case study" />
      <h1 className="mt-6 text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
        {name}
      </h1>
      <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.7] text-[#3d3d3d] sm:text-lg">
        {oneLiner}
      </p>
      <p className="mt-6 text-[15px]">
        <FieldLink href={url} className="font-medium">
          Live at {url.replace("https://", "")} ↗
        </FieldLink>
      </p>
      {children}
    </section>
  );
}

export function ProseSection({
  label,
  paras,
  className = "",
}: {
  label: string;
  paras: readonly string[];
  className?: string;
}) {
  return (
    <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
      <Reveal className={className}>
        <Clearing className="max-w-[720px]">
          <SectionMark label={label} />
          <div className="mt-6 space-y-5 text-[15px] leading-[1.75] text-[#3d3d3d]">
            {paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Clearing>
      </Reveal>
    </section>
  );
}

// One "technically interesting" item: the prose clearing, with its evidencing
// capture beside it on the drift (interleaved evidence, no gallery — #17).
export function HighlightBlock({ highlight, offset }: { highlight: Highlight; offset: boolean }) {
  return (
    <div className="pb-20">
      <Reveal className={offset ? "sm:ml-auto sm:max-w-[720px]" : undefined}>
        <Clearing className="max-w-[720px]">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{highlight.title}</h3>
          <p className="mt-5 text-[15px] leading-[1.75] text-[#3d3d3d]">{highlight.body}</p>
        </Clearing>
      </Reveal>
      {highlight.shot && (
        <Reveal className="mx-auto mt-10 max-w-[900px]">
          <ShotSlot shot={highlight.shot} />
        </Reveal>
      )}
    </div>
  );
}

export function StackSection({ stack }: { stack: readonly string[] }) {
  return (
    <section className="mx-auto max-w-[1120px] px-6 pb-20 sm:px-8">
      <Reveal>
        <SectionMark label="Stack" />
        <ul className="mt-8 flex max-w-[820px] flex-wrap gap-2.5">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[#e4e4e4] bg-white/80 px-3.5 py-1.5 text-[13px] text-[#3d3d3d]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
