import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import StorySequence from "@/components/StorySequence";
import TechScroll from "@/components/TechScroll";
import Skills from "@/components/Skills";

import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";

import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  const location = useLocation();
  const shouldSkipIntro = location.state?.skipIntro;
  const [isLoading, setIsLoading] = useState(!shouldSkipIntro);

  useEffect(() => {
    if (!isLoading) {
      if (location.hash) {
        // Run scroll multiple times to counteract GSAP scroll-trigger pin injections
        // which dynamically alter page height after the initial render.
        const scrollToHash = () => {
          const id = location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        };

        // Fire immediately
        scrollToHash();

        // Fire after 100ms
        setTimeout(scrollToHash, 100);

        // Fire after 500ms as a final correction once all scripts evaluate
        setTimeout(scrollToHash, 500);

      } else {
        // Only scroll to top if there's no specific section targeted
        window.scrollTo(0, 0);
      }
    }
  }, [isLoading, location.hash]);

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>

          <ScrollProgress />
          <Header />
          <main>
            <StorySequence />
            <div className="relative z-10 bg-background">
              <TechScroll />
              <Skills />
              <WhyWorkWithMe />
              <WorkExperience />
              <Projects />
              <Contact />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
