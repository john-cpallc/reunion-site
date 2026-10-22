"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faqs";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:text-cardinal"
              >
                <span className="font-display text-xl tracking-wide text-ink sm:text-2xl">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-display text-2xl text-cardinal"
                >
                  {open ? "−" : "+"}
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-5 text-base leading-relaxed text-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
