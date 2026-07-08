import { useCountUp } from "../hooks/useCountUp";
import "./The650Meter.css";

const TOTAL = 650;
const START = 135; // degrees — bottom-left
const SWEEP = 270; // degrees of arc

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const start = polar(cx, cy, r, from);
  const end = polar(cx, cy, r, to);
  const large = to - from <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

export interface The650MeterProps {
  /** Low/high estimate of muscles engaged by the current action. */
  engagedLow: number;
  engagedHigh: number;
  /** Optional caption below the dial. */
  caption?: string;
}

/**
 * The signature "650 meter" — a faint dial that persists across the
 * experience. Every action makes the same quiet point: look how much is
 * still waiting to be felt.
 */
export default function The650Meter({
  engagedLow,
  engagedHigh,
  caption,
}: The650MeterProps) {
  const highCount = useCountUp(engagedHigh, 1200);
  const idle = Math.max(0, TOTAL - engagedHigh);

  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 96;

  const fLow = Math.min(1, engagedLow / TOTAL);
  const fHigh = Math.min(1, engagedHigh / TOTAL);

  const track = arcPath(cx, cy, r, START, START + SWEEP);
  const bandFrom = START + SWEEP * fLow;
  const bandTo = START + SWEEP * fHigh;
  const band = arcPath(cx, cy, r, START, bandTo);
  const bandCore = arcPath(cx, cy, r, START, bandFrom);

  return (
    <figure className="meter" aria-hidden={false}>
      <svg
        className="meter__svg"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Roughly ${engagedLow} to ${engagedHigh} of your 650 muscles are engaged; about ${idle} are idle right now.`}
      >
        <defs>
          <linearGradient id="meterBand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent-500)" />
            <stop offset="1" stopColor="var(--accent-300)" />
          </linearGradient>
        </defs>

        <path className="meter__track" d={track} />
        {/* faint band from low to high estimate */}
        <path className="meter__range" d={band} />
        {/* solid core up to the low estimate (the defensible floor) */}
        <path className="meter__core" d={bandCore} />

        <text className="meter__num" x={cx} y={cy - 4} textAnchor="middle">
          {highCount}
        </text>
        <text className="meter__of" x={cx} y={cy + 22} textAnchor="middle">
          of 650
        </text>
      </svg>
      <figcaption className="meter__cap">
        {caption ?? (
          <>
            <strong>~{idle}</strong> waiting, unnoticed
          </>
        )}
      </figcaption>
    </figure>
  );
}
