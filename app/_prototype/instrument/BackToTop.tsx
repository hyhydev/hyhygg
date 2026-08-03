"use client";

// Return-to-top control for the Instrument prototype: rides fixed in the
// bottom-right once the reader is past the hero, styled as part of the
// instrument chrome (hairline border, mono label). Scrolls smoothly, except
// under reduced motion where the jump is instant and the fade is disabled.

import { useEffect, useState } from "react";
import { useReducedMotion } from "../useReducedMotion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 border border-[#2c2c2c] bg-[#0a0a0a]/90 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a8a8a] backdrop-blur transition-opacity duration-300 hover:border-[#34d399] hover:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34d399] motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden>↑</span> Top
    </a>
  );
}
