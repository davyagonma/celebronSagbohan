"use client";

import { DownloadSimple, ImageSquare, Sparkle, UploadSimple } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { badgeFormats, badgePhrases, type BadgeFormat } from "../data/badge";
import { downloadCanvas, generateBadgeCanvas } from "../utils/generateBadge";
import { Reveal } from "./Reveal";

const MAX_FILE_MB = 8;
const ACCEPT = "image/jpeg,image/png,image/webp";

export function BadgeGeneratorSection() {
  const reduce = useReducedMotion();
  const fileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [phrase, setPhrase] = useState<string>(badgePhrases[0]);
  const [customPhrase, setCustomPhrase] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [format, setFormat] = useState<BadgeFormat>("square");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePhrase = useCustom && customPhrase.trim() ? customPhrase.trim() : phrase;

  const renderPreview = useCallback(async () => {
    if (!photoUrl || !previewRef.current) return;
    setGenerating(true);
    setError(null);
    try {
      const canvas = await generateBadgeCanvas(photoUrl, activePhrase, format);
      const preview = previewRef.current;
      const ctx = preview.getContext("2d");
      if (!ctx) return;
      preview.width = canvas.width;
      preview.height = canvas.height;
      ctx.drawImage(canvas, 0, 0);
    } catch {
      setError("Impossible de générer l'aperçu. Essayez une autre photo.");
    } finally {
      setGenerating(false);
    }
  }, [photoUrl, activePhrase, format]);

  useEffect(() => {
    if (photoUrl) renderPreview();
  }, [photoUrl, activePhrase, format, renderPreview]);

  useEffect(() => {
    return () => {
      if (photoUrl?.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    setError(null);
    if (!ACCEPT.split(",").some((t) => file.type === t)) {
      setError("Format accepté : JPG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Photo trop lourde (max ${MAX_FILE_MB} Mo).`);
      return;
    }
    if (photoUrl?.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleDownload = async () => {
    if (!photoUrl) return;
    setGenerating(true);
    try {
      const canvas = await generateBadgeCanvas(photoUrl, activePhrase, format);
      downloadCanvas(canvas, `celebronSagbohan-${Date.now()}.png`);
    } catch {
      setError("Échec du téléchargement. Réessayez.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section id="badge" className="relative px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_179_0_/_0.07),transparent_55%)]" />

      <div className="relative lg:mx-auto lg:max-w-lg lg:px-2">
        <Reveal>
          <div className="flex items-center gap-2">
            <Sparkle size={22} weight="fill" className="text-gold" />
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Mon badge</h2>
          </div>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">
            Ajoute ta photo, choisis une phrase forte et télécharge ton badge{" "}
            <span className="font-semibold text-gold">#celebronSagbohan</span> pour les réseaux sociaux.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-8 space-y-5">
            {/* Upload */}
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-flame/40 bg-flame/5 px-6 py-10 transition-colors hover:border-flame/60 active:scale-[0.99]"
            >
              <UploadSimple size={36} className="text-flame" />
              <span className="text-sm font-bold text-white">Choisir ma photo</span>
              <span className="text-xs text-ink-muted">JPG, PNG ou WebP · max {MAX_FILE_MB} Mo</span>
            </button>

            {error && (
              <p className="rounded-lg bg-ember/20 px-4 py-2 text-sm text-gold-soft">{error}</p>
            )}

            {/* Format */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">Format</p>
              <div className="flex gap-2">
                {badgeFormats.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                      format === f.id
                        ? "border-flame bg-flame/20 text-white"
                        : "border-white/10 text-ink-muted"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Phrases */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">Phrase forte</p>
              <div className="flex flex-wrap gap-2">
                {badgePhrases.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setUseCustom(false);
                      setPhrase(p);
                    }}
                    className={`rounded-full border px-3 py-1.5 text-left text-[11px] leading-snug transition-colors ${
                      !useCustom && phrase === p
                        ? "border-gold bg-gold/15 text-gold-soft"
                        : "border-white/10 text-ink-muted hover:border-white/20"
                    }`}
                  >
                    {p.length > 42 ? `${p.slice(0, 42)}…` : p}
                  </button>
                ))}
              </div>
              <label className="mt-3 block">
                <span className="text-xs text-ink-muted">Ou écris la tienne (120 car. max)</span>
                <textarea
                  value={customPhrase}
                  onChange={(e) => {
                    setCustomPhrase(e.target.value.slice(0, 120));
                    setUseCustom(e.target.value.trim().length > 0);
                  }}
                  placeholder="Mon moment avec Papa Sagbohan..."
                  rows={2}
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-stage-warm/80 px-4 py-3 text-sm text-ink placeholder:text-smoke focus:border-flame/50 focus:outline-none"
                />
              </label>
            </div>

            {/* Preview */}
            {photoUrl && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-2xl border border-gold/25 bg-stage-deep stage-glow"
              >
                <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                  <ImageSquare size={18} className="text-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Aperçu</span>
                  {generating && (
                    <span className="ml-auto text-[10px] text-flame">Génération…</span>
                  )}
                </div>
                <div className="flex justify-center bg-stage-black p-4">
                  <canvas
                    ref={previewRef}
                    className={`max-h-[420px] w-full object-contain ${
                      format === "story" ? "max-w-[220px]" : "max-w-[320px]"
                    }`}
                  />
                </div>
                <div className="border-t border-white/8 p-4">
                  <button
                    type="button"
                    disabled={generating || !activePhrase}
                    onClick={handleDownload}
                    className="stage-glow flex w-full items-center justify-center gap-2 rounded-full bg-flame py-3.5 text-sm font-bold text-white disabled:opacity-50 active:scale-[0.98]"
                  >
                    <DownloadSimple size={20} weight="bold" />
                    Télécharger mon badge
                  </button>
                  <p className="mt-2 text-center text-[10px] text-smoke">
                    Partage sur Instagram, Facebook, WhatsApp avec #celebronSagbohan
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
