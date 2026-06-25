import { bioChapters } from "../data/content";
import { Reveal } from "./Reveal";

export function BioSection() {
  return (
    <section id="bio" className="px-4 py-16 sm:px-6 lg:mx-auto lg:max-w-lg lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Parcours</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">
          De Ekpè aux scènes du monde, l'histoire d'un passionné dans l'âme qui a écrit la musique béninoise.
        </p>
      </Reveal>

      <div className="relative mt-10 space-y-0">
        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-flame/60 via-gold/30 to-transparent" />

        {bioChapters.map((chapter, i) => (
          <Reveal key={chapter.title} delay={i * 0.04}>
            <article className="relative pb-10 pl-10">
              <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-2 border-flame bg-stage-black stage-glow" />
              <time className="text-xs font-bold uppercase tracking-wider text-gold">{chapter.year}</time>
              <h3 className="mt-1 text-lg font-bold text-white">{chapter.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{chapter.text}</p>
              <p className="mt-2 text-[10px] text-smoke">Source : {chapter.source}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
