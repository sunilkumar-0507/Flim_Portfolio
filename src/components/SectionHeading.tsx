import { Reveal, SplitReveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ index, label, title, subtitle, align = "left", className = "" }: Props) {
  const center = align === "center";
  return (
    <header className={`${center ? "text-center mx-auto" : ""} max-w-4xl ${className}`}>
      <Reveal>
        <p className={`label text-gold flex items-center gap-4 ${center ? "justify-center" : ""}`}>
          <span className="text-mute">{index}</span>
          <span className="h-px w-10 bg-gold/60" />
          {label}
        </p>
      </Reveal>
      <h2 className="display mt-6 text-[clamp(2.6rem,7vw,6.5rem)] uppercase">
        <SplitReveal text={title} />
      </h2>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-xl text-mute text-base md:text-lg leading-relaxed ${center ? "mx-auto" : ""}`}>{subtitle}</p>
        </Reveal>
      )}
    </header>
  );
}
