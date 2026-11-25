import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { site } from "../data/site";
import { scrollToId } from "../lib/scroll";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Photo, Viewfinder } from "./Viewfinder";

const credits = [
  { k: "Television", v: "Serials" },
  { k: "Feature", v: "Films" },
  { k: "Short", v: "Films" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-cine grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div ref={ref} className="relative lg:col-span-5">
          <Reveal>
            <Viewfinder className="aspect-[4/5] bg-ink-2" frame="Frame 0124" meta="24 FPS · ƒ1.8">
              <Photo
                src={site.portrait}
                srcSet={site.portraitSrcSet}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt={site.portraitAlt || `Portrait of ${site.name}`}
                position="36% 20%"
                label="Portrait"
              />
            </Viewfinder>
          </Reveal>
          {site.behindTheScenes && (
          <motion.div style={{ y }} className="absolute -bottom-14 -right-2 md:-right-10 w-[46%] hidden sm:block">
            <Reveal delay={0.25}>
              <div className="relative aspect-[3/4] border border-line bg-ink-2 overflow-hidden shadow-2xl shadow-black">
                <Photo src={site.behindTheScenes} alt="Behind the scenes on set" label="Behind the scenes" />
              </div>
              <p className="label mt-3 !text-[0.6rem] text-mute">On set — BTS</p>
            </Reveal>
          </motion.div>
          )}
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionHeading index="02" label="Introduction" title="The man behind the frame." />
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/80 max-w-xl">
            <Reveal delay={0.1}>
              <p>
                <span className="text-white">{site.name}</span> is a Tamil filmmaker with experience in television serials, feature films and
                short films.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-mute">
                His creative journey includes working as an assistant director, associate director and co-director across various Tamil
                productions.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-mute">He is passionate about storytelling, creative direction and developing meaningful cinema.</p>
            </Reveal>
          </div>

          <Reveal delay={0.35}>
            <dl className="mt-12 grid grid-cols-3 border-y border-line">
              {credits.map((c, i) => (
                <div key={c.k} className={`py-6 ${i ? "pl-5 border-l border-line" : ""}`}>
                  <dt className="label !text-[0.6rem] text-mute">{c.k}</dt>
                  <dd className="display text-3xl mt-2">{c.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.4}>
            <button onClick={() => scrollToId("experience")} className="btn btn-ghost mt-12 group">
              Discover My Journey
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.25} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
