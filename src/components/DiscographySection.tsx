"use client";

import { useState } from "react";
import { CaretDown, Disc } from "@phosphor-icons/react";
import { albums, singles, topSongs } from "../data/content";
import { Reveal } from "./Reveal";

export function DiscographySection() {
  const [openAlbum, setOpenAlbum] = useState<number | null>(0);

  return (
    <section id="discographie" className="px-4 py-16 sm:px-6 lg:mx-auto lg:max-w-lg lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Discographie</h2>
        <p className="mt-3 text-sm text-ink-muted">
          11 releases, 8 albums, 50+ titres instructifs. Données compilées depuis Discogs, Wikipédia et L'investigateur.
        </p>
      </Reveal>

      <div className="mt-8 space-y-3">
        {albums.map((album, i) => (
          <Reveal key={`${album.year}-${album.title}`} delay={i * 0.03}>
            <div
              className={`overflow-hidden rounded-xl border transition-colors ${
                album.highlight ? "border-flame/40 bg-flame/5" : "border-white/8 bg-stage-warm/60"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenAlbum(openAlbum === i ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left active:scale-[0.99]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-flame/20 text-flame">
                  <Disc size={22} weight="fill" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gold">{album.year}</p>
                  <p className="truncate font-bold text-white">{album.title}</p>
                  <p className="truncate text-xs text-ink-muted">{album.label}</p>
                </div>
                <CaretDown
                  size={18}
                  className={`shrink-0 text-ink-muted transition-transform ${openAlbum === i ? "rotate-180" : ""}`}
                />
              </button>
              {openAlbum === i && (
                <ul className="border-t border-white/5 px-4 pb-4 pt-2">
                  {album.tracks.map((track) => (
                    <li key={track} className="border-b border-white/5 py-2 text-sm text-ink-muted last:border-0">
                      {track}
                    </li>
                  ))}
                  {album.note && (
                    <li className="pt-2 text-xs italic text-gold/80">{album.note}</li>
                  )}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-12 text-xl font-bold text-white">Singles & EP</h3>
        <ul className="mt-4 space-y-2">
          {singles.map((s) => (
            <li key={s.title} className="flex justify-between gap-3 rounded-lg bg-white/5 px-4 py-3 text-sm">
              <span className="font-medium text-ink">{s.title}</span>
              <span className="shrink-0 text-xs text-ink-muted">{s.year}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <h3 className="mt-12 text-xl font-bold text-white">Titres phares</h3>
        <p className="mt-2 text-xs text-ink-muted">Source : Apple Music</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {topSongs.map((song) => (
            <span
              key={song}
              className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-soft"
            >
              {song}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
