"use client";

import Reveal from "./Reveal";

const BENEFITS = [
  {
    title: "Direct interaction with native apps",
    body: "Posts go out through the actual social media applications, not a third-party API with limited features.",
  },
  {
    title: "App-specific publishing features",
    body: "Where technically available, Parren can use the publishing options each platform's own app provides.",
  },
  {
    title: "Dedicated device infrastructure",
    body: "Your accounts publish from dedicated iPhones — consistent devices, consistent behavior.",
  },
  {
    title: "Automated workflows, verified accounts",
    body: "Uploading, captioning, account selection, and posting handled in one automated flow with account verification.",
  },
  {
    title: "Less reliance on schedulers",
    body: "No more fighting scheduling tools that can't do what the native app can.",
  },
];

const FLOW = ["Parren AI", "Dedicated iPhone", "Your platforms"];

export default function NativePublishing() {
  return (
    <section id="native-publishing" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Technical differentiator
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              Not just scheduled. <span className="text-gradient">Published natively.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              Parren publishes through dedicated iPhones using the actual
              social media applications — bringing device-based automation into content
              distribution. <span className="text-slate-400/75">This describes our planned
              publishing architecture, not current availability.</span>
            </p>
          </Reveal>
        </div>

        {/* Flow visual */}
        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {FLOW.map((label, i) => (
                <div key={label} className="flex flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <div className="glass flex-1 rounded-2xl px-6 py-5 text-center">
                    {i === 1 ? (
                      <span aria-hidden="true" className="mx-auto mb-2 block h-12 w-7 rounded-lg border-2 border-electric-400/40 bg-navy-900" />
                    ) : i === 2 ? (
                      <span aria-hidden="true" className="mx-auto mb-2 flex justify-center gap-1.5">
                        {["IG", "TT", "YT", "FB", "LI"].map((p) => (
                          <span key={p} className="flex h-7 w-7 items-center justify-center rounded-md bg-electric-500/15 text-[9px] font-bold text-electric-200">
                            {p}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span aria-hidden="true" className="font-display mx-auto mb-2 block text-2xl text-gradient" style={{ fontWeight: 700 }}>
                        P
                      </span>
                    )}
                    <p className="text-sm font-semibold text-white">{label}</p>
                  </div>
                  {i < FLOW.length - 1 && (
                    <span aria-hidden="true" className="mx-auto rotate-90 text-cyan-300 sm:rotate-0">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 80}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-display text-[17px] text-white" style={{ fontWeight: 600 }}>
                  {b.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300/75">{b.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
              <p className="text-[15px] leading-relaxed text-slate-300/85">
                Honest note: native publishing is an infrastructure choice, not a magic
                reach booster. We won&apos;t claim algorithmic preference, trust scores, or
                immunity from platform rules — just a more capable way to publish.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
