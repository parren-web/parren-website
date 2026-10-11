import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Parren.ai",
  description: "Terms governing the Parren.ai early-access program.",
};

/**
 * DRAFT — requires review by qualified legal counsel before launch.
 * Items needing your input are marked [LEGAL REVIEW] inline.
 */

function Flag({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm leading-relaxed text-amber-200">
      <span className="font-semibold">Legal review needed: </span>
      {children}
    </p>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl text-white" style={{ fontWeight: 600 }}>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-300/85">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Legal
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-white" style={{ fontWeight: 700 }}>
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-400">Last updated: October 11, 2026</p>

        <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm leading-relaxed text-amber-200">
          <span className="font-semibold">Draft document.</span> These terms were prepared as a
          starting template for an early-access signup website. They have not been reviewed by a
          lawyer. Have qualified legal counsel review and approve them before launch.
        </div>

        <Section title="1. The early-access program">
          <p>
            This website collects registrations of interest for Parren, a product currently in
            development. Joining the early-access list means we may contact you about the product
            launch and related updates (if you consented to marketing emails). It does{" "}
            <span className="text-white">not</span> create an account, grant access to any software,
            or guarantee if or when you will be invited to use Parren.
          </p>
          <Flag>
            Insert the legal business name. Confirm this characterization matches how the program
            will actually operate (e.g. whether any paid pre-orders or beta agreements will exist —
            if so, separate terms are needed).
          </Flag>
        </Section>

        <Section title="2. Eligibility">
          <p>
            You must be at least 18 years old (or the age of majority in your jurisdiction) and
            able to form a binding contract to join the early-access list. This website is intended
            for business use.
          </p>
        </Section>

        <Section title="3. Your submissions">
          <p>
            Information you submit through our forms (name, email, company, questionnaire answers)
            must be accurate and must not infringe anyone&apos;s rights or violate any law. You
            grant us permission to use your submissions to operate the early-access program, as
            described in our privacy policy.
          </p>
        </Section>

        <Section title="4. Acceptable use">
          <p>You agree not to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Submit false information or impersonate another person or business.</li>
            <li>Use automated means to submit bulk or fraudulent registrations.</li>
            <li>Attempt to disrupt, probe, or gain unauthorized access to the website.</li>
            <li>Use the website for any unlawful purpose.</li>
          </ul>
          <p>
            We may remove fraudulent registrations and block abusive activity without notice.
          </p>
        </Section>

        <Section title="5. Intellectual property">
          <p>
            All content on this website — including text, graphics, logos, and the Parren name —
            is owned by us or our licensors and protected by intellectual property laws. You may
            not copy, reproduce, or redistribute it without our written permission.
          </p>
          <Flag>
            Confirm trademark status of the Parren name and logo, and insert the correct rights
            holder name.
          </Flag>
        </Section>

        <Section title="6. No warranties">
          <p>
            This website and the early-access program are provided &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo;, without warranties of any kind, express or implied,
            including warranties of merchantability, fitness for a particular purpose, or
            non-infringement. We do not warrant that the website will be uninterrupted or
            error-free, or that any product described here will launch on any timeline — or at all.
          </p>
        </Section>

        <Section title="7. Limitation of liability">
          <p>
            To the maximum extent permitted by law, we will not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of this
            website or participation in the early-access program. Our total liability for any claim
            will not exceed CAD $100.
          </p>
          <Flag>
            Counsel must review the liability cap and exclusions for enforceability under Ontario /
            Canadian consumer protection law.
          </Flag>
        </Section>

        <Section title="8. Governing law">
          <p>
            These terms are governed by the laws of the Province of Ontario and the federal laws of
            Canada applicable there, without regard to conflict-of-law principles.
          </p>
          <Flag>Confirm governing-law jurisdiction with counsel.</Flag>
        </Section>

        <Section title="9. Changes to these terms">
          <p>
            We may update these terms from time to time. The version posted here at the time you
            joined the early-access list applies to your participation. Continued participation
            after changes are posted constitutes acceptance of the updated terms.
          </p>
        </Section>

        <Section title="10. Contact us">
          <p>
            Questions about these terms:{" "}
            <a href="mailto:hello@parren.ai" className="text-cyan-300 underline underline-offset-2">
              hello@parren.ai
            </a>
          </p>
          <Flag>Replace with the real contact email before launch.</Flag>
        </Section>
      </main>
      <Footer />
    </>
  );
}
