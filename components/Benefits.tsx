import Reveal from "./Reveal";

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="#1fd9e6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const benefits = [
  {
    icon: "M12 8v4l2.5 2.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
    title: "Your time back",
    body: "Film for an hour a week. Parren absorbs the other 95% of the content grind — editing, captions, posting, tracking.",
  },
  {
    icon: "M4 17l6-6-6-6M12 19h8",
    title: "Never go dark again",
    body: "A steady posting rhythm without the Sunday-night scramble. Your channels stay alive while you're running the business.",
  },
  {
    icon: "M12 2l2.4 7.2H22l-6 4.4 2.3 7.4-6.3-4.6-6.3 4.6L8 13.6 2 9.2h7.6L12 2z",
    title: "Posted like a human",
    body: "Published natively on each platform — not blasted out by the kind of spammy automation the platforms punish.",
  },
  {
    icon: "M3 17l6-6 4 4 8-8M15 7h6v6",
    title: "Compounds over time",
    body: "Parren studies what performs and sharpens your content every week. Month six outperforms month one — automatically.",
  },
  {
    icon: "M23 7l-7 5 7 5V7zM1 5h15v14H1z",
    title: "One job: film",
    body: "If you can film it on your phone, Parren can run with it. That's the entire input on your side.",
  },
  {
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    title: "Built for business",
    body: "Made for founders, creators, and personal brands — not agencies reselling hours or generic scheduling tools.",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-electric-600/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Why Parren
          </p>
          <h2
            className="font-display mt-4 text-3xl tracking-tight text-white sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Spend your time running the business.
            <br />
            <span className="text-gradient">We&apos;ll run the content.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 90}>
              <article className="glass h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                  <Icon d={b.icon} />
                </div>
                <h3 className="font-display mt-5 text-lg text-white" style={{ fontWeight: 600 }}>
                  {b.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-300/80">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
