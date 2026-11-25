import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type { ShortFilm } from "../data/shortFilms";
import { getYouTubeId, youTubeEmbed, youTubeWatch } from "../lib/youtube";
import { Modal } from "./Modal";

type Props = { film: ShortFilm | null; onClose: () => void };

/**
 * Cinematic video modal. The YouTube player iframe is only created when the modal opens,
 * so no video loads until the visitor presses play.
 */
export function YouTubeModal({ film, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);
  const id = film ? getYouTubeId(film.url) : null;
  const vertical = (film?.format ?? "vertical") === "vertical";

  useEffect(() => setLoaded(false), [id]);

  // Vertical: height-driven 9:16 box. Mobile fills the screen; desktop is a framed portrait player.
  const box = vertical
    ? "h-[100svh] w-screen sm:h-[min(86vh,900px)] sm:w-auto sm:aspect-[9/16]"
    : "w-screen sm:w-[min(1200px,90vw)] aspect-video";

  return (
    <Modal open={!!film} onClose={onClose} label={film ? `Video: ${film.title}` : "Video"} panelClassName="flex flex-col items-center">
      {film && (
        <>
          <div className={`relative overflow-hidden bg-black sm:border sm:border-line sm:shadow-[0_40px_120px_rgba(0,0,0,0.9)] ${box}`}>
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" role="status">
                <span className="h-10 w-10 rounded-full border border-white/15 border-t-gold animate-spin" />
                <span className="label !text-[0.6rem] text-mute">Loading player</span>
              </div>
            )}
            {id ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={youTubeEmbed(id)}
                title={film.title}
                onLoad={() => setLoaded(true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-mute">This video link is not valid yet.</p>
            )}
          </div>
          <div className="hidden sm:flex mt-5 items-center gap-6">
            <p className="display text-2xl uppercase">{film.title}</p>
            {id && (
              <a href={youTubeWatch(id, vertical)} target="_blank" rel="noreferrer" className="label !text-[0.6rem] text-mute hover:text-gold inline-flex items-center gap-2">
                Open on YouTube <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
