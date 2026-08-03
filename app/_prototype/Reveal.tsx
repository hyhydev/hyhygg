"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";
import FadeContent from "./bits/FadeContent";

// The one motion wrapper (wayfinder #8): every scroll entrance goes through
// here. Under prefers-reduced-motion the children render plainly — no fade,
// no rise, nothing to soften.

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <FadeContent className={className} delay={delay} duration={700} threshold={0.15}>
      {children}
    </FadeContent>
  );
}
