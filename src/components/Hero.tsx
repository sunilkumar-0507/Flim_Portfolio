import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../data/site";
import { scrollToId } from "../lib/scroll";
import { EASE } from "../lib/motion";
import { SplitReveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/** Atmospheric CSS scene used when no hero photo/video is supplied: projector beam, haze, dust. */
function CinematicBackdrop() {
  return (
    <div className="absolute inset-0 bg-[#060504]">
      <div
        className="beam absolute -top-[20%] right-[-10%] h-[140%] w-[90%] origin-top-right"
        style={{
          background:
            "conic-gradient(from 218deg at 100% 0%, transparent 0deg, rgba(198,164,106,0.20) 14deg, rgba(255,230,190,0.10) 22deg, transparent 38deg)",
          filter: "blur(18px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 78% 18%, rgba(198,164,106,0.22), transparent 70%), radial-gradient(70% 60% at 20% 90%, rgba(60,40,20,0.35), transparent 70%)",
        }}
      />
      {/* dust particles */}
      <div
        className="dust absolute inset-[-10%] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, #fff8, transparent), radial-gradient(1px 1px at 70% 40%, #fff6, transparent), radial-gradient(1.5px 1.5px at 55% 65%, #fff5, transparent), radial-gradient(1px 1px at 85% 20%, #fff7, transparent), radial-gradient(1px 1px at 35% 75%, #fff4, transparent), radial-gradient(1.5px 1.5px at 62% 15%, #fff6, transparent)",
          backgroundSize: "420px 420px",
        }}
      />
      {/* film camera silhouette on tripod, lower right */}
      <svg className="absolute bottom-0 right-[6%] h-[46%] opacity-[0.55]" viewBox="0 0 200 260" fill="#000" aria-hidden>
        <circle cx="58" cy="40" r="26" />
        <circle cx="112" cy="40" r="26" />
        <rect x="40" y="68" width="100" height="56" rx="4" />
        <path d="M140 80 L180 66 L180 126 L140 112 Z" />
        <rect x="80" y="124" width="20" height="14" />
        <path d="M90 138 L40 260 L48 260 L90 160 L132 260 L140 260 Z" />
        <rect x="87" y="140" width="6" height="120" />
      </svg>
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax: background drifts, content lifts and fades.
  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bg.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  // Photo hero: text sits in the left half on desktop so it never covers the face.
  const split = !!site.heroImage && !site.heroVideo;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, delay, ease: EASE },
  });

  return (
    <section id="home" ref={root} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div ref={bg} className="absolute inset-0">
        <div className={`absolute inset-0 ${ready && !reduce ? "hero-zoom" : ""}`}>
          {site.heroVideo ? (
            <video className="h-full w-full object-cover" src={site.heroVideo} autoPlay muted loop playsInline poster={site.heroImage || undefined} />
          ) : site.heroImage ? (
            <>
              <CinematicBackdrop />
              {/* Mobile: full-bleed photo. Desktop: photo on the right, fading into the dark. */}
              <div className="absolute inset-x-0 top-0 h-[72%] md:h-full md:left-auto md:w-[56%]">
                <picture>
                  {site.portraitSrcSet && site.heroImage === site.portrait && (
                    <source type="image/webp" srcSet={site.portraitSrcSet} sizes="(min-width: 768px) 60vw, 100vw" />
                  )}
                  <img
                    className="h-full w-full object-cover object-[36%_0%] md:object-[50%_0%]"
                    src={site.heroImage}
                    alt={site.portraitAlt}
                    fetchPriority="high"
                  />
                </picture>
                <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#060504] via-[#060504]/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 hidden md:block w-1/3 bg-gradient-to-r from-[#060504] to-transparent" />
              </div>
            </>
          ) : (
            <CinematicBackdrop />
          )}
        </div>
      </div>

      {/* readability overlays + vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-ink" />
      {/* extra bottom shade on phones so text over the photo stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/85 to-transparent md:hidden" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />

      {/* letterbox bars that open on load */}
      <motion.div className="absolute inset-x-0 top-0 z-10 bg-black" initial={{ height: "50%" }} animate={ready ? { height: "0%" } : {}} transition={{ duration: 1.4, ease: EASE }} />
      <motion.div className="absolute inset-x-0 bottom-0 z-10 bg-black" initial={{ height: "50%" }} animate={ready ? { height: "0%" } : {}} transition={{ duration: 1.4, ease: EASE }} />

      <div ref={content} className="container-cine relative z-[5] flex h-full flex-col justify-end pt-24 pb-24 md:pb-32">
        <div className={split ? "md:max-w-[52%]" : ""}>
        <motion.p {...fade(0.5)} className="label text-gold flex items-center gap-4">
          <span className="h-px w-10 bg-gold/70" /> Scene 01 · Take 01<span className="hidden sm:inline">&nbsp;— Tamil Cinema</span>
        </motion.p>

        <h1 className={`display mt-6 uppercase whitespace-nowrap text-[min(10vw,9svh)] ${split ? "md:text-[min(6.6vw,14svh)]" : "md:text-[min(10.5vw,19svh)]"} leading-[0.85] tracking-[0.01em]`}>
          <SplitReveal text={site.name} animateNow={ready} delay={0.6} stagger={0.12} />
        </h1>

        <motion.p {...fade(1.1)} className="label mt-5 md:mt-6 text-white/85 flex flex-wrap gap-x-4 gap-y-2">
          {site.roles.map((r, i) => (
            <span key={r} className="flex items-center gap-4">
              {r}
              {i < site.roles.length - 1 && <span className="text-gold">|</span>}
            </span>
          ))}
        </motion.p>

        <div className={`mt-8 grid gap-6 md:gap-8 ${split ? "" : "md:grid-cols-[1.1fr_1fr] md:items-end"}`}>
          <motion.blockquote {...fade(1.3)} className="font-serif italic text-xl sm:text-2xl md:text-3xl leading-snug text-white/95 max-w-xl">
            “{site.tagline}”
          </motion.blockquote>
          <motion.div {...fade(1.45)} className={`max-w-md ${split ? "" : "md:justify-self-end"}`}>
            <p className="hidden md:block text-mute leading-relaxed [@media(max-height:720px)]:hidden">{site.intro}</p>
            <div className="md:mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap [@media(max-height:720px)]:mt-0 [&>button]:justify-center">
              <button onClick={() => scrollToId("films")} className="btn btn-gold">
                Explore My Films
              </button>
              <button onClick={() => scrollToId("short-films")} className="btn btn-ghost">
                <Play className="h-3.5 w-3.5" fill="currentColor" /> Watch My Work
              </button>
            </div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.button
        {...fade(1.8)}
        onClick={() => scrollToId("about")}
        className="absolute bottom-8 left-1/2 z-[6] -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/60 hover:text-gold transition-colors"
        aria-label="Scroll to introduction"
      >
        <span className="label !text-[0.6rem]">Scroll</span>
        <span className="relative h-10 w-px bg-white/15 overflow-hidden">
          <span className="scroll-cue-line absolute inset-0 bg-gold" />
        </span>
        <ArrowDown className="sr-only" />
      </motion.button>

      {/* corner metadata */}
      <motion.div {...fade(1.8)} className="absolute bottom-8 right-5 md:right-10 z-[6] hidden md:flex items-center gap-2 label !text-[0.6rem] text-white/50">
        <span className="rec-dot h-1.5 w-1.5 rounded-full bg-red-500" /> REC · 24 FPS · 2.39:1
      </motion.div>
    </section>
  );
}
