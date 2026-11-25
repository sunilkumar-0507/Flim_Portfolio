import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, prefersReducedMotion } from "../lib/motion";
import { site } from "../data/site";

const COUNT = [3, 2, 1];
const TICK = 650; // ms per leader number
const R = 120;
const CIRC = 2 * Math.PI * R;

/** Vertical film strip with sprocket holes that rolls past like film through a gate. */
function FilmStrip({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-8 sm:w-12 overflow-hidden border-x border-white/10 bg-black`}>
      <div className={`flex flex-col gap-3 py-2 items-center ${side === "left" ? "film-roll" : "film-roll-rev"}`}>
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="h-3 w-4 sm:h-4 sm:w-5 shrink-0 rounded-[2px] bg-[#2a2520]" />
        ))}
      </div>
    </div>
  );
}

/**
 * Opening sequence: a film-leader countdown (3 · 2 · 1) with a sweeping hand,
 * then a clapperboard snaps shut on the slate, a projector flash, and an iris-out.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0); // 0..2 countdown, 3 clapper, 4 leaving

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }
    const timers = [
      setTimeout(() => setStep(1), TICK),
      setTimeout(() => setStep(2), TICK * 2),
      setTimeout(() => setStep(3), TICK * 3),
      setTimeout(() => setStep(4), TICK * 3 + 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const leaving = step === 4;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0b0a09]"
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={leaving ? { clipPath: "circle(0% at 50% 50%)" } : {}}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
      onAnimationComplete={() => leaving && onDone()}
      aria-hidden
    >
      <FilmStrip side="left" />
      <FilmStrip side="right" />

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key="leader"
              className="relative flex h-[280px] w-[280px] items-center justify-center"
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.2 }}
            >
              {/* leader crosshair + rings */}
              <span className="absolute inset-x-[-40px] top-1/2 h-px bg-white/25" />
              <span className="absolute inset-y-[-40px] left-1/2 w-px bg-white/25" />
              <svg viewBox="0 0 280 280" className="absolute inset-0 -rotate-90">
                <circle cx="140" cy="140" r="134" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                <circle cx="140" cy="140" r="104" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <motion.circle
                  key={step}
                  cx="140"
                  cy="140"
                  r={R / 2}
                  fill="none"
                  stroke="rgba(198,164,106,0.28)"
                  strokeWidth={R}
                  strokeDasharray={CIRC / 2}
                  initial={{ strokeDashoffset: CIRC / 2 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: TICK / 1000, ease: "linear" }}
                />
              </svg>
              <motion.span
                key={`hand-${step}`}
                className="absolute left-1/2 top-1/2 h-[134px] w-[2px] origin-top -translate-x-1/2 bg-white/70"
                initial={{ rotate: 180 }}
                animate={{ rotate: 540 }}
                transition={{ duration: TICK / 1000, ease: "linear" }}
              />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={COUNT[step]}
                  className="relative font-label text-[8rem] leading-none text-white tabular-nums"
                  initial={{ opacity: 0, scale: 1.25 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {COUNT[step]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="clapper"
              className="w-[min(82vw,420px)]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* clapstick — opens, then snaps shut */}
              <motion.div
                className="clap-stripes relative h-10 sm:h-12 origin-bottom-left rounded-t-sm"
                initial={{ rotate: -28 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.45, duration: 0.14, ease: [0.6, 0, 1, 1] }}
              />
              <div className="clap-stripes h-8 sm:h-10" />
              <div className="border-2 border-t-0 border-white/85 bg-[#111] px-5 py-4 font-label text-white">
                <p className="text-[0.6rem] tracking-[0.3em] text-mute uppercase">Production</p>
                <p className="mt-1 display text-3xl sm:text-4xl uppercase tracking-[0.04em]">{site.name}</p>
                <div className="mt-4 grid grid-cols-3 border-t border-white/30 text-center text-[0.6rem] uppercase tracking-[0.2em]">
                  {[
                    ["Scene", "01"],
                    ["Take", "01"],
                    ["Roll", "A"],
                  ].map(([k, v], i) => (
                    <div key={k} className={`pt-3 ${i ? "border-l border-white/30" : ""}`}>
                      <p className="text-mute">{k}</p>
                      <p className="mt-1 text-xl text-gold tracking-normal">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* projector flash on the clap */}
      {step >= 3 && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[#fff6e6]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.55, 0] }}
          transition={{ duration: 0.9, times: [0, 0.6, 0.66, 1] }}
        />
      )}

      <p className="absolute bottom-8 inset-x-0 text-center label !text-[0.6rem] text-mute">
        {step < 3 ? "Rolling…" : "Action"}
      </p>
    </motion.div>
  );
}
