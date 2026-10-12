"use client";

import { useState } from "react";
import Image from "next/image";
import SignupForm from "./SignupForm";
import Questionnaire from "./Questionnaire";
import Reveal from "./Reveal";

const perks = [
  {
    title: "Priority beta consideration",
    body: "Get considered for our initial customer testing group when it opens.",
  },
  {
    title: "Founding-member opportunities",
    body: "Hear about introductory plans or founding-member benefits before public launch.",
  },
  {
    title: "Shape the platform",
    body: "Tell us what you need automated and help influence our product priorities.",
  },
  {
    title: "Early product previews",
    body: "Receive development updates and demonstrations as Parren takes shape.",
  },
];

export default function EarlyAccess() {
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null);

  return (
    <section id="early-access" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-600/15 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Why join early
            </p>
            <h2
              className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl"
              style={{ fontWeight: 700 }}
            >
              Help build the 24/7 social media manager <span className="text-gradient">you&apos;ve always wanted.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-slate-300/85">
              We&apos;re opening Parren to a small group first. Join the list, tell us about your
              workflow, and help define your ideal content machine.
            </p>
            <ul className="mt-8 space-y-4">
              {perks.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#1fd9e6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-white">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-300/75">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-400/75">
              No guaranteed beta access, no fixed pricing promises — just first access to updates
              and real opportunities to participate.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              {signedUpEmail ? (
                <Questionnaire email={signedUpEmail} />
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-4">
                    <Image
                      src="/mascot-assistant.png"
                      alt="Parren Assistant — your AI social media helper"
                      width={68}
                      height={68}
                      className="shrink-0 rounded-2xl border border-electric-400/20"
                      style={{ boxShadow: "0 8px 28px -8px rgba(24,123,255,0.5)" }}
                    />
                    <div>
                      <h3 className="font-display text-xl text-white" style={{ fontWeight: 600 }}>
                        Get early access
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-400">
                        Takes 20 seconds. We&apos;ll only email you about Parren.
                      </p>
                    </div>
                  </div>
                  <SignupForm onSuccess={setSignedUpEmail} idPrefix="cta" />
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
