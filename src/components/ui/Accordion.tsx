"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

export type AccordionItem = { q: string; a: ReactNode };

/** Single-open FAQ accordion with an animated panel height. */
export function Accordion({
  items,
  defaultOpen = 0,
  headingLevel = 3,
}: {
  items: AccordionItem[];
  /** Index open on first render; -1 for none. */
  defaultOpen?: number;
  headingLevel?: 2 | 3 | 4;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <div className="v-acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.q} className="v-acc-item" data-open={isOpen}>
            <H className="v-acc-h">
              <button
                id={btnId}
                type="button"
                className="v-acc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <span className="v-acc-ico">
                  <Icon name="plus" size={16} strokeWidth={2} />
                </span>
              </button>
            </H>
            <div id={panelId} role="region" aria-labelledby={btnId} className="v-acc-wrap" inert={!isOpen}>
              <div className="v-acc-inner">
                <div className="v-acc-panel">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
