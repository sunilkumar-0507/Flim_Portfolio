import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, prefersReducedMotion } from "../lib/motion";
import { site } from "../data/site";

/** Opening-credits style loader: frame counter + name, then a curtain lift. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLeaving(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={leaving ? { clipPath: "inset(0 0 100% 0)" } : {}}
      transition={{ duration: 1.1, ease: EASE }}
      onAnimationComplete={() => leaving && onDone()}
      aria-hidden
    >
      <div className="overflow-hidden">
        <motion.p
          className="display text-[clamp(2rem,6vw,4.5rem)] uppercase tracking-[0.08em]"
          initial={{ y: "110%" }}
          animate={{ y: leaving ? "-110%" : "0%" }}
          transition={{ duration: 1, ease: EASE, delay: leaving ? 0 : 0.15 }}
        >
          {site.name}
        </motion.p>
      </div>
      <div className="mt-8 h-px w-56 bg-line overflow-hidden">
        <div className="h-full bg-gold origin-left" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
      <p className="label mt-6 text-mute tabular-nums">
        Reel loading — {String(count).padStart(3, "0")}
      </p>
    </motion.div>
  );
}
