import { siteMeta, sponsors } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-flame/10 px-4 py-10 text-center sm:px-6">
      <p className="text-2xl font-extrabold text-gold">{siteMeta.hashtag}</p>
      <p className="mt-2 text-sm text-ink-muted">
        Hommage à {siteMeta.title}, légende vivante de la musique béninoise.
      </p>
      <p className="mt-4 text-xs text-smoke">
        Initiative {sponsors.partners.map((p) => p.name).join(" × ")}
      </p>
      <p className="mt-6 text-[10px] text-smoke/70">
        Contenu documentaire compilé depuis Wikipédia, L'investigateur, My Addictive, Discogs et Apple Music.
      </p>
      <p className="mt-4 text-xs text-ink-muted">
        Fait par{" "}
        <a
          href="https://davydev.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gold-soft underline decoration-flame/40 underline-offset-2 hover:text-flame"
        >
          Davy dev
        </a>
        {" · "}Design : Hope
      </p>
    </footer>
  );
}
