import { awards } from "../data/experience";
import { Reveal, SplitReveal } from "./Reveal";

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 60 160" className={`h-40 md:h-56 text-gold ${flip ? "-scale-x-100" : ""}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M50 155 C10 120 8 60 30 8" />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 140 - i * 15;
        const x = 44 - Math.sin((i / 9) * Math.PI) * 18 - i * 1.2;
        return <path key={i} d={`M${x} ${y} q-16 -4 -20 -16 q14 0 20 16 Z`} fill="currentColor" fillOpacity="0.18" />;
      })}
    </svg>
  );
}

export function Awards() {
  const [featured, ...rest] = awards;
  return (
    <section id="recognition" className="relative overflow-hidden py-28 md:py-44 border-t border-line bg-black">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(45% 55% at 50% 50%, rgba(198,164,106,0.16), transparent 70%)" }}
      />
      <div className="container-cine relative text-center">
        <Reveal>
          <p className="label text-gold flex items-center justify-center gap-4">
            <span className="text-mute">08</span>
            <span className="h-px w-10 bg-gold/60" /> Award & Recognition
          </p>
        </Reveal>
        <h2 className="display mt-6 text-[clamp(2.6rem,7vw,6.5rem)] uppercase">
          <SplitReveal text="Recognition." />
        </h2>

        {featured && (
          <Reveal delay={0.2} className="mt-16 flex items-center justify-center gap-4 md:gap-10">
            <Laurel />
            <div className="max-w-xl">
              <p className="label text-mute">
                {featured.event} · {featured.year}
              </p>
              <p className="display mt-5 uppercase text-[clamp(2.6rem,8vw,6rem)] leading-[0.9] text-gold-soft">{featured.title}</p>
              <div className="mx-auto mt-8 h-px w-20 bg-gold/60" />
              <p className="label mt-8 !text-[0.6rem] text-mute">For the short film</p>
              <p className="font-serif italic text-3xl md:text-4xl mt-3">{featured.film}</p>
            </div>
            <Laurel flip />
          </Reveal>
        )}

        {rest.length > 0 && (
          <ul className="mx-auto mt-20 grid max-w-4xl gap-px bg-line border border-line sm:grid-cols-2">
            {rest.map((a, i) => (
              <Reveal as="li" key={`${a.title}-${i}`} delay={i * 0.08} className="bg-black p-8 text-left">
                <p className="label !text-[0.6rem] text-mute">
                  {a.event} · {a.year}
                </p>
                <p className="display text-3xl mt-3 text-gold-soft">{a.title}</p>
                <p className="mt-2 font-serif italic text-xl">{a.film}</p>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
