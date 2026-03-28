import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Box, PenTool, Gamepad2, GraduationCap, MonitorSmartphone } from "lucide-react";

interface WorkItemProps {
    role: string;
    company: string;
    period: string;
    location?: string;
    description: string[];
    image: string;
    isTop: boolean;
    icon: any; 
    objectPosition?: string;
}

const WorkItem = ({ role, company, period, description, image, isTop, icon: Icon, objectPosition = "center" }: WorkItemProps) => {
    // HUD Image block (reusable)
    const HudImage = () => (
        <div className="relative w-full aspect-[21/9] md:aspect-video rounded-xl p-[1px] overflow-hidden group shadow-2xl">
            <div className="absolute inset-[-100%] w-[300%] h-[300%] left-[-100%] top-[-100%] group-hover:animate-[spin_4s_linear_1_forwards] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_92%,#C0C0C0_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-full h-full bg-black/80 rounded-xl p-2 border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/20 z-20 rounded-tl-sm transition-colors group-hover:border-[#EB422F]/50" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/20 z-20 rounded-tr-sm transition-colors group-hover:border-[#EB422F]/50" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/20 z-20 rounded-bl-sm transition-colors group-hover:border-[#EB422F]/50" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/20 z-20 rounded-br-sm transition-colors group-hover:border-[#EB422F]/50" />
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <img src={image} alt={company} style={{ objectPosition }} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:4px_4px] pointer-events-none opacity-20 z-20" />
            </div>
        </div>
    );

    // Text info block (reusable)
    const TextBlock = () => (
        <div className="flex flex-col items-center text-center w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm mb-3 transition-colors duration-300 group-hover/card:border-[#EB422F]/50">
                {Icon && <Icon className="w-4 h-4 text-[#EB422F]" />}
                <span className="font-display font-bold text-sm md:text-base tracking-wide text-white">
                    {company}
                </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-4 px-2">{role}</h3>
            <ul className="space-y-2 flex flex-col items-start px-2 w-full">
                {description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-400 leading-relaxed text-left">
                        <Check className="w-4 h-4 text-[#EB422F] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="relative w-[90vw] md:w-[450px] shrink-0 h-full group/card cursor-default">
            
            {/* Timeline Date Badge (Center on the red line) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-background px-4 py-1 border border-[#EB422F]/50 rounded-full text-[#EB422F] font-mono text-sm shadow-[0_0_15px_rgba(235,66,47,0.3)] whitespace-nowrap">
                {period}
            </div>

            {/* Connector line from date to image box outline */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#EB422F]/70 z-20 ${
                isTop 
                    ? "top-[52%] h-[calc(56%-52%)]"   /* line goes DOWN from date to image below */
                    : "top-[calc(44%)] h-[calc(50%-44%)]"    /* line goes UP from image above to date */
            }`} />

            {/* Dot where line meets the image box */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#EB422F] shadow-[0_0_10px_rgba(235,66,47,0.6)] z-25 ${
                isTop
                    ? "top-[56%] -translate-y-1/2"   /* dot at top edge of bottom image */
                    : "top-[44%] -translate-y-1/2"    /* dot at bottom edge of top image */
            }`} />

            {/* ===== TOP HALF (above the red line) ===== */}
            <div className="absolute top-0 left-0 w-full h-[44%] flex flex-col justify-end px-4 pb-6">
                {isTop ? <TextBlock /> : <HudImage />}
            </div>

            {/* ===== BOTTOM HALF (below the red line) ===== */}
            <div className="absolute bottom-0 left-0 w-full h-[44%] flex flex-col justify-start px-4 pt-6">
                {isTop ? <HudImage /> : <TextBlock />}
            </div>
        </div>
    );
};

const WorkExperience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    
    // We map vertical scroll position (0 to 1) into a horizontal translation.
    // 5 items * ~450px = ~2250px total extra scrolling distance required to reveal.
    // We scroll deeply left to reveal all nodes on the timeline.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

    const experiences = [
        {
            company: "Huboo",
            role: "Warehouse Operative (Part-time)",
            period: "Nov 2024 – Jun 2025",
            image: "/work/huboo.jpg",
            icon: Box,
            description: [
                "Managed inventory with a digital WMS and handheld scanners daily.",
                "Ran cycle counts, reconciled stock for delivery, and improved accuracy."
            ]
        },
        {
            company: "Moving Pixels Private Limited",
            role: "Senior Designer",
            period: "Sep 2023 – Jan 2024",
            image: "/work/moving_pixels.jpg",
            objectPosition: "center 20%",
            icon: PenTool,
            description: [
                "Designed political campaign graphics and promotional assets for print and digital communication.",
                "Created high-impact visual materials that supported campaign messaging and audience reach."
            ]
        },
        {
            company: "That's Awesome Studio",
            role: "Sr. Creative Associate Lead",
            period: "Feb 2023 – Aug 2023",
            image: "/work/tas.jpg",
            objectPosition: "center 20%",
            icon: Gamepad2,
            description: [
                "Led creative development for ARYAN, Hyderabad’s first virtual influencer, and contributed to Project Katana, a 3D game project.",
                "Produced UI screens, menus, HUD elements, characters, landscapes, and branded assets for app, game, and marketing use."
            ]
        },
        {
            company: "BYJU'S",
            role: "Creative Design Associate",
            period: "Aug 2020 – Jan 2023",
            image: "/work/byjus.jpg",
            objectPosition: "center 20%",
            icon: GraduationCap,
            description: [
                "Designed and improved learning app assets for 3,000+ K10 educational resources using wireframes, layouts, UI elements, and design systems.",
                "Coordinated with cross-functional teams to maintain brand consistency, workflow alignment, and delivery quality."
            ]
        },
        {
            company: "Freelance",
            role: "Creative Designer & Developer",
            period: "Present",
            image: "/work/freelance-new.jpg",
            icon: MonitorSmartphone,
            description: [
                "Craft visual identities, Games, and product-ready interactive experiences.",
                "Blend design, VR technology, and strategy to deliver outcomes."
            ]
        }
    ];

    return (
        <section ref={sectionRef} id="experience" className="relative h-[300vh] bg-background">
            {/* Sticky Wrapper: Keeps the timeline in view while scrolling horizontally */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                
                {/* Ambient Glow Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-[10%] md:top-[12%] w-full z-40 text-center -translate-y-[100px]"
                >
                    <h2 className="font-display text-4xl md:text-5xl font-bold relative inline-block">
                        <span className="text-white">Work Experience</span>
                        <div className="absolute -bottom-4 left-0 h-1 bg-[#EB422F] rounded-full w-full" />
                    </h2>
                </motion.div>

                {/* Horizontal Timeline Container */}
                <div className="relative w-full h-[75vh] min-h-[600px] flex items-center md:pl-[10vw] mt-16 md:mt-24">
                    
                    {/* The Continuous Global Red Line (The Axis) */}
                    <div className="absolute top-1/2 left-0 w-[500vw] h-[2px] bg-[#EB422F] -translate-y-1/2 z-10 shadow-[0_0_15px_rgba(235,66,47,0.5)]" />

                    {/* Animated Sliding Window */}
                    <motion.div 
                        style={{ x }} 
                        className="flex h-full items-center relative z-20 gap-[5vw] md:gap-[4vw] px-[5vw]"
                    >
                        {experiences.map((exp: any, idx) => (
                            <WorkItem
                                key={idx}
                                {...exp}
                                isTop={idx % 2 === 0} // Alternate nodes above and below the axis
                            />
                        ))}
                        
                        {/* Ending spacer to ensure last item fully scrolls onto screen */}
                        <div className="w-[10vw] shrink-0" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;


