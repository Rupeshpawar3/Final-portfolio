import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/data/projectsData";
import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface UiUxProjectProps {
  project: ProjectData;
}

const PDF_LINKS = [
  "https://drive.google.com/file/d/1E35WgOACiVNcDWUyJbGFdPsuy8_Ry1qq/preview",
  "https://drive.google.com/file/d/1NuTcBOTy6lNKAgnGa2Peyqah7hsRmXaE/preview",
  "https://drive.google.com/file/d/1pg1wEOpMRlcUR1wpvFHImN4uiT4X67dE/preview",
  "https://drive.google.com/file/d/1gfQOzifwDBnAE92YgJBr-At1rImgEcix/preview",
  "https://drive.google.com/file/d/1NUBIl7rVW6Ffke_uSntnIxE2dC7tXulc/preview",
  "https://drive.google.com/file/d/1BiDc1GhkXg5HxKNnQTpL6vBliYQnF9DL/preview"
];

const UX_PROCESS = [
  { 
    title: "User Discovery", 
    desc: "Target audience telemetry, competitive intel, and accurate pain point identification to establish a solid product foundation." 
  },
  { 
    title: "Information Architecture", 
    desc: "Structuring content hierarchies, data workflows, and wireframing navigation paths for intuitive user journeys." 
  },
  { 
    title: "Design Systems", 
    desc: "Compiling robust typography scales, dynamic component libraries, and visual parameters that scale seamlessly." 
  },
  { 
    title: "Interactive Prototyping", 
    desc: "Assembling high-fidelity mockups with dynamic micro-interactions that closely mirror the final coded experience." 
  },
  { 
    title: "Usability Testing", 
    desc: "Observing real-time user combat telemetry to refine interface metrics and validate core design decisions." 
  },
  { 
    title: "Developer Handoff", 
    desc: "Deploying pixel-perfect design specs and calibrated assets to ensure effortless integration with engineering teams." 
  }
];

