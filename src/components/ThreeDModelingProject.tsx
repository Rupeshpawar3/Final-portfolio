import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowLeft, X } from "lucide-react";
import { ProjectData } from "@/data/projectsData";

interface ThreeDModelingProjectProps {
  project: ProjectData;
}

const ThreeDModelingProject = ({ project }: ThreeDModelingProjectProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[#050505] min-h-screen text-[#E5E5E5] font-sans selection:bg-[#E50914] selection:text-white">
      
      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          >
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition group flex items-center gap-2"
            >
              <span className="text-sm tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(229,9,20,0.3)]">
              <iframe 
                src="https://www.youtube.com/embed/mPvRlWO5dX0?autoplay=1"
                title="3D Modeling Showcase Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Link
          to="/#work"
          state={{ skipIntro: true }}
          className="pointer-events-auto inline-flex items-center gap-2 text-white/80 hover:text-[#E50914] transition-colors font-bold uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>
      </nav>

      {/* Hero Section Container */}
      <div className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden flex items-center">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.hero} 
            alt="3D Modeling Hero" 
            className="w-full h-full object-cover transform scale-105"
          />
          {/* Netflix Gradients: Dark bottom, dark top, slight red bleed */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#E50914]/10 mix-blend-multiply z-10" />
          <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] via-[#150202] to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full px-6 md:px-16 pt-20 max-w-7xl mx-auto flex flex-col justify-end h-full pb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h2 className="text-white text-5xl md:text-7xl font-black mb-4 tracking-tight drop-shadow-2xl">
              {project.title}
            </h2>
            
            <div className="flex items-center gap-4 text-white/80 font-bold mb-6 text-sm">
              <span className="text-green-500">98% Match</span>
              <span>{project.year}</span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-xs text-white/60">16+</span>
              <span>{project.gallery.length} Renders</span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-xs text-white/60">4K Ultra HD</span>
            </div>
            
            <p className="text-white/90 text-lg md:text-xl font-medium mb-8 leading-snug drop-shadow-lg text-justify">
              When a young artist vanishes into the viewport, an incredible world uncovers a mystery involving Blender mechanics, terrifying realistic environments and one strange masterpiece.
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded flex items-center gap-3 font-bold text-lg hover:bg-white/80 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <Play className="w-6 h-6 fill-black" />
                Play
              </button>
              <button className="bg-zinc-500/50 text-white px-6 md:px-8 py-2 md:py-3 rounded flex items-center gap-3 font-bold text-lg hover:bg-zinc-500/70 transition backdrop-blur-md border border-white/10">
                More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chapters / Episodes Layout */}
      <div className="w-full relative z-20 pb-32 bg-[#050505]">
        
        {/* Glow Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_20px_#E50914] opacity-50 my-16" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-32">
          
          {/* Chapter 01: Environment Modeling (Left text, Right Image) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
            <div className="w-full lg:w-5/12 z-20 sticky top-1/3">
              <div className="flex items-end gap-6 mb-6">
                <span className="text-white/80 font-bold text-xl uppercase tracking-widest">Chapter</span>
                <span className="text-white font-black text-6xl md:text-8xl leading-none">01</span>
              </div>
              <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 text-justify">
                {project.description} Utilizing robust geometry flows and advanced PBR texturing techniques to establish believable, interactive spaces within Blender and Maya. Warning: Contains graphic realism.
              </p>
              
              {/* Progress Bar / Sub-tabs */}
              <div className="flex items-center gap-6 mt-8 border border-white/20 p-4 rounded bg-black/40 backdrop-blur-md">
                <div className="relative group cursor-pointer">
                  <span className="text-white/60 font-bold text-sm uppercase tracking-wider group-hover:text-white transition">Beginning</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-white hidden group-hover:block" />
                </div>
                <div className="relative group cursor-pointer">
                  <span className="text-[#E50914] font-bold text-sm uppercase tracking-wider">Blender</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#E50914]" />
                </div>
                <div className="relative group cursor-pointer">
                  <span className="text-white/60 font-bold text-sm uppercase tracking-wider group-hover:text-white transition">Maya</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-white hidden group-hover:block" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 relative">
              {/* Neon Structure Lines */}
              <div className="hidden lg:block absolute -top-8 -left-8 w-full h-full border border-[#E50914] opacity-80 shadow-[0_0_15px_#E50914] pointer-events-none" />
              <div className="hidden lg:block absolute -top-12 -right-12 w-24 h-24 border border-t-[#E50914] border-r-[#E50914] border-l-transparent border-b-transparent rotate-45 opacity-60 shadow-[0_0_10px_#E50914]" />
              
              <div className="relative aspect-video rounded overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
                <img src={project.gallery[0]} alt="Environment Modeling" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                
                {/* Netflix overlays on image */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded flex items-center justify-center text-[#E50914] font-bold text-xs">
                  N
                </div>
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-white font-bold text-sm drop-shadow-md">3D Modeling</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-white font-serif font-bold text-4xl md:text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-center opacity-90 group-hover:opacity-100 transition-opacity">
                    Environment <br/> Design
                  </h3>
                </div>
                <div className="absolute bottom-4 left-4 z-10 bg-[#E50914] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(229,9,20,0.8)]">
                   ◀ Return
                </div>
              </div>
            </div>
          </div>

          {/* Glow Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_20px_#E50914] opacity-50 relative">
             <div className="absolute -top-4 left-[10%] w-8 h-8 border border-white/10 rotate-45 opacity-50" />
          </div>

          {/* Chapter 02: Animation (Right text, Left Image) */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative">
            <div className="w-full lg:w-7/12 relative">
              {/* Neon Structure Lines */}
              <div className="hidden lg:block absolute -bottom-8 -right-8 w-full h-full border border-[#E50914] opacity-80 shadow-[0_0_15px_#E50914] pointer-events-none" />
              <div className="hidden lg:block absolute top-[20%] -left-16 w-32 h-32 border border-b-[#E50914] border-l-[#E50914] border-r-transparent border-t-transparent rotate-12 opacity-40" />

              <div className="relative aspect-video rounded overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
                <img src={project.gallery[1] || project.gallery[0]} alt="Animation Modeling" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                
                {/* Netflix overlays on image */}
                <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-black/50 rounded flex items-center justify-center text-[#E50914] font-bold text-xs">
                  N
                </div>
                <div className="absolute top-6 right-6 z-10">
                  <span className="text-white font-bold text-sm drop-shadow-md">3D Modeling</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
                  <h3 className="text-white font-serif font-bold text-4xl md:text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-left w-full translate-y-12 opacity-90 group-hover:opacity-100 transition-opacity">
                    Dynamic <br/> Animation
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4 z-10 bg-transparent border-2 border-[#E50914] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-[#E50914] transition shadow-[0_0_10px_rgba(229,9,20,0.4)]">
                   ◀ Return
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12 z-20 sticky top-1/3">
              <div className="flex items-end gap-6 mb-6">
                <span className="text-white/80 font-bold text-xl uppercase tracking-widest">Chapter</span>
                <span className="text-white font-black text-6xl md:text-8xl leading-none">02</span>
              </div>
              <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 text-justify">
                I do dynamic animation and post-processing using After Effects. A plane brings the pipeline to life — orchestrating keyframes, particle physics, and fluid motion tracking. The viewport never tells the whole story until rendered.
              </p>
              
              {/* Progress Bar / Sub-tabs */}
              <div className="flex items-center gap-6 mt-8 border border-white/20 p-4 rounded bg-black/40 backdrop-blur-md">
                <div className="relative group cursor-pointer">
                  <span className="text-white/60 font-bold text-sm uppercase tracking-wider group-hover:text-white transition">Rigging</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-white hidden group-hover:block" />
                </div>
                <div className="relative group cursor-pointer">
                  <span className="text-[#E50914] font-bold text-sm uppercase tracking-wider">After Fx</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#E50914]" />
                </div>
                <div className="relative group cursor-pointer">
                  <span className="text-white/60 font-bold text-sm uppercase tracking-wider group-hover:text-white transition">Render</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-white hidden group-hover:block" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_20px_#E50914] opacity-50 relative" />

          {/* Chapter 03: Video Reel (Left text, Right Video) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
            <div className="w-full lg:w-5/12 z-20 sticky top-1/3">
              <div className="flex items-end gap-6 mb-6">
                <span className="text-white/80 font-bold text-xl uppercase tracking-widest">Chapter</span>
                <span className="text-white font-black text-6xl md:text-8xl leading-none">03</span>
              </div>
              <p className="text-white/80 text-lg font-medium leading-relaxed mb-8 text-justify">
                A cinematic reel showcasing the complete 3D modeling pipeline—from raw geometry to the final textured, lit, and fully animated render output.
              </p>
              
              <div className="flex items-center gap-6 mt-8 border border-white/20 p-4 rounded bg-black/40 backdrop-blur-md">
                <div className="relative group cursor-pointer border px-4 py-1.5 rounded border-[#E50914] text-white hover:bg-[#E50914] transition text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(229,9,20,0.5)] flex items-center gap-2">
                  <Play className="w-4 h-4 fill-white" /> Watch Full Reel
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 relative">
              {/* Neon Structure Lines */}
              <div className="hidden lg:block absolute -top-8 -left-8 w-full h-full border border-[#E50914] opacity-80 shadow-[0_0_15px_#E50914] pointer-events-none z-0" />
              
              <div className="relative aspect-video rounded overflow-hidden shadow-[0_0_30px_rgba(229,9,20,0.4)] group border border-[#E50914]/50 z-10 bg-black">
                <iframe 
                  src="https://www.youtube.com/embed/mPvRlWO5dX0"
                  title="3D Modeling Showcase Video"
                  className="w-full h-full border-0 absolute top-0 left-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                
                {/* Netflix overlays on iframe container (pointer events none) */}
                <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/80 rounded flex items-center justify-center text-[#E50914] font-bold text-xs pointer-events-none">
                  N
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_20px_#E50914] opacity-50 relative" />

          {/* More Like This Grid */}
          <div className="w-full">
            <h3 className="text-white/80 font-bold text-xl mb-6">More 3D Render Models</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.gallery.slice(2).concat(project.gallery).slice(0, 6).map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded overflow-hidden group cursor-pointer border border-white/10 hover:border-white/30 transition">
                  <img src={img} alt={`Gallery Render ${idx}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                     <Play className="w-10 h-10 text-white border-2 border-white rounded-full p-2" />
                  </div>
                  {/* Fake Netflix top-left N */}
                  {idx % 3 === 0 && (
                    <div className="absolute top-2 left-2 z-10 w-4 h-4 bg-black/50 rounded flex items-center justify-center text-[#E50914] font-bold" style={{ fontSize: '8px' }}>N</div>
                  )}
                  {/* Fake "New Episodes" badge */}
                  {idx === 1 && (
                    <div className="absolute bottom-2 left-0 bg-[#E50914] text-white px-2 py-0.5 text-[10px] font-bold">
                      NEW RENDER
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-16 text-zinc-500 text-sm font-medium border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            Rupesh Pawar © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThreeDModelingProject;
