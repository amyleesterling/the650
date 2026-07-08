import { useEffect, useRef } from "react";

/**
 * Adds `is-in` to an element the first time it scrolls into view — the base
 * of the slow reveal-on-scroll used through "Why Gentle & Slow".
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
