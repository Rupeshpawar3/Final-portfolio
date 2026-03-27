import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Lock } from "lucide-react";
import { ProjectData } from "@/data/projectsData";

interface HumanExeProjectProps {
  project: ProjectData;
}

const HumanExeProject = ({ project }: HumanExeProjectProps) => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] selection:bg-[#eb422f] selection:text-[#572000] overflow-x-hidden min-h-screen">
      <style>{`
        .vivid-gradient { background: linear-gradient(135deg, #ffb693 0%, #eb422f 100%); }
        .text-glow { text-shadow: 0 0 20px rgba(235, 66, 47, 0.3); }
      `}</style>

      {/* Top Navigation Bar */}
      <nav className="bg-neutral-950/60 backdrop-blur-xl w-full top-0 sticky z-50 shadow-[0px_20px_40px_rgba(255,107,0,0.08)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
          <Link
            to="/#work"
            state={{ skipIntro: true }}
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#eb422f] transition-colors font-bold font-sans uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>
      </nav>

      <main className="font-sans">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden bg-[#0e0e0e]">
          {/* Background Artwork */}
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              alt="Human.exe Background"
              src={project.hero}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/50 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eb422f]/10 border border-[#eb422f]/20 text-[#ffb693] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#eb422f] animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                  SYSTEM_SPEC: VR_PLATFORM | AI_GUIDANCE_MODULE
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter text-[#e5e2e1] leading-none mb-6">
                HUMAN.EXE <br /> <span className="text-[#eb422f] text-glow">RESTRICTED AGENCY.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#e2bfb0] max-w-xl leading-relaxed mb-10 font-light">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://youtu.be/cV6PNjBsxCc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vivid-gradient text-[#351000] font-display font-extrabold px-10 py-4 rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] uppercase tracking-widest inline-block"
                >
                  WATCH ON YOUTUBE
                </a>
                <a
                  href="#objective"
                  className="px-10 py-4 rounded-full border border-[#5a4136] hover:bg-[#2a2a2a] transition-all font-display font-bold uppercase tracking-widest inline-block text-[#e5e2e1]"
                >
                  EXPLORE MECHANICS
                </a>
              </div>
            </div>
            
            {/* Hero Foreground Card */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 vivid-gradient opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
              <div className="relative rounded-xl overflow-hidden border border-[#5a4136]/20 shadow-2xl">
                <img
                  className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                  alt="Feature showcase"
                  src={project.gallery[0]}
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-[#ffb693] uppercase tracking-widest font-bold mb-1">Status</p>
                      <p className="text-2xl font-display font-black">ACTIVE</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#e2bfb0] uppercase tracking-widest font-bold mb-1">Playtime</p>
                      <p className="font-mono text-lg font-bold">~ 30 MINS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Ticker */}
        <section className="bg-[#1c1b1b] border-y border-[#5a4136]/10 py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center md:text-left">
                <p className="text-[10px] text-[#eb422f] font-bold tracking-[0.3em] uppercase mb-2">LOGIC_FLOW</p>
                <p className="text-2xl font-display font-black">NODE_DECISION</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] text-[#eb422f] font-bold tracking-[0.3em] uppercase mb-2">GUIDANCE</p>
                <p className="text-2xl font-display font-black">AUDIO_NAV</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] text-[#eb422f] font-bold tracking-[0.3em] uppercase mb-2">PROGRESSION</p>
                <p className="text-2xl font-display font-black">LOCK_STATE</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] text-[#eb422f] font-bold tracking-[0.3em] uppercase mb-2">PLATFORM</p>
                <p className="text-2xl font-display font-black">META QUEST 3</p>
              </div>
            </div>
          </div>
        </section>

        {/* White Feature Block (Visual Contrast) */}
        <section id="objective" className="bg-[#e5e2e1] py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black font-display tracking-tighter text-[#131313] mb-8 leading-tight uppercase">
                  THE <br /> <span className="text-[#eb422f]">OBJECTIVE.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-lg bg-[#131313] flex items-center justify-center shrink-0">
                      <Gamepad2 className="text-[#ffb693] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#131313] font-bold text-lg mb-2">Branching Narrative Logic</h4>
                      <p className="text-[#353534] leading-relaxed">Small choices (food, clothing) create chain reactions. To force the player to negotiate obedience and frustration.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-lg bg-[#131313] flex items-center justify-center shrink-0">
                      <Lock className="text-[#ffb693] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#131313] font-bold text-lg mb-2">Compliance-Gated Progression</h4>
                      <p className="text-[#353534] leading-relaxed">Physics-based tasks are blocked until AI commands are obeyed. Players must choose between submitting to fate or awakening to rebellion.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0">
                <div className="aspect-square bg-[#1c1b1b] rounded-xl overflow-hidden shadow-2xl transform rotate-3 scale-95 transition-transform hover:rotate-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Abstract data flow"
                    src={project.gallery[1] || project.hero}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#131313] p-8 rounded-xl shadow-2xl max-w-sm border border-[#5a4136]/20">
                  <p className="text-[#e5e2e1] font-bold text-sm tracking-widest uppercase mb-2 text-[#ffb693]">TASK_LIST :: EVA_SYSTEM</p>
                  <p className="text-[#e2bfb0] text-sm leading-relaxed font-mono">
                    ▸ Here is your task list. <br/>
                    ▸ Click the task list button to expand it. <br/>
                    ▸ Completed tasks will be automatically marked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Gallery */}
        <section className="py-24 bg-[#131313]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <p className="text-[#ffb693] font-bold tracking-[0.4em] uppercase text-[10px] mb-2">The Collection</p>
                <h2 className="text-5xl font-black font-display tracking-tighter">THE OUTCOMES</h2>
              </div>
            </div>
            {/* Grid uses gallery[2], gallery[3], gallery[4] and cover */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px]">
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-xl group bg-black/50">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80"
                  alt="Submission"
                  src={project.gallery[2] || project.hero}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end transition-all">
                  <p className="text-[#ffb693] font-bold tracking-widest text-xs uppercase mb-1">Outcome 01</p>
                  <h3 className="text-3xl font-display font-black uppercase mb-2">Submission</h3>
                  <p className="text-[#e2bfb0] font-light max-w-sm">AI Victory. Efficient, safe, soulless.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl group bg-black/50">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80"
                  alt="Rebellion"
                  src={project.gallery[3] || project.hero}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-lg font-display font-black uppercase">Rebellion</h3>
                  <p className="text-xs text-[#e2bfb0]">Human Freedom.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl group bg-black/50">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80"
                  alt="Awakening"
                  src={project.gallery[4] || project.hero}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-lg font-display font-black uppercase">Awakening</h3>
                  <p className="text-xs text-[#e2bfb0]">Achieved by enduring.</p>
                </div>
              </div>
              <div className="md:col-span-2 relative overflow-hidden rounded-xl group bg-black/50">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80"
                  alt="Consequences"
                  src={project.hero}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-display font-black uppercase">Consequences</h3>
                  <p className="text-sm text-[#e2bfb0]">Every choice has weight. Chaotic, authentic.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Youtube / Gameplay Section replaces Newsletter */}
        <section className="py-24 bg-[#0e0e0e] relative overflow-hidden border-t border-white/5">
          <div className="absolute top-0 right-0 w-1/3 h-full vivid-gradient opacity-10 blur-[120px]"></div>
          <div className="max-w-6xl mx-auto px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tighter mb-4 uppercase">
                WATCH <span className="text-[#eb422f]">GAMEPLAY.</span>
              </h2>
              <p className="text-[#e2bfb0] text-lg font-light max-w-2xl mx-auto">
                Witness the immersive VR experience and branching narrative from Meta Quest 3.
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(255,107,0,0.15)] border border-[#ffb693]/20 aspect-video bg-black">
              <iframe 
                src="https://www.youtube.com/embed/cV6PNjBsxCc"
                title="Human.exe Gameplay"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 w-full py-12 border-t border-neutral-800/20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-neutral-500 font-sans text-sm tracking-widest uppercase">
            Rupesh Pawar © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HumanExeProject;
