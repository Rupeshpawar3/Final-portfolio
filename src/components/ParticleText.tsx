import { useEffect, useRef, useState } from 'react';

interface ParticleTextProps {
    texts: string[];
}

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
    life: number;
    decay: number;
}

const ParticleText = ({ texts, className = "" }: ParticleTextProps & { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fontSize = 40;
    const fontDeviceRatio = 2;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let phase: 'scroll' | 'wait' | 'dissolve' = 'scroll';
        let phaseStartTime = performance.now();
        const scrollY = 30;


        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth * window.devicePixelRatio;
                canvas.height = parent.clientHeight * window.devicePixelRatio;

                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;

                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const createParticles = () => {
            particles = [];
            const text = texts[currentIndex];


            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `700 ${fontSize}px "Orbitron", sans-serif`;
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const centerX = canvas.width / (2 * window.devicePixelRatio);
            const centerY = canvas.height / (2 * window.devicePixelRatio);

            ctx.fillText(text, centerX, centerY);

            const metrics = ctx.measureText(text);
            const textWidth = metrics.width;
            const textHeight = fontSize * 1.5;

            const startX = Math.max(0, centerX - textWidth / 2 - 10);
            const startY = Math.max(0, centerY - textHeight / 2 - 10);
            const scanWidth = textWidth + 20;
            const scanHeight = textHeight + 20;

            const imageData = ctx.getImageData(
                startX * window.devicePixelRatio,
                startY * window.devicePixelRatio,
                scanWidth * window.devicePixelRatio,
                scanHeight * window.devicePixelRatio
            );

            const data = imageData.data;
            const step = 4;

            for (let y = 0; y < imageData.height; y += step) {
                for (let x = 0; x < imageData.width; x += step) {
                    const index = (y * imageData.width + x) * 4;
                    const alpha = data[index + 3];

                    if (alpha > 128) {

                        const posX = startX + (x / window.devicePixelRatio);
                        const posY = startY + (y / window.devicePixelRatio);

                        particles.push({
                            x: posX,
                            y: posY,
                            originX: posX,
                            originY: posY,
                            color: `rgba(255, 255, 255, ${alpha / 255})`,
                            size: Math.random() * 2 + 0.5,
                            vx: (Math.random() - 0.5) * 1,
                            vy: (Math.random() * -3) - 1,
                            life: 1,
                            decay: Math.random() * 0.01 + 0.005
                        });
                    }
                }
            }
        };

        const animate = (timestamp: number) => {

            const elapsed = timestamp - phaseStartTime;


            ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

            const centerX = canvas.width / (2 * window.devicePixelRatio);
            const centerY = canvas.height / (2 * window.devicePixelRatio);

            ctx.font = `700 ${fontSize}px "Orbitron", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (phase === 'scroll') {
                const duration = 800;
                const progress = Math.min(elapsed / duration, 1);


                const ease = 1 - Math.pow(1 - progress, 3);
                const currentY = centerY + (30 * (1 - ease));
                const alpha = ease;

                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fillText(texts[currentIndex], centerX, currentY);

                if (progress >= 1) {
                    phase = 'wait';
                    phaseStartTime = timestamp;
                }
            }
            else if (phase === 'wait') {
                const duration = 2000;
                ctx.fillStyle = `rgba(255, 255, 255, 1)`;
                ctx.fillText(texts[currentIndex], centerX, centerY);


                if (elapsed >= duration) {
                    createParticles();
                    phase = 'dissolve';
                    phaseStartTime = timestamp;
                }
            }
            else if (phase === 'dissolve') {
                let activeParticles = false;

                particles.forEach(p => {
                    if (p.life > 0) {
                        activeParticles = true;

                        // Update physics
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += 0.08;


                        p.x += (Math.random() - 0.5) * 0.2;

                        p.life -= p.decay;

                        ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });

                if (!activeParticles || elapsed > 1500) {

                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                    phase = 'scroll';
                    phaseStartTime = timestamp;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };


        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [currentIndex, texts]);

    return (
        <div className={`w-full h-24 flex items-center justify-center ${className}`}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default ParticleText;
