import { GraduationCap, Languages, Sparkles, Clapperboard } from "lucide-react";
import type { ReactNode } from "react";
import { profile, site } from "../data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Photo, Viewfinder } from "./Viewfinder";

function Block({ icon, title, items, delay }: { icon: ReactNode; title: string; items: string[]; delay: number }) {
  return (
    <Reveal delay={delay} className="border-t border-line pt-6">
      <p className="label flex items-center gap-3 text-gold">
        {icon} {title}
      </p>
      <ul className="mt-5 space-y-2">
        {items.map((it) => (
          <li key={it} className="font-serif text-2xl text-white/90">
            {it}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Profile() {
  return (
    <section id="profile" className="relative py-28 md:py-40 border-t border-line">
      <div className="container-cine grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Viewfinder className="aspect-[3/4] bg-ink-2" frame="Frame 0909" meta="Profile">
                <Photo
                  src={site.portrait}
                  srcSet={site.portraitSrcSet}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={site.portraitAlt || `Portrait of ${site.name}`}
                  position="40% 25%"
                  className="grayscale contrast-110"
                  label="Portrait"
                />
              </Viewfinder>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="label !text-[0.6rem] text-mute">Name</dt>
                  <dd className="display text-3xl mt-2">{site.name}</dd>
                </div>
                <div>
                  <dt className="label !text-[0.6rem] text-mute">Profession</dt>
                  <dd className="display text-3xl mt-2">{profile.profession}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading index="09" label="About & Profile" title="The person behind the stories." />
          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            <Block icon={<GraduationCap className="h-4 w-4" strokeWidth={1.25} />} title="Education" items={profile.education} delay={0} />
            <Block icon={<Sparkles className="h-4 w-4" strokeWidth={1.25} />} title="Strengths" items={profile.strengths} delay={0.1} />
            <Block icon={<Languages className="h-4 w-4" strokeWidth={1.25} />} title="Languages" items={profile.languages} delay={0.15} />
            <Block icon={<Clapperboard className="h-4 w-4" strokeWidth={1.25} />} title="Creative Interests" items={profile.interests} delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
