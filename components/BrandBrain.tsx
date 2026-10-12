"use client";

import Reveal from "./Reveal";

const SIGNALS = [
  "Business & industry",
  "Target audience",
  "Brand personality",
  "Tone of voice",
  "Content guidelines",
  "Preferred hooks",
  "Editing style",
  "Visual preferences",
  "Calls to action",
  "Approval feedback",
  "Winning content",
];

export default function BrandBrain() {
  return (
    <section id="brand-brain" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-0 h-[380px] w-[620px] rounded-full bg-electric-600/12 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Brand intelligence
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl" style={{ fontWeight: 700 }}>
                The more Parren learns, <span className="text-gradient">the more it feels like your team.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[17px] leading-relaxed text-slate-300/85">
                Parren learns and retains your brand preferences — so you stop
                re-explaining what you want. Every revision and every piece of feedback makes
                the next draft closer to what you&apos;d have made yourself.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-300/75">
                The dream: month six needs almost no corrections, because Parren already knows
                your voice.{" "}
                <span className="text-slate-400/70">
                  This learning is planned functionality that improves with your feedback — not
                  fully autonomous, and not proven yet.
                </span>
              </p>
            </Reveal>
            <Reveal delay={260}>
              <span className="mt-6 inline-block rounded-full border border-electric-400/25 bg-electric-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-electric-200">
                Roadmap
              </span>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                Your Brand Brain
              </p>
              <div className="flex flex-wrap gap-2">
                {SIGNALS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3.5 py-1.5 text-sm text-cyan-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-electric-400/15 bg-navy-950/60 p-4">
                <p className="text-sm leading-relaxed text-slate-300/85">
                  <span className="font-semibold text-white">You revise a caption.</span>
                  <br />
                  Parren notes the pattern — shorter lines, stronger verbs — and applies it to
                  the next ten drafts automatically.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
