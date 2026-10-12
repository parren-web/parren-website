"use client";

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-electric-400/10 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="text-sm font-medium text-slate-200">{title}</span>
      </div>
      <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300">
        Concept preview
      </span>
    </div>
  );
}

function Thumb() {
  return (
    <span
      aria-hidden="true"
      className="h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br from-electric-500 to-cyan-400"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)" }}
    />
  );
}

function StatusPill({ label, tone }: { label: string; tone: "blue" | "cyan" | "green" | "slate" }) {
  const tones: Record<string, string> = {
    blue: "border-electric-400/30 bg-electric-500/15 text-electric-200",
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    slate: "border-slate-400/25 bg-slate-400/10 text-slate-300",
  };
  return (
    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {label}
    </span>
  );
}

function Sparkline({ points, id }: { points: string; id: string }) {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1fd9e6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1fd9e6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M0,36 L0,${points.split(" ")[0]?.split(",")[1]} ${points} L120,36 Z`} fill={`url(#${id})`} opacity="0.35" />
      <polyline points={points} fill="none" stroke="#1fd9e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const QUEUE = [
  { title: "Founder story — raw take", status: "Editing", tone: "blue" as const, progress: 68 },
  { title: "Product demo — 30s cut", status: "Ready to review", tone: "cyan" as const, progress: 100 },
  { title: "Client win — testimonial", status: "Scheduled", tone: "green" as const, progress: 100 },
  { title: "Behind the scenes — office", status: "Queued", tone: "slate" as const, progress: 12 },
];

/**
 * Parren command center — concept preview.
 * `compact` renders the hero-sized summary; the full version is a bento grid
 * used in the dedicated product section. All data is illustrative.
 */
export default function CommandCenter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="glass overflow-hidden rounded-2xl" style={{ boxShadow: "0 24px 80px -24px rgba(24,123,255,0.45)" }}>
        <WindowChrome title="Parren Command Center" />
        <div className="grid gap-5 p-5 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Content queue
            </p>
            <ul className="space-y-3">
              {QUEUE.slice(0, 3).map((q) => (
                <li key={q.title} className="flex items-center gap-3 rounded-xl border border-electric-400/10 bg-navy-950/60 p-3">
                  <Thumb />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[13px] font-medium text-slate-100">{q.title}</p>
                      <StatusPill label={q.status} tone={q.tone} />
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-navy-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-electric-500 to-cyan-400" style={{ width: `${q.progress}%` }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-electric-400/10 bg-navy-950/60 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Performance
              </p>
              <Sparkline id="cc-spark" points="0,28 15,25 30,26 45,20 60,22 75,15 90,17 105,10 120,8" />
              <p className="mt-2 text-xs text-slate-400">Engagement trending upward</p>
            </div>
            <div className="rounded-xl border border-electric-400/10 bg-navy-950/60 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Parren AI
              </p>
              <ul className="space-y-1.5 text-xs leading-snug text-slate-300/85">
                <li className="flex gap-1.5"><span className="text-cyan-300">★</span> Posting rhythm holding steady</li>
                <li className="flex gap-1.5"><span className="text-cyan-300">★</span> Founder-led clips resonating best</li>
                <li className="flex gap-1.5"><span className="text-cyan-300">★</span> Captions tuned to your brand voice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass overflow-hidden rounded-3xl" style={{ boxShadow: "0 32px 100px -28px rgba(24,123,255,0.5)" }}>
      <WindowChrome title="Parren Command Center" />
      <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-3">
        {/* Content queue */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4 lg:col-span-2">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Content queue</p>
          <ul className="space-y-2.5">
            {QUEUE.map((q) => (
              <li key={q.title} className="flex items-center gap-3 rounded-xl bg-navy-900/60 p-3">
                <Thumb />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-slate-100">{q.title}</p>
                    <StatusPill label={q.status} tone={q.tone} />
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-navy-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-electric-500 to-cyan-400" style={{ width: `${q.progress}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Published today */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Published today</p>
          <p className="font-display text-4xl text-white" style={{ fontWeight: 700 }}>
            9<span className="text-lg text-slate-400"> / 15</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">across 5 platforms</p>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {["IG", "TT", "YT", "FB", "LI"].map((p) => (
              <span key={p} className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-500/15 text-[10px] font-bold text-electric-200">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Pending approvals */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Pending approvals</p>
          <ul className="space-y-2.5">
            {["Morning hook — v2", "Caption draft — launch"].map((t) => (
              <li key={t} className="rounded-xl bg-navy-900/60 p-3">
                <p className="text-sm font-medium text-slate-100">{t}</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-lg bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">Approve</span>
                  <span className="rounded-lg border border-electric-400/20 px-3 py-1 text-xs font-medium text-slate-300">Edit</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Trial reel performance */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Trial reel performance</p>
          <Sparkline id="cc-trial" points="0,30 15,28 30,24 45,25 60,18 75,20 90,12 105,14 120,6" />
          <p className="mt-2 text-xs text-slate-400">Hook variant B outperforming by 2.4×</p>
        </div>

        {/* Top performers */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Top performers</p>
          <ul className="space-y-2 text-sm">
            {[
              ["Founder story — raw take", "48.2K views"],
              ["3 mistakes we fixed", "31.7K views"],
              ["Client win — testimonial", "22.9K views"],
            ].map(([t, v]) => (
              <li key={t} className="flex items-center justify-between gap-2">
                <span className="truncate text-slate-200">{t}</span>
                <span className="shrink-0 text-xs font-medium text-cyan-300">{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand intelligence */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4 lg:col-span-2">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Brand intelligence</p>
          <div className="flex flex-wrap gap-2">
            {["Direct, no fluff", "Founder on camera", "Hooks under 3s", "CTA: book a call", "Navy + cyan palette", "Captions: short lines"].map((c) => (
              <span key={c} className="rounded-full border border-electric-400/20 bg-electric-500/10 px-3 py-1 text-xs text-electric-100">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Learned from 214 posts and your last 12 revisions.</p>
        </div>

        {/* Ask Parren */}
        <div className="rounded-2xl border border-electric-400/10 bg-navy-950/60 p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Ask Parren</p>
          <div className="space-y-2 text-[13px]">
            <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-electric-500/20 px-3 py-2 text-slate-100">
              What should I film this week?
            </p>
            <p className="w-fit max-w-[95%] rounded-xl rounded-bl-sm bg-navy-800 px-3 py-2 text-slate-200">
              Your audience saves tutorial clips 3× more. Film one 60-second how-to — I drafted 3 hooks.
            </p>
          </div>
        </div>

        {/* Since Parren started */}
        <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-electric-600/20 to-cyan-500/10 p-4 lg:col-span-3">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
            Since Parren started <span className="normal-case tracking-normal text-slate-400">· illustrative</span>
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              ["1,240", "posts published"],
              ["+38%", "avg. engagement"],
              ["96 hrs", "saved on editing"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl text-white sm:text-3xl" style={{ fontWeight: 700 }}>{n}</p>
                <p className="mt-1 text-xs text-slate-300/80">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
