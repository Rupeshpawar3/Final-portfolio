import { Hexagon, Heart } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-card/40 border-t border-border py-12">
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Hexagon className="w-6 h-6 text-primary" />
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-2 text-foreground/60 text-sm">
          <span>Designed & Built by Rupesh Pawar</span>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-6 text-sm">
          <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">
            About
          </a>
          <a href="#work" className="text-foreground/70 hover:text-primary transition-colors">
            Work
          </a>
          <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;