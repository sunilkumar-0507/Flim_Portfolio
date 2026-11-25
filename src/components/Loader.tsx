import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, prefersReducedMotion } from "../lib/motion";
import { site } from "../data/site";

/**
 * Opening title card: "A film by" over the director's name, with an
 * anamorphic light streak passing through. The hero's letterbox bars then open.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }
    const t = setTimeout(() => setLeaving(true), 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black" aria-hidden>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        animate={leaving ? { opacity: 0, scale: 0.98 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        onAnimationComplete={() => leaving && onDone()}
      >
        <motion.p
          className="label !text-[0.65rem] text-gold"
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        >
          A Film By
        </motion.p>

        <div className="relative mt-5">
          <motion.p
            className="display whitespace-nowrap uppercase text-[clamp(2.4rem,11vw,6.5rem)] leading-none"
            initial={{ opacity: 0, letterSpacing: "0.32em", filter: "blur(8px)" }}
            animate={{ opacity: 1, letterSpacing: "0.06em", filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.45 }}
          >
            {site.name}
          </motion.p>

          {/* anamorphic light streak */}
          <motion.span
            className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[140vw] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(226,203,160,0.9) 50%, transparent)",
              filter: "blur(1px)",
              boxShadow: "0 0 18px 2px rgba(198,164,106,0.45)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 1.1] }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.9, times: [0, 0.4, 1] }}
          />
        </div>

        <motion.div
          className="mt-7 h-px w-40 origin-center bg-gold/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
        />
        <motion.p
          className="label mt-5 !text-[0.6rem] text-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {site.roles.join(" · ")}
        </motion.p>
      </motion.div>
    </div>
  );
}
