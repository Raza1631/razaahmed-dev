import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { assets } from "@/data/profile";
import { publicFileExists } from "@/lib/assets";

export default function Home() {
  const hasPhoto = publicFileExists(assets.photo);
  const hasResume = publicFileExists(assets.resume);

  // Without a resume file, the CV buttons open LinkedIn instead of a dead link.
  const resume = hasResume ? { href: assets.resume, download: true } : null;

  return (
    <>
      <ScrollProgress />
      <Navbar resume={resume} />
      <main className="flex-1">
        <Hero
          photo={{ src: assets.photo, available: hasPhoto }}
          resume={resume}
        />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
