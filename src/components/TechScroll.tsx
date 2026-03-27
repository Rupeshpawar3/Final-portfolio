import { useRef, useEffect, useCallback } from "react";

const TECH_ROW_1 = [
  "OpenAI API", "Unity 3D", "Unreal Engine", "AR Foundation",
  "XR Interaction Toolkit", "OpenXR", "Oculus SDK", "Blender",
  "Autodesk Maya", "Figma",
];

const TECH_ROW_3 = [
  "Midjourney", "TensorFlow", "Gemini", "Copilot", "Cursor",
  "WebXR", "Mapbox", "Git", "Sketch", "Adobe Photoshop",
  "Adobe Illustrator", "Adobe Creative Suite", "After Effects",
  "Premiere Pro", "DaVinci Resolve", "ChatGPT", "Claude",
];

const Separator = () => (
  <span className="text-white/20 mx-4 select-none" aria-hidden>•</span>
);

const TextRow = ({ items, baseDur }: { items: string[]; baseDur: number }) => {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex items-center w-fit whitespace-nowrap tech-scroll-left"
        style={{ animationDuration: `${baseDur}s` }}
      >
        {repeated.map((tech, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-white font-display font-bold text-[clamp(14px,1.8vw,22px)] tracking-wide uppercase hover:text-[#EB422F] transition-colors duration-300 cursor-default">
              {tech}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
};

const ImageRow = ({ baseDur }: { baseDur: number }) => {
  const repeated = [...Array(8)];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex items-center w-fit whitespace-nowrap tech-scroll-right"
        style={{ animationDuration: `${baseDur}s` }}
      >
        {repeated.map((_, i) => (
          <img
            key={i}
            src="/assets/tech-scroll-3.avif"
            alt="Tech Stack"
            className="h-[98px] md:h-[130px] w-auto object-contain max-w-none shrink-0 -ml-12 first:ml-0 brightness-[0.65] hover:brightness-100 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

const TechScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const targetSpeed = useRef(1);
  const currentSpeed = useRef(1);
  const rafId = useRef(0);

  const updatePlaybackRate = useCallback(() => {
    if (!sectionRef.current) return;
    // Get all animating elements and set their playbackRate directly
    const els = sectionRef.current.querySelectorAll<HTMLElement>('.tech-scroll-left, .tech-scroll-right');
    els.forEach(el => {
      const anims = el.getAnimations();
      anims.forEach(a => {
        a.playbackRate = currentSpeed.current;
      });
    });
  }, []);

  useEffect(() => {
    let decayTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY.current);
      lastScrollY.current = window.scrollY;

      // Boost speed (same direction always), cap at 6x
      targetSpeed.current = Math.min(1 + delta * 0.15, 6);

      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        targetSpeed.current = 1;
      }, 200);
    };

    // Smooth lerp loop via rAF — no React re-renders needed
    const tick = () => {
      const lerp = 0.04;
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * lerp;
      updatePlaybackRate();
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
      clearTimeout(decayTimer);
    };
  }, [updatePlaybackRate]);

  return (
    <section ref={sectionRef} className="py-16 bg-background overflow-hidden border-y border-white/5">
      <style>{`
        .tech-scroll-left {
          animation: scroll-left 360s linear infinite;
        }
        .tech-scroll-right {
          animation: scroll-right 240s linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="relative w-full flex flex-col gap-4">
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Row 1 - Text always scrolling left */}
        <TextRow items={TECH_ROW_1} baseDur={360} />

        {/* Row 2 - Image always scrolling right */}
        <ImageRow baseDur={240} />

        {/* Row 3 - Text always scrolling left */}
        <TextRow items={TECH_ROW_3} baseDur={360} />
      </div>
    </section>
  );
};

export default TechScroll;
