import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site } from "../data/site";
import { lockScroll, scrollToId, unlockScroll } from "../lib/scroll";
import { EASE } from "../lib/motion";

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section in view.
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // allow the menu's scroll lock to release before scrolling
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ${
          scrolled && !open ? "bg-ink/75 backdrop-blur-lg border-b border-line/60" : "border-b border-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready && !hidden ? 0 : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <nav className="container-cine flex h-[72px] items-center justify-between" aria-label="Main">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="group flex items-baseline gap-3"
          >
            <span className="display whitespace-nowrap text-xl sm:text-2xl uppercase tracking-[0.1em] sm:tracking-[0.12em]">{site.name}</span>
            <span className="label hidden sm:inline text-gold/80 !text-[0.6rem]">Filmmaker</span>
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.id);
                  }}
                  aria-current={active === n.id}
                  className={`label link-underline transition-colors duration-500 ${active === n.id ? "text-gold" : "text-white/75 hover:text-white"}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="lg:hidden relative z-[60] flex h-11 w-11 items-center justify-center text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X strokeWidth={1.25} /> : <Menu strokeWidth={1.25} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[45] bg-ink lg:hidden flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            data-lenis-prevent
          >
            <ul className="container-cine flex flex-1 flex-col justify-center gap-3 pt-20">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.id);
                    }}
                    className={`flex items-baseline gap-5 py-1 ${active === n.id ? "text-gold" : "text-white"}`}
                  >
                    <span className="label text-mute">0{i + 1}</span>
                    <span className="display text-5xl sm:text-6xl uppercase">{n.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-cine pb-10 label text-mute flex flex-col gap-2">
              <a href={`mailto:${site.contact.email}`} className="text-white/80 normal-case tracking-[0.1em]">
                {site.contact.email}
              </a>
              <span>{site.roles.join(" · ")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
