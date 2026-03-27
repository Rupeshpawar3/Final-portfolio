import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
                className="relative w-full h-full"
            >
                <video
                    autoPlay
                    muted
                    playsInline
                    onEnded={onComplete}
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/logo-reveal.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <button
                    onClick={onComplete}
                    className="absolute bottom-8 right-8 text-white/50 hover:text-white transition-colors text-sm font-light tracking-widest uppercase z-10"
                >
                    Skip Intro
                </button>
            </motion.div>
        </div>
    );
};

export default LoadingScreen;
