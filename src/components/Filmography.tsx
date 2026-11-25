import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { films, type Film } from "../data/films";
import { prefersReducedMotion } from "../lib/motion";
import { scrollToId } from "../lib/scroll";
import { Modal } from "./Modal";
import { PosterArt } from "./PosterArt";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

function Poster({ film, className = "" }: { film: Film; className?: string }) {
  return film.poster ? (
    <img src={film.poster} alt={`${film.title} poster`} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <PosterArt title={film.title} credit={film.role} kicker={film.category} className={className} />
  );
}

function FilmCard({ film, index, onOpen }: { film: Film; index: number; onOpen: (f: Film) => void }) {
  return (
    <article className="film-card group">
      <button
        onClick={() => onOpen(film)}
        className="relative block w-full aspect-[2/3] overflow-hidden bg-ink-2 text-left"
       
        aria-label={`View project: ${film.title}`}
      >
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
          <Poster film={film} />
        </div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/30" />
        {film.status && (
          <span className="absolute right-4 top-4 label !text-[0.55rem] bg-gold text-ink px-2.5 py-1.5">Upcoming</span>
        )}
        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm opacity-0 translate-y-3 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
        </span>
      </button>

      <div className="mt-5 flex items-start gap-5 border-t border-line pt-5">
        <span className="label !text-[0.6rem] text-gold pt-2">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="display text-3xl md:text-[2.1rem] leading-none transition-colors duration-500 group-hover:text-gold">{film.title}</h3>
          <p className="label mt-3 !text-[0.6rem] text-mute flex flex-wrap gap-x-3 gap-y-1">
            <span>{film.year ?? (film.status ? "Upcoming" : "Year —")}</span>
            <span className="text-gold">·</span>
            <span className="text-white/80">{film.role}</span>
          </p>
          <p className="label mt-2 !text-[0.6rem] text-mute/80">{film.category}</p>
        </div>
      </div>
      <button onClick={() => onOpen(film)} className="label mt-5 !text-[0.6rem] text-white/80 hover:text-gold link-underline inline-flex items-center gap-2">
        View Project <ArrowUpRight className="h-3 w-3" />
      </button>
    </article>
  );
}

export function Filmography() {
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Film | null>(null);
  const close = useCallback(() => setActive(null), []);

  // Staggered poster reveal with GSAP ScrollTrigger.batch
  useEffect(() => {
    if (!grid.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".film-card");
      gsap.set(cards, { opacity: 0, y: 80, clipPath: "inset(12% 0 0 0)" });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.out", stagger: 0.14 }),
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section id="films" className="relative py-28 md:py-40 bg-ink-2/40 border-t border-line">
      <div className="container-cine">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="03"
            label="Selected Filmography"
            title="Selected works."
            subtitle="A collection of stories, collaborations and cinematic experiences."
          />
          <p className="label text-mute md:pb-3">{String(films.length).padStart(2, "0")} Projects</p>
        </div>

        <div ref={grid} className="mt-20 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((f, i) => (
            <div key={f.id} className={i % 3 === 1 ? "lg:translate-y-24" : ""}>
              <FilmCard film={f} index={i} onOpen={setActive} />
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={close} label={active ? `${active.title} details` : "Project"} panelClassName="w-[min(960px,92vw)] max-h-[88vh] overflow-y-auto">
        {active && (
          <div className="grid bg-ink border border-line md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="relative aspect-[2/3] md:aspect-auto md:min-h-[560px]">
              <Poster film={active} />
            </div>
            <div className="p-8 md:p-12 flex flex-col">
              <p className="label text-gold">{active.category}</p>
              <h3 className="display text-5xl md:text-6xl mt-4 uppercase">{active.title}</h3>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6">
                <div>
                  <dt className="label !text-[0.6rem] text-mute">Role</dt>
                  <dd className="mt-2 font-serif text-2xl">{active.role}</dd>
                </div>
                <div>
                  <dt className="label !text-[0.6rem] text-mute">{active.status ? "Status" : "Year"}</dt>
                  <dd className="mt-2 font-serif text-2xl">{active.year ?? active.status ?? "To be updated"}</dd>
                </div>
              </dl>
              <p className="mt-8 text-mute leading-relaxed">
                {active.description ?? "Synopsis, stills and further project details will be added here soon."}
              </p>
              <div className="mt-auto pt-10 flex flex-wrap gap-3">
                {active.link && (
                  <a href={active.link} target="_blank" rel="noreferrer" className="btn btn-gold">
                    Watch / Read More <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    close();
                    setTimeout(() => scrollToId("contact"), 400);
                  }}
                >
                  Enquire About This Project
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
