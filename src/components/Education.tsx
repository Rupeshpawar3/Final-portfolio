import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

const Education = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-10%" });

  const education = [
    {
      degree: "Master's, Immersive Technologies",
      specialization: "Virtual and Augmented Reality",
      institution: "University of Bristol",
      location: "Bristol, United Kingdom",
      period: "Sep 2024 – Sept 2025",
      image: "/assets/uob-neon.png",
      hoverImage: "/assets/uob.jpg",
      reverse: false
    },
    {
      degree: "Bachelor of Technology",
      specialization: "Mechanical Engineering",
      institution: "National Institute of Technology Warangal",
      location: "Warangal, India",
      period: "Aug 2016 – May 2020",
      image: "/nitw-lineart.png",
      hoverImage: "/assets/nit-warangal.avif",
      reverse: true
    },
  ];

  useEffect(() => {
    if (isInView) {
      const runAnimation = async () => {
        // Phase 1: Education text slides in from Right directly to Center
        // (Starts offscreen right: x: "100%", ends centered: x: "-50%")
        await animate(".main-heading", { x: "-50%", opacity: 1 }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });

        // Phase 2: Scale down the massive heading smoothly
        await animate(".main-heading", { scale: 1 }, { duration: 0.6, ease: "easeInOut" });

        // Phase 3: Paint the clean accent underline left-to-right
        await animate(".heading-underline", { width: "100%" }, { duration: 0.5, ease: "easeOut" });

        // Phase 4: Translate the entire header block upward to lock into position
        await animate(".header-container", { y: -64 }, { duration: 0.7, ease: "easeInOut" });

        // Phase 5: Draw the vertical route-map line down the center of the timeline
        await animate(".route-line", { height: "100%" }, { duration: 1.2, ease: "easeInOut" });

        // Phase 6: Slide & Fade in the education timeline cards (staggered by 0.2s)
        animate(
          ".edu-card",
          { opacity: 1, x: 0, scale: 1 },
          { duration: 0.8, delay: (i) => i * 0.2, ease: "easeOut" }
        );
      };
      runAnimation();
    }
  }, [isInView, animate]);


  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden" ref={scope}>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/advantage-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      {/* Container holding the animation scope */}
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 min-h-[800px]">

        {/* Header Block constraints */}
        <div className="relative w-full flex justify-center h-[100px] mb-6 header-container" style={{ transform: "translateY(0px)" }}>
          <div
            className="main-heading absolute left-1/2 top-[50px] flex flex-col items-center"
            style={{ transform: "translateX(100vw) scale(1.5)", opacity: 0 }}
          >
            <h2 className="font-display text-4xl md:text-[3.6rem] font-bold text-white tracking-tight uppercase">
              Education
            </h2>
            <div
              className="heading-underline h-1 bg-[#EB422F] mt-4"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto timeline-container -mt-12 z-20">

          {/* Central Route Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden md:block" />
          <div
            className="route-line absolute left-1/2 top-0 w-1 bg-gradient-to-b from-[#EB422F] via-[#EB422F]/50 to-transparent -translate-x-1/2 hidden md:block"
            style={{ height: "0%" }}
          />

          <div className="space-y-24">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className={`edu-card relative flex flex-col ${edu.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center w-full gap-6 md:gap-0`}
                style={{
                  opacity: 0,
                  transform: `translateX(${edu.reverse ? '-100px' : '100px'}) scale(0.95)`
                }}
              >
                {/* Central Dot */}
                <div className="absolute left-1/2 top-1/2 w-[13px] h-[13px] bg-[#EB422F] rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_15px_#EB422F] z-20" />

                {/* Left/Right Container - Photo */}
                <div className={`w-full md:w-1/2 flex justify-center mt-10 ${edu.reverse ? "md:justify-start md:pl-12" : "md:justify-end md:pr-12"}`}>
                  <div className="w-full max-w-[25.6rem] aspect-auto md:aspect-[4/3] rounded-2xl overflow-hidden group relative">
                    {/* Default Image (sets container height naturally) */}
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:scale-110 group-hover:opacity-100"
                    />

                    {/* Hover Image (absolute overlay, fades in on hover) */}
                    {edu.hoverImage && (
                      <img
                        src={edu.hoverImage}
                        alt={`${edu.institution} real`}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                  </div>
                </div>

                {/* Left/Right Container - Details */}
                <div className={`w-full md:w-1/2 flex flex-col ${edu.reverse ? "md:pr-12 text-right md:items-end" : "md:pl-12 text-left md:items-start"}`}>
                  <h3 className="font-display text-2xl md:text-[1.8rem] font-bold mb-4 text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-lg md:text-[1.2rem] text-[#EB422F] font-medium mb-6">
                    {edu.specialization}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className={`flex items-center gap-3 text-white/90 text-[1rem] font-semibold ${edu.reverse ? "justify-end" : "justify-start"}`}>
                      {!edu.reverse && <GraduationCap className="w-5 h-5 text-[#F9C4BE]" />}
                      <span>{edu.institution}</span>
                      {edu.reverse && <GraduationCap className="w-5 h-5 text-[#F9C4BE]" />}
                    </div>

                    <div className={`flex items-center gap-3 text-white/50 text-[0.9rem] ${edu.reverse ? "justify-end" : "justify-start"}`}>
                      {!edu.reverse && <MapPin className="w-4 h-4" />}
                      <span>{edu.location}</span>
                      {edu.reverse && <MapPin className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md ${edu.reverse ? "md:self-end" : "md:self-start"}`}>
                    <Calendar className="w-3 h-3 text-[#F9C4BE]" />
                    <span className="text-[#F9C4BE] text-[11px] font-medium tracking-widest uppercase">
                      {edu.period}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;

