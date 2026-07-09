import { muscles } from "../data/muscles";

/*
 * Turn the 2-D muscle data (a front-projection in a 400×800 viewBox) into 3-D
 * placements for the prototype figure. Front/back depth is inferred by region
 * and by a set of known deep/back muscles, so the figure has real volume you
 * can orbit around — while staying fully driven by the same `MuscleId` data,
 * so a scanned per-muscle mesh set could be swapped in later without changing
 * anything downstream.
 */

// Muscles that sit behind the coronal plane (rendered toward the back).
const BACK = new Set([
  "suboccipitals",
  "cervical_erector_spinae",
  "upper_trapezius",
  "levator_scapulae",
  "erector_spinae",
  "multifidus",
  "lower_trapezius",
  "mid_trapezius",
  "rhomboids",
  "latissimus_dorsi",
  "gluteus_maximus",
  "gluteus_medius",
  "gluteus_minimus",
  "hamstrings",
  "gastrocnemius",
  "soleus",
  "forearm_extensors",
]);

// Deep but central/front (near the midline plane).
const DEEP_FRONT = new Set([
  "deep_cervical_flexors",
  "transverse_abdominis",
  "iliopsoas",
  "pharyngeal_constrictors",
  "suprahyoid",
  "infrahyoid",
  "tongue",
]);

// Lateral muscles — depth near zero, lateral offset carries them.
const SIDE = new Set([
  "deltoids",
  "rotator_cuff",
  "shoulder_stabilizers",
  "scalenes",
  "serratus_anterior",
  "obliques",
  "hip_adductors",
]);

export interface Placed {
  id: string;
  name: string;
  region: string;
  /** world-space centre */
  pos: [number, number, number];
  /** capsule length & radius */
  len: number;
  radius: number;
}

const S = 0.02; // viewBox units -> world units
const DEPTH = 1.9; // half-thickness of the body in world units

function depthScore(id: string): number {
  if (BACK.has(id)) return -1;
  if (DEEP_FRONT.has(id)) return 0.25;
  if (SIDE.has(id)) return 0;
  return 0.9; // default: anterior
}

function place(id: string, x: number, y: number, size: number, region: string, name: string): Placed {
  return {
    id,
    name,
    region,
    pos: [(x - 200) * S, (400 - y) * S, depthScore(id) * DEPTH],
    len: 0.7 + size * 1.05,
    radius: 0.16 + size * 0.14,
  };
}

/** Every muscle placed in 3-D, with bilateral muscles mirrored across x. */
export const placedMuscles: Placed[] = muscles.flatMap((m) => {
  if (!m.bodyCoords) return [];
  const size = m.size ?? 1;
  const base = place(m.id, m.bodyCoords.x, m.bodyCoords.y, size, m.region, m.name);
  if (!m.bilateral) return [base];
  const mirrored = place(m.id, 400 - m.bodyCoords.x, m.bodyCoords.y, size, m.region, m.name);
  return [base, mirrored];
});
