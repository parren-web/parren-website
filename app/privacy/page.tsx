import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Parren.ai",
  description: "How Parren.ai collects, uses, and protects your information.",
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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Legal
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-white" style={{ fontWeight: 700 }}>
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-400">Last updated: October 11, 2026</p>

        <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm leading-relaxed text-amber-200">
          <span className="font-semibold">Draft document.</span> This privacy policy was prepared
          as a starting template for an early-access signup website. It has not been reviewed by a
          lawyer. Have qualified legal counsel review and approve it before collecting any personal
          information.
        </div>

        <Section title="1. Who we are">
          <p>
            Parren.ai (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website to collect
            early-access registrations for Parren, an AI-powered social media product currently in
            development.
          </p>
          <Flag>
            Insert the legal business name, province of operation, and registered address. This
            policy currently assumes a Canadian business subject to PIPEDA and applicable
            provincial privacy legislation.
          </Flag>
        </Section>

        <Section title="2. Information we collect">
          <p>We collect only what you choose to give us:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <span className="text-white">Signup details:</span> your first name, email address,
              and company or brand name.
            </li>
            <li>
              <span className="text-white">Marketing consent:</span> whether you opted in to
              receive early-access updates, and the version of the consent language you saw.
            </li>
            <li>
              <span className="text-white">Questionnaire answers (optional):</span> the platforms
              you care about, posting frequency, team size, and what you&apos;d like Parren to
              handle.
            </li>
            <li>
              <span className="text-white">Attribution data:</span> campaign parameters from the
              link you arrived on (e.g. utm_source, utm_campaign), the referring page, and the
              landing page URL — used only to measure which marketing efforts bring signups.
            </li>
          </ul>
          <p>
            We do not collect payment information, government identifiers, or precise location
            data on this website.
          </p>
        </Section>

        <Section title="3. How we use your information">
          <ul className="list-disc space-y-2 pl-6">
            <li>To hold your place on the Parren early-access list and notify you when access opens.</li>
            <li>
              To send product updates and launch communications — <em>only</em> if you gave express
              consent via the signup checkbox.
            </li>
            <li>To understand which audiences and campaigns drive qualified interest.</li>
            <li>To improve the signup experience and prevent abuse of the form.</li>
          </ul>
          <p>We will never sell your personal information to third parties.</p>
        </Section>

        <Section title="4. Marketing communications and consent (CASL)">
          <p>
            Because we operate in Canada, our email practices follow Canada&apos;s Anti-Spam
            Legislation (CASL). We only send commercial electronic messages to people who gave{" "}
            <span className="text-white">express consent</span> by ticking the opt-in checkbox on
            our signup form. The checkbox is never pre-ticked.
          </p>
          <p>
            Every marketing email we send will identify Parren.ai as the sender and include a
            working unsubscribe mechanism. You can withdraw consent at any time by clicking
            unsubscribe or by contacting us — we will stop sending marketing emails within 10
            business days.
          </p>
          <Flag>
            Confirm the unsubscribe mechanism and sender identification details once an email
            provider is chosen. Counsel should confirm this section satisfies CASL&apos;s form and
            content requirements for your specific sending setup.
          </Flag>
        </Section>

        <Section title="5. How we store and protect your information">
          <p>
            Signup and questionnaire data is stored in Google Sheets, accessed over encrypted
            connections. Access is limited to authorized Parren team members who need it to run the
            early-access program.
          </p>
          <p>
            We apply reasonable administrative and technical safeguards, including rate limiting,
            spam filtering, input validation, and server-side credential storage. No method of
            internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
          <Flag>
            Google may store Sheets data on servers outside Canada (including the United States).
            Counsel should advise whether a cross-border data transfer disclosure is required under
            PIPEDA / provincial law, and whether a Data Processing Addendum with Google is needed.
          </Flag>
        </Section>

        <Section title="6. Sharing with service providers">
          <p>
            We share personal information only with service providers that help us operate this
            website and the early-access program — for example, our hosting provider and Google
            Workspace (Sheets). These providers may only use the information to perform services
            for us and must protect it appropriately.
          </p>
          <p>
            We may disclose information if required by law or to protect our rights, users, or the
            public.
          </p>
        </Section>

        <Section title="7. Your rights">
          <p>
            You may request access to, correction of, or deletion of your personal information at
            any time. To make a request, or to withdraw marketing consent, contact us at the email
            below. We will respond within 30 days.
          </p>
          <Flag>
            Insert a dedicated privacy contact email (e.g. privacy@parren.ai) and confirm the
            internal process for handling access/deletion requests.
          </Flag>
        </Section>

        <Section title="8. Data retention">
          <p>
            We keep early-access data for as long as the early-access program runs and for a
            reasonable period afterward to administer it, unless you ask us to delete it sooner or
            the law requires otherwise.
          </p>
          <Flag>
            Set a concrete retention period (e.g. 24 months after program end) with counsel.
          </Flag>
        </Section>

        <Section title="9. Children's privacy">
          <p>
            This website is intended for business owners, entrepreneurs, creators, and personal
            brands — not children under 13. We do not knowingly collect information from children
            under 13.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            If we change this policy, we will post the updated version here with a new
            &ldquo;last updated&rdquo; date. Material changes affecting how we use your information
            will be communicated to active early-access members by email where required by law.
          </p>
        </Section>

        <Section title="11. Contact us">
          <p>
            Questions about this policy or your information:{" "}
            <a href="mailto:hello@parren.ai" className="text-cyan-300 underline underline-offset-2">
              hello@parren.ai
            </a>
          </p>
          <Flag>Replace with the real contact/privacy email before launch.</Flag>
        </Section>
      </main>
      <Footer />
    </>
  );
}
