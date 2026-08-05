"use client";

// Copied from react-bits (reactbits.dev) — FadeContent, TS-TW variant.
// MIT + Commons Clause © David Haz — see LICENSE-THIRD-PARTY.md.
// Modified locally: added 'use client'; added a small rise (y offset) so the
// single scroll primitive is a fade/rise; removed the docs-site scroller
// lookup. Reduced-motion policy is NOT handled here — it lives in Reveal.tsx.

import * as React from "react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  rise?: number;
  onComplete?: () => void;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  ease = "power2.out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  rise = 24,
  onComplete,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    gsap.set(el, {
      autoAlpha: initialOpacity,
      y: rise,
      filter: blur ? "blur(10px)" : "blur(0px)",
      willChange: "opacity, filter, transform",
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(el, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: getSeconds(duration),
      ease: ease,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
