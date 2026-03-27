import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FEATURED_PROJECTS = [
  {
    initial: "T",
    title: "Tiffin Republic",
    category: "Brand Identity",
    description: "Complete brand kit including logo design, menu design, social media branding, and offline branding materials for a premium South Indian tiffin service.",
    tags: ["#Logo Design", "#Menu Design", "#Brand Kit"]
  },
  {
    initial: "V",
    title: "Velvet Aura",
    category: "Brand Identity",
    description: "Elegant brand identity design for a luxury jewellery shop, featuring sophisticated logo design and premium marketing materials.",
    tags: ["#Logo Design", "#Business Cards", "#Flyers"]
  },
  {
    initial: "N",
    title: "Nature Veda",
    category: "Packaging Design",
    description: "Premium skincare brand packaging design with natural aesthetics, featuring serum and face wash product labels.",
    tags: ["#Packaging", "#Label Design", "#Mockups"]
  },
  {
    initial: "H",
    title: "Harmony Homes",
    category: "Marketing Design",
    description: "Real estate marketing materials including banners, flyers, and promotional designs for modern apartment sales.",
    tags: ["#Banners", "#Flyers", "#Social Media"]
  },
  {
    initial: "K",
    title: "Karachi's Snacks",
    category: "Packaging Design",
    description: "Vibrant packaging design for traditional Indian snacks including mixture, chudwa, and boondi products.",
    tags: ["#Packaging", "#Product Design", "#Branding"]
  },
  {
    initial: "C",
    title: "Cocochini",
    category: "Packaging Design",
    description: "Premium chocolate-coated cashew packaging design with appealing visual elements and nutritional information layout.",
    tags: ["#Packaging", "#Food Design", "#Branding"]
  }
];

const SERVICES = [
  { title: "Brand Identity", desc: "Complete brand identity design including logo, color palette, typography, and brand guidelines." },
  { title: "Print Design", desc: "Professional print materials including brochures, flyers, business cards, and marketing collateral." },
  { title: "Packaging Design", desc: "Eye-catching packaging designs that stand out on shelves and communicate brand values." },
  { title: "Digital Design", desc: "Social media graphics, web banners, and digital marketing materials for online presence." },
  { title: "Mockup Creation", desc: "Realistic product mockups and visualizations to showcase designs in real-world contexts." },
  { title: "Menu Design", desc: "Beautifully crafted menu designs for restaurants and food services that enhance dining experience." },
];

const GraphicDesignShowcase = () => {
  return (
    <div className="mt-20">
      {/* Featured Projects Section */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <motion.div
              key={idx}
              className="glass-panel p-6 border border-white/5 hover:border-primary/30 transition-colors flex flex-col h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-2xl text-primary">{proj.initial}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">{proj.title}</h3>
                  <span className="text-xs font-mono text-primary/80 uppercase tracking-wider">{proj.category}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/70 mb-6 flex-grow leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-foreground/60 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* What I Do Section */}
      <motion.div
        className="glass-panel p-8 md:p-12 mb-12 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <span className="inline-block text-[12px] font-semibold tracking-[3px] uppercase text-primary border border-primary/30 rounded-full px-4 py-1 bg-primary/10 mb-4">
            Services Offered
          </span>
          <h2 className="font-display text-4xl font-bold mb-4">
            What <span className="text-primary">I Did</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            From concept to completion, I offer comprehensive design services tailored to meet your brand's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-bold text-lg text-white">{service.title}</h3>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed pl-5">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GraphicDesignShowcase;
