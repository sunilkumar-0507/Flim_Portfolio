import { Award, Play } from "lucide-react";
import { useCallback, useState } from "react";
import { shortFilms, type ShortFilm } from "../data/shortFilms";
import { getYouTubeId, youTubeThumb } from "../lib/youtube";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { YouTubeModal } from "./YouTubeModal";
import { PosterArt } from "./PosterArt";

function Thumb({ film }: { film: ShortFilm }) {
  const id = getYouTubeId(film.url);
  const [failed, setFailed] = useState(false);
  const src = film.thumbnail || (id ? youTubeThumb(id, "hqdefault") : "");
  if (!src || failed) return <PosterArt title={film.title} kicker="Short Film" />;
  if (film.format === "horizontal") {
    // 16:9 film inside a 9:16 card: blurred fill behind, true frame in the middle (bars cropped).
    return (
      <div className="relative h-full w-full">
        <img src={src} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover scale-150 blur-2xl opacity-60" />
        <div className="absolute inset-x-0 top-[38%] -translate-y-1/2 aspect-video overflow-hidden shadow-2xl shadow-black">
          <img
            src={src}
            alt={`${film.title} — thumbnail`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${film.title} — thumbnail`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function ShortCard({ film, index, onPlay }: { film: ShortFilm; index: number; onPlay: (f: ShortFilm) => void }) {
  return (
    <Reveal delay={index * 0.12} className="group snap-center shrink-0 w-[78vw] sm:w-auto">
      <button
        onClick={() => onPlay(film)}
        className="relative block w-full aspect-[9/16] overflow-hidden bg-ink-2 border border-line text-left"
       
        aria-label={`Play ${film.title}`}
      >
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
          <Thumb film={film} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

        <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
          <span className="label !text-[0.6rem] text-white/70">Short · {String(index + 1).padStart(2, "0")}</span>
          {film.achievement && (
            <span className="flex items-center gap-1.5 bg-gold text-ink px-2.5 py-1.5 label !text-[0.5rem] !tracking-[0.2em]">
              <Award className="h-3 w-3" strokeWidth={1.5} /> Award Winner
            </span>
          )}
        </div>

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-black/30 backdrop-blur-sm transition-all duration-700 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/90">
          <Play className="h-6 w-6 translate-x-0.5 text-white transition-colors group-hover:text-ink" fill="currentColor" strokeWidth={0} />
        </span>

        <div className="absolute inset-x-5 bottom-6">
          <h3 className="display text-4xl md:text-5xl uppercase leading-[0.9]">{film.title}</h3>
          <p className="mt-3 text-sm text-white/70">{film.description}</p>
          {film.achievement && <p className="label mt-3 !text-[0.6rem] text-gold">{film.achievement}</p>}
        </div>
      </button>
    </Reveal>
  );
}

export function ShortFilms() {
  const [playing, setPlaying] = useState<ShortFilm | null>(null);
  const close = useCallback(() => setPlaying(null), []);

  return (
    <section id="short-films" className="relative py-28 md:py-40 overflow-hidden">
      {/* ambient light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(198,164,106,0.10), transparent 70%)" }}
      />
      <div className="container-cine relative">
        <SectionHeading
          index="04"
          label="Short Films"
          title="Short films. Bigger stories."
          subtitle="Small frames. Powerful emotions. Stories that stay."
          align="center"
        />

        <div className="mt-20 -mx-5 px-5 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:mx-auto sm:px-0 sm:grid sm:overflow-visible sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 max-w-6xl [scrollbar-width:none]">
          {shortFilms.map((f, i) => (
            <ShortCard key={f.id} film={f} index={i} onPlay={setPlaying} />
          ))}
        </div>
        <p className="label mt-6 text-center !text-[0.6rem] text-mute sm:hidden">Swipe to see more →</p>
      </div>

      <YouTubeModal film={playing} onClose={close} />
    </section>
  );
}
