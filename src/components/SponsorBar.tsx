import { sponsors, siteMeta } from "../data/content";

function PartnerLogo({ name, logo }: { name: string; slug: string; logo?: string }) {
  return (
    <div
      className="flex h-9 min-w-[6.5rem] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3"
      aria-label={`Logo ${name}`}
    >
      {logo ? (
        <img src={logo} alt={name} className="h-6 w-auto object-contain" />
      ) : (
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/90">
          {name}
        </span>
      )}
    </div>
  );
}

export function SponsorBar() {
  const [first, second] = sponsors.partners;

  return (
    <div className="sticky top-0 z-50 border-b border-flame/20 bg-stage-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg flex-col gap-2 px-4 py-2.5 sm:max-w-2xl sm:flex-row sm:items-center sm:justify-between lg:max-w-4xl">
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {sponsors.initiative}
        </p>
        <div className="flex items-center justify-center gap-2.5">
          {first && <PartnerLogo name={first.name} slug={first.slug} logo={first.logo} />}
          <span className="text-base font-light leading-none text-gold" aria-hidden="true">
            ×
          </span>
          {second && <PartnerLogo name={second.name} slug={second.slug} logo={second.logo} />}
        </div>
        <p className="text-right text-[10px] font-semibold text-gold sm:min-w-[7rem]">{siteMeta.hashtag}</p>
      </div>
    </div>
  );
}
