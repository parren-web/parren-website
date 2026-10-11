import Reveal from "./Reveal";

/**
 * The long-term vision — explicitly labeled as roadmap, never as shipped.
 * Keep this list in sync with the product truth doc (see README).
 */
const roadmap = [
  "AI-powered content strategy and ideas",
  "Automated video editing and clipping",
  "AI-generated captions in your voice",
  "Native social publishing from dedicated devices",
  "Automated performance analysis",
  "Continuous learning based on results",
  "AI-assisted interviewing and content creation",
  "A client dashboard for approvals, analytics, and content management",
];

export default function Vision() {
  return (
    <section id="vision" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 sm:px-14 sm:py-18">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="bg-grid absolute inset-0 opacity-70" />
              <div className="animate-glow-drift absolute -top-24 right-0 h-[320px] w-[480px] rounded-full bg-cyan-500/15 blur-[100px]" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[13px] font-medium text-cyan-300">
                  Our vision
                </span>
                <h2
                  className="font-display mt-5 text-3xl leading-tight tracking-tight text-white sm:text-4xl"
                  style={{ fontWeight: 700 }}
                >
                  A social media manager that <span className="text-gradient">runs itself.</span>
                </h2>
                <p
                  className="font-display mt-4 text-lg tracking-tight text-slate-200"
                  style={{ fontWeight: 700 }}
                >
                  Learn your voice. <span className="text-gradient">Grow your brand.</span>
                </p>
                <p className="mt-5 text-[17px] leading-relaxed text-slate-300/85">
                  This is where Parren is headed: a fully automated AI social media manager that
                  plans, creates, publishes, and optimizes — while you stay focused on the
                  business only you can run.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  These capabilities are on our roadmap at different stages of development.
                  Early access members help decide the order they ship in.
                </p>
                <a
                  href="#early-access"
                  className="btn-primary mt-8 inline-block rounded-xl px-7 py-3.5 font-display text-base font-semibold text-white"
                  style={{ fontWeight: 600 }}
                >
                  Join Early Access
                </a>
              </div>

              <ul className="space-y-3">
                {roadmap.map((item, i) => (
                  <Reveal key={item} delay={i * 60}>
                    <li className="flex items-center gap-4 rounded-xl border border-electric-400/10 bg-navy-950/60 px-5 py-3.5">
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 font-display text-[12px] font-semibold text-cyan-300"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-medium text-slate-100">{item}</span>
                      <span className="ml-auto shrink-0 rounded-full border border-slate-400/20 bg-slate-400/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Roadmap
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
