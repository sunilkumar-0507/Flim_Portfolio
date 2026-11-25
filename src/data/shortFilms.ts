/**
 * YouTube short films. Paste any YouTube URL format:
 *   https://youtu.be/ID   https://www.youtube.com/shorts/ID   https://www.youtube.com/watch?v=ID
 * Add more objects to this array — the gallery grows automatically.
 */
export type ShortFilm = {
  id: string;
  title: string;
  description: string;
  url: string;
  achievement?: string;
  /** Optional custom thumbnail in /public. Empty = YouTube's own thumbnail. */
  thumbnail?: string;
  /** "vertical" for Shorts (9:16), "horizontal" for regular 16:9 videos. */
  format?: "vertical" | "horizontal";
};

export const shortFilms: ShortFilm[] = [
  {
    id: "devathai-aval",
    title: "Devathai Aval",
    description: "My first short film.",
    url: "https://youtu.be/J76AIKrxto0?si=jy4pkGMv42MypI2l",
    format: "horizontal",
  },
  {
    id: "who-is-the-ghost",
    title: "Who Is The Ghost",
    description: "My second short film.",
    achievement: "Best Director — MAFF Award 2025",
    url: "https://youtu.be/OnQXlyCUAMU?si=MEQNQXDXwclodaEo",
    format: "vertical",
  },
  {
    id: "love-bro",
    title: "Love Bro",
    description: "My third short film.",
    url: "https://youtu.be/Vc7zciCzbLQ?si=CHt6ANhmoq4306kJ",
    format: "horizontal",
  },
];
