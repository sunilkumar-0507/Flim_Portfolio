import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { prefersReducedMotion } from "./lib/motion";
import { lockScroll, scrollToId, setLenis, unlockScroll } from "./lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  // Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Hold scroll while the opening loader plays, then honour any #hash in the URL.
  useEffect(() => {
    if (loading) {
      lockScroll();
      return () => unlockScroll();
    }
    ScrollTrigger.refresh();
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 300);
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={done} />}
      <div className="grain" aria-hidden />
      <a href="#films" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip to films
      </a>
      <Navbar ready={!loading} />
      <Home ready={!loading} />
      <Footer />
    </>
  );
}
