"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { galleryImages, imagePlaceholders } from "../data/content";
import { Reveal } from "./Reveal";

/* ─── Mosaic tile sizing ─── */
const TILE_SPANS: string[] = [
  "col-span-2 row-span-2",   // large
  "col-span-1 row-span-1",   // small
  "col-span-1 row-span-2",   // tall
  "col-span-1 row-span-1",   // small
  "col-span-2 row-span-1",   // wide
  "col-span-1 row-span-1",   // small
  "col-span-1 row-span-1",   // small
  "col-span-2 row-span-2",   // large
  "col-span-1 row-span-1",   // small
  "col-span-1 row-span-2",   // tall
  "col-span-1 row-span-1",   // small
  "col-span-2 row-span-1",   // wide
];

function getTileSpan(index: number) {
  return TILE_SPANS[index % TILE_SPANS.length];
}

/* ─── Stacked gallery lightbox with navigation ─── */
function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const total = images.length;
  const current = images[currentIndex];

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  /* Stacked images: show 2 cards behind the current one */
  const stackOffsets = [
    { scale: 1, y: 0, rotate: 0, opacity: 1, zIndex: 30 },
    { scale: 0.94, y: 18, rotate: 2.5, opacity: 0.5, zIndex: 20 },
    { scale: 0.88, y: 36, rotate: -2, opacity: 0.3, zIndex: 10 },
  ];

  const getStackImage = (offset: number) => {
    const idx = (currentIndex + offset) % total;
    return images[idx];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stage-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Navigation arrows */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 top-1/2 z-[40] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-stage-black/80 text-ink backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 sm:left-6"
        aria-label="Photo précédente"
      >
        <CaretLeft size={24} weight="bold" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 top-1/2 z-[40] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-stage-black/80 text-ink backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 sm:right-6"
        aria-label="Photo suivante"
      >
        <CaretRight size={24} weight="bold" />
      </button>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-4 z-[40] flex h-10 w-10 items-center justify-center rounded-full bg-stage-black/80 text-ink backdrop-blur-sm active:scale-95 sm:right-6"
        aria-label="Fermer"
      >
        <X size={20} weight="bold" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 z-[40] rounded-full bg-stage-black/80 px-3 py-1.5 text-xs font-bold text-ink-muted backdrop-blur-sm sm:bottom-6 sm:right-6">
        {currentIndex + 1} / {total}
      </div>

      {/* Stacked cards */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: "min(90vw, 600px)", height: "min(80vh, 700px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {stackOffsets.map((offset, i) => {
          const img = getStackImage(i);
          const isCurrent = i === 0;
          return (
            <motion.div
              key={`${currentIndex}-stack-${i}`}
              initial={reduce ? false : { opacity: 0, scale: 0.85, y: 60 }}
              animate={{
                opacity: offset.opacity,
                scale: offset.scale,
                y: offset.y,
                rotate: offset.rotate,
              }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.9, y: 40 }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-flame/30 stage-glow"
              style={{ zIndex: offset.zIndex }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-contain"
                style={{ background: "var(--color-stage-deep)" }}
              />
              {/* Text overlay – only on current */}
              {isCurrent && (
                <div className="absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-stage-black/90 via-stage-black/50 to-transparent px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">{img.caption}</h3>
                  <p className="mt-1 text-sm text-ink/80 drop-shadow-md">{img.alt}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Gallery Section ─── */
export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="galerie" className="px-4 py-16 sm:px-6 lg:mx-auto lg:max-w-lg lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Galerie</h2>
        <p className="mt-3 text-sm text-ink-muted">
          Scènes, portraits et archives. Touchez une photo pour l'agrandir.
        </p>
      </Reveal>

      {/* Mosaic grid */}
      <div className="mt-8 grid auto-rows-[140px] grid-cols-3 gap-2 sm:auto-rows-[180px] sm:gap-3">
        {galleryImages.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.03}>
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={`group relative h-full w-full overflow-hidden rounded-xl border border-white/8 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_30px_rgb(230_81_0_/_0.25)] active:scale-[0.97] ${getTileSpan(i)}`}
              aria-label={`Voir ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stage-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Caption on hover */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-bold text-white drop-shadow-lg">{img.caption}</span>
              </div>
            </button>
          </Reveal>
        ))}

        {imagePlaceholders.map((slot, i) => (
          <Reveal key={slot.id} delay={(galleryImages.length + i) * 0.03}>
            <div
              className="placeholder-slot flex h-full w-full flex-col items-center justify-center rounded-xl p-3"
            >
              <span className="mb-1 text-[9px] uppercase tracking-wider text-flame/60">À ajouter</span>
              <span className="text-center text-[10px] text-ink-muted">{slot.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(idx) => setLightboxIndex(idx)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
