import { useEffect, useState } from "react";

/**
 * The established mobile-first pattern: true below the given breakpoint.
 * The hero must feel great one-handed on a phone.
 */
export function useIsMobile(breakpoint = 760): boolean {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
