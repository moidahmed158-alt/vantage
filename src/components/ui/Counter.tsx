"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the numeric part of a figure like "48,000+" or "312%" up from zero when it scrolls into view.
 * Server-renders the final value, so the real figure is what crawlers and no-JS visitors see.
 */
export function Counter({ value, duration = 1600, className = "" }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const grouped = num.includes(",");
    const fmt = (n: number) =>
      pre + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped }) + post;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(fmt(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(fmt(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="v-sr">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
