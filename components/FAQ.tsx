"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Is Parren available now?",
    a: "Not yet — Parren is in active development and testing. Early access members are first in line when the MVP opens, and their input shapes what we build first.",
  },
  {
    q: "What will the MVP do first?",
    a: "The first version focuses on the core loop: turning your raw footage into edited, captioned, ready-to-post content. Native publishing, analytics, and the learning engine roll out from there — early members help set the order.",
  },
  {
    q: "Which platforms will Parren publish to?",
    a: "Instagram, TikTok, YouTube, and LinkedIn are on the roadmap. Publishing is handled natively — the way the platforms reward — instead of through the kind of third-party blasts that get throttled.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing isn't finalized. Joining early access is free, and founding members will hear about pricing first — with terms that reward the people who believed early.",
  },
  {
    q: "Do I stay in control of what gets posted?",
    a: "Yes. Approvals are core to the product vision: nothing publishes without your sign-off until you decide otherwise. Automation should remove work, not control.",
  },
  {
    q: "What happens to my data?",
    a: "We collect the minimum needed to run early access — your name, email, company, and any questionnaire answers. Full details are in our privacy policy. We never sell your data.",
  },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={`glass overflow-hidden rounded-2xl transition-colors ${open ? "border-cyan-400/25" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-[17px] font-medium text-white" style={{ fontWeight: 500 }}>
          {q}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-cyan-400/40 bg-cyan-400/15 text-cyan-300"
              : "border-electric-400/25 bg-electric-500/10 text-electric-300"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-300/85">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">FAQ</p>
          <h2
            className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Straight answers
          </h2>
          <p className="mt-4 text-[17px] text-slate-300/85">
            No hype. Here&apos;s exactly where things stand.
          </p>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <Item
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
