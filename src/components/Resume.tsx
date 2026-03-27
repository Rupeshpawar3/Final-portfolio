import { Download } from "lucide-react";

const Resume = () => {
  return (
    <section id="resume" className="py-16 bg-background">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">

          {/* Rotating Border Container */}
          <div className="relative group rounded-2xl p-[2px] overflow-hidden">

            {/* The Rotating Gradient - simplified spinning conic gradient */}
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#BE2413_0%,#EB422F_50%,#BE2413_100%)]" />

            {/* Main Content Card - Sits on top */}
            <div className="relative rounded-2xl bg-black p-12 h-full w-full border border-white/10 shadow-xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
                <span className="gradient-text">Download My Resume</span>
              </h2>
              <a
                href="/rupesh_resume_2026_v2.pdf"
                download="Rupesh_Resume_2026_v2.pdf"
                className="inline-flex items-center gap-3 px-12 py-4 rounded-[25px] font-semibold text-lg text-white bg-[#050505] shadow-[0_10px_30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.5)] hover:translate-y-[2px]"
              >
                <Download className="w-5 h-5" />
                Resume
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;

