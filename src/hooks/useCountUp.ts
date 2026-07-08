import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Eases a number up to its target — the "live counter" ticking as muscles
 * light up. Slow and settled, honoring reduced-motion (jumps straight there).
 */
export function useCountUp(target: number, duration = 1100): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      fromRef.current = target;
      return;
    }

    const from = fromRef.current;
    const delta = target - from;
    if (delta === 0) return;

    let start: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(from + delta * easeOut(t)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = target;
    };
  }, [target, duration, reduced]);

  return value;
}
