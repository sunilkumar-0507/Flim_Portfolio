import { About } from "../components/About";
import { ActingPortfolio } from "../components/ActingPortfolio";
import { Awards } from "../components/Awards";
import { Contact } from "../components/Contact";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { Filmography } from "../components/Filmography";
import { Hero } from "../components/Hero";
import { Profile } from "../components/Profile";
import { ShortFilms } from "../components/ShortFilms";
import { WritingPortfolio } from "../components/WritingPortfolio";

export function Home({ ready }: { ready: boolean }) {
  return (
    <main>
      <Hero ready={ready} />
      <About />
      <Filmography />
      <ShortFilms />
      <ActingPortfolio />
      <WritingPortfolio />
      <ExperienceTimeline />
      <Awards />
      <Profile />
      <Contact />
    </main>
  );
}
