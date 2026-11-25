import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { lockScroll, unlockScroll } from "../lib/scroll";
import { EASE } from "../lib/motion";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  /** Classes for the content panel wrapper. */
  panelClassName?: string;
};

/** Accessible cinematic modal: backdrop fade, panel rise, Esc to close, scroll lock, focus return. */
export function Modal({ open, onClose, label, children, panelClassName = "" }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      prev?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          data-lenis-prevent
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute right-4 top-4 md:right-8 md:top-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:border-gold hover:text-gold"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
          <motion.div
            className={`relative ${panelClassName}`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
