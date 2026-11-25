import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/experience";
import { prefersReducedMotion } from "../lib/motion";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // progress line draws as you scroll through the timeline
      gsap.fromTo(
        ".tl-progress",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl-list", start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
      );
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        const fromLeft = item.dataset.side === "left";
        gsap.from(item.querySelector(".tl-card"), {
          opacity: 0,
          x: window.innerWidth >= 768 ? (fromLeft ? -60 : 60) : 30,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
        gsap.fromTo(
          item.querySelector(".tl-dot"),
          { scale: 0.4, backgroundColor: "#292929" },
          { scale: 1, backgroundColor: "#C6A46A", duration: 0.6, scrollTrigger: { trigger: item, start: "top 65%", toggleActions: "play none none reverse" } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-28 md:py-40 border-t border-line">
      <div ref={root} className="container-cine">
        <SectionHeading index="07" label="Experience" title="A journey through cinema." align="center" />

        <ol className="tl-list relative mx-auto mt-24 max-w-5xl">
          <span className="absolute left-[11px] md:left-1/2 top-0 h-full w-px bg-line" aria-hidden />
          <span className="tl-progress absolute left-[11px] md:left-1/2 top-0 h-full w-px origin-top bg-gold" aria-hidden />

          {experience.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <li key={`${e.project}-${i}`} data-side={left ? "left" : "right"} className="tl-item relative pl-12 md:pl-0 pb-16 last:pb-0 md:grid md:grid-cols-2 md:gap-16">
                <span className="tl-dot absolute left-[6px] md:left-1/2 md:-translate-x-1/2 top-2 h-[11px] w-[11px] rounded-full bg-gold ring-4 ring-ink" aria-hidden />
                <div className={`tl-card ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
                  <p className="label !text-[0.6rem] text-mute">
                    Credit {String(i + 1).padStart(2, "0")} · {e.category}
                  </p>
                  <h3 className="display text-4xl md:text-5xl mt-3">{e.project}</h3>
                  <p className="label mt-4 text-gold">{e.role}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
