import { ArrowUp } from "lucide-react";
import { navItems, site } from "../data/site";
import { scrollToId } from "../lib/scroll";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-black">
      <div className="container-cine py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_auto] md:items-end">
          <div>
            <p className="display uppercase text-[clamp(2.4rem,6vw,5rem)] leading-none tracking-[0.04em]">{site.name}</p>
            <p className="label mt-5 text-gold">{site.roles.join(" | ")}</p>
          </div>
          <nav aria-label="Footer">
            <p className="label !text-[0.6rem] text-mute mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(n.id);
                    }}
                    className="text-sm text-white/75 hover:text-gold transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => scrollToId("home")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-white/70 transition-colors hover:border-gold hover:text-gold"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-mute sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}. All Rights Reserved.</p>
          <p className="label !text-[0.6rem]">Every frame tells a story.</p>
        </div>
      </div>
    </footer>
  );
}
