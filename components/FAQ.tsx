"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Is Parren available now?",
    a: "Not yet — Parren is in active development and testing. Early access members are first in line when the MVP opens, and their input shapes what we build first.",
  },
  {
    q: "How is Parren different from hiring a social media manager?",
    a: "A great human manager works business hours; Parren is being built to work around the clock — editing, captioning, publishing, and analyzing while you sleep. It's not a replacement for human creativity and judgment, but it removes the repetitive production grind that eats most of a manager's week.",
  },
  {
    q: "Do I have to record my own content?",
    a: "Yes — you film, Parren does the rest for you. Your face, your voice, and your stories are what make content worth watching; no AI can fake that convincingly. Our planned AI interviewer will guide your recording sessions with tailored questions so you always know what to say.",
  },
  {
    q: "Does Parren edit videos?",
    a: "That's the plan. AI-assisted editing is designed to find the strongest moments in your footage — hooks, stories, key points — and cut them into platform-ready clips with captions in your voice. The MVP focuses on this core loop first.",
  },
  {
    q: "Which platforms will Parren support?",
    a: "Instagram, TikTok, YouTube Shorts, Facebook, and LinkedIn are on the roadmap. Availability per platform will depend on the eventual service plan and account eligibility.",
  },
  {
    q: "How much content can it publish?",
    a: "Our target high-volume workflow is designed for up to 450+ publications a month across five platforms (3 posts per day, per platform). That's an illustrative planning target, not current capacity — the exact mix and frequency will depend on your plan, content supply, and eligibility.",
  },
  {
    q: "How does native publishing work?",
    a: "Parren is being developed to publish through dedicated iPhones using the actual social media apps — device-based automation instead of third-party scheduling workarounds. This is a planned part of our publishing architecture. We don't claim it guarantees better reach or algorithmic preference.",
  },
  {
    q: "Can I approve content before it posts?",
    a: "Yes — approvals are core to the product. We're designing three modes: Review Required (nothing publishes without your sign-off), Smart Approval (routine content flows through, exceptions come to you), and Autopilot (eligible content publishes within rules you define). You choose, and you can change modes anytime.",
  },
  {
    q: "Will it learn my brand?",
    a: "That's the Brand Brain vision: Parren learns your tone, hooks, editing style, and preferences from your content and your revisions, so drafts keep getting closer to what you'd make yourself. It's planned functionality that improves with your feedback — not fully autonomous, and not proven yet.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing isn't finalized. Joining early access is free, and founding members will hear about pricing before anyone else. We won't promise specific discounts or lifetime deals until pricing is real.",
  },
  {
    q: "What does early access include?",
    a: "Product development updates and demos, consideration for the initial beta testing group, and real input into what we build first. No commitment, no payment — just first access to updates and opportunities to participate. Beta spots aren't guaranteed.",
  },
  {
    q: "What happens to my data?",
    a: "We collect the minimum needed to run early access — your email, plus anything you choose to share in the optional questionnaire. Full details are in our privacy policy. We never sell your data.",
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
            <Reveal key={f.q} delay={Math.min(i * 40, 160)}>
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
