import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const triggerPageTransition = (callback: () => void) => {
  window.dispatchEvent(new CustomEvent('page-transition', { detail: { callback } }));
};

const PageTransition = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');
  const [gridSize, setGridSize] = useState({ cols: 20, rows: 15 });

  useEffect(() => {
    const updateGrid = () => {
      const cols = window.innerWidth > 768 ? 20 : 10;
      const boxSize = window.innerWidth / cols;
      const rows = Math.ceil(window.innerHeight / boxSize) + 1;
      setGridSize({ cols, rows });
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  useEffect(() => {
    const handleTransition = (e: any) => {
      setIsActive(true);
      setPhase('cover');

      // Phase 1: Pixelating boxes COVER the screen (staggered appear)
      // After 1.2s the screen is fully covered → execute the scroll callback behind it
      setTimeout(() => {
        if (e.detail.callback) {
          e.detail.callback();
        }

        // Give time for the scroll to settle behind the overlay
        setTimeout(() => {
          // Phase 2: Pixelating boxes REVEAL the new page (staggered disappear)
          setPhase('reveal');

          setTimeout(() => {
            setIsActive(false);
            setPhase('idle');
          }, 1400); // reveal animation total
        }, 300); // extra settle time
      }, 1500); // 1.5s cover animation total
    };

    window.addEventListener('page-transition', handleTransition);
    return () => window.removeEventListener('page-transition', handleTransition);
  }, []);

  // Pre-compute random colors + delays for each box
  const boxData = useMemo(() => {
    const total = gridSize.cols * gridSize.rows;
    return Array.from({ length: total }, (_, i) => {
      const col = i % gridSize.cols;
      const row = Math.floor(i / gridSize.cols);
      // Distance from center for a radial stagger
      const cx = gridSize.cols / 2;
      const cy = gridSize.rows / 2;
      const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
      const normalized = dist / maxDist;

      return {
        coverColor: '#e23f2d',
        revealColor: Math.random() > 0.4 ? '#e23f2d' : '#ffffff',
        coverDelay: normalized * 0.7 + Math.random() * 0.15,
        revealDelay: Math.random() * 0.9,
      };
    });
  }, [gridSize]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {phase === 'cover' && (
          <motion.div
            key="cover-grid"
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            }}
          >
            {boxData.map((box, i) => (
              <motion.div
                key={`cover-${i}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: box.coverDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  backgroundColor: box.coverColor,
                  transformOrigin: 'center',
                }}
                className="w-full h-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            key="reveal-grid"
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            }}
          >
            {boxData.map((box, i) => (
              <motion.div
                key={`reveal-${i}`}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: box.revealDelay,
                  ease: 'easeInOut',
                }}
                style={{
                  backgroundColor: box.revealColor,
                  transformOrigin: 'center',
                }}
                className="w-full h-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
