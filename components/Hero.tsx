"use client";

import { useState } from "react";
import SignupForm from "./SignupForm";
import Questionnaire from "./Questionnaire";
import CommandCenter from "./CommandCenter";
import Reveal from "./Reveal";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#1fd9e6" opacity="0.18" />
      <path d="M8 12.5l2.6 2.6L16 9.5" stroke="#1fd9e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-glow-drift absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-electric-600/20 blur-[120px]" />
        <div className="absolute top-40 -left-32 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-64 -right-32 h-[380px] w-[380px] rounded-full bg-electric-500/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Copy + form */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-500/10 px-4 py-1.5 text-[13px] font-medium text-electric-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                Early access &middot; Now enrolling founding members
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="font-display mt-5 text-4xl leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
                style={{ fontWeight: 700 }}
              >
                Your 24/7 social media manager.
                <br />
                <span className="text-gradient">You film. Parren does the rest for you.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300/90">
                We&apos;re building an AI-powered social media manager that edits your videos,
                publishes them natively, and helps you plan new ones based on what&apos;s
                working — so your brand shows up every day without taking over your schedule.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
                <span aria-hidden="true" className="font-display text-2xl text-gradient" style={{ fontWeight: 700 }}>
                  450+
                </span>
                <p className="text-sm leading-snug text-slate-300/85">
                  publications a month across five platforms — our planned high-volume workflow.{" "}
                  <span className="text-slate-400/70">Not current capacity.</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="glass mt-6 rounded-2xl p-6 sm:p-7">
                {signedUpEmail ? (
                  <Questionnaire email={signedUpEmail} />
                ) : (
                  <>
                    <SignupForm onSuccess={setSignedUpEmail} idPrefix="hero" />
                    <p className="mt-4 text-center text-[12px] leading-relaxed text-slate-400/70">
                      Parren is in development — early members shape what ships first.{" "}
                      <a href="#how-it-works" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
                        See how it works
                      </a>
                    </p>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300/80">
                {["Free to join", "No spam, ever", "Unsubscribe anytime"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Product visual */}
          <Reveal delay={200} className="relative">
            <div className="animate-float-slow">
              <CommandCenter compact />
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Concept preview of the Parren experience — currently in development.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
