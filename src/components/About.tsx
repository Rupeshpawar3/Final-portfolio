import { motion, useInView, useTransform, useMotionValue, useScroll } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";

const StoryLetter = ({ char, scrollYProgress }: { char: string, scrollYProgress: any }) => {
  const { startY, startX, startRotate } = useMemo(() => ({
    startY: 800 + Math.random() * 800,
    startX: (Math.random() - 0.5) * 800,
    startRotate: (Math.random() - 0.5) * 720
  }), []);

  const animY = useTransform(scrollYProgress, [0.25, 0.45], [startY, 0]);
  const animX = useTransform(scrollYProgress, [0.25, 0.45], [startX, 0]);
  const animRot = useTransform(scrollYProgress, [0.25, 0.45], [startRotate, 0]);
  const animOpac = useTransform(scrollYProgress, [0.20, 0.40], [0, 1]);

  return (
    <motion.span style={{ display: "inline-block", y: animY, x: animX, rotate: animRot, opacity: animOpac, willChange: 'transform' }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const ABOUT_LINES = [
  // Para 1
  [{ t: "I'M" }, { t: "A" }, { t: "MULTIDISCIPLINARY" }, { t: "XR", red: true }, { t: "DEVELOPER" }, { t: "AND" }],
  [{ t: "CREATIVE" }, { t: "DESIGNER" }, { t: "WITH" }, { t: "A" }, { t: "MASTER'S" }, { t: "IN" }],
  [{ t: "IMMERSIVE" }, { t: "TECHNOLOGIES" }, { t: "FROM" }, { t: "THE" }, { t: "UNIVERSITY", red: true }, { t: "OF", red: true }],
  [{ t: "BRISTOL,", red: true }, { t: "AND" }, { t: "AN" }, { t: "ENGINEERING" }, { t: "DEGREE" }, { t: "FROM" }],
  [{ t: "NIT", red: true }, { t: "WARANGAL.", red: true }, { gap: true }],
  // Para 2
  [{ t: "I" }, { t: "SPECIALIZE" }, { t: "IN" }, { t: "BUILDING" }, { t: "CUTTING-EDGE" }],
  [{ t: "AR/VR" }, { t: "AND" }, { t: "UI/UX" }, { t: "EXPERIENCES," }, { t: "IMMERSIVE" }, { t: "FILMS," }, { t: "AND" }],
  [{ t: "PLAYFUL" }, { t: "THERAPEUTIC" }, { t: "GAMES" }, { t: "USING" }, { t: "UNITY,", red: true }],
  [{ t: "FIGMA,", red: true }, { t: "C#,", red: true }, { t: "BLENDER,", red: true }, { t: "MAYA,", red: true }, { t: "AND" }, { t: "MODERN" }],
  [{ t: "DESIGN" }, { t: "TOOLS." }, { gap: true }],
  // Para 3
  [{ t: "WITH" }, { t: "A" }, { t: "PASSION" }, { t: "FOR" }, { t: "CREATING" }, { t: "TANGIBLE" }],
  [{ t: "IMPACT" }, { t: "THROUGH" }, { t: "CROSS-PLATFORM" }, { t: "XR", red: true }, { t: "SOLUTIONS," }],
  [{ t: "I" }, { t: "BRIDGE" }, { t: "THE" }, { t: "GAP" }, { t: "BETWEEN" }, { t: "TECHNOLOGY" }],
  [{ t: "AND" }, { t: "HUMAN" }, { t: "EXPERIENCE," }, { t: "TURNING" }, { t: "COMPLEX" }],
  [{ t: "IDEAS", red: true }, { t: "INTO" }, { t: "ACCESSIBLE," }, { t: "ENGAGING" }, { t: "INTERACTIVE" }],
  [{ t: "ENVIRONMENTS." }, { gap: true }],
  // Para 4
  [{ t: "MY" }, { t: "PAST" }, { t: "ROLES" }, { t: "INCLUDE" }, { t: "WORKING" }, { t: "AT" }],
  [{ t: "BYJU'S,", red: true }, { t: "LEADING" }, { t: "CREATIVE" }, { t: "TEAMS" }, { t: "AT" }],
  [{ t: "THAT'S", red: true }, { t: "AWESOME", red: true }, { t: "STUDIO,", red: true }, { t: "AND" }, { t: "DESIGNING" }],
  [{ t: "IMPACTFUL" }, { t: "VISUALS" }, { t: "AT" }, { t: "MOVING", red: true }, { t: "PIXELS.", red: true }, { gap: true }],
  // Para 5
  [{ t: "I'M" }, { t: "PASSIONATE" }, { t: "ABOUT" }, { t: "INNOVATION," }, { t: "VISUAL" }],
  [{ t: "STORYTELLING," }, { t: "AND" }, { t: "BUILDING" }, { t: "DIGITAL" }, { t: "EXPERIENCES" }],
  [{ t: "THAT" }, { t: "CONNECT" }, { t: "TECHNOLOGY" }, { t: "AND" }, { t: "CREATIVITY.", red: true }]
];

const ScrollRevealWord = ({ word, isVisible }: { word: any, isVisible: boolean }) => {
  return (
    <span
      className={`inline-block uppercase tracking-[0.06em] leading-none transition-all duration-450 will-change-transform ${word.red ? 'text-[#eb422f]' : 'text-white'} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[90px]'}`}
      style={{
        fontFamily: "'Barlow Condensed', Impact, sans-serif",
        fontWeight: 800,
        fontSize: "clamp(0.9rem, 1.44vw, 1.44rem)",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      {word.t}
    </span>
  );
};

const ScrollRevealText = ({ lines, scrollProgress, active }: { lines: any[][], scrollProgress: any, active: boolean }) => {
  const [revealCount, setRevealCount] = useState(0);
  const totalWords = lines.reduce((acc, line) => acc + line.filter(w => !w.gap).length, 0);

  useEffect(() => {
    const unsub = scrollProgress.on("change", (latest: number) => {
      if (!active) {
        setRevealCount(0);
        return;
      }
      const count = Math.round(latest * (totalWords + 3));
      setRevealCount(count);
    });
    return () => unsub();
  }, [scrollProgress, totalWords, active]);

  useEffect(() => {
    if (active) {
      setRevealCount(Math.round(scrollProgress.get() * (totalWords + 3)));
    } else {
      setRevealCount(0);
    }
  }, [active, scrollProgress, totalWords]);

  let wordCounter = 0;

  // Flatten the array into paragraphs based on the `{gap: true}` marker
  const paragraphs: any[][] = [];
  let currentPara: any[] = [];
  lines.forEach(line => {
    line.forEach(w => {
      if (w.gap) {
        if (currentPara.length > 0) paragraphs.push(currentPara);
        currentPara = [];
      } else {
        currentPara.push(w);
      }
    });
  });
  if (currentPara.length > 0) paragraphs.push(currentPara);

  return (
    <div className="overflow-visible py-4 w-full relative z-20">
      {paragraphs.map((para, pi) => (
        <p key={pi} className="text-justify mb-[1em] break-words w-full" style={{ textAlignLast: "left", lineHeight: "1.4" }}>
          {para.map((w, wi) => {
            const currentIndex = wordCounter++;
            return (
              <span key={wi}>
                <ScrollRevealWord
                  word={w}
                  isVisible={currentIndex < revealCount}
                />
                {wi < para.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
};

const About = ({ scrollYProgress, isStoryMode = false }: any) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [headerDone, setHeaderDone] = useState(false);

  useEffect(() => {
    if (isInView && !isStoryMode) {
      const t = setTimeout(() => setHeaderDone(true), 600);
      return () => clearTimeout(t);
    } else if (isStoryMode) {
      setHeaderDone(true);
    }
  }, [isInView, isStoryMode]);

  const { scrollYProgress: sectionScrollY } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"]
  });



  const dummyScroll = useMotionValue(0);
  const scrollVal = scrollYProgress || dummyScroll;

  // In story mode, the letters settle into place linearly from 0.25 to 0.45.
  // We want the text to start revealing strictly AFTER 0.46, completing around 0.68.
  const storyRevealProgress = useTransform(scrollVal, [0.48, 0.68], [0, 1]);

  // In normal mode, slightly delay the beginning of the reveal using sectionScrollY
  const normalRevealProgress = useTransform(sectionScrollY, [0.15, 0.9], [0, 1]);

  const revealScrollProgress = isStoryMode ? storyRevealProgress : normalRevealProgress;

  // Media fades in from 0.45 to 0.60
  const bgVideoOpacity = useTransform(scrollVal, [0.45, 0.6], [0, 0.6]);
  const mediaOpacity = useTransform(scrollVal, [0.45, 0.6], [0, 1]);
  const textOpacity = useTransform(scrollVal, [0.45, 0.6], [0, 1]);

  const renderStoryText = (text: string) => (
    <span className="inline-block" style={{ whiteSpace: 'nowrap' }}>
      {text.split("").map((c, i) => <StoryLetter key={i} char={c} scrollYProgress={scrollVal} />)}
    </span>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative py-20 overflow-hidden min-h-[48vh] flex items-center ${isStoryMode ? 'h-full' : 'bg-background'}`}
    >

      {/* Background Video */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity: isStoryMode ? bgVideoOpacity : 1 }}>
        <video
          src="/about-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover mix-blend-screen ${isStoryMode ? 'opacity-100' : 'opacity-60'}`}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
      </motion.div>

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Column 1: Title */}
          <div className="lg:col-span-3">
            <motion.h2
              className="font-display text-5xl md:text-[4.8rem] font-bold text-white tracking-tighter"
              initial={isStoryMode ? {} : { opacity: 0, x: -50 }}
              animate={isStoryMode ? {} : { opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ duration: 0.6 }}
            >
              {isStoryMode ? renderStoryText("About") : "About"}
            </motion.h2>
          </div>

          {/* Column 2: Video */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              className="relative w-full max-w-[290px] mx-auto rounded-2xl overflow-hidden shadow-2xl"
              initial={isStoryMode ? {} : { opacity: 0, scale: 1, y: -800 }}
              animate={isStoryMode ? {} : { opacity: isInView ? 1 : 0, scale: 1, y: isInView ? 0 : -800 }}
              style={isStoryMode ? { opacity: mediaOpacity, y: useTransform(scrollVal, [0.4, 0.6], [-800, 0]) } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tank Overlay (Frame) - Now sets the height */}
              <img
                src="/assets/fish-tank.avif"
                alt="Fish Tank"
                className="relative z-20 w-full h-auto pointer-events-none opacity-90"
              />

              {/* Video (Inside) */}
              <video
                src="/assets/about-fish.mp4"
                poster="/assets/fish-tank.avif"
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] object-cover z-0 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
            </motion.div>
          </div>

          {/* Column 3: Text */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div className="flex justify-end mb-8">
              <motion.h2
                className="font-display text-5xl md:text-[4.8rem] font-bold text-white tracking-tighter"
                initial={isStoryMode ? {} : { opacity: 0, x: 50 }}
                animate={isStoryMode ? {} : { opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
                transition={{ duration: 0.6 }}
              >
                {isStoryMode ? renderStoryText("Me") : "Me"}
              </motion.h2>
            </div>

            {/* Scroll Reveal Text */}
            <div className="text-[13px] leading-loose overflow-visible w-full min-h-[240px]">
              <ScrollRevealText
                lines={ABOUT_LINES}
                scrollProgress={revealScrollProgress}
                active={headerDone}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;