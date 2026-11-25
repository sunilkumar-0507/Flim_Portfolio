import { ArrowRight } from "lucide-react";
import { site } from "../data/site";
import { scrollToId } from "../lib/scroll";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const credits = [
  { k: "Television", v: "Serials" },
  { k: "Feature", v: "Films" },
  { k: "Short", v: "Films" },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-cine grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading index="02" label="Introduction" title="The man behind the frame." />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <div className="space-y-6 text-lg leading-relaxed text-white/80 max-w-xl">
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
