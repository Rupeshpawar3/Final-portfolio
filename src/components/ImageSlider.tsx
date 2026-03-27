import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: string[];
  projectTitle: string;
}

const ImageSlider = ({ images, projectTitle }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  // Determine which images to show. We want a "window" around the current index.
  // Actually, for Cover Flow, we can render all of them absolutely positioned, 
  // and their position/scale depends on distance from center.
  // But to handle looping nicely or large sets, we might want to just render a few.
  // Given the small gallery size (4-9), rendering all is fine.

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible perspective-1000">

      {/* 3D Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
        {images.map((img, index) => {
          // Calculate distance from current index
          // Handle wrapping logic for calculations (?) 
          // Simple linear for now as typically galleries aren't infinite loop visual in this style easily without dupes.
          // Let's stick to linear center focus.

          let offset = index - currentIndex;

          // Basic visibility culling if needed, but not for < 10 items
          if (Math.abs(offset) > 2) {
            // Optional: Hide far items or keep them small
            // return null; 
          }

          const isActive = index === currentIndex;

          return (
            <motion.div
              key={index}
              className="absolute w-[300px] h-[400px] rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 bg-black/50 backdrop-blur-sm"
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={false}
              animate={{
                x: offset * 220, // Spread distance
                scale: isActive ? 1.2 : 0.8,
                rotateY: offset * -25, // Rotate towards center
                zIndex: 100 - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                filter: isActive ? 'brightness(1.1)' : 'brightness(0.6) blur(2px)',
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              onClick={() => setCurrentIndex(index)}
            >
              {img.endsWith(".mp4") ? (
                <video
                  src={img}
                  className="w-full h-full object-cover"
                  autoPlay={isActive}
                  muted
                  loop
                  controls={isActive}
                />
              ) : (
                <img
                  src={img}
                  alt={`${projectTitle} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Reflection effect (optional, simplified) */}
              <div className="absolute top-full left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-30 transform scale-y-[-1]" />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-10 z-50 p-4 glass-panel rounded-full hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-10 z-50 p-4 glass-panel rounded-full hover:bg-white/10 transition-colors"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 flex gap-2 z-50">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "w-6 bg-primary" : "bg-white/30"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
