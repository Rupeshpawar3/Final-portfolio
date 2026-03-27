import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface InteractiveHoverTextProps {
    text: string;
    className?: string;
    textClassName?: string;
    scrollYProgress?: MotionValue<number>;
    isStoryMode?: boolean;
}

const InteractiveHoverText: React.FC<InteractiveHoverTextProps> = ({
    text,
    className = "",
    textClassName = "",
    scrollYProgress,
    isStoryMode = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0) {
            mouseX.set(e.touches[0].clientX);
            mouseY.set(e.touches[0].clientY);
        }
    };

    const handleTouchEnd = () => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
    };

    return (
        <div
            ref={containerRef}
            className={`relative inline-block cursor-default overflow-visible ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            {text.split("").map((char, index) => (
                <Letter
                    key={index}
                    char={char}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    className={textClassName}
                    scrollYProgress={scrollYProgress}
                    isStoryMode={isStoryMode}
                />
            ))}
        </div>
    );
};

interface LetterProps {
    char: string;
    mouseX: any;
    mouseY: any;
    className: string;
    scrollYProgress?: MotionValue<number>;
    isStoryMode?: boolean;
}

const Letter: React.FC<LetterProps> = ({ char, mouseX, mouseY, className, scrollYProgress, isStoryMode }) => {
    const ref = useRef<HTMLSpanElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    const springX = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.5 });
    const springY = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.5 });

    useEffect(() => {
        const unsubX = mouseX.on("change", () => update());
        const unsubY = mouseY.on("change", () => update());

        function update() {
            if (!ref.current) return;

            const mxVal = mouseX.get();
            const myVal = mouseY.get();

            if (mxVal === Infinity || myVal === Infinity) {
                rawX.set(0);
                rawY.set(0);
                return;
            }

            const currentX = springX.get() || 0;
            const currentY = springY.get() || 0;
            const rect = ref.current.getBoundingClientRect();

            // Subtract the current animated translation to get the true rest center
            const centerX = rect.left - currentX + rect.width / 2;
            const centerY = rect.top - currentY + rect.height / 2;

            const dx = mxVal - centerX;
            const dy = myVal - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Increased radius for the massive 150px text
            const radius = 250;
            const maxPush = 80;

            if (dist < radius) {
                const strength = (1 - dist / radius) * maxPush;
                // Push away from cursor
                rawX.set(-(dx / dist) * strength);
                rawY.set(-(dy / dist) * strength);
            } else {
                rawX.set(0);
                rawY.set(0);
            }
        }

        return () => {
            unsubX();
            unsubY();
        };
    }, [mouseX, mouseY, rawX, rawY]);

    // Pre-calculate stable random fall values for the scroll narrative
    const { fallY, driftX, rotation } = useMemo(() => {
        return {
            fallY: 1000 + Math.random() * 1000, // fall extremely far down
            driftX: (Math.random() - 0.5) * 800, // drift left or right widely
            rotation: (Math.random() - 0.5) * 1080, // spin around wildly
        };
    }, []);

    const dummyScroll = useMotionValue(0);
    const scrollVal = scrollYProgress || dummyScroll;

    // Fall starts at 5% scroll and is fully fallen by 25%
    const animY = useTransform(scrollVal, [0.05, 0.25], [0, fallY]);
    const animX = useTransform(scrollVal, [0.05, 0.25], [0, driftX]);
    const animRotate = useTransform(scrollVal, [0.05, 0.25], [0, rotation]);
    // Fade them out slightly as they fall if you want, but they're going to respawn into "About Me"
    const animOpacity = useTransform(scrollVal, [0.15, 0.25], [1, 0]);

    return (
        <motion.span
            ref={ref}
            style={{ x: springX, y: springY, display: "inline-block" }}
            className={className}
        >
            <motion.span style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
            </motion.span>
        </motion.span>
    );
};

export default InteractiveHoverText;
