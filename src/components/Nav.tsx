"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { navItems } from "../data/content";

export function Nav() {
  const [active, setActive] = useState("moments");
  const reduce = useReducedMotion();

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-[52px] z-40 border-b border-white/5 bg-stage-deep/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg gap-1 overflow-x-auto px-3 py-2 scrollbar-none sm:max-w-2xl lg:max-w-4xl">
        {navItems.map((item) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              active === item.id
                ? "bg-flame text-white"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {item.label}
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
