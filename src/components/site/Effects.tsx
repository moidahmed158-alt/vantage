"use client";

import { useEffect } from "react";

/**
 * Site-wide progressive effects, mounted once in the root layout:
 *  - scroll reveal for any element with `data-reveal` (delay with `data-reveal="1"`…`"4"`),
 *    and for each child of a `data-stagger` element in turn
 *  - cursor spotlight on cards (`.v-card`, `.v-plan`) via --mx / --my
 * Pages added later (client navigation) are picked up by a MutationObserver.
 */
export function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      // The huge top margin counts anything above the viewport as seen, so content scrolled past
      // before hydration (or skipped by a fast flick) never stays hidden.
      { rootMargin: "100000px 0px -8% 0px", threshold: 0 },
    );

    const SEL = "[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)";
    const scan = (node: ParentNode) => {
      node.querySelectorAll<HTMLElement>(SEL).forEach((el) => io.observe(el));
    };
    scan(document);
    root.classList.add("reveal-ready");

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches(SEL)) io.observe(n);
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".v-card, .v-plan");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
