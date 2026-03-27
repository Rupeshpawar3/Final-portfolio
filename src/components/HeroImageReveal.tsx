
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { OptimizedImage } from "./OptimizedImage";

interface HeroImageRevealProps {
    neonImage: string;
    realImage: string;
}

const GlowingBeamCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = 900;
        canvas.height = 160;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        let animationFrameId: number;

        const render = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // clear for next frame

            // Base pulsing effect using sine wave over time
            const t = time * 0.001; 
            const pulse = 1 + Math.sin(t * 3) * 0.04; // Gentle heartbeat pulse (0.96 to 1.04)
            const flicker = 1 + Math.random() * 0.06; // Sharp random flicker
            
            function drawBeam(blurAmt: number, height: number, alpha: number, colorStops: [number, string][]) {
              ctx!.save();
              ctx!.filter = `blur(${blurAmt}px)`;
              ctx!.globalAlpha = Math.max(0, Math.min(1, alpha * pulse));
              const g = ctx!.createLinearGradient(0, cy, canvas!.width, cy);
              for (const [pos, col] of colorStops) g.addColorStop(pos, col);
              ctx!.fillStyle = g;
              ctx!.fillRect(0, cy - height, canvas!.width, height * 2);
              ctx!.restore();
            }

            // Wide outer atmospheric glow
            drawBeam(28, 18, 0.55, [
              [0,    'rgba(120,50,0,0)'],
              [0.1,  'rgba(180,80,5,0.3)'],
              [0.35, 'rgba(220,130,20,0.7)'],
              [0.5,  'rgba(255,190,60,1)'],
              [0.65, 'rgba(220,130,20,0.7)'],
              [0.9,  'rgba(180,80,5,0.3)'],
              [1,    'rgba(120,50,0,0)'],
            ]);

            // Mid glow
            drawBeam(12, 6, 0.8, [
              [0,    'rgba(140,60,0,0)'],
              [0.15, 'rgba(210,120,10,0.4)'],
              [0.4,  'rgba(250,200,70,0.85)'],
              [0.5,  'rgba(255,230,120,1)'],
              [0.6,  'rgba(250,200,70,0.85)'],
              [0.85, 'rgba(210,120,10,0.4)'],
              [1,    'rgba(140,60,0,0)'],
            ]);

            // Tight inner glow
            drawBeam(5, 2.5, 1, [
              [0,    'rgba(200,120,0,0)'],
              [0.2,  'rgba(240,180,40,0.5)'],
              [0.42, 'rgba(255,230,130,0.9)'],
              [0.5,  'rgba(255,255,200,1)'],
              [0.58, 'rgba(255,230,130,0.9)'],
              [0.8,  'rgba(240,180,40,0.5)'],
              [1,    'rgba(200,120,0,0)'],
            ]);

            // White-hot core line (pulsing and vibrating)
            ctx.save();
            ctx.filter = `blur(${0.6 + Math.sin(t * 10) * 0.2}px)`;
            ctx.globalAlpha = Math.min(1, 1 * pulse * (1 + (Math.random() * 0.05))); // Add micro flicker
            const core = ctx.createLinearGradient(cx - 200, 0, cx + 200, 0);
            core.addColorStop(0,   'rgba(255,240,180,0)');
            core.addColorStop(0.1, 'rgba(255,250,220,0.7)');
            core.addColorStop(0.5, 'rgba(255,255,255,1)');
            core.addColorStop(0.9, 'rgba(255,250,220,0.7)');
            core.addColorStop(1,   'rgba(255,240,180,0)');
            ctx.fillStyle = core;
            ctx.fillRect(cx - 200, cy - 0.8, 400, 1.6);
            ctx.restore();

            // Wisp streaks (Breathing width and flickering intensity)
            const streaks: [number, number, number, number][] = [
              [-5,  600, 14, 0.18],
              [5,   600, 14, 0.18],
              [-10, 420, 8,  0.10],
              [10,  420, 8,  0.10],
              [-16, 260, 5,  0.06],
              [16,  260, 5,  0.06],
            ];
            
            for (let i = 0; i < streaks.length; i++) {
              const [yo, baseW, blur, baseA] = streaks[i];
              
              const wMod = Math.sin(t * 2 + i) * 60; // Expand/contract
              const w = baseW + wMod;
              const a = Math.min(1, baseA * flicker * pulse); // Random flicker + baseline pulse

              ctx.save();
              ctx.filter = `blur(${blur}px)`;
              ctx.globalAlpha = a;
              const sg = ctx.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
              sg.addColorStop(0,   'rgba(255,180,30,0)');
              sg.addColorStop(0.3, 'rgba(255,200,60,0.5)');
              sg.addColorStop(0.5, 'rgba(255,230,110,1)');
              sg.addColorStop(0.7, 'rgba(255,200,60,0.5)');
              sg.addColorStop(1,   'rgba(255,180,30,0)');
              ctx.fillStyle = sg;
              ctx.fillRect(cx - w / 2, cy + yo - 1, w, 2);
              ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute bottom-[-80px] left-0 w-full h-[160px] pointer-events-none z-20" style={{ display: 'block' }} />;
};

const HeroImageReveal = ({ neonImage, realImage }: HeroImageRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth trailing
    const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

    // Mask radius size (Target SIZE / 2). 
    // User requested "resize to a little bit of its existing size". 
    // Previous was diameter 304px (r=152) / masking radius 150px.
    // Let's reduce effectively to ~100px radius (200px diameter).
    const targetRadius = 100;
    const radius = useSpring(0, { damping: 25, stiffness: 120 });

    useEffect(() => {
        radius.set(isHovering ? targetRadius : 0);
    }, [isHovering, radius]);

    const maskImage = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, black ${radius}px, transparent ${radius}px)`;
    const webkitMaskImage = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, black ${radius}px, transparent ${radius}px)`;

    // Inverse mask for the Neon image (hide it where the Real image is shown)
    const invertedMaskImage = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, transparent ${radius}px, black ${radius}px)`;
    const invertedWebkitMaskImage = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, transparent ${radius}px, black ${radius}px)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        // Main Container - Relative for positioning, BUT NO OVERFLOW HIDDEN HERE
        // enabling the cursor/mask to bleed out if needed.
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/5] max-w-[500px] mx-auto rounded-2xl cursor-none group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* INNER Container for Images - This CLIPS the images to rounded corners */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
                {/* Neon Image (Base) */}
                {/* Neon Image (Base) - Masked OUT inside the circle */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        maskImage: invertedMaskImage,
                        WebkitMaskImage: invertedWebkitMaskImage,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                >
                    <OptimizedImage
                        src={neonImage}
                        alt="Neon Style"
                        className="w-full h-full object-cover grayscale brightness-125"
                    />
                    <GlowingBeamCanvas />
                </motion.div>

                {/* Real Image (Top Layer - Masked) */}
                <motion.div
                    className="absolute inset-0 w-full h-full bg-background"
                    style={{
                        maskImage,
                        WebkitMaskImage: webkitMaskImage,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                >
                    <OptimizedImage
                        src={realImage}
                        alt="Real Style"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>

            {/* Custom Cursor Ring */}
            <motion.div
                className="absolute rounded-full pointer-events-none z-20"
                style={{
                    x: springX,
                    y: springY,
                    width: targetRadius * 2,
                    height: targetRadius * 2,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.5
                }}
            />
        </div>
    );
}

export default HeroImageReveal;
