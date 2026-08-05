"use client";

// The Field's drifting backdrop (wayfinder #12/#13) — the one ground shared
// by every route (#17). Two layers:
//
// 1. A static CSS poster — vertical hairlines at the same gap as the canvas
//    lines. This is what SSR emits (server reduced-motion snapshot is
//    "reduced"), so first paint never waits on the canvas and the field is
//    never the LCP element. Under prefers-reduced-motion it is the ONLY
//    layer: the page is totally still (#8).
// 2. The Waves canvas, dynamically imported with ssr:false — legal here
//    because this is a client component; Next 16 errors on ssr:false in
//    Server Components (lazy-loading.md). Mounted only for users who haven't
//    asked for stillness; it paints its own white ground and fades in over
//    the poster. Tab-hide pause lives inside the Waves copy itself.
//
// The whole backdrop is decoration: aria-hidden, pointer-events-none, and
// exempt from the #8 contrast wall (the "Field drift" exemption).

import dynamic from "next/dynamic";
import { useReducedMotion } from "./useReducedMotion";

const FieldCanvas = dynamic(() => import("./Waves"), { ssr: false });

export const LINE = "#e0e0e0";
const X_GAP = 32;

export default function FieldBackdrop() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent ${X_GAP - 1}px, ${LINE} ${X_GAP - 1}px, ${LINE} ${X_GAP}px)`,
        }}
      />
      {!reduced && (
        <FieldCanvas
          lineColor={LINE}
          backgroundColor="#ffffff"
          waveSpeedX={0.008}
          waveSpeedY={0.0035}
          waveAmpX={16}
          waveAmpY={10}
          xGap={X_GAP}
          yGap={36}
          maxCursorMove={64}
          className="animate-[field-fade_900ms_ease-out_both]"
        />
      )}
    </div>
  );
}
