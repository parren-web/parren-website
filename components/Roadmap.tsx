"use client";

import Reveal from "./Reveal";

/**
 * Honest product roadmap: prototype → early access → long-term vision.
 * Phases are labeled for what they are — never presented as shipped.
 */
const PHASES = [
  {
    phase: "Now",
    title: "Prototype in development",
    body: "The core loop is being built and tested: footage in, edited captioned content out. This is where Parren stands today.",
    items: ["AI-assisted editing & clipping", "Caption generation in your voice", "Content queue & workflow"],
    tone: "cyan" as const,
  },
  {
    phase: "Next",
    title: "Early access & beta",
    body: "A small group of founding members gets hands-on. Real workflows, real feedback, rapid iteration — members help decide what ships first.",
    items: ["Native publishing via dedicated devices", "Approval workflows", "Performance analytics"],
    tone: "blue" as const,
  },
  {
    phase: "Vision",
    title: "The autonomous social media manager",
    body: "The long-term direction: a system that plans, creates, publishes, learns, and engages — while you run the business only you can run.",
    items: ["Brand Brain that learns your voice", "AI interviewer & guided recording", "Engagement & lead workflows"],
    tone: "slate" as const,
  },
];

const TONES: Record<string, string> = {
  cyan: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
  blue: "border-electric-400/25 bg-electric-500/10 text-electric-200",
  slate: "border-slate-400/25 bg-slate-400/10 text-slate-300",
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-600/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Roadmap
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              A social media manager <span className="text-gradient">that runs itself.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-display mt-4 text-lg tracking-tight text-slate-200" style={{ fontWeight: 700 }}>
              Simplify <span className="text-gradient">Social Media.</span>
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              This is where Parren is headed — and we&apos;ll be straight about what&apos;s real
              today versus what&apos;s ahead.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PHASES.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="glass flex h-full flex-col rounded-2xl p-6 sm:p-7">
                <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${TONES[p.tone]}`}>
                  {p.phase}
                </span>
                <h3 className="font-display mt-4 text-xl text-white" style={{ fontWeight: 600 }}>
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-300/75">
                  {p.body}
                </p>
                <ul className="mt-4 space-y-2 border-t border-electric-400/10 pt-4">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300/85">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-400/75">
            Timelines aren&apos;t promised — building this right matters more than building it
            fast. Early access members see progress first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
