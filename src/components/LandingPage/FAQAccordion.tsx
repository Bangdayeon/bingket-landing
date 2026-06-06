'use client';

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl className="flex flex-col divide-y divide-gray-100">
      {faqs.map(({ q, a }, i) => (
        <div key={q}>
          <dt>
            <button
              className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="text-base md:text-lg font-semibold">{q}</span>
              <svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                className={`shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
              >
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </dt>
          <dd
            className={`overflow-hidden transition-all duration-200 ease-in-out ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}
          >
            <p className="text-gray-600 leading-relaxed">{a}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
