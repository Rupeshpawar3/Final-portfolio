import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ParticleText from "./ParticleText";
import InteractiveHoverText from "./InteractiveHoverText";
import HeroImageReveal from "./HeroImageReveal";
import HeroBackground from "./HeroBackground";


// Text scramble effect component
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(
          text.split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };

    startAnimation();
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

import LightRays from "./LightRays";

// Component for randomly changing floating titles in random positions
const RandomFloatingText = ({ items, className, excludeZone, validTops, validLefts, validRights }: any) => {
  const [current, setCurrent] = useState(items[Math.floor(Math.random() * items.length)]);
  const [position, setPosition] = useState<any>({ top: "50%", left: "50%" });

  useEffect(() => {
    const tops = validTops || ["40%", "55%", "70%", "85%"];

    const randomizeConfig = () => {
      const randomTop = tops[Math.floor(Math.random() * tops.length)];
      if (validRights) {
        const randomRight = validRights[Math.floor(Math.random() * validRights.length)];
        setPosition({ top: randomTop, right: randomRight });
      } else {
        const lefts = validLefts || ["10%", "25%", "40%", "55%"];
        const randomLeft = lefts[Math.floor(Math.random() * lefts.length)];
        setPosition({ top: randomTop, left: randomLeft });
      }
    };

    randomizeConfig();

    const interval = setInterval(() => {
      // Ensure we don't pick the exact same item back-to-back
      let nextItem;
      do {
        nextItem = items[Math.floor(Math.random() * items.length)];
      } while (nextItem === current);

      setCurrent(nextItem);
      randomizeConfig();
    }, 4500 + Math.random() * 2000); // 4.5-6.5 seconds per word

    return () => clearInterval(interval);
  }, [items, current, validTops, validLefts]); // Add current as dependency so the `do-while` has the latest state

  return (
    <div className={`absolute z-10 pointer-events-none transition-all duration-1000 ${className}`} style={{ ...position, transitionProperty: 'top, left' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="whitespace-nowrap flex items-center gap-2 drop-shadow-lg max-w-[90vw]"
        >
          <div className="w-1.5 h-1.5 bg-[#EB422F] rounded-full flex-shrink-0 animate-pulse" />
          <ScrambleText text={current} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Hero = ({ scrollYProgress: externalScrollY, isStoryMode = false }: any) => {
  const containerRef = useRef<HTMLElement>(null);

  const floatingTitles = [
    "XR Developer",
    "Augmented Reality Developer",
    "Virtual Reality Developer",
    "Mixed Reality Developer",
    "Unity 3D Developer",
    "Unreal Engine Developer",
    "WebXR Developer",
    "Graphic Designer",
    "UI/UX Designer and Developer",
    "Creative Designer",
    "Brand Identity Designer",
    "Motion Graphics Animator",
    "3D Animator",
    "Video Editor",
    "3D Modelling Artist",
    "Blender 3D Artist",
    "Autodesk Maya Artist",
    "Immersive UI/UX Designer",
    "C# Developer",
    "C and C++ Programmer",
    "JavaScript Developer"
  ];

  const particleTitles = [
    "XR Developer",
    "Game Developer",
    "Immersive Tech",
    "Graphic Designer",
    "Animator",
    "Creative Engine",
    "Spatial Computing",
    "UI/UX Design"
  ];

  const { scrollYProgress: localScrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"]
  });

  const scrollYProgress = externalScrollY || localScrollY;

  // Background fades out quickly in StoryMode
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Main name smoothly slides down out of the frame between 5% and 45% scroll (50% slower)
  const nameY = useTransform(scrollYProgress, [0.05, 0.45], ["0vh", "150vh"]);

  // Parallax for bottom text
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden text-[#e0e0e0] font-sans selection:bg-[#EB422F] selection:text-white ${isStoryMode ? 'h-full bg-transparent' : 'h-[150svh] bg-black'}`}
    >
      {/* Sticky container to lock content while scrolling down the 150vh */}
      <div className={`w-full overflow-hidden ${isStoryMode ? 'h-full absolute inset-0' : 'sticky top-0 h-[100svh]'}`}>

        <motion.div style={{ opacity: isStoryMode ? backgroundOpacity : 1 }} className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
          {/* === INTERACTIVE AI-INSPIRED BACKGROUND === */}
          <HeroBackground />

          {/* === SCATTERED RANDOM GENERATING TITLES === */}
          {/* Top-Left Quadrant */}
          <RandomFloatingText
            items={floatingTitles}
            className="text-[#EB422F] font-display font-bold text-[12px] md:text-[18px]"
            validTops={["40%", "47%", "54%"]}
            validLefts={["8%", "18%", "28%"]}
          />
          {/* Top-Right Quadrant */}
          <RandomFloatingText
            items={floatingTitles}
            className="text-[#EB422F] font-display font-bold text-[10px] md:text-[14px] text-right"
            validTops={["40%", "47%", "54%"]}
            validRights={["5%", "15%", "25%"]}
          />
          {/* Bottom-Left Quadrant */}
          <RandomFloatingText
            items={floatingTitles}
            className="text-[#EB422F] font-display font-bold text-[14px] md:text-[20px]"
            validTops={["70%", "78%", "86%"]}
            validLefts={["8%", "18%", "28%"]}
          />
          {/* Bottom-Right Quadrant */}
          <RandomFloatingText
            items={floatingTitles}
            className="text-[#EB422F] font-display font-bold text-[12px] md:text-[16px] text-right"
            validTops={["70%", "78%", "86%"]}
            validRights={["5%", "15%", "25%"]}
          />

          {/* Top Right Abstract Squiggle / Graphical element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-[5%] right-[2%] z-10 w-[250px] lg:w-[350px] pointer-events-none mix-blend-screen transform -rotate-12 hidden md:block"
          >
            <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-70">
              <path d="M50 80 Q 80 10, 150 70 T 250 60 T 350 40" stroke="#EB422F" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" />
              <path d="M40 90 Q 70 20, 160 80 T 260 50 T 370 60" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
              <path d="M30 100 Q 60 30, 170 90 T 270 40 T 390 80" stroke="#EB422F" strokeWidth="1" strokeDasharray="1 4" strokeLinecap="round" />
              <rect x="180" y="30" width="80" height="40" rx="20" transform="rotate(15 180 30)" stroke="#fff" strokeWidth="0.5" fill="rgba(255,255,255,0.02)" />
              <rect x="220" y="50" width="70" height="30" rx="15" transform="rotate(-10 220 50)" stroke="#EB422F" strokeWidth="0.5" fill="rgba(46, 231, 255,0.02)" />
            </svg>
          </motion.div>

          {/* WebGL Light Rays Effect - Full Screen from Bottom Center */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-70 mix-blend-screen">
            <LightRays className="w-full h-full" />
          </div>

          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 relative z-40 h-full flex flex-col items-center justify-center pb-20 pt-32 pointer-events-none">
            {/* Centered Image Reveal (Hover glass effect) */}
            <motion.div
              className="w-full flex justify-center relative z-40 pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative w-full max-w-[450px] mx-auto z-40">
                <HeroImageReveal
                  neonImage="/assets/hero-neon-new.avif"
                  realImage="/hero-real.avif"
                />
              </div>
            </motion.div>
            {/* Animated Titles - Always at Bottom Right, shifted specifically 200px down, 250px right */}
            <div className="absolute bottom-[2%] right-[2%] lg:bottom-[5%] lg:right-[2%] z-20 pointer-events-none w-[95vw] lg:w-[600px] flex items-center justify-center translate-x-[250px] translate-y-[200px]">
              <ParticleText
                texts={particleTitles}
                className="w-full h-[150px] lg:h-[500px]"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Name positioned at the top - DOES NOT FADE OUT */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ y: isStoryMode ? nameY : 0 }}
          className="absolute top-[8%] lg:top-[12%] left-[4%] lg:left-[5%] z-30 overflow-visible pointer-events-none w-max text-left"
        >
          <h1
            className="whitespace-nowrap font-display font-bold leading-none tracking-tight overflow-visible pointer-events-auto"
            style={{ fontSize: "clamp(32px, 8vw, 150px)" }}
          >
            <InteractiveHoverText
              text="Rupesh Pawar"
              className="overflow-visible"
              textClassName="remnant text-[#EB422F] inline-block"
            />
          </h1>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

