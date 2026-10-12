import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-electric-400/10 bg-navy-950/60">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Your personal social media manager. You film. Parren does the rest.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
              Product
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><a href="#how-it-works" className="transition-colors hover:text-white">How it works</a></li>
              <li><a href="#vision" className="transition-colors hover:text-white">Vision</a></li>
              <li><a href="#faq" className="transition-colors hover:text-white">FAQ</a></li>
              <li><a href="#early-access" className="transition-colors hover:text-white">Join early access</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><a href="/privacy" className="transition-colors hover:text-white">Privacy policy</a></li>
              <li><a href="/terms" className="transition-colors hover:text-white">Terms of service</a></li>
              {/* PLACEHOLDER: replace with the real contact email before launch */}
              <li><a href="mailto:hello@parren.ai" className="transition-colors hover:text-white">hello@parren.ai</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-electric-400/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">&copy; 2026 Parren.ai — All rights reserved.</p>
          <p className="text-xs text-slate-500">
            Parren is in development. Early access does not guarantee product availability or timing.
          </p>
        </div>
      </div>
    </footer>
  );
}
