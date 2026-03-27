import React, { useState, useEffect } from 'react';

const HeroBackground: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
            {/* The base image */}
            <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center opacity-80"
                style={{ backgroundImage: 'url(/tech-bg.jpg)' }}
            />
            {/* The darkness overlay with a "hole" at the cursor */}
            <div
                className="absolute inset-0 w-full h-full transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.7) 40%, black 80%)`
                }}
            />
        </div>
    );
};

export default HeroBackground;
