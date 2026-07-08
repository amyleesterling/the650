import type { Action } from "./types";
import { resolvePrimeMovers } from "./actions";

/**
 * The honest count for an action, kept in one place so every view agrees.
 *
 * `named` is the count of named prime movers (defensible, countable). The
 * engaged range adds the stabilizer estimate on top — always shown AS a range,
 * never a false-precise single number.
 */
export interface Engagement {
  named: number;
  stabilizerLow: number;
  stabilizerHigh: number;
  engagedLow: number;
  engagedHigh: number;
  idle: number;
}

export function engagementFor(action: Action): Engagement {
  const named = resolvePrimeMovers(action).length;
  const [sLow, sHigh] = action.stabilizerEstimate;
  const engagedLow = named + sLow;
  const engagedHigh = named + sHigh;
  return {
    named,
    stabilizerLow: sLow,
    stabilizerHigh: sHigh,
    engagedLow,
    engagedHigh,
    idle: Math.max(0, 650 - engagedHigh),
  };
}
