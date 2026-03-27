import { useState, useRef } from "react";
import { Loader2, Send, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_wuwyj9q";
const EMAILJS_TEMPLATE_ID = "template_b5477ky";
const EMAILJS_PUBLIC_KEY = "VMBWI7KXY4aa8TQFd";

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-50px"
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "$100", // Default budget 
    helpWith: "AR/VR Experience Development"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon."
      });

      setFormData({
        name: "",
        email: "",
        message: "",
        budget: "$100",
        helpWith: "AR/VR Experience Development"
      });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again or email directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-black">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 min-h-[60vh]">
          
          {/* LEFT COLUMN: Links and Big Heading (Absolutely positioned for random layout) */}
          <div className="relative flex flex-col h-full min-h-[480px]">
            {/* Drop me a line */}
            <motion.div 
              className="absolute top-[5%] md:top-[12%] left-[25%] space-y-4 -mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <h3 className="text-[#eb422f] text-base tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Drop me a line:</h3>
              <ul className="space-y-4 font-display text-lg text-white">
                <li>
                  <p 
                    className="hover:text-white/70 transition-colors flex items-center gap-3 cursor-pointer select-all"
                    onClick={() => {
                      navigator.clipboard.writeText("+91 9603342668");
                      toast({ title: "Copied!", description: "Phone number copied to clipboard." });
                    }}
                  >
                    <span className="text-[#eb422f] text-2xl">↗</span> +91 9603342668
                  </p>
                </li>
                <li>
                  <a href="https://wa.me/919603342668" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors flex items-center gap-3">
                    <span className="text-[#eb422f] text-2xl">↗</span> WhatsApp
                  </a>
                </li>
              </ul>
            </motion.div>
            
            {/* Social Media */}
            <motion.div 
              className="absolute top-[38%] right-[5%] md:right-[12%] space-y-4 -mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-[#eb422f] text-base tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Social Media:</h3>
              <ul className="space-y-4 font-display text-lg text-white">
                <li>
                  <a href="https://github.com/Rupeshpawar3" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors flex items-center gap-3">
                    <span className="text-[#eb422f] text-2xl">↗</span> GitHub Portfolio
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors flex items-center gap-3">
                    <span className="text-[#eb422f] text-2xl">↗</span> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.behance.net/rupeshpawar003" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors flex items-center gap-3">
                    <span className="text-[#eb422f] text-2xl">↗</span> Behance
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Copy */}
            <motion.div 
              className="absolute top-[55%] left-0 md:left-[5%] space-y-3 mt-[30px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-[#eb422f] text-base tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>copy:</h3>
              <p 
                className="font-display text-xl text-white hover:text-[#eb422f] transition-colors cursor-pointer select-all"
                onClick={() => {
                  navigator.clipboard.writeText("rupeshpawar0003@gmail.com");
                  toast({ title: "Copied!", description: "Email address copied to clipboard." });
                }}
              >
                rupeshpawar0003@gmail.com
              </p>
            </motion.div>

            {/* Giant Let's Talk */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full mt-auto text-left overflow-visible"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <p className="font-display text-[10px] md:text-[13px] xl:text-[14px] text-white/50 mb-3 md:mb-5 uppercase tracking-[0.2em] whitespace-nowrap">
                LET'S MAKE SOMETHING THAT MEANS SOMETHING.
              </p>
              <div className="flex items-end">
                <span className="text-[#eb422f] font-bold text-3xl md:text-5xl mr-1 mb-1 md:mb-2 text-2xl">↗</span>
                <h2 className="text-white font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.8] tracking-tight">
                  Let's Talk
                </h2>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div 
            className="flex flex-col lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 lg:max-w-xl ml-auto w-full">
              
              {/* Help With Dropdown */}
              <div className="space-y-3">
                <h3 className="text-[#EB422F] text-sm tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>I can help you with:</h3>
                <select 
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleChange as any}
                  className="w-full bg-[#111] text-white/90 border border-white/5 rounded-md px-4 py-3 font-display text-base focus:outline-none focus:border-[#EB422F]/40 focus:bg-[#151515] transition-all shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%23EB422F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-1rem)_center]"
                >
                  <option value="AR/VR Experience Development">AR/VR Experience Development</option>
                  <option value="graphic design">graphic design</option>
                  <option value="Interactive Game Design">Interactive Game Design</option>
                  <option value="3D Modeling & Visualization">3D Modeling & Visualization</option>
                  <option value="Full-Time XR Developer Roles">Full-Time XR Developer Roles</option>
                </select>
              </div>

              {/* Budget Range Segmented Toggle */}
              <div className="space-y-3">
                <h3 className="text-[#EB422F] text-sm tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Your budget range is:</h3>
                <div className="flex w-full bg-[#111] rounded-md overflow-hidden border border-white/5 shadow-inner">
                  {[
                    { label: "$100", value: "$100" },
                    { label: "$200", value: "$200" },
                    { label: "$500", value: "$500" },
                    { label: "$1000", value: "$1000" }
                  ].map((btn) => (
                    <button 
                      key={btn.value}
                      type="button"
                      onClick={() => setFormData({...formData, budget: btn.value})}
                      className={`flex-1 py-3 text-center font-display text-[13px] md:text-sm transition-colors duration-300 ${
                        formData.budget === btn.value 
                          ? 'bg-white/10 text-white font-medium shadow-sm border-t border-b border-[#EB422F]/20' 
                          : 'text-white/40 hover:text-white/80 border-white/5 border border-l-0 first:border-l hover:bg-white/5'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                {/* Hidden input to ensure budget goes via emailjs */}
                <input type="hidden" name="budget" value={formData.budget} />
              </div>

              {/* Project Details Textarea */}
              <div className="space-y-3">
                <h3 className="text-[#EB422F] text-sm tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Give me more details about your project:</h3>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write something here if needed" 
                  rows={3} 
                  className="w-full bg-[#111] text-white/90 placeholder:text-white/30 border border-white/5 rounded-md p-4 font-display text-base focus:outline-none focus:border-[#EB422F]/40 focus:bg-[#151515] transition-all resize-none shadow-inner"
                  required
                />
              </div>

              {/* Contact Info Inputs */}
              <div className="space-y-3">
                <h3 className="text-[#EB422F] text-sm tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Contact info:</h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    className="w-full bg-[#111] text-white/90 placeholder:text-white/30 border border-white/5 rounded-md px-4 py-3 font-display text-base focus:outline-none focus:border-[#EB422F]/40 focus:bg-[#151515] transition-all shadow-inner"
                    required
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email" 
                    className="w-full bg-[#111] text-white/90 placeholder:text-white/30 border border-white/5 rounded-md px-4 py-3 font-display text-base focus:outline-none focus:border-[#EB422F]/40 focus:bg-[#151515] transition-all shadow-inner"
                    required
                  />
                </div>
              </div>

              {/* Submit + Resume Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <motion.button
                  type="submit"
                  className="px-10 py-3 rounded-[20px] font-semibold text-base text-white bg-[#111] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(235,66,47,0.2),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.5)] hover:border-[#EB422F]/30 hover:bg-[#151515]"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-[#EB422F]" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Request <Send className="w-4 h-4 text-[#EB422F]" />
                    </span>
                  )}
                </motion.button>

                <a
                  href="/rupesh_resume_2026_v2.pdf"
                  download="Rupesh_Resume_2026_v2.pdf"
                  className="px-10 py-3 rounded-[20px] font-semibold text-base text-white bg-[#111] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(235,66,47,0.2),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.5)] hover:border-[#EB422F]/30 hover:bg-[#151515] inline-flex items-center gap-2"
                >
                  Resume <Download className="w-4 h-4 text-[#EB422F]" />
                </a>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
