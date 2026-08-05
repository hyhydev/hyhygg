import type { ReactNode } from "react";

// Inline "primary source" exhibit for a case-study page (wayfinder #9/#15):
// a decision record reproduced verbatim from the project's decision log,
// rendered at the point where the page makes the claim it proves. Visually
// distinct from the page's own voice — a ruled document inside a white card —
// and labelled honestly with ADR number, date, and corpus context.

export function AdrExhibit({
  project,
  adr,
  date,
  corpusLine,
  title,
  children,
}: {
  project: string;
  adr: string;
  date: string;
  corpusLine: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={`Decision record exhibit: ${title}`}
      className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#ececec] px-6 py-4 sm:px-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#6b6b6b]">
          {project} · {adr} · {date}
        </p>
        <p className="text-[12px] text-[#6b6b6b]">{corpusLine}</p>
      </div>
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <div className="mt-4 space-y-4 text-[14px] leading-[1.75] text-[#3d3d3d] [&_strong]:text-[#161616] [&_code]:rounded [&_code]:bg-[#f5f5f5] [&_code]:px-1 [&_code]:font-[inherit]">
          {children}
        </div>
      </div>
      <p className="border-t border-[#ececec] px-6 py-3 text-[12px] text-[#6b6b6b] sm:px-8">
        Reproduced verbatim from the project’s decision log; redacted where noted. No
        redactions were required.
      </p>
    </aside>
  );
}
