import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const radius = 250; 
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    
    return (
      <div 
        className="relative p-[1px] rounded-md overflow-hidden group/input"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {/* Default static border color */}
        <div className="absolute inset-0 z-0 rounded-md bg-input" />

        {/* Dynamic glowing border that follows the cursor */}
        <motion.div
          className="absolute inset-0 z-0 rounded-md transition-opacity duration-300 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.6),
                rgba(235, 66, 47, 0.4) 40%,
                transparent 80%
              )
            `,
          }}
        />

        <input
          type={type}
          className={cn(
            "relative z-10 flex h-10 w-full rounded-[5px] border-none bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB422F] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-[inset_0_0_10px_rgba(255,255,255,0.01)] transition-colors",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
