import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "span";
};

/** Fades + lifts content into view once, on scroll. */
export function Reveal({ children, delay = 0, y = 40, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Cinematic masked word-by-word title reveal. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  animateNow,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** undefined = reveal on scroll; true/false = controlled (e.g. after page loader). */
  animateNow?: boolean;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger =
    animateNow === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: animateNow ? "show" : "hidden" };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      aria-label={text}
      transition={{ staggerChildren: reduce ? 0 : stagger, delayChildren: delay }}
      style={{ display: "block" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "110%", rotate: 2 },
              show: reduce ? { opacity: 1 } : { y: "0%", rotate: 0 },
            }}
            transition={{ duration: reduce ? 0.3 : 1.2, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
