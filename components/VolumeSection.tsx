"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const PLATFORMS = [
  { name: "Instagram", abbr: "IG" },
  { name: "TikTok", abbr: "TT" },
  { name: "YouTube Shorts", abbr: "YT" },
  { name: "Facebook", abbr: "FB" },
  { name: "LinkedIn", abbr: "LI" },
];

/** Animated count-up that respects prefers-reduced-motion. */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          if (reduce) {
            setValue(target);
            return;
          }
          const t0 = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function Calculator() {
  const [perDay, setPerDay] = useState(3);
  const [platforms, setPlatforms] = useState(5);
  const total = perDay * platforms * 30;

  const sliderCls =
    "w-full accent-cyan-400";

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
        Posting calculator
      </p>
      <h3 className="font-display mt-3 text-2xl text-white" style={{ fontWeight: 700 }}>
        What could your volume look like?
      </h3>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="calc-perday" className="font-medium text-slate-200">
              Posts per platform, per day
            </label>
            <span className="font-display text-lg text-cyan-300" style={{ fontWeight: 700 }}>{perDay}</span>
          </div>
          <input
            id="calc-perday"
            type="range"
            min={1}
            max={5}
            value={perDay}
            onChange={(e) => setPerDay(Number(e.target.value))}
            className={sliderCls}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="calc-platforms" className="font-medium text-slate-200">
              Platforms
            </label>
            <span className="font-display text-lg text-cyan-300" style={{ fontWeight: 700 }}>{platforms}</span>
          </div>
          <input
            id="calc-platforms"
            type="range"
            min={1}
            max={5}
            value={platforms}
            onChange={(e) => setPlatforms(Number(e.target.value))}
            className={sliderCls}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-center">
        <p className="font-display text-5xl text-gradient" style={{ fontWeight: 700 }}>
          {total.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-slate-300/85">
          estimated publications per month
        </p>
        <p className="mt-1 text-xs text-slate-400/70">
          {perDay} / day × {platforms} platform{platforms === 1 ? "" : "s"} × 30 days
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-slate-400/80">
        Posts can be adapted and distributed across platforms — one strong recording can become
        platform-native posts everywhere. Planning illustration only: not a guarantee of
        performance or current capacity.
      </p>

      <div className="mt-5 text-center">
        <p className="font-medium text-white">Want Parren to handle this for your brand?</p>
        <a
          href="#join"
          className="btn-primary mt-3 inline-block rounded-xl px-8 py-3.5 font-display text-base font-semibold text-white"
          style={{ fontWeight: 600 }}
        >
          Join Early Access
        </a>
      </div>
    </div>
  );
}

export default function VolumeSection() {
  return (
    <section id="volume" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-electric-600/15 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Built for volume
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-5xl" style={{ fontWeight: 700 }}>
              More content. More consistency. <span className="text-gradient">Less work.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              What if your brand could post <strong className="text-white">450+ times a month</strong>?
              Imagine showing up across your social platforms, every single day — without spending
              your life editing, writing captions, and managing posts.
            </p>
          </Reveal>
        </div>

        {/* Giant number */}
        <Reveal delay={120}>
          <div className="mt-12 text-center">
            <p className="font-display text-[6rem] leading-none text-gradient sm:text-[10rem]" style={{ fontWeight: 700 }}>
              <CountUp target={450} suffix="+" />
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300/80">
              3 posts per day. 5 platforms. Up to 450 publications per month in our planned
              high-volume workflow.{" "}
              <span className="text-slate-400/70">An illustrative target — not current capacity.</span>
            </p>
          </div>
        </Reveal>

        {/* Platform rows */}
        <Reveal delay={160}>
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-xl border border-electric-400/10 bg-navy-950/60 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-electric-500/15 text-[11px] font-bold text-electric-200">
                  {p.abbr}
                </span>
                <span className="w-32 shrink-0 text-sm font-medium text-slate-200">{p.name}</span>
                <span className="flex flex-1 gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2 flex-1 rounded-full bg-gradient-to-r from-electric-500 to-cyan-400 opacity-80" />
                  ))}
                </span>
                <span className="shrink-0 text-xs font-medium text-cyan-300">3 / day</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-slate-300/75">
            450 publications doesn&apos;t mean 450 separate shoots. One strong recording is
            adapted into platform-native posts across every channel —{" "}
            <strong className="text-white">create once, show up everywhere.</strong>
          </p>
        </Reveal>

        {/* Calculator */}
        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-2xl">
            <Calculator />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 text-center">
            <a
              href="#join"
              className="btn-primary inline-block rounded-xl px-8 py-3.5 font-display text-base font-semibold text-white"
              style={{ fontWeight: 600 }}
            >
              Get Early Access to Parren
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
