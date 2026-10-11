"use client";

import { useState } from "react";

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X (Twitter)"] as const;
const FREQUENCIES = ["Rarely / never", "A few times a month", "Weekly", "Multiple times a week", "Daily"] as const;
const SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"] as const;

type QuestionnaireProps = {
  email: string;
};

/**
 * Optional post-signup qualification questionnaire (~60 seconds).
 * Answers are appended to the "Qualification" tab of the leads sheet,
 * keyed by email. Entirely optional — "Skip" finishes the flow.
 */
export default function Questionnaire({ email }: QuestionnaireProps) {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");
  const [handoff, setHandoff] = useState("");
  const [size, setSize] = useState("");
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
        body: JSON.stringify({ email, platforms, postingFrequency: frequency, handoff: handoff.trim(), companySize: size }),
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

  return (
    <div>
      <div className="text-center">
        <h3 className="font-display text-xl text-white" style={{ fontWeight: 600 }}>
          You&apos;re in. Want to skip the line?
        </h3>
        <p className="mt-2 text-[15px] text-slate-300/80">
          Tell us a bit more (optional, 60 seconds) — it helps us prioritize founding members.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
            <label htmlFor="q-frequency" className="mb-2 block text-sm font-medium text-slate-200">
              How often do you post today?
            </label>
            <select
              id="q-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="field"
            >
              <option value="">Select…</option>
              {FREQUENCIES.map((f) => (
                <option key={f} value={f} className="bg-navy-900">
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="q-size" className="mb-2 block text-sm font-medium text-slate-200">
              Team size
            </label>
            <select id="q-size" value={size} onChange={(e) => setSize(e.target.value)} className="field">
              <option value="">Select…</option>
              {SIZES.map((s) => (
                <option key={s} value={s} className="bg-navy-900">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="q-handoff" className="mb-2 block text-sm font-medium text-slate-200">
            If Parren could take one thing off your plate tomorrow, what would it be?
          </label>
          <input
            id="q-handoff"
            type="text"
            value={handoff}
            onChange={(e) => setHandoff(e.target.value)}
            maxLength={500}
            placeholder="e.g. Editing my raw footage into clips"
            className="field"
          />
        </div>

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
