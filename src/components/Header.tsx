import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Hexagon } from "lucide-react";
import InteractiveLink from "./InteractiveLink";
import { triggerPageTransition } from "./PageTransition";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy Logic - uses getBoundingClientRect for GSAP ScrollTrigger compatibility
  useEffect(() => {
    const updateActiveSection = () => {
      const sections = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];
      const triggerPoint = window.innerHeight * 0.4; // 40% from top of viewport

      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Section is "active" if its top is above the trigger point and its bottom is below
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
          current = section.id;
        }
      }
      if (current) setActiveSection(current);
    };

    // Run once on mount to set initial active section
    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [location.pathname]); // Re-run when location changes (navigating back to home)


  const navLinks = [
    { name: "About", href: "#about", sections: ["about", "education"] },
    { name: "Skills", href: "#skills", sections: ["skills", "how-it-works", "why-work-with-me"] },
    { name: "Experience", href: "#experience", sections: ["experience"] },
    { name: "Projects", href: "#work", sections: ["work"] },
    { name: "LET'S TALK", href: "#resume", sections: ["resume", "contact"] },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    const executeScroll = () => {
      if (href === "/") {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 50);
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        return;
      }

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          if (href === "#about") {
            const storyNode = document.querySelector('.h-\\[700vh\\]');
            if (storyNode) {
              const rect = storyNode.getBoundingClientRect();
              window.scrollTo({ top: window.scrollY + rect.top + (rect.height * 0.48), behavior: "instant" });
              return;
            }
          }
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "instant" });
            // Double-fire for GSAP layout shifts
            setTimeout(() => element.scrollIntoView({ behavior: "instant" }), 100);
          }
        }, 50);
        return;
      }

      if (href === "#about") {
        const storyNode = document.querySelector('.h-\\[700vh\\]');
        if (storyNode) {
          const rect = storyNode.getBoundingClientRect();
          window.scrollTo({ top: window.scrollY + rect.top + (rect.height * 0.48), behavior: "instant" });
          return;
        }
      }

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };

    triggerPageTransition(executeScroll);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-panel shadow-lg rounded-none border-t-0 border-l-0 border-r-0" : "bg-transparent border-transparent"
        }`}
    >
      <nav className="w-full px-6 md:px-12 py-3 border-none flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-4 group"
            onClick={(e) => {
              e.preventDefault();
              triggerPageTransition(() => {
                if (location.pathname !== "/") {
                  navigate("/");
                }
                window.scrollTo({ top: 0, behavior: "instant" });
              });
            }}
          >
            <img src="/logo-dots-new.avif" alt="Logo" className="w-[38px] h-[38px] object-contain transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
            <span className="whitespace-nowrap font-display text-[18px] md:text-[22px] font-medium tracking-wide text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Rupesh Pawar
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end mr-6">
            {navLinks.filter(l => l.name !== "LET'S TALK").map((link) => {
              const isProjectPage = location.pathname.startsWith("/project/") && link.name === "Projects";
              const isHomeSectionActive = location.pathname === "/" && link.sections.includes(activeSection);

              const isActive = isProjectPage || isHomeSectionActive;

              return (
                <InteractiveLink
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-foreground/80 hover:text-foreground ${isActive ? "active" : ""}`}
                >
                  {link.name}
                </InteractiveLink>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <InteractiveLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="px-7 py-2.5 rounded-full border border-[#EB422F] bg-transparent text-[#EB422F] text-[13px] font-medium tracking-[0.15em] hover:bg-[#EB422F]/10 shadow-[0_0_15px_rgba(46, 231, 255,0.1)] hover:shadow-[0_0_20px_rgba(46, 231, 255,0.3)] transition-all flex items-center justify-center cursor-pointer"
            >
              LET'S TALK
            </InteractiveLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-panel p-6 rounded-2xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isProjectPage = location.pathname.startsWith("/project/") && link.name === "Projects";
                const isHomeSectionActive = location.pathname === "/" && link.sections.includes(activeSection);
                const isActive = isProjectPage || isHomeSectionActive;

                return (
                  <InteractiveLink
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`text-foreground/80 hover:text-foreground transition-colors block ${isActive ? "active" : ""}`}
                  >
                    {link.name}
                  </InteractiveLink>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

