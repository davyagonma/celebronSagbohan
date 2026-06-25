"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { artist, siteMeta } from "../data/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img
          src="/images/hero-stage.jpeg"
          alt="Sagbohan Danialou sur scène, éclairage orange festif"
          className="h-full w-full object-cover object-[center_30%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stage-black via-stage-black/70 to-stage-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stage-black/80 via-transparent to-flame/10" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 spotlight-gradient opacity-80" />

      <motion.div
        style={{ y: textY }}
        className="relative flex min-h-[100dvh] flex-col justify-end px-4 pb-10 pt-20 sm:px-6 lg:max-w-lg lg:px-8 lg:pb-14"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
        >
          {siteMeta.hashtag}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[12ch] text-4xl font-extrabold leading-none tracking-tighter text-white sm:text-5xl"
        >
          {siteMeta.title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 max-w-[28ch] text-lg font-medium text-gold-soft"
        >
          {siteMeta.subtitle}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-4 max-w-[32ch] text-sm leading-relaxed text-ink-muted"
        >
          {siteMeta.tagline}. Né le {artist.born} à {artist.birthplace}.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex gap-3"
        >
          <a
            href="#moments"
            className="stage-glow rounded-full bg-flame px-5 py-2.5 text-sm font-bold text-white active:scale-[0.98]"
          >
            Découvrir
          </a>
          <a
            href="#badge"
            className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold-soft backdrop-blur-sm active:scale-[0.98]"
          >
            Mon badge
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
