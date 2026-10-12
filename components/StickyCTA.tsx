"use client";

import { useEffect, useState } from "react";

/**
 * Sticky mobile CTA: appears once the hero scrolls out of view, hidden again
 * when the final signup section is visible. Mobile only.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const joinEl = document.getElementById("join");
      let nearJoin = false;
      if (joinEl) {
        const r = joinEl.getBoundingClientRect();
        nearJoin = r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3;
      }
      setVisible(past && !nearJoin);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-electric-400/20 bg-midnight/90 px-4 py-3 backdrop-blur-lg transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#join"
        tabIndex={visible ? 0 : -1}
        className="btn-primary block rounded-xl px-6 py-3 text-center font-display text-[15px] font-semibold text-white"
        style={{ fontWeight: 600 }}
      >
        Join Early Access — Free
      </a>
    </div>
  );
}
