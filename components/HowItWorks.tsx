import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Capture",
    headline: "You shoot.",
    body: "Film on your phone and drop in the raw clips. No scripts to write, no editing timeline, no posting calendar to babysit.",
  },
  {
    n: "02",
    title: "Create",
    headline: "Parren edits.",
    body: "Your footage becomes platform-ready videos, cut for attention — with captions written in your voice, not robot-speak.",
  },
  {
    n: "03",
    title: "Publish",
    headline: "Parren posts.",
    body: "Content goes out natively on every channel — consistently, at the right times, the way a person would post it.",
  },
  {
    n: "04",
    title: "Learn",
    headline: "Parren improves.",
    body: "Every post teaches the system what your audience responds to. Your content compounds, week after week.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
            How it works
          </p>
          <h2
            className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            The Parren loop
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-300/85">
            We&apos;re building Parren in the open, with early members. Here&apos;s the experience
            taking shape — one input from you, everything else handled.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-8 font-display text-[96px] font-bold text-electric-500/10 transition-colors duration-300 group-hover:text-electric-500/20"
                >
                  {s.n}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {s.title}
                </p>
                <h3
                  className="font-display mt-3 text-xl text-white"
                  style={{ fontWeight: 600 }}
                >
                  {s.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300/80">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-400">
            Parren is currently in development and testing. Early access members get the MVP
            first — and help decide what ships next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
