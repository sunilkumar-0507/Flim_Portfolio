export type Experience = { role: string; project: string; category: string };

export const experience: Experience[] = [
  { role: "Assistant Director", project: "Sollathan Ninaikirean", category: "Tamil Television Serial" },
  { role: "Associate Director", project: "Chellame", category: "Tamil Television Serial" },
  { role: "Co-Director", project: "Karuvarai", category: "Short Film" },
  { role: "Co-Director", project: "Pathinettupadi Karuppan Vaararu", category: "Tamil Feature Film" },
  { role: "Co-Director", project: "Kallaparunthu", category: "Tamil Feature Film" },
  { role: "Co-Director and Writer", project: "Ivan Innonruvan", category: "Tamil Feature Film" },
];

export type Award = { title: string; event: string; year: string; film: string };

/** Add more achievements here — the Recognition section lists them all. */
export const awards: Award[] = [
  { title: "Best Director", event: "MAFF Award", year: "2025", film: "Who Is The Ghost" },
];
