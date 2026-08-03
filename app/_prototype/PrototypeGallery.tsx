"use client";

// PROTOTYPE — variant gallery for the three direction prototypes
// (wayfinder #10 Instrument / #11 Essay / #12 Field). Variants mount on the
// root route behind ?variant=; the floating bar and arrow keys cycle them.
// Essay and Field sessions: add your page to VARIANTS and nothing else.

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InstrumentPage from "./instrument/InstrumentPage";
import EssayPage from "./essay/EssayPage";
import FieldPage from "./field/FieldPage";

const VARIANTS = [
  { key: "instrument", label: "Instrument — dark, systematic", Component: InstrumentPage },
  { key: "essay", label: "Essay — light, editorial", Component: EssayPage },
  { key: "field", label: "Field — light, atmospheric", Component: FieldPage },
] as const;

export default function PrototypeGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const requested = searchParams.get("variant");
  const index = Math.max(0, VARIANTS.findIndex((v) => v.key === requested));
  const active = VARIANTS[index];

  const cycle = (delta: number) => {
    const next = VARIANTS[(index + delta + VARIANTS.length) % VARIANTS.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", next.key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") cycle(-1);
      if (e.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <>
      <active.Component />
      {process.env.NODE_ENV !== "production" && (
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-600 bg-neutral-950/90 px-2 py-1.5 font-mono text-xs text-neutral-100 shadow-lg shadow-black/40 backdrop-blur">
          <button
            type="button"
            onClick={() => cycle(-1)}
            aria-label="Previous variant"
            className="rounded-full px-2 py-0.5 hover:bg-neutral-800"
          >
            ←
          </button>
          <span className="px-2 whitespace-nowrap">
            {index + 1}/{VARIANTS.length} · {active.label}
          </span>
          <button
            type="button"
            onClick={() => cycle(1)}
            aria-label="Next variant"
            className="rounded-full px-2 py-0.5 hover:bg-neutral-800"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
