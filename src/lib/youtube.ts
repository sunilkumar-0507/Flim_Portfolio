/** Extracts the 11-char video ID from any common YouTube URL (youtu.be, shorts, watch, embed, live). */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  if (/^[\w-]{11}$/.test(url)) return url;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return clean(u.pathname.slice(1));
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v) return clean(v);
      const m = u.pathname.match(/\/(shorts|embed|live|v)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch {
    /* not a URL */
  }
  return null;
}

function clean(id: string) {
  const m = id.match(/^[\w-]{11}/);
  return m ? m[0] : null;
}

export const youTubeThumb = (id: string, quality: "hqdefault" | "maxresdefault" | "sddefault" = "hqdefault") =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

export const youTubeEmbed = (id: string) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
    origin,
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
};

export const youTubeWatch = (id: string, vertical = true) =>
  vertical ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
