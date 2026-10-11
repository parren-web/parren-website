"use client";

import { useEffect, useState } from "react";

type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

type SignupFormProps = {
  /** called with the registered email once signup succeeds */
  onSuccess?: (email: string) => void;
  idPrefix?: string;
};

/**
 * Early-access signup form.
 *
 * Security layers:
 * - Honeypot field ("website") — bots fill it, humans never see it
 * - Server-side zod validation, rate limiting, and duplicate-email check
 *   (see app/api/early-access/route.ts)
 * - Service-account credentials live only in server env vars, never here
 */
export default function SignupForm({ onSuccess, idPrefix = "signup" }: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [attribution, setAttribution] = useState<Attribution>({});
  const [referrer, setReferrer] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Capture campaign attribution once on mount: UTM params + referrer + landing page.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const get = (k: string) => params.get(k) ?? undefined;
      setAttribution({
        utm_source: get("utm_source"),
        utm_medium: get("utm_medium"),
        utm_campaign: get("utm_campaign"),
        utm_term: get("utm_term"),
        utm_content: get("utm_content"),
      });
      setReferrer(document.referrer || "");
    } catch {
      /* attribution is best-effort; signup must still work */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setErrorMsg("");

    if (!firstName.trim() || !email.trim() || !company.trim()) {
      setErrorMsg("Please fill in your name, email, and company or brand.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg("Please tick the consent box so we can email you about early access.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          company: company.trim(),
          consent: true,
          website: honeypot, // honeypot — must stay empty
          utm: attribution,
          referrer,
          landingPage: window.location.href,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && data?.ok) {
        onSuccess?.(email.trim().toLowerCase());
        return;
      }
      setErrorMsg(
        data?.error || "Something went wrong on our end. Please try again in a moment."
      );
      setStatus("error");
    } catch {
      setErrorMsg("Couldn't reach our servers. Check your connection and try again.");
      setStatus("error");
    }
  }

  const fieldId = (n: string) => `${idPrefix}-${n}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
      <div>
        <label htmlFor={fieldId("firstName")} className="sr-only">
          First name
        </label>
        <input
          id={fieldId("firstName")}
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          className="field"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={60}
          required
        />
      </div>
      <div>
        <label htmlFor={fieldId("email")} className="sr-only">
          Email
        </label>
        <input
          id={fieldId("email")}
          type="email"
          autoComplete="email"
          placeholder="Work email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={254}
          required
        />
      </div>
      <div>
        <label htmlFor={fieldId("company")} className="sr-only">
          Company or brand
        </label>
        <input
          id={fieldId("company")}
          type="text"
          autoComplete="organization"
          placeholder="Company / brand name"
          className="field"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          maxLength={120}
          required
        />
      </div>

      {/* Honeypot — invisible to humans, irresistible to bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={fieldId("website")}>
          Leave this field empty
          <input
            id={fieldId("website")}
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-left">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-cyan-400"
        />
        <span className="text-[13px] leading-relaxed text-slate-300/80">
          Yes, I want early-access updates from Parren.ai. I understand I can unsubscribe at any
          time. See our <a href="/privacy" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">privacy policy</a>.
        </span>
      </label>

      {status === "error" && errorMsg && (
        <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full rounded-xl px-6 py-3.5 font-display text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        style={{ fontWeight: 600 }}
      >
        {status === "loading" ? "Joining…" : "Join Early Access"}
      </button>

      <p className="text-center text-xs text-slate-400/70">
        Free to join &middot; No spam, ever &middot; Unsubscribe anytime
      </p>
    </form>
  );
}
