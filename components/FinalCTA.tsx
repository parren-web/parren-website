"use client";

import { useState } from "react";
import Image from "next/image";
import SignupForm from "./SignupForm";
import Questionnaire from "./Questionnaire";
import Reveal from "./Reveal";

/** Final conversion section with the mascot and email-first signup. */
export default function FinalCTA() {
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null);

  return (
    <section id="join" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-600/18 blur-[140px]"
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <Image
            src="/mascot-assistant.png"
            alt="Parren Assistant"
            width={84}
            height={84}
            className="mx-auto rounded-3xl border border-electric-400/20"
            style={{ boxShadow: "0 12px 40px -10px rgba(24,123,255,0.55)" }}
          />
          <h2
            className="font-display mt-6 text-3xl tracking-tight text-white sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            This could replace hours of <span className="text-gradient">social media work</span> every week.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300/85">
            Your brand, showing up consistently across every channel. Be among the first to
            try it.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass mx-auto mt-10 max-w-xl rounded-2xl p-6 sm:p-8">
            {signedUpEmail ? (
              <Questionnaire email={signedUpEmail} />
            ) : (
              <SignupForm onSuccess={setSignedUpEmail} idPrefix="final" />
            )}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-center text-sm text-slate-400/75">
            No commitment. Just first access to updates and opportunities to participate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
