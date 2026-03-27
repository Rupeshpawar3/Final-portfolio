import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProjectData } from "@/data/projectsData";
import BouncyCardViewer from "@/components/BouncyCardViewer";
import { motion } from "framer-motion";

interface DigitalArtProjectProps {
  project: ProjectData;
}

const DigitalArtProject = ({ project }: DigitalArtProjectProps) => {
  const scrollImages = project.illustrationImageIds || [];
  // Duplicate for seamless infinite scroll
  const marqueeItems = [...scrollImages, ...scrollImages];

  return (
    <div className="bg-[#120F0E] text-[#E8DCCB] font-sans overflow-x-hidden min-h-screen selection:bg-[#D34324] selection:text-white">
      <style>{`
        .sudden-gradient { background: linear-gradient(135deg, #D34324 0%, #8A2411 100%); }
        .text-ember { text-shadow: 0 0 20px rgba(211, 67, 36, 0.6); }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scrollLeft 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link
          to="/#work"
          state={{ skipIntro: true }}
          className="inline-flex items-center gap-2 text-white/70 hover:text-[#D34324] transition-colors font-bold uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden bg-black">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.hero}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120F0E]/40 via-transparent to-[#120F0E] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none mix-blend-screen" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D34324] font-bold tracking-[0.4em] uppercase text-sm mb-4"
          >
            포트폴리오 2026 시즌
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black font-display tracking-tighter text-white mb-2"
          >
            DIGITAL ART &
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black font-display tracking-tighter text-[#E8DCCB] text-ember mb-12 italic"
          >
            ILLUSTRATION SERIES
          </motion.h1>

          {/* Bouncy Card Viewer Embedded in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full max-w-5xl relative z-20 mt-10 filter drop-shadow-[0_20px_50px_rgba(211,67,36,0.2)]"
          >
            <BouncyCardViewer images={project.gallery} />
          </motion.div>
        </div>
      </section>

      {/* PHASE 01: DIGITAL ART (PDF Embed) */}
      <section className="relative w-full py-24 bg-[#1A1615] border-t border-[#D34324]/20 border-b">
        <div className="max-w-7xl mx-auto px-8 mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-4 uppercase">
            <span className="text-[#D34324]">PHASE 01.</span> DIGITAL ART
          </h2>
          <p className="text-[#E8DCCB]/60 max-w-2xl mx-auto font-light mb-12">
            An endless showcase of creative sketches, concepts, and exploratory digital artwork driving the visual development.
          </p>

          {/* Embedded PDF Viewer */}
          {project.embedPdf && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#D34324]/20 h-[75vh] min-h-[600px] shadow-[0_0_30px_rgba(211,67,36,0.15)] bg-black">
              <iframe 
                src={project.embedPdf} 
                className="absolute -top-[56px] left-0 w-full h-[calc(100%+56px)] border-0"
                allow="autoplay"
                title="PDF Document Viewer"
              ></iframe>
            </div>
          )}
        </div>
      </section>

      {/* PHASE 02: THE ILLUSTRATIONS */}
      <section className="relative w-full py-24 bg-gradient-to-b from-[#120F0E] to-[#1A1615]">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-4 uppercase">
            <span className="text-[#D34324]">PHASE 02.</span> ILLUSTRATION SECTION
          </h2>
          <p className="text-[#E8DCCB]/60 max-w-2xl mx-auto font-light mb-12">
            High-fidelity artwork and animated processes leading to final visual compositions.
          </p>

          {/* Small GIF Showcase */}
          <div className="mx-auto w-full max-w-sm relative mb-16">
            <div className="absolute inset-0 bg-[#D34324] opacity-20 blur-2xl transform rotate-3"></div>
            <div className="relative rounded-lg border border-[#D34324]/30 overflow-hidden bg-black shadow-2xl p-1">
              <img
                src="/illustration.gif"
                alt="Process Animation GIF"
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Seamless Infinite Scroll Marquee */}
        {scrollImages.length > 0 && (
          <div className="w-full relative overflow-hidden bg-black/40 py-8 border-y border-white/5">
            {/* Left and right fade gradient */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#1A1615] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#1A1615] to-transparent z-10 pointer-events-none" />
            
            <div className="animate-scroll">
              {marqueeItems.map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  className="w-[280px] md:w-[400px] h-[200px] md:h-[280px] flex-shrink-0 mx-4 relative overflow-hidden rounded-xl border-2 border-[#D34324]/10 group hover:border-[#D34324]/50 transition-colors shadow-2xl bg-black"
                >
                  <img
                    src={`https://drive.google.com/thumbnail?id=${id}&sz=w1000`}
                    alt={`Illustration artwork ${index}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out brightness-75"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#D34324] font-bold text-xs tracking-widest uppercase">ASSET // {index % scrollImages.length + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] w-full py-12 border-t border-[#D34324]/20 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-[#E8DCCB]/40 text-sm tracking-widest uppercase">
            Rupesh Pawar © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DigitalArtProject;
