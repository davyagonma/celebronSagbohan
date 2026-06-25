import { Trophy } from "@phosphor-icons/react";
import { awards } from "../data/content";
import { Reveal } from "./Reveal";

export function PalmaresSection() {
  return (
    <section id="palmares" className="relative px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(255_179_0_/_0.06),transparent_60%)]" />

      <div className="relative lg:mx-auto lg:max-w-lg lg:px-2">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Palmarès</h2>
          <p className="mt-3 text-sm text-ink-muted">
            Distinctions officielles et reconnaissances internationales.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.06}>
              <article className="flex gap-4 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-5 stage-glow">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <Trophy size={26} weight="fill" />
                </div>
                <div>
                  {award.year && (
                    <time className="text-xs font-bold uppercase tracking-wider text-gold">{award.year}</time>
                  )}
                  <h3 className="mt-0.5 text-base font-bold text-white">{award.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{award.org}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <blockquote className="mt-10 border-l-2 border-flame pl-4">
            <p className="text-sm italic leading-relaxed text-ink-muted">
              « Il y a ceux qui vivent de la musique mais lui c'est un vrai passionné dans l'âme. »
            </p>
            <footer className="mt-2 text-xs text-smoke">My Addictive, Krystel Hountchegnon</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
