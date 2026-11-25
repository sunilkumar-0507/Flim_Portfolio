import { PenLine } from "lucide-react";
import { writing } from "../data/acting";
import { PosterArt } from "./PosterArt";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function WritingPortfolio() {
  const f = writing.featured;
  return (
    <section id="writing" className="relative py-28 md:py-40 bg-ink-2/40 border-t border-line">
      <div className="container-cine">
        <SectionHeading index="06" label="Writing & Creative Work" title="Stories begin with an idea." />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="group relative aspect-[2/3] overflow-hidden bg-ink">
              <div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-[1.04]">
                {f.poster ? <img src={f.poster} alt={`${f.title} poster`} loading="lazy" className="h-full w-full object-cover" /> : <PosterArt title={f.title} credit={f.role} kicker={f.category} />}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-between">
            <Reveal>
              <p className="label text-gold">Featured · Written & Co-Directed</p>
              <h3 className="display text-5xl md:text-7xl mt-5 uppercase">{f.title}</h3>
              <p className="mt-6 font-serif italic text-2xl text-white/85">{f.role}</p>
              <p className="label mt-3 text-mute !text-[0.6rem]">{f.category}</p>
            </Reveal>

            {/* script page motif */}
            <Reveal delay={0.15}>
              <div className="mt-12 border border-line bg-ink p-6 md:p-8 font-mono text-[0.78rem] leading-relaxed text-white/55">
                <p className="text-white/80">FADE IN:</p>
                <p className="mt-3">Every story begins on a blank page —</p>
                <p className="mt-1">a single idea, waiting for its first frame.</p>
                <p className="mt-3 text-right text-white/80">CUT TO:</p>
              </div>
            </Reveal>

            <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 border border-line">
              {writing.pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={0.1 + i * 0.08} className="bg-ink p-7">
                  <PenLine className="h-4 w-4 text-gold" strokeWidth={1.25} />
                  <p className="display text-2xl mt-4">{p.title}</p>
                  <p className="mt-2 text-sm text-mute leading-relaxed">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
