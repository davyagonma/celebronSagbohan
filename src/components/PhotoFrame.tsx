"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";

type PhotoFrameProps = {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  objectPosition?: string;
  onClick?: () => void;
  showGradient?: boolean;
};

export function PhotoFrame({
  src,
  alt,
  className = "",
  aspect = "aspect-[16/10]",
  objectPosition = "top",
  onClick,
  showGradient = true,
}: PhotoFrameProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--spot-x", `${x}%`);
    ref.current.style.setProperty("--spot-y", `${y}%`);
  }, [reduce]);

  const interactive = Boolean(onClick);

  return (
    <motion.div
      ref={ref}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={interactive ? (e) => e.key === "Enter" && onClick?.() : undefined}
      onMouseMove={handleMove}
      whileHover={reduce ? undefined : { scale: interactive ? 1.02 : 1.01 }}
      whileTap={interactive && !reduce ? { scale: 0.98 } : undefined}
      className={`photo-frame group relative overflow-hidden ${aspect} ${interactive ? "cursor-pointer" : ""} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        loading="lazy"
      />
      <div className="photo-spotlight pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {showGradient && (
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-stage-black/70 via-transparent to-transparent" />
      )}
      {interactive && (
        <div className="pointer-events-none absolute inset-0 z-[3] flex items-end justify-center pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-flame/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Agrandir
          </span>
        </div>
      )}
    </motion.div>
  );
}

export type LightboxItem = {
  src: string;
  alt: string;
  year?: string;
  title: string;
  text?: string;
  caption?: string;
};

type ImageLightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
};

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-stage-black/95 p-4 backdrop-blur-md sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-flame/30 bg-stage-deep stage-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-stage-black/80 text-lg text-ink backdrop-blur-sm active:scale-95"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="photo-frame aspect-[4/5] max-h-[55dvh] w-full sm:aspect-[16/10] sm:max-h-[50dvh]">
          <img
            src={item.src}
            alt={item.alt}
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
          <div
            className="photo-spotlight pointer-events-none absolute inset-0 opacity-40"
            style={{ "--spot-x": "50%", "--spot-y": "40%" } as Record<string, string>}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stage-black/60 via-transparent to-flame/10" />
        </div>

        <div className="border-t border-white/8 p-5 sm:p-6">
          {item.year && (
            <span className="text-xs font-bold uppercase tracking-wider text-gold">{item.year}</span>
          )}
          <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
          {(item.text || item.caption) && (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text ?? item.caption}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
