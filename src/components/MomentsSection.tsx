"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { moments } from "../data/content";
import { ImageLightbox, PhotoFrame, type LightboxItem } from "./PhotoFrame";
import { Reveal } from "./Reveal";

export function MomentsSection() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  const openMoment = (index: number) => {
    const m = moments[index];
    if (!m.image) return;
    setLightbox({
      src: m.image,
      alt: m.title,
      year: m.year,
      title: m.title,
      text: m.text,
    });
  };

  return (
    <section id="moments" className="relative px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(230_81_0_/_0.08),transparent_70%)]" />

      <div className="relative lg:mx-auto lg:max-w-lg lg:px-2">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Moments forts</h2>
          <p className="mt-3 max-w-prose text-sm text-ink-muted">
            Les dates qui ont marqué une carrière incontestable. Touchez une image pour l'agrandir.
          </p>
        </Reveal>

        <div className="mt-8 space-y-5">
          {moments.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05}>
              <article className="overflow-hidden rounded-2xl border border-white/8 bg-stage-warm/80 stage-glow">
                {m.image ? (
                  <PhotoFrame
                    src={m.image}
                    alt={m.title}
                    aspect="aspect-[4/3]"
                    objectPosition="top"
                    onClick={() => openMoment(i)}
                  />
                ) : (
                  <div className="placeholder-slot flex aspect-[16/10] items-center justify-center p-6">
                    <p className="text-center text-xs text-ink-muted">
                      Image à ajouter
                      <br />
                      <span className="text-flame/70">{m.title}</span>
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => m.image && openMoment(i)}
                  className={`w-full p-5 text-left ${m.image ? "cursor-pointer active:bg-white/5" : ""}`}
                >
                  <span className="text-xs font-bold text-gold">{m.year}</span>
                  <h3 className="mt-1 text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.text}</p>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
