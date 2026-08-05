// Shared content types (wayfinder #5): a typed registry, not a content
// pipeline. No runtime validation — this site has no runtime boundary; the
// compiler is the check.

import type { SkillId } from "./skills";

export interface Stat {
  value: number;
  approx?: boolean;
  label: string;
}

// A committed capture (wayfinder #17). The caption is one evidential
// sentence; it renders under the image AND is the alt text — one line does
// caption and a11y.
export interface Capture {
  src: string;
  caption: string;
  width: number;
  height: number;
}

// A capture slot whose pixels haven't been taken yet (wayfinder #20).
export interface PendingCapture {
  pending: true;
  caption: string;
}

export type Shot = Capture | PendingCapture;

export function isPending(shot: Shot): shot is PendingCapture {
  return "pending" in shot;
}

// One "what's technically interesting" item — short heading + a few
// sentences, optionally with the capture that evidences it sitting beside it
// (interleaved evidence, no gallery — #17).
export interface Highlight {
  title: string;
  body: string;
  shot?: Shot;
}

export interface CaseStudy {
  slug: "dizzy" | "dojo";
  name: string;
  url: string;
  oneLiner: string;
  problem: string[];
  role: string[];
  roleShot?: Shot;
  highlights: Highlight[];
  stack: string[];
  skills: SkillId[];
}
