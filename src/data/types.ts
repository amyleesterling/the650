/*
 * The data model is the backbone of The 650. The body figure, the counters,
 * the fact cards and the tightness chains all read from these two typed
 * collections — adding an action or a muscle never requires touching a
 * component's internals.
 */

export type MuscleId = string; // e.g. "upper_trapezius"

export type Region =
  | "head_neck"
  | "shoulder_arm"
  | "hand"
  | "trunk_core"
  | "hip"
  | "leg"
  | "foot";

export const REGION_LABEL: Record<Region, string> = {
  head_neck: "Head & neck",
  shoulder_arm: "Shoulder & arm",
  hand: "Hand",
  trunk_core: "Trunk & core",
  hip: "Hip",
  leg: "Leg",
  foot: "Foot",
};

export interface Muscle {
  id: MuscleId;
  name: string; // "Upper trapezius"
  region: Region;
  whatItDoes: string; // plain-language function
  whenTight: string; // what chronic tightness does
  affects: MuscleId[]; // downstream muscles it inhibits/overloads
  gentleStretch: string; // one slow, gentle suggestion

  /* Placement on the stylized SVG figure (viewBox 0 0 400 800). */
  bodyCoords?: { x: number; y: number };
  /* Bilateral muscles render mirrored across the midline (x -> 400 - x). */
  bilateral?: boolean;
  /* Relative visual weight of the glow blob (default 1). */
  size?: number;
  /* Featured muscles carry the full "if X is tight, then Y" teaching chain. */
  featured?: boolean;
}

export interface Action {
  id: string;
  label: string; // "Holding your phone"
  everydayFraming: string; // the "you'd never think..." line
  primeMovers: MuscleId[]; // named, bright, countable
  stabilizerEstimate: [number, number]; // e.g. [30, 60] — shown as a range
  countNote: string; // why an exact number is impossible (transparency)
  hiddenLoad: string; // the surprising fact card
  hiddenLoadSource?: string; // citation key (see data/sources.ts)

  /* A short verb/emoji-free glyph label used by the picker. */
  short?: string;
  /* Composite actions (the café finale) stitch other actions in sequence. */
  composite?: boolean;
  sequence?: string[]; // action ids, in order, for composites
}
