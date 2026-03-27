import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

interface InfiniteCircleViewerProps {
  imageIds: string[];
}

const InfiniteCircleViewer: React.FC<InfiniteCircleViewerProps> = ({ imageIds }) => {
  const displayImages = imageIds.slice(0, 8);
  const numImages = displayImages.length;
  const radius = 350; 
  
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  // Calculates to exactly match the previous `duration: 45` for 360 degrees
  const baseSpeed = -8; 
  const velocity = useRef(baseSpeed); 

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      // Smoothly drift back to base continuous speed after user flicks it
      const targetSpeed = velocity.current > 0 ? -baseSpeed : baseSpeed;
      velocity.current += (targetSpeed - velocity.current) * 0.05; 
      const moveBy = velocity.current * (delta / 1000);
      rotation.set(rotation.get() + moveBy);
    }
  });

  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (event: any, info: any) => {
    // Spin the carousel purely based on the cursor's X movement
    rotation.set(rotation.get() + info.delta.x * 0.4);
    velocity.current = info.velocity.x * 0.15;
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full flex items-center justify-center py-20 overflow-hidden relative" style={{ perspective: '1200px', height: '550px' }}>
      {/* Invisible overlay catching pan (drag) gestures across the entire block */}
      <motion.div 
        className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'none' }}
      />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="relative w-[260px] h-[340px]"
        style={{ 
          transformStyle: 'preserve-3d',
          rotateY: rotation 
        }}
      >
        {displayImages.map((id, index) => {
          const angle = (360 / numImages) * index;
          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/5 bg-black/50 backdrop-blur-md"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="w-full h-full bg-black/80">
                <img
                  src={`https://drive.google.com/thumbnail?id=${id}&sz=w1000`}
                  alt={`Project asset ${index + 1}`}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity pointer-events-none select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteCircleViewer;
