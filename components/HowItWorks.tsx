"use client";

import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Create",
    headline: "Record once. Unlock weeks of content.",
    body: "Film a podcast, interview, business video, customer story, or tutorial. Don't know what to say? Our planned AI interviewer guides you through the session with tailored questions based on your business, audience, and goals — then suggests extra hooks and calls to action to record.",
    badge: "AI interviewer · Roadmap",
  },
  {
    n: "02",
    title: "Transform",
    headline: "Parren turns recordings into content.",
    body: "AI-assisted editing finds the strongest moments — hook strength, narrative completeness, pacing, emotional impact, audio and visual signals — and cuts them into platform-ready clips with captions in your voice. You get the outcomes; we handle the timeline.",
    badge: null,
  },
  {
    n: "03",
    title: "Publish",
    headline: "Your content goes live, natively.",
    body: "Parren publishes through dedicated iPhones using the actual social media apps — no clunky third-party scheduling workarounds. Uploading, captioning, account selection, and posting happen for you.",
    badge: "Roadmap",
  },
  {
    n: "04",
    title: "Learn",
    headline: "Your content strategy gets smarter.",
    body: "Performance data feeds back into the system: winning hooks, topics, formats, and posting patterns are identified automatically, shaping what Parren makes and recommends next.",
    badge: "Roadmap",
  },
  {
    n: "05",
    title: "Grow",
    headline: "Turn attention into opportunities.",
    body: "Our longer-term vision adds comment management, engagement workflows, AI-supported lead handling, and integrations with your marketing funnel — so attention turns into conversations, and conversations into customers.",
    badge: "Long-term vision",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-electric-600/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              How Parren works
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              Create once. <span className="text-gradient">Show up everywhere.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              One coordinated workflow, from raw footage to published post to smarter strategy.
              Here&apos;s the loop Parren runs on.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 space-y-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i * 60, 180)}>
              <li className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                  <div className="shrink-0">
                    <span
                      aria-hidden="true"
                      className="font-display text-4xl text-gradient sm:text-5xl"
                      style={{ fontWeight: 700 }}
                    >
                      {s.n}
                    </span>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {s.title}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl text-white sm:text-2xl" style={{ fontWeight: 600 }}>
                        {s.headline}
                      </h3>
                      {s.badge && (
                        <span className="rounded-full border border-electric-400/25 bg-electric-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-electric-200">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-300/80">
                      {s.body}
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80}>
          <div className="mt-10 text-center">
            <a
              href="#join"
              className="btn-primary inline-block rounded-xl px-8 py-3.5 font-display text-base font-semibold text-white"
              style={{ fontWeight: 600 }}
            >
              Join Early Access — Free
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