const UiUxProject = ({ project }: UiUxProjectProps) => {
  return (
    <div className="bg-[#101010] text-[#E0E0E0] font-sans min-h-screen selection:bg-[#F95222] selection:text-white relative overflow-hidden">
      
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[1px] bg-[#F95222] transform -rotate-45" />
        <div className="absolute top-[30%] right-[10%] w-[800px] h-[1px] bg-[#F95222] transform rotate-12" />
        <div className="absolute bottom-[20%] left-[-10%] w-[1000px] h-[1px] bg-[#F95222] transform rotate-12" />
        
        {/* Subtle dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Top Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-[#101010] to-transparent pointer-events-none">
        <Link
          to="/#work"
          state={{ skipIntro: true }}
          className="pointer-events-auto inline-flex items-center gap-2 text-white/50 hover:text-[#F95222] transition-colors font-semibold uppercase tracking-[0.1em] text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </nav>

      {/* Vertical Side Text */}
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 origin-right rotate-90 z-0">
        <p className="font-display font-black text-[5vw] text-white/[0.03] uppercase tracking-tighter whitespace-nowrap select-none">
          STRUCTURED COMMUNICATION
        </p>
      </div>

      {/* HERO SECTION - Ultra Modern */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 z-10 border-b border-white/5 overflow-hidden">
        
        {/* Empty Background as requested */}
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
          {/* Subtle grid to keep it ultra modern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-20">
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#F95222] font-semibold tracking-widest uppercase text-xs mb-6 flex items-center justify-center gap-4 drop-shadow-md"
          >
            <span className="w-8 h-[1px] bg-[#F95222]" />
            THE DIGITAL NETWORK
            <span className="w-8 h-[1px] bg-[#F95222]" />
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black font-display tracking-tight text-white leading-[0.9] mb-4 uppercase drop-shadow-2xl"
          >
            UI/UX DESIGN
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light font-display tracking-tight text-[#8A8F98] leading-none mb-10 uppercase drop-shadow-2xl"
          >
            & DEVELOPMENT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#A1A1AA] max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed drop-shadow-2xl bg-black/20 p-6 rounded-3xl border border-white/5 backdrop-blur-sm"
          >
            Building the most versatile, powerful, and scalable interfaces for complex platforms, ensuring a seamless connection between functionality and human experience.
          </motion.p>
        </div>
      </section>

      {/* PHASE 01: METHODOLOGY (Chirp Aesthetic with Sticky Stacking Cards) */}
      <section className="relative w-full py-32 z-10 px-8 md:px-16" id="methodology">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative">
          
          {/* Sticky Left Sidebar */}
          <div className="w-full lg:w-1/3 text-left lg:sticky top-[15vh] self-start">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-6 uppercase">
              THE DESIGN NETWORK
            </h2>
            <p className="text-[#8A8F98] text-base font-light leading-relaxed mb-8">
              My structured approach ensures every interface is optimized for cognitive ease, usability, and scale. Every stage is connected sequentially, dynamically stacking to build the ultimate final product.
            </p>
          </div>

          {/* Stacking Cards Container using proper ScrollStack */}
          <div className="w-full lg:w-2/3 relative h-auto">
            <ScrollStack 
              itemDistance={50} 
              itemScale={0} 
              baseScale={1}
              itemStackDistance={20}
              useWindowScroll={true} 
              stackPosition="15%" 
              scaleEndPosition="5%"
              blurAmount={0}
            >
              {UX_PROCESS.map((service, idx) => (
                <ScrollStackItem 
                  key={idx} 
                  itemClassName="w-full"
                >
                  <div 
                    className="flex border border-white/5 bg-[#121416] rounded-[24px] p-6 md:px-10 md:py-8 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden w-full relative"
                    style={{ borderTop: `4px solid ${['#4F46E5', '#EC4899', '#F95222', '#10B981', '#3B82F6', '#8B5CF6'][idx]}` }}
                  >
                    {/* Decorative background element inside card */}
                    <div className="absolute top-0 right-0 w-[45%] h-full bg-[#181A1C] border-l border-white/5 transform skew-x-12 translate-x-1/4 pointer-events-none" />
                    
                    <div className="flex items-start gap-8 relative z-10 w-full">
                      {/* Enormous faded number on the left */}
                      <div className="text-5xl md:text-6xl font-black text-white/10 font-display drop-shadow-md shrink-0">
                        0{idx + 1}
                      </div>
                      
                      {/* Text content next to it */}
                      <div className="flex flex-col justify-center pt-1 md:pt-2">
                        <h3 className="font-bold text-xl md:text-2xl text-white tracking-widest uppercase font-display mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm md:text-md text-[#8A8F98] font-light leading-relaxed max-w-lg">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </section>

      {/* PHASE 02: THE CASE STUDIES (Bento Box style) */}
      <section className="relative w-full py-24 z-10 px-8 md:px-16 bg-[#0B0C0E] border-t border-white/5 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-4 uppercase">
                SUSTAINABLE RESEARCH
              </h2>
              <p className="text-[#8A8F98] text-base font-light">
                Deep-dive case studies covering functional diagrams, problem-solving narratives, and extensive documentation of complex interactive properties.
              </p>
            </div>
            <motion.button 
              className="px-8 py-3 rounded-full border border-[#F95222] text-[#F95222] text-sm font-semibold tracking-wide hover:bg-[#F95222] hover:text-[#101010] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze Data
            </motion.button>
          </div>

          <div className="flex flex-col gap-6 w-full">
            {/* Split PDFs into two rows of 3 for desktop flex accordion */}
            {[0, 1].map((rowIndex) => (
              <div key={rowIndex} className="flex flex-col lg:flex-row gap-6 w-full h-auto lg:h-[600px]">
                {[0, 1, 2].map((colIndex) => {
                  const idx = rowIndex * 3 + colIndex;
                  const pdf = PDF_LINKS[idx];
                  if (!pdf) return null;

                  return (
                    <motion.div
                      key={idx}
                      className="group relative bg-[#121416] rounded-[24px] border border-white/5 hover:border-white/20 shadow-2xl overflow-hidden flex-1 transition-[flex,height,border-color] duration-800 ease-out-quint hover:flex-[2.5] h-[180px] hover:h-[500px] lg:h-full lg:hover:h-full"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                    >
                      {/* PDF Expanding Container */}
                      <div className="absolute inset-2 z-10 pointer-events-none group-hover:pointer-events-auto">
                        <div className="w-full h-full rounded-[16px] overflow-hidden relative bg-[#0A0A0A] border border-white/5 shadow-inner">
                          <iframe 
                            src={pdf} 
                            className="absolute -top-[56px] left-0 w-full h-[calc(100%+56px)] border-0 transition-opacity duration-300 opacity-90 group-hover:opacity-100"
                            allow="autoplay"
                            title={`UX Case Study ${idx + 1}`}
                          />
                          
                          {/* Dark gradient overlay for title contrast, disappears on hover */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent h-40 pointer-events-none group-hover:opacity-0 transition-opacity duration-800"></div>
                        </div>
                      </div>

                      {/* Floating Title Overlay */}
                      <div className="absolute top-8 left-8 z-20 pointer-events-none transition-all duration-800 group-hover:opacity-0 group-hover:-translate-y-4">
                        <h3 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-nowrap">
                          EXPAND DOC 0{idx + 1}
                        </h3>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE 03: INTERACTIVE SHOWCASE (Clean Container) */}
      <section className="relative w-full py-32 z-10 px-8 md:px-16" id="video-showcase">
        <div className="max-w-7xl mx-auto flex flex-col bg-[#1A1C1E] rounded-[40px] p-8 md:p-14 border border-white/5 shadow-2xl relative overflow-hidden">
          
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-[#F95222] font-semibold tracking-widest uppercase text-sm mb-4 flex items-center justify-center md:justify-start gap-4">
              <span className="w-6 h-[1px] bg-[#F95222]" />
              THE FINAL OUTPUT
            </h2>
            <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-4 uppercase">
              INTERACTIVE SHOWCASE
            </h3>
            <p className="text-[#8A8F98] text-base font-light max-w-2xl">
              Visual proof of concept. From wireframe to high-fidelity implementation, capturing the fluidity and precision of the interactive elements.
            </p>
          </div>
          
          <div className="relative w-full overflow-hidden rounded-[24px] border border-white/10 aspect-video bg-[#0B0C0E] shadow-xl">
            <iframe 
              src="https://www.youtube.com/embed/ZBPLxA7jhhk"
              title="UI/UX Showcase Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] w-full py-12 border-t border-white/5 text-center relative z-10 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A8F98] text-sm tracking-widest uppercase">
            Rupesh Pawar © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UiUxProject;
