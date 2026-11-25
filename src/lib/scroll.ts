import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === "home" ? 0 : -72, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", id === "home" ? " " : `#${id}`);
}

let locks = 0;
export function lockScroll() {
  locks++;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  lenis?.start();
  document.documentElement.style.overflow = "";
}
