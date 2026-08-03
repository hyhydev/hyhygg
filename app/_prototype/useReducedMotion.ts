"use client";

import { useSyncExternalStore } from "react";

// The one reduced-motion policy point (wayfinder #8). Server snapshot is
// "reduced", so SSR always emits the still page; motion is a post-hydration
// upgrade for users who haven't asked for stillness.

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}
