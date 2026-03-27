import React from 'react';
import { motion } from 'framer-motion';

interface BouncyCardViewerProps {
  images: string[];
}

const BouncyCardViewer: React.FC<BouncyCardViewerProps> = ({ images }) => {
  // Limit to 5 images for the ideal fanned hand effect
  const displayImages = images.slice(0, 5); 
  const middleIndex = Math.floor(displayImages.length / 2);

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center py-10 mt-8 mb-12">
      {displayImages.map((src, index) => {
        const offset = index - middleIndex;
        // Calculate the curved fanned resting state values
        const rotation = offset * 12; // 12 degrees curve per card
        const xOffset = offset * 130;  // 130px horizontal spread
        const yOffset = Math.abs(offset) * 20; // Pushes outer cards further down to fake an energetic arc
        const zIndex = 20 - Math.abs(offset); // Center card sits at the very top

        return (
          <motion.div
            key={index}
            // Classic white borders identical to the requested reference image
            className="absolute overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-[8px] border-white cursor-pointer origin-bottom"
            style={{
              width: '280px',
              height: '380px',
              borderRadius: '24px',
              zIndex,
            }}
            initial={{ opacity: 0, y: yOffset + 100 }}
            animate={{ opacity: 1, rotate: rotation, x: xOffset, y: yOffset }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 * index },
              y: { type: "spring", stiffness: 200, damping: 20, delay: 0.1 * index },
              default: { type: "spring", stiffness: 300, damping: 20 }
            }}
            whileHover={{
              rotate: 0,
              y: -50,
              scale: 1.08,
              zIndex: 50,
              boxShadow: "0px 35px 60px -15px rgba(0, 0, 0, 0.8)",
              transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
          >
            <img 
              src={src} 
              alt={`Artwork sample ${index + 1}`} 
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default BouncyCardViewer;
