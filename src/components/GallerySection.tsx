"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { galleryImages, imagePlaceholders } from "../data/content";
import { ImageLightbox, PhotoFrame, type LightboxItem } from "./PhotoFrame";
import { Reveal } from "./Reveal";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  const openGallery = (index: number) => {
    const img = galleryImages[index];
    setLightbox({
      src: img.src,
      alt: img.alt,
      title: img.caption,
      caption: img.alt,
    });
  };

  return (
    <section id="galerie" className="px-4 py-16 sm:px-6 lg:mx-auto lg:max-w-lg lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Galerie</h2>
        <p className="mt-3 text-sm text-ink-muted">
          Scènes, portraits et archives. Touchez une photo pour l'agrandir.
        </p>
      </Reveal>

      <div className="mt-8 columns-2 gap-3 space-y-3">
        {galleryImages.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.04}>
            <figure className="break-inside-avoid overflow-hidden rounded-xl">
              <PhotoFrame
                src={img.src}
                alt={img.alt}
                aspect="aspect-auto"
                objectPosition="top"
                onClick={() => openGallery(i)}
                showGradient
              />
              <figcaption className="mt-2 text-center text-xs font-medium text-ink-muted">
                {img.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}

        {imagePlaceholders.map((slot, i) => (
          <Reveal key={slot.id} delay={(galleryImages.length + i) * 0.03}>
            <figure
              className="placeholder-slot break-inside-avoid flex flex-col items-center justify-center rounded-xl p-4"
              style={{ aspectRatio: slot.ratio.replace("/", " / ") }}
            >
              <span className="mb-2 text-[10px] uppercase tracking-wider text-flame/60">À ajouter</span>
              <figcaption className="text-center text-xs text-ink-muted">{slot.label}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
