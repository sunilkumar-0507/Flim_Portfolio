/**
 * Designed placeholder poster, used until a real poster image is supplied.
 * Deterministic tone per title, so every card looks intentional and distinct.
 */
const TONES = [
  { a: "#3b2a14", b: "#0b0806", glow: "rgba(198,164,106,0.55)" }, // amber
  { a: "#14262b", b: "#05090a", glow: "rgba(120,170,180,0.35)" }, // night teal
  { a: "#3a1414", b: "#0a0505", glow: "rgba(200,90,70,0.40)" }, // crimson
  { a: "#2b2620", b: "#090807", glow: "rgba(230,210,170,0.35)" }, // sepia
  { a: "#181d2e", b: "#05060a", glow: "rgba(140,150,210,0.35)" }, // steel blue
  { a: "#26301c", b: "#070905", glow: "rgba(180,190,120,0.30)" }, // olive
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

type Props = {
  title: string;
  credit?: string;
  kicker?: string;
  className?: string;
};

export function PosterArt({ title, credit, kicker, className = "" }: Props) {
  const h = hash(title);
  const t = TONES[h % TONES.length];
  const lx = 25 + (h % 50);
  const words = title.split(" ");
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 70% at ${lx}% 18%, ${t.a} 0%, ${t.b} 62%, #050505 100%)` }}
      aria-hidden
    >
      <div
        className="absolute rounded-full blur-3xl"
        style={{ width: "70%", height: "40%", left: `${lx - 35}%`, top: "4%", background: t.glow, opacity: 0.55 }}
      />
      <div className="absolute inset-x-0 top-[58%] h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-[50%]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)" }} />
      <svg
        className="absolute bottom-[34%] h-[30%] opacity-80"
        style={{ left: `${(h % 3) * 20 + 22}%` }}
        viewBox="0 0 40 100"
        fill="#000"
      >
        <circle cx="20" cy="11" r="8" />
        <path d="M6 30 Q20 20 34 30 L37 70 L30 70 L29 100 L11 100 L10 70 L3 70 Z" />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-[8%]">
        <p className="label !text-[0.55rem] !tracking-[0.4em] text-white/60">{kicker ?? "A Tamil Film"}</p>
        <div>
          <p className="display uppercase text-white text-[clamp(1.5rem,3vw,2.5rem)] leading-[0.9]">
            {words.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </p>
          {credit && <p className="label mt-4 !text-[0.55rem] text-gold">{credit}</p>}
          <div className="mt-4 space-y-1 opacity-40">
            <div className="h-[3px] w-full bg-white/30" />
            <div className="h-[3px] w-4/5 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
