import { useEffect, useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const isMobile = useIsMobile();

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 7.5); // Center the 15px cursor
            cursorY.set(e.clientY - 3); // Top point offset by 3px
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            const isClickable = target?.closest?.('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), .cursor-pointer');
            setIsPointer(isClickable !== null);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    if (isMobile) return null;

    return (
        <motion.div
            className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-150 ${(!isVisible || isPointer) ? 'opacity-0' : 'opacity-100'}`}
            style={{
                x: cursorX,
                y: cursorY,
                left: 0,
                top: 0,
            }}
        >
            {/* Face Container - White Circle */}
            <div className="w-[15px] h-[15px] bg-white rounded-full flex items-center justify-center relative shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {/* Eyes Container */}
                <div className="flex gap-[3px]">
                    {/* Left Eye */}
                    <motion.div
                        className="w-[3px] h-[4px] bg-black rounded-full origin-center"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                    {/* Right Eye */}
                    <motion.div
                        className="w-[3px] h-[4px] bg-black rounded-full origin-center"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default CustomCursor;
