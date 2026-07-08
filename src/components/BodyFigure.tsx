import { useMemo } from "react";
import { muscles as ALL_MUSCLES } from "../data/muscles";
import type { MuscleId } from "../data/types";
import "./BodyFigure.css";

interface Node {
  key: string;
  id: MuscleId;
  x: number;
  y: number;
  r: number;
  name: string;
}

/** Every muscle's on-figure node(s), pre-computed once (bilateral -> mirrored). */
const NODES: Node[] = ALL_MUSCLES.flatMap((m) => {
  if (!m.bodyCoords) return [];
  const r = 9 * (m.size ?? 1);
  const base: Node = {
    key: m.id,
    id: m.id,
    x: m.bodyCoords.x,
    y: m.bodyCoords.y,
    r,
    name: m.name,
  };
  if (!m.bilateral) return [base];
  return [
    base,
    { ...base, key: `${m.id}__r`, x: 400 - m.bodyCoords.x },
  ];
});

/* A small seeded RNG so the stabilizer shimmer is stable across renders. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Coarse body-shaped boxes the shimmer scatters within: [x0,y0,x1,y1,weight]. */
const SHIMMER_BOXES: [number, number, number, number, number][] = [
  [174, 46, 226, 118, 1], // head & neck
  [150, 120, 250, 300, 4], // torso
  [150, 300, 255, 392, 2], // pelvis
  [110, 158, 166, 366, 2], // left arm
  [234, 158, 290, 366, 2], // right arm
  [156, 392, 204, 726, 3], // left leg
  [196, 392, 244, 726, 3], // right leg
];

function makeShimmer(count: number): { x: number; y: number; d: number }[] {
  const rand = mulberry32(65042);
  const totalWeight = SHIMMER_BOXES.reduce((s, b) => s + b[4], 0);
  const pts: { x: number; y: number; d: number }[] = [];
  for (let i = 0; i < count; i++) {
    let pick = rand() * totalWeight;
    let box = SHIMMER_BOXES[0];
    for (const b of SHIMMER_BOXES) {
      pick -= b[4];
      if (pick <= 0) {
        box = b;
        break;
      }
    }
    pts.push({
      x: box[0] + rand() * (box[2] - box[0]),
      y: box[1] + rand() * (box[3] - box[1]),
      d: rand() * 4, // animation delay seed (seconds)
    });
  }
  return pts;
}

export interface BodyFigureProps {
  /** Muscles lit brightly as named prime movers. */
  activeIds?: MuscleId[];
  /** How many faint stabilizer-shimmer points to scatter (0 = none). */
  shimmerCount?: number;
  /** A single muscle drawn as the focus (View B). Its `affects` glow cooler. */
  focusId?: MuscleId | null;
  /** Muscles downstream of the focus (the tightness chain), drawn cool. */
  chainIds?: MuscleId[];
  /** Called when a lit/interactive muscle node is activated. */
  onSelect?: (id: MuscleId) => void;
  className?: string;
}

