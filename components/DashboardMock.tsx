"use client";

/**
 * Stylized concept preview of the Parren command center.
 * This is a DESIGN MOCK — not a screenshot of a working product.
 * Keep every label generic; never invent performance numbers.
 */
const queueItems = [
  { title: "Founder story — raw cut 04", tag: "Editing", tagClass: "bg-electric-500/20 text-electric-300 border-electric-400/30", progress: 72 },
  { title: "Product demo — 30s clip", tag: "Ready to review", tagClass: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30", progress: 100 },
  { title: "Client win — testimonial", tag: "Scheduled", tagClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30", progress: 100 },
  { title: "Behind the scenes — office", tag: "Queued", tagClass: "bg-slate-400/15 text-slate-300 border-slate-400/30", progress: 12 },
];

const insights = [
  "Posting rhythm holding steady across channels",
  "Audience responding best to founder-led clips",
  "Captions tuned to your brand voice",
];

export default function DashboardMock() {
  return (
    <div className="relative">
      {/* glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-electric-600/25 via-cyan-500/10 to-transparent blur-2xl"
      />
      <div className="glass relative overflow-hidden rounded-2xl shadow-2xl shadow-electric-900/40">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-electric-400/10 px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-display text-sm font-medium tracking-wide text-slate-300">
            Parren Command Center
          </span>
          <span className="ml-auto rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300">
            Concept preview
          </span>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-5">
          {/* Content queue */}
          <div className="sm:col-span-3">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Content queue
            </p>
            <ul className="space-y-2.5">
              {queueItems.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-electric-400/10 bg-navy-950/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-electric-600 via-electric-500 to-cyan-500"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-slate-100">{item.title}</p>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-navy-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-electric-500 to-cyan-400"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${item.tagClass}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytics + AI feed */}
          <div className="sm:col-span-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Performance
            </p>
            <div className="rounded-xl border border-electric-400/10 bg-navy-950/60 p-4">
              <svg viewBox="0 0 200 64" className="h-16 w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#187bff" />
                    <stop offset="100%" stopColor="#1fd9e6" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,52 25,46 50,48 75,36 100,38 125,26 150,28 175,14 200,16"
                  fill="none"
                  stroke="url(#spark)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="200" cy="16" r="3.5" fill="#1fd9e6" />
              </svg>
              <p className="mt-1 text-[11px] text-slate-400">Engagement trending upward</p>
            </div>

            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Parren AI
            </p>
            <ul className="space-y-2">
              {insights.map((line) => (
                <li key={line} className="flex items-start gap-2 text-[12px] leading-snug text-slate-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                    <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.4-6.3-4.6-6.3 4.6L8 13.6 2 9.2h7.6L12 2z" fill="#1fd9e6" opacity="0.9" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
