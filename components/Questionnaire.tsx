"use client";

import { useState } from "react";

const PLATFORMS = ["Instagram", "TikTok", "YouTube Shorts", "Facebook", "LinkedIn", "X"] as const;
const INDUSTRIES = [
  "Real estate",
  "Finance & insurance",
  "Legal",
  "Consulting & coaching",
  "Healthcare & wellness",
  "E-commerce & retail",
  "Hospitality & food",
  "Creative & media",
  "Technology & SaaS",
  "Trades & home services",
  "Non-profit",
  "Other",
] as const;
const CURRENT_FREQ = ["Rarely / never", "A few times a month", "Weekly", "Multiple times a week", "Daily"] as const;
const DESIRED_FREQ = ["A few times a week", "Daily", "Multiple times a day", "As much as possible"] as const;
const BUDGETS = ["Under $500/mo", "$500–$1,500/mo", "$1,500–$5,000/mo", "$5,000+/mo", "Prefer not to say"] as const;

type QuestionnaireProps = {
  email: string;
};

/**
 * Optional post-signup qualification questionnaire (~60 seconds).
 * Answers are appended to the "Qualification" tab of the leads sheet,
 * keyed by email — a row here means the user completed the questionnaire.
 * Entirely optional — "Skip" finishes the flow.
 */
export default function Questionnaire({ email }: QuestionnaireProps) {
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [handle, setHandle] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [currentFrequency, setCurrentFrequency] = useState("");
  const [desiredFrequency, setDesiredFrequency] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [budget, setBudget] = useState("");
  const [betaInterest, setBetaInterest] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  function togglePlatform(p: string) {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "done") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName.trim(),
          company: company.trim(),
          industry,
          handle: handle.trim(),
          platforms,
          currentFrequency,
          desiredFrequency,
          bottleneck: bottleneck.trim(),
          budget,
          betaInterest,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="py-6 text-center">
        <div
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#1fd9e6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display mt-4 text-xl text-white" style={{ fontWeight: 600 }}>
          You&apos;re on the list.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-300/80">
          Thanks — we&apos;ll email you at <span className="text-cyan-300">{email}</span> when your
          early access opens.
        </p>
      </div>
    );
  }

  const selectCls = "field";

  return (
    <div>
      <div className="text-center">
        <h3 className="font-display text-xl text-white" style={{ fontWeight: 600 }}>
          You&apos;re in. Want to help shape Parren?
        </h3>
        <p className="mt-2 text-[15px] text-slate-300/80">
          Optional — about 60 seconds. Your answers help us prioritize what to build first.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="q-firstName" className="mb-2 block text-sm font-medium text-slate-200">
              First name
            </label>
            <input
              id="q-firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={60}
              placeholder="Jane"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="q-company" className="mb-2 block text-sm font-medium text-slate-200">
              Company / brand
            </label>
            <input
              id="q-company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={120}
              placeholder="Acme Co."
              className="field"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="q-industry" className="mb-2 block text-sm font-medium text-slate-200">
              Industry
            </label>
            <select id="q-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className={selectCls}>
              <option value="">Select…</option>
              {INDUSTRIES.map((v) => (
                <option key={v} value={v} className="bg-navy-900">{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="q-handle" className="mb-2 block text-sm font-medium text-slate-200">
              Website or social handle
            </label>
            <input
              id="q-handle"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              maxLength={120}
              placeholder="acme.co or @acme"
              className="field"
            />
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-sm font-medium text-slate-200">Which platforms matter most to you?</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const active = platforms.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-200"
                      : "border-electric-400/20 bg-navy-950/60 text-slate-300 hover:border-electric-400/40"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="q-current" className="mb-2 block text-sm font-medium text-slate-200">
              How often do you post today?
            </label>
            <select id="q-current" value={currentFrequency} onChange={(e) => setCurrentFrequency(e.target.value)} className={selectCls}>
              <option value="">Select…</option>
              {CURRENT_FREQ.map((f) => (
                <option key={f} value={f} className="bg-navy-900">{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="q-desired" className="mb-2 block text-sm font-medium text-slate-200">
              How often would you like to post?
            </label>
            <select id="q-desired" value={desiredFrequency} onChange={(e) => setDesiredFrequency(e.target.value)} className={selectCls}>
              <option value="">Select…</option>
              {DESIRED_FREQ.map((f) => (
                <option key={f} value={f} className="bg-navy-900">{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="q-bottleneck" className="mb-2 block text-sm font-medium text-slate-200">
            What&apos;s the most painful part of social media for you right now?
          </label>
          <input
            id="q-bottleneck"
            type="text"
            value={bottleneck}
            onChange={(e) => setBottleneck(e.target.value)}
            maxLength={500}
            placeholder="e.g. Editing footage into clips takes my weekends"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="q-budget" className="mb-2 block text-sm font-medium text-slate-200">
            Approximate monthly content / marketing budget
          </label>
          <select id="q-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
            <option value="">Select…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-navy-900">{b}</option>
            ))}
          </select>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={betaInterest}
            onChange={(e) => setBetaInterest(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-cyan-400"
          />
          <span className="text-sm leading-relaxed text-slate-300/85">
            Yes — consider me for early beta testing when spots open up.
          </span>
        </label>

        {status === "error" && (
          <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
            Couldn&apos;t save your answers — but you&apos;re still on the early access list.
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary flex-1 rounded-xl px-6 py-3 font-display text-[15px] font-semibold text-white disabled:opacity-60"
            style={{ fontWeight: 600 }}
          >
            {status === "loading" ? "Saving…" : "Save my answers"}
          </button>
          <button
            type="button"
            onClick={() => setStatus("done")}
            className="text-sm font-medium text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Skip
          </button>
        </div>
      </form>
    </div>
  );
}
