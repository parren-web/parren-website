"use client";

import CommandCenter from "./CommandCenter";
import Reveal from "./Reveal";

/**
 * Product section: the full Parren command center concept preview.
 * One dashboard for the entire social media department.
 */
export default function ProductSection() {
  return (
    <section id="product" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-electric-600/12 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Command center
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              Your entire social media department, <span className="text-gradient">on one screen.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              Content queue, approvals, publishing status, performance, brand intelligence, and
              an AI assistant that answers in plain English.{" "}
              <span className="text-slate-400/75">Concept preview with illustrative data.</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-12">
            <CommandCenter />
          </div>
        </Reveal>

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
