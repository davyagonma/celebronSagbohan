import { ArrowSquareOut } from "@phosphor-icons/react";
import { sources } from "../data/content";
import { Reveal } from "./Reveal";

export function SourcesSection() {
  return (
    <section id="sources" className="border-t border-white/5 px-4 py-16 sm:px-6 lg:mx-auto lg:max-w-lg lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Sources</h2>
        <p className="mt-3 text-sm text-ink-muted">
          Ce site compile des informations publiques documentées. Consultez les sources originales pour approfondir.
        </p>
      </Reveal>

      <ul className="mt-8 space-y-3">
        {sources.map((src, i) => (
          <Reveal key={src.url} delay={i * 0.03}>
            <li>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-white/8 bg-stage-warm/50 p-4 transition-colors hover:border-flame/30 active:scale-[0.99]"
              >
                <ArrowSquareOut size={18} className="mt-0.5 shrink-0 text-flame" />
                <div className="min-w-0">
                  <p className="font-semibold text-white group-hover:text-gold-soft">{src.title}</p>
                  <p className="text-xs text-ink-muted">
                    {src.publisher}
                    {src.author && ` · ${src.author}`}
                  </p>
                </div>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
