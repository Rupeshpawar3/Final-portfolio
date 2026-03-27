import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Hero from "./Hero";
import About from "./About";
import Education from "./Education";

const StorySequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activePanel, setActivePanel] = useState(0);
    const [heroInteractive, setHeroInteractive] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Snap abruptly when passing the 75% scroll mark
        if (latest >= 0.75 && activePanel !== 1) {
            setActivePanel(1);
        } else if (latest < 0.75 && activePanel !== 0) {
            setActivePanel(0);
        }

        // Only let the About/Education overlay intercept pointer events
        // once the user has scrolled past the Hero (10% of 700vh scroll)
        setHeroInteractive(latest < 0.10);
    });

    return (
        <div ref={containerRef} className="relative w-full h-[700vh] bg-black">
            <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
                {/* Hero — fades out as About fades in (first 40% of scroll) */}
                <div className="absolute inset-0">
                    <Hero scrollYProgress={scrollYProgress} isStoryMode={true} />
                </div>

                {/* Horizontal scroll track: About + Education side by side */}
                <motion.div
                    className={`absolute inset-0 flex ${heroInteractive ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    animate={{ x: activePanel === 0 ? "0%" : "-50%" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                    style={{ width: "200vw" }}
                >
                    {/* Panel 1: About */}
                    <div className={`w-screen h-full flex-shrink-0 ${heroInteractive ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                        <About scrollYProgress={scrollYProgress} isStoryMode={true} />
                    </div>

                    {/* Panel 2: Education */}
                    <div className={`w-screen h-full flex-shrink-0 overflow-auto ${heroInteractive ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                        <Education />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default StorySequence;
