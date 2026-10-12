"use client";

import Reveal from "./Reveal";

const OUTCOMES = [
  {
    title: "Greater brand visibility",
    body: "Show up in more feeds, more often — so the right people keep running into you.",
  },
  {
    title: "More chances to be discovered",
    body: "Every post is another doorway. More doors, more discovery.",
  },
  {
    title: "A brand people recognize",
    body: "Consistency compounds. Familiar brands get the call before strangers do.",
  },
  {
    title: "More engagement opportunities",
    body: "Comments, shares, saves and DMs start with content that's actually there.",
  },
  {
    title: "More leads and inquiries",
    body: "Attention you can follow up on — not vanity metrics collecting dust.",
  },
  {
    title: "Consistency without burnout",
    body: "No more Sunday-night editing marathons or dead channels during busy weeks.",
  },
];

export default function DreamOutcome() {
  return (
    <section id="outcome" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              The dream outcome
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              Grow your presence. <span className="text-gradient">Not your workload.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              Imagine your content working across multiple social platforms every day while
              you&apos;re focused on running your business. Customers don&apos;t want 450 posts —
              they want what consistent presence can open the door to.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.title} delay={(i % 3) * 80}>
              <div className="glass h-full rounded-2xl p-6">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#1fd9e6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="font-display mt-4 text-lg text-white" style={{ fontWeight: 600 }}>
                  {o.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300/75">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-400/75">
            These are the goals consistent publishing can support — not guaranteed results.
            Publishing more doesn&apos;t automatically create followers, views, or revenue.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
