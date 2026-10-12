"use client";

import Reveal from "./Reveal";

const MODES = [
  {
    title: "Review Required",
    body: "Nothing publishes without your eyes on it first. Every video, caption, and post waits for your approval.",
    tag: "Maximum control",
  },
  {
    title: "Smart Approval",
    body: "Content that matches your established preferences flows through a streamlined check; anything unusual still comes to you for review.",
    tag: "Balanced",
  },
  {
    title: "Autopilot",
    body: "Eligible content publishes automatically within rules you define — topics, tone, timing, and hard no-gos.",
    tag: "Maximum leverage",
  },
];

export default function ApprovalModes() {
  return (
    <section id="approvals" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Control
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              Your brand. Your rules. <span className="text-gradient">Your approval.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              Handing posting to software can feel nerve-wracking. So Parren is being designed
              around three approval modes — you choose how much autonomy it gets, and you can
              change your mind anytime.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {MODES.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <div className="glass flex h-full flex-col rounded-2xl p-6 sm:p-7">
                <span className="w-fit rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cyan-300">
                  {m.tag}
                </span>
                <h3 className="font-display mt-4 text-xl text-white" style={{ fontWeight: 600 }}>
                  {m.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-300/75">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-400/75">
            Approval modes are planned functionality, subject to platform requirements and
            product availability. Parren is designed to learn from every revision you make —
            corrections today mean fewer corrections tomorrow.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
