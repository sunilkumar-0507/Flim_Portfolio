import { site } from "../data/site";

/** Looping strip of crafts & genres between hero and introduction. */
export function Marquee() {
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="relative overflow-hidden border-y border-line py-6 bg-ink" aria-label={site.marquee.join(", ")}>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10">
            {items.map((m, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 display italic text-3xl md:text-4xl text-white/80">
                {m}
                <span className="text-gold text-base not-italic">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
