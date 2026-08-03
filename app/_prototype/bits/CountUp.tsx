"use client";

// Hand-rolled replacement for react-bits' CountUp (which pulls `motion`,
// ~44 KB gz). Rolling it on gsap — already paid for by FadeContent — was the
// budget test named in wayfinder #10: gsap alone keeps the page at ~27 KB gz
// of animation engine. SSR emits the final value; the count runs once on
// scroll entry. Under reduced motion the final value simply stays put.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const format = (n: number) => Math.round(n).toLocaleString("en-GB");

export default function CountUp({
  to,
  prefix = "",
  className,
}: {
  to: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const counter = { value: 0 };
    el.textContent = prefix + format(0);
    const tween = gsap.to(counter, {
      value: to,
      duration: 1.4,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = prefix + format(counter.value);
      },
    });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      st.kill();
      tween.kill();
      el.textContent = prefix + format(to);
    };
  }, [to, prefix, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix + format(to)}
    </span>
  );
}
