"use client";

// Back-to-top control — the second Instrument graft named in wayfinder #13,
// restyled for the Field register: white ground, hairline border, Archivo.
// Rides fixed bottom-right once the reader is past the hero. Scrolls smoothly,
// except under reduced motion where the jump is instant and the fade disabled.

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

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
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-white/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6b6b6b] backdrop-blur transition-opacity duration-300 hover:border-[#161616] hover:text-[#161616] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616] motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden>↑</span> Top
    </a>
  );
}
