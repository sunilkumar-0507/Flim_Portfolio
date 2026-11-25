import { Camera, Play } from "lucide-react";
import { useCallback, useState } from "react";
import { acting } from "../data/acting";
import type { ShortFilm } from "../data/shortFilms";
import { PosterArt } from "./PosterArt";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { YouTubeModal } from "./YouTubeModal";

export function ActingPortfolio() {
  const [clip, setClip] = useState<ShortFilm | null>(null);
  const close = useCallback(() => setClip(null), []);

  return (
    <section id="acting" className="relative py-28 md:py-40 border-t border-line">
      <div className="container-cine">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading index="05" label="Acting Portfolio" title="Beyond the camera." />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="text-mute leading-relaxed">
              Stepping in front of the lens — performances across Tamil productions, informing a director’s understanding of every actor on set.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {acting.map((a, i) => {
            const card = (
              <>
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                  {a.image ? (
                    <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-1000" />
                  ) : (
                    <PosterArt title={a.title} kicker="Acting" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="label !text-[0.6rem] text-gold">Actor · {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display text-3xl md:text-4xl mt-2">{a.title}</h3>
                  </div>
                  {a.clip && (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40">
                      <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                    </span>
                  )}
                </div>
              </>
            );
            return (
              <Reveal as="li" key={a.id} delay={(i % 3) * 0.1} className="group relative aspect-[4/5] overflow-hidden bg-ink-2">
                {a.clip ? (
                  <button
                    className="absolute inset-0 text-left"
                   
                    onClick={() => setClip({ id: a.id, title: a.title, description: "", url: a.clip!, format: "vertical" })}
                    aria-label={`Play clip: ${a.title}`}
                  >
                    {card}
                  </button>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}

          <Reveal as="li" delay={0.2} className="relative aspect-[4/5] border border-dashed border-line flex flex-col items-center justify-center text-center p-10">
            <Camera className="h-8 w-8 text-gold" strokeWidth={1} />
            <p className="display text-3xl mt-6">Clips & Stills</p>
            <p className="mt-3 text-sm text-mute max-w-[16rem]">Acting reels and on-set photographs will be added here soon.</p>
          </Reveal>
        </ul>
      </div>
      <YouTubeModal film={clip} onClose={close} />
    </section>
  );
}
