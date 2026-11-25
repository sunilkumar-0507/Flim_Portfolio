import type { ReactNode } from "react";

const CORNERS = [
  "top-4 left-4 border-t border-l",
  "top-4 right-4 border-t border-r",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
];

/** Camera viewfinder overlay: corner brackets, REC indicator and frame metadata. */
export function Viewfinder({
  children,
  meta = "24 FPS · ƒ1.8",
  frame = "Frame 001",
  className = "",
}: {
  children: ReactNode;
  meta?: string;
  frame?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0">
        {CORNERS.map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-white/70 ${c}`} />
        ))}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 label !text-[0.55rem] text-white/80">
          <span className="rec-dot h-1.5 w-1.5 rounded-full bg-red-500" /> REC
        </div>
        <div className="absolute bottom-6 inset-x-8 flex justify-between label !text-[0.55rem] text-white/70">
          <span>{frame}</span>
          <span>{meta}</span>
        </div>
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px bg-white/40" />
          <span className="absolute top-1/2 left-0 w-full h-px bg-white/40" />
        </div>
      </div>
    </div>
  );
}

/** Placeholder "photo" for portraits until real photography is supplied. */
export function PortraitPlaceholder({ label = "Portrait" }: { label?: string }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "radial-gradient(60% 45% at 50% 32%, rgba(198,164,106,0.28), transparent 70%), radial-gradient(120% 90% at 50% 100%, #1a1612 0%, #080808 70%)",
      }}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <svg viewBox="0 0 200 260" className="absolute inset-x-0 bottom-0 mx-auto h-[78%] opacity-90" fill="#050505">
        <ellipse cx="100" cy="78" rx="38" ry="46" />
        <path d="M20 260 C24 180 60 150 100 150 C140 150 176 180 180 260 Z" />
      </svg>
      <p className="absolute top-14 inset-x-0 text-center label !text-[0.55rem] text-white/40">{label} · Photo coming soon</p>
    </div>
  );
}

/** Real image when provided, designed placeholder otherwise. */
export function Photo({
  src,
  srcSet,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  alt,
  label,
  position = "center",
  className = "",
  eager = false,
}: {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  label?: string;
  position?: string;
  className?: string;
  eager?: boolean;
}) {
  if (!src) return <PortraitPlaceholder label={label} />;
  return (
    <picture>
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: position }}
      />
    </picture>
  );
}
