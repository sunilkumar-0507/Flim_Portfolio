/**
 * Central site settings. Edit text, contact details and social links here.
 * Leave a social URL as "" to show it as "coming soon" (no broken links).
 */
export const site = {
  name: "N. Jhaishankar",
  roles: ["Filmmaker", "Director", "Writer", "Actor"],
  tagline: "Every frame tells a story. Every story deserves to be told.",
  intro:
    "A passionate Tamil filmmaker with experience in direction, screenplay, writing and acting, bringing stories to life through cinema.",

  /** Hero media. Put files in /public/images. heroVideo (mp4) takes priority over heroImage if set. */
  heroImage: "/images/portraits/jhaishankar.jpg",
  heroVideo: "",

  /**
   * Portrait photo. `portraitSrcSet` gives browsers smaller WebP files on phones.
   * Regenerate with: node scripts/optimize-images.mjs "<photo>" jhaishankar
   */
  portrait: "/images/portraits/jhaishankar.jpg",
  portraitSrcSet: "/images/portraits/jhaishankar-640.webp 640w, /images/portraits/jhaishankar-1200.webp 1199w",
  portraitAlt: "N. Jhaishankar on set, in a black shirt and dark sunglasses, with a film camera and clapboard behind him",
  /** Optional second on-set photo for the introduction section. Hidden while empty. */
  behindTheScenes: "",

  contact: {
    email: "shankarhai050@gmail.com",
    phone: "+91 6383820669",
    whatsapp: "916383820669",
    whatsappMessage: "Hello N. Jhaishankar, I saw your portfolio and would like to connect about a project.",
  },

  social: {
    instagram: "",
    youtube: "",
  },

  /** Genres & crafts shown in the scrolling strip. */
  marquee: ["Direction", "Screenplay", "Love & Comedy", "Writing", "Political Comedy", "Acting", "Feel Good", "Ghost Films"],
};

export const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Films", id: "films" },
  { label: "Short Films", id: "short-films" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
] as const;

export const profile = {
  profession: "Filmmaker",
  education: ["B.Sc. Electronic Science", "Master of Management & Systems", "M.Phil. Management"],
  strengths: ["Writer", "Initiator", "Positive thinker", "Self-motivated", "Hard worker"],
  languages: ["Tamil", "Sanskrit", "English", "Telugu", "Hindi", "Malayalam"],
  interests: ["Love and Comedy", "Political Comedy", "Feel Good", "Ghost Films"],
};
