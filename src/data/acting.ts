export type ActingCredit = {
  id: string;
  title: string;
  /** Optional still/poster in /public. */
  image?: string;
  /** Optional clip URL (YouTube) — shows a play button when set. */
  clip?: string;
};

/** Acting projects. Character names are intentionally omitted until confirmed. */
export const acting: ActingCredit[] = [
  { id: "ivan-vera-mathiri", title: "Ivan Vera Mathiri" },
  { id: "kaadhu", title: "Kaadhu" },
  { id: "nagaravalam", title: "Nagaravalam" },
  { id: "pathinettupadi-karuppan", title: "Pathinettupadi Karuppan" },
  { id: "kallaparunthu", title: "Kallaparunthu" },
];

export const writing = {
  featured: {
    title: "Ivan Innonruvan",
    role: "Co-Director and Writer",
    category: "Tamil Feature Film",
    poster: "",
  },
  pillars: [
    { title: "Story Development", text: "Shaping a first spark into characters, conflict and a world worth stepping into." },
    { title: "Screenwriting", text: "Scene by scene, line by line — building the blueprint every department works from." },
    { title: "Creative Concepts", text: "Loglines, treatments and ideas in development across love, comedy and the supernatural." },
    { title: "Behind the Scenes", text: "Notes, stills and moments from the set. More material will be shared here soon." },
  ],
};
