import { useState, useRef, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import { useIsMobile } from "@/hooks/use-mobile";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isAligned, setIsAligned] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const isMobile = useIsMobile();

  const balloons = [
    "/projects/balloon-6.avif", // Human.exe
    "/projects/balloon-2.avif", // Character (Mental Health)
    "/projects/balloon-1.avif", // Yoga (UI/UX Design and Development)
    "/projects/balloon-3.avif", // 3D Modeling
    "/projects/balloon-4.avif", // Anime (Graphic Design)
    "/projects/balloon-5.avif", // Collage (Digital Art)
  ];

  // Manual offsets to perfectly align the thread with each balloon's basket
  const basketOffsets = [0, 35, 0, 15, -25, 0];

  const balloonPositions = useMemo(() => {
    return balloons.map((src) => {
      // Generate random paths for "all over" movement
      // We'll use relative coordinates to drift significantly
      const moveRange = 200; // pixels to move in either direction

      const generatePath = () => {
        const points = [0]; // start at origin
        for (let i = 0; i < 4; i++) {
          points.push((Math.random() - 0.5) * moveRange * 2);
        }

        return points;
      };

        const size = Math.random() * (280 - 150) + 150; // slightly smaller so they fit better on mobile
        return {
          src,
          top: `clamp(10%, ${Math.random() * 80 + 10}%, calc(90% - ${size}px))`,
          left: `clamp(5%, ${Math.random() * 80 + 10}%, calc(95% - ${size}px))`,
          size,
          xPath: generatePath(),
          yPath: generatePath(),
          duration: Math.random() * 20 + 20, // 20-40s duration for slow drift
        };
    });
  }, []);

  const projects = Object.values(projectsData);
  const filters = ["All", "XR", "Games", "Design", "3D", "UI/UX"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  /* Parallax Effect */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ySky = useTransform(scrollYProgress, [0, 1], ["-40%", "20%"]);
  const yBridge = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 relative overflow-hidden min-h-screen cursor-pointer"
      onClick={() => {
        if (isAligned) {
          setIsAligned(false);
          setFlippedIndex(null);
          setIsAtEnd(false);
        }
      }}
      style={{
        transition: 'height 0.8s ease-in-out'
      }}
    >
      {/* Sky Background Image - Top */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('/projects/project-sky.png')",
          backgroundSize: isMobile ? 'cover' : '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          filter: isAligned ? 'blur(6px) grayscale(75%)' : 'grayscale(75%)',
          y: ySky,
        }}
      />

      {/* Bridge Background Image - Bottom */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('/projects/project-combined.png')",
          backgroundSize: isMobile ? 'cover' : '100% auto',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          filter: isAligned ? 'blur(6px) grayscale(75%)' : 'grayscale(75%)',
          y: yBridge,
        }}
      />

      {/* 50% Black Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/30 pointer-events-none" />

      {/* Section Blending Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />


      {/* Random Balloons & Flip Cards Container */}
      <div
        ref={scrollContainerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 30) {
            if (!isAtEnd) setIsAtEnd(true);
          } else {
            if (isAtEnd) setIsAtEnd(false);
          }
        }}
        className={`absolute inset-0 transition-all duration-500 ${isAligned
          ? 'z-20 flex flex-col md:flex-row items-center overflow-y-auto md:overflow-y-hidden md:overflow-x-auto px-4 md:px-8 gap-6 md:gap-8 py-24 md:py-0'
          : 'pointer-events-none'
          }`}
        style={{
          // Ensure container takes full height/width for relative positioning to work initially, 
          // and specific layout for aligned
        }}
        onClick={() => {
          // Allow clicking background of scroll area to dismiss if needed, 
          // though the section onClick handler (line 71) handles dismiss generally.
        }}
      >
        {balloonPositions.map((b, i) => {
          const project = projects[i % projects.length]; // Fallback if fewer projects
          const isFlipped = flippedIndex === i;

          return (
            <motion.div
              key={i}
              layout // Enable layout animations for smooth position changes
              className={`${isAligned ? 'relative flex-shrink-0' : 'absolute'} cursor-pointer pointer-events-auto`}
              initial={{ opacity: 0, y: 100, top: b.top, left: b.left, width: `${b.size}px` }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isAligned) {
                  setIsAligned(true);
                } else {
                  setFlippedIndex(isFlipped ? null : i);
                }
              }}
              style={{
                perspective: 1000,
                height: 'auto',
                // When not aligned, we need to enforce absolute positioning styles
                ...(isAligned ? {} : { top: b.top, left: b.left }),
              }}
              animate={isInView ? {
                opacity: 1,
                width: isAligned ? (isMobile ? '80vw' : '350px') : `${b.size}px`,
                zIndex: isFlipped ? 30 : (isAligned ? 20 : 5),
                // When aligned, clear manual positioning to let Flexbox work
                ...(isAligned ? {
                  top: 'auto',
                  left: 'auto',
                  x: 0,
                  y: 0,
                } : {
                  top: b.top,
                  left: b.left,
                  x: b.xPath,
                  y: b.yPath
                })
              } : { opacity: 0, y: 100, top: b.top, left: b.left, width: `${b.size}px` }}
              transition={{
                duration: isAligned ? 0.8 : b.duration,
                x: isAligned ? { duration: 0.8 } : { duration: b.duration, repeat: Infinity, repeatType: "reverse", ease: 'easeInOut' },
                y: isAligned ? { duration: 0.8 } : { duration: b.duration, repeat: Infinity, repeatType: "reverse", ease: 'easeInOut' },
                opacity: { duration: 1.5, repeat: 0 },
                layout: { duration: 0.8, ease: "easeInOut" }
              }}

            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front: Balloon */}
                <div
                  className="w-full h-full backface-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <motion.img
                    src={b.src}
                    alt=""
                    className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] brightness-110"
                    animate={{
                      rotate: isAligned ? 0 : [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: b.duration,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {isAligned && !isFlipped && (
                    <motion.div
                      className="absolute inset-x-0 flex justify-center pointer-events-none z-10"
                      style={{ bottom: "calc(20% - 130px)" }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                      <div className="px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden flex items-center justify-center w-[220px] md:w-[270px] h-[40px] md:h-[44px] shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                        <motion.h3
                          layoutId={`proj-title-${i}`}
                          className="font-display text-[10px] md:text-[11px] font-semibold text-white/90 tracking-[0.15em] uppercase text-center m-0 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        >
                          {project?.title}
                        </motion.h3>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Back: Project Card */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden glass-panel rounded-3xl overflow-hidden flex flex-col"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={project?.hero} alt={project?.title} className="w-full h-full object-cover" />
                    {/* Top Blend Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-black/80 to-transparent z-10" />
                    {/* Bottom Blend Gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-[20px] bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    {isFlipped && (
                      <motion.h3 
                        layoutId={`proj-title-${i}`}
                        className="absolute bottom-4 left-4 text-xl font-bold text-white shadow-sm z-20"
                      >
                        {project?.title}
                      </motion.h3>
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <span className="text-primary text-sm font-mono mb-2">{project?.category}</span>
                    <p className="text-gray-300 text-sm">{project?.description}</p>

                    <Link
                      to={`/project/${project?.slug}`}
                      className="self-start px-6 py-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore More <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })}

      </div>

      {/* Sticky Bottom Scroll Indicator */}
      {isAligned && flippedIndex === null && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isAtEnd ? 0 : 1, x: isAtEnd ? 20 : 0 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center justify-center pointer-events-none z-30"
        >
          <div className="text-white/60 font-mono text-[9px] md:text-[10px] tracking-[0.1em] flex flex-row items-center gap-2 bg-black/60 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md shadow-2xl">
            <span className="whitespace-nowrap uppercase">Scroll to View</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-sm leading-none"
            >
              ➔
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full z-40 text-center mb-4"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold relative inline-block">
            <span className="text-white">Featured Projects</span>
            <div className="absolute -bottom-4 left-0 h-1 bg-[#EB422F] rounded-full w-full" />
          </h2>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg relative overflow-hidden">
            {/* Corner decorations for tech feel */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
            
            <span className="text-[#EB422F] font-mono font-bold text-lg leading-none mt-[-2px]">{"["}</span>
            <motion.span
              className="text-center text-xs md:text-sm font-mono tracking-widest uppercase bg-gradient-to-r from-white/50 via-white to-white/50 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{
                backgroundPosition: ["0% center", "-200% center"]
              }}
              transition={{
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              {
                !isAligned ? "Click on balloons" :
                  flippedIndex === null ?
                    (isMobile ? "Scroll balloons • Tap to flip • Click out to exit" : "Tap any card to flip • Click out to exit") :
                    "Select 'Explore More' • Click out to close"
              }
            </motion.span>
            <span className="text-[#EB422F] font-mono font-bold text-lg leading-none mt-[-2px]">{"]"}</span>
          </div>
        </motion.div>


      </div>
    </section >
  );
};

export default Projects;
