"use client";

import Reveal from "./Reveal";

const ROWS: { label: string; traditional: string; parren: string }[] = [
  { label: "Trend & topic research", traditional: "Manual", parren: "Built in" },
  { label: "Content planning", traditional: "Spreadsheets & calendars", parren: "Built in" },
  { label: "AI-guided recording", traditional: "—", parren: "Planned" },
  { label: "Automated editing", traditional: "Separate tools", parren: "Built in" },
  { label: "Hook & caption generation", traditional: "Manual", parren: "Built in" },
  { label: "Native device publishing", traditional: "—", parren: "Planned" },
  { label: "Multi-platform distribution", traditional: "Varies", parren: "Built in" },
  { label: "Brand preference learning", traditional: "—", parren: "Planned" },
  { label: "Performance analytics", traditional: "Basic", parren: "Built in" },
  { label: "Automated optimization", traditional: "—", parren: "Planned" },
  { label: "Client approval workflows", traditional: "Varies", parren: "Planned" },
];

export default function Comparison() {
  return (
    <section id="comparison" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Why we&apos;re different
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl" style={{ fontWeight: 700 }}>
              A scheduling tool manages your calendar.{" "}
              <span className="text-gradient">Parren is being built to manage the workflow.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300/85">
              Parren&apos;s intended advantage isn&apos;t any single feature — it&apos;s connecting
              the whole content lifecycle into one coordinated system.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="glass mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-electric-400/15">
                    <th className="px-5 py-4 font-medium text-slate-400">Capability</th>
                    <th className="px-5 py-4 font-medium text-slate-400">Typical scheduling tool</th>
                    <th className="px-5 py-4 font-medium text-cyan-300">Parren (planned)</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.label} className="border-b border-electric-400/8 last:border-0">
                      <td className="px-5 py-3 font-medium text-slate-100">{r.label}</td>
                      <td className="px-5 py-3 text-slate-400">{r.traditional}</td>
                      <td className="px-5 py-3 font-medium text-cyan-200">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                        {r.parren}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-slate-400/70">
            Capabilities vary by product — this compares typical scheduling tools against
            Parren&apos;s planned integrated workflow, not any specific competitor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