export default function BodyFigure({
  activeIds = [],
  shimmerCount = 0,
  focusId = null,
  chainIds = [],
  onSelect,
  className = "",
}: BodyFigureProps) {
  const activeSet = useMemo(() => new Set(activeIds), [activeIds]);
  const chainSet = useMemo(() => new Set(chainIds), [chainIds]);
  const shimmer = useMemo(
    () => makeShimmer(Math.min(shimmerCount, 80)),
    [shimmerCount],
  );

  return (
    <svg
      className={`figure ${className}`}
      viewBox="0 0 400 800"
      role="img"
      aria-label="A stylized human figure with muscles that light up when engaged."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2831" />
          <stop offset="1" stopColor="#121b21" />
        </linearGradient>
        <radialGradient id="glowWarm" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--accent-300)" stopOpacity="0.95" />
          <stop offset="45%" stopColor="var(--accent-500)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--accent-500)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowCool" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--cool-400)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="var(--cool-500)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--cool-500)" stopOpacity="0" />
        </radialGradient>
        <filter id="soften" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* -------- silhouette (overlapping same-fill shapes read as one body) */}
      <g className="figure__body">
        {/* legs */}
        <path
          className="limb"
          d="M182,392 L179,566"
          stroke="url(#bodyFill)"
          strokeWidth="50"
        />
        <path className="limb" d="M179,560 L176,724" stroke="url(#bodyFill)" strokeWidth="30" />
        <path className="limb" d="M218,392 L221,566" stroke="url(#bodyFill)" strokeWidth="50" />
        <path className="limb" d="M221,560 L224,724" stroke="url(#bodyFill)" strokeWidth="30" />
        {/* feet */}
        <ellipse className="foot" cx="176" cy="732" rx="20" ry="12" />
        <ellipse className="foot" cx="224" cy="732" rx="20" ry="12" />
        {/* arms */}
        <path className="limb" d="M152,162 L120,362" stroke="url(#bodyFill)" strokeWidth="30" />
        <path className="limb" d="M248,162 L280,362" stroke="url(#bodyFill)" strokeWidth="30" />
        {/* hands */}
        <ellipse className="foot" cx="117" cy="372" rx="13" ry="17" />
        <ellipse className="foot" cx="283" cy="372" rx="13" ry="17" />
        {/* torso + pelvis */}
        <path
          className="torso"
          d="M150,154
             C150,138 168,124 186,122
             L214,122
             C232,124 250,138 250,154
             C257,202 250,252 244,292
             C242,322 258,342 255,364
             C255,383 240,394 210,394
             L190,394
             C160,394 145,383 145,364
             C142,342 158,322 156,292
             C150,252 143,202 150,154 Z"
        />
        {/* neck + head */}
        <rect className="torso" x="187" y="96" width="26" height="30" rx="12" />
        <ellipse className="torso" cx="200" cy="66" rx="32" ry="37" />
      </g>

      {/* -------- resting muscles: quiet dots so the body never looks empty */}
      <g className="figure__rest">
        {NODES.map((n) => (
          <circle
            key={`rest-${n.key}`}
            cx={n.x}
            cy={n.y}
            r={Math.max(2.2, n.r * 0.32)}
            className="rest-dot"
          />
        ))}
      </g>

      {/* -------- stabilizer shimmer: the swarm working in the background */}
      {shimmer.length > 0 && (
        <g className="figure__shimmer" aria-hidden="true">
          {shimmer.map((p, i) => (
            <circle
              key={`sh-${i}`}
              cx={p.x}
              cy={p.y}
              r={1.7}
              className="shimmer-dot"
              style={{ animationDelay: `${p.d}s` }}
            />
          ))}
        </g>
      )}

      {/* -------- chain (View B): downstream muscles, cool glow */}
      <g className="figure__chain">
        {NODES.filter((n) => chainSet.has(n.id)).map((n) => (
          <g key={`chain-${n.key}`} className="chain-node">
            <circle cx={n.x} cy={n.y} r={n.r * 1.5} fill="url(#glowCool)" filter="url(#soften)" />
            <circle cx={n.x} cy={n.y} r={Math.max(3, n.r * 0.5)} className="chain-core" />
          </g>
        ))}
      </g>

      {/* -------- active prime movers: bright, named, interactive */}
      <g className="figure__active">
        {NODES.filter((n) => activeSet.has(n.id) || n.id === focusId).map((n) => {
          const isFocus = n.id === focusId;
          const interactive = Boolean(onSelect);
          return (
            <g
              key={`act-${n.key}`}
              className={`active-node ${isFocus ? "is-focus" : ""} ${
                interactive ? "is-interactive" : ""
              }`}
              onClick={interactive ? () => onSelect?.(n.id) : undefined}
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={interactive ? n.name : undefined}
              onKeyDown={
                interactive
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect?.(n.id);
                      }
                    }
                  : undefined
              }
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * 2}
                fill="url(#glowWarm)"
                filter="url(#soften)"
                className="active-halo"
              />
              <circle cx={n.x} cy={n.y} r={Math.max(3.4, n.r * 0.62)} className="active-core" />
              <title>{n.name}</title>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
