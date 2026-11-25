import { ArrowUpRight, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "../data/site";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";
import { Reveal, SplitReveal } from "./Reveal";

function Action({ href, icon, label, external }: { href: string; icon: ReactNode; label: string; external?: boolean }) {
  if (!href) {
    return (
      <span className="btn btn-ghost opacity-50 cursor-not-allowed" aria-disabled="true" title={`${label} link coming soon`}>
        {icon} {label} <span className="!tracking-[0.15em] text-[0.55rem] text-gold">Soon</span>
      </span>
    );
  }
  return (
    <a href={href} className="btn btn-ghost group" {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {icon} {label}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function Contact() {
  const { email, phone, whatsapp, whatsappMessage } = site.contact;
  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  const tel = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section id="contact" className="relative overflow-hidden pt-28 md:pt-44 pb-20 border-t border-line">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 50% at 50% 100%, rgba(198,164,106,0.12), transparent 70%)" }}
      />
      <div className="container-cine relative">
        <Reveal>
          <p className="label text-gold flex items-center gap-4">
            <span className="text-mute">10</span>
            <span className="h-px w-10 bg-gold/60" /> Contact · Now accepting collaborations
          </p>
        </Reveal>
        <h2 className="display mt-8 uppercase text-[clamp(3rem,10vw,10rem)] leading-[0.88]">
          <SplitReveal text="Have a story" />
          <SplitReveal text="to tell?" className="italic text-gold-soft" delay={0.15} />
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-mute max-w-md">
              For film collaborations, direction, writing, acting opportunities and creative projects, let’s connect.
            </p>
          </Reveal>

          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.1}>
              <a href={`mailto:${email}`} className="group flex items-center justify-between gap-6 border-b border-line pb-6">
                <span>
                  <span className="label !text-[0.6rem] text-mute flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.25} /> Email
                  </span>
                  <span className="block mt-3 font-sans font-light tracking-tight text-[clamp(1.25rem,3.2vw,2.5rem)] break-all transition-colors duration-500 group-hover:text-gold">{email}</span>
                </span>
                <ArrowUpRight className="h-7 w-7 shrink-0 text-mute transition-all duration-500 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1} />
              </a>
            </Reveal>
            <Reveal delay={0.18}>
              <a href={tel} className="group flex items-center justify-between gap-6 border-b border-line pb-6">
                <span>
                  <span className="label !text-[0.6rem] text-mute flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.25} /> Phone
                  </span>
                  <span className="block mt-3 font-sans font-light tracking-tight text-[clamp(1.25rem,3.2vw,2.5rem)] transition-colors duration-500 group-hover:text-gold">{phone}</span>
                </span>
                <ArrowUpRight className="h-7 w-7 shrink-0 text-mute transition-all duration-500 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1} />
              </a>
            </Reveal>

            <Reveal delay={0.25} className="flex flex-wrap gap-3 pt-2">
              <a href={`mailto:${email}`} className="btn btn-gold">
                <Mail className="h-4 w-4" strokeWidth={1.25} /> Send an Email
              </a>
              <Action href={wa} icon={<WhatsAppIcon />} label="WhatsApp" external />
              <Action href={site.social.instagram} icon={<InstagramIcon />} label="Instagram" external />
              <Action href={site.social.youtube} icon={<YouTubeIcon />} label="YouTube" external />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
