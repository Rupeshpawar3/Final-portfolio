import { useRef } from "react";
import { motion } from "framer-motion";
import XRDashboard from "./XRDashboard";

const WhyWorkWithMe = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} id="why-work-with-me" className="flex flex-col items-center w-full bg-black relative overflow-hidden py-24" style={{ minHeight: '100vh' }}>

            {/* Video Background - full cover */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover lg:scale-[1.19] lg:translate-x-[calc(11%-100px)] lg:translate-y-[calc(-15%-100px)]"
                >
                    <source src="/wwwm-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black via-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            {/* Heading area */}
            <div className="relative z-10 w-full max-w-[992px] px-6 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-4"
                >
                    <span className="inline-block text-[13px] font-semibold tracking-[3px] uppercase text-[#EB422F] border border-[rgba(235,66,47,0.3)] rounded-full px-5 py-1.5 bg-[rgba(235,66,47,0.08)]">
                        Advantage
                    </span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold font-display text-center text-white uppercase tracking-tight">
                    Why Work <span className="text-[#EB422F]">With Me</span>
                </h2>
            </div>

            {/* XR Dashboard — replaces static image */}
            <div className="relative z-10 w-full max-w-[1400px] mt-[300px] -ml-[50px] px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-full rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(235,66,47,0.15)]"
                >
                    <XRDashboard />
                </motion.div>
            </div>

        </section>
    );
};

export default WhyWorkWithMe;
