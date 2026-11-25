export type Film = {
  id: string;
  title: string;
  role: string;
  category: string;
  /** Leave undefined until confirmed — never invent years. */
  year?: string;
  status?: string;
  /** Path to a poster in /public, e.g. "/images/posters/karuvarai.jpg". Empty = designed placeholder. */
  poster?: string;
  description?: string;
  /** Optional external link (trailer, OTT page, article). */
  link?: string;
};

export const films: Film[] = [
  { id: "sollathan-ninaikirean", title: "Sollathan Ninaikirean", role: "Assistant Director", category: "Tamil Television Serial" },
  { id: "chellame", title: "Chellame", role: "Associate Director", category: "Tamil Television Serial" },
  { id: "karuvarai", title: "Karuvarai", role: "Co-Director", category: "Short Film" },
  { id: "pathinettupadi-karuppan-vaararu", title: "Pathinettupadi Karuppan Vaararu", role: "Co-Director", category: "Tamil Feature Film" },
  { id: "kallaparunthu", title: "Kallaparunthu", role: "Co-Director", category: "Tamil Feature Film" },
  { id: "ivan-innonruvan", title: "Ivan Innonruvan", role: "Co-Director & Writer", category: "Tamil Feature Film" },
  { id: "puraavi-150-cc", title: "Puraavi 150 CC", role: "Acting", category: "Feature Film", status: "Upcoming · Yet to be released" },
];
